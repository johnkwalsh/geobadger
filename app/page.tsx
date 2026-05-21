"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { questions } from "@/data/questions";

const QuizMap = dynamic(() => import("@/components/QuizMap"), {
  ssr: false,
});

type Guess = { lat: number; lng: number };
type RoundResult = {
  questionPrompt: string;
  answerLabel: string;
  answer: { lat: number; lng: number };
  guess: { lat: number; lng: number };
  distanceMeters: number;
  points: number;
  insideRadiusZone?: boolean;
  insideCorrectArea?: boolean;
};

const EARTH_RADIUS_METERS = 6371000;

function haversineMeters(a: Guess, b: Guess): number {
  const toRadians = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);

  const h =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

  return 2 * EARTH_RADIUS_METERS * Math.asin(Math.sqrt(h));
}

function scoreFromDistance(distanceMeters: number): number {
  const distanceFeet = distanceMeters * 3.28084;

  if (distanceFeet <= 100) return 1000;
  if (distanceFeet <= 250) {
    const progress = (distanceFeet - 100) / 150;
    return Math.round(999 - progress * 99);
  }
  if (distanceFeet <= 500) {
    const progress = (distanceFeet - 250) / 250;
    return Math.round(899 - progress * 149);
  }
  if (distanceFeet <= 1000) {
    const progress = (distanceFeet - 500) / 500;
    return Math.round(749 - progress * 249);
  }
  if (distanceFeet <= 2000) {
    const progress = (distanceFeet - 1000) / 1000;
    return Math.round(499 - progress * 249);
  }

  const maxDistanceForPointsFeet = 4000;
  if (distanceFeet >= maxDistanceForPointsFeet) return 0;

  const progress = (distanceFeet - 2000) / (maxDistanceForPointsFeet - 2000);
  return Math.round(249 - progress * 249);
}

function isPointInPolygon(point: Guess, polygon: Guess[]): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].lng;
    const yi = polygon[i].lat;
    const xj = polygon[j].lng;
    const yj = polygon[j].lat;

    const intersects =
      yi > point.lat !== yj > point.lat &&
      point.lng < ((xj - xi) * (point.lat - yi)) / (yj - yi) + xi;

    if (intersects) inside = !inside;
  }
  return inside;
}

function formatDistance(distanceMeters: number): string {
  const feet = distanceMeters * 3.28084;
  if (feet < 5280) {
    return `${Math.round(feet).toLocaleString()} ft`;
  }

  const miles = feet / 5280;
  return `${miles.toFixed(2)} mi`;
}

function getFinalRating(score: number): string {
  if (score >= 4500) return "True Badger";
  if (score >= 3500) return "Madison Native";
  return "Lost Freshman";
}

function GeoBadgerTitle() {
  return (
    <h1 className="game-title" aria-label="GeoBadger">
      <span className="game-title-geo">GEO</span>
      <span className="game-title-badger">BADGER</span>
    </h1>
  );
}

export default function Home() {
  const [index, setIndex] = useState(0);
  const [guess, setGuess] = useState<Guess | null>(null);
  const [results, setResults] = useState<RoundResult[]>([]);
  const [roundResult, setRoundResult] = useState<RoundResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [animatedTotalScore, setAnimatedTotalScore] = useState(0);

  const currentQuestion = questions[index];
  const isComplete = index >= questions.length;

  const totalScore = useMemo(
    () => results.reduce((sum, result) => sum + result.points, 0),
    [results],
  );
  const finalRating = useMemo(() => getFinalRating(totalScore), [totalScore]);

  useEffect(() => {
    if (!isComplete) {
      setAnimatedTotalScore(0);
      return;
    }

    let animationFrameId = 0;
    const durationMs = 1200;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      const easedProgress = 1 - (1 - progress) * (1 - progress);
      setAnimatedTotalScore(Math.round(totalScore * easedProgress));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isComplete, totalScore]);

  const handleSubmit = () => {
    if (!guess || !currentQuestion) return;

    const answer = { lat: currentQuestion.lat, lng: currentQuestion.lng };
    const distanceMeters = haversineMeters(guess, answer);
    const insideCorrectArea = Boolean(
      currentQuestion.polygon && isPointInPolygon(guess, currentQuestion.polygon),
    );
    const points = insideCorrectArea ? 1000 : scoreFromDistance(distanceMeters);

    const result: RoundResult = {
      questionPrompt: currentQuestion.prompt,
      answerLabel: currentQuestion.answerLabel,
      answer,
      guess,
      distanceMeters,
      points,
      insideCorrectArea,
    };

    setRoundResult(result);
    setResults((prev) => [...prev, result]);
  };

  const handleNext = () => {
    setGuess(null);
    setRoundResult(null);
    setIndex((prev) => prev + 1);
  };

  const handleReset = () => {
    setIndex(0);
    setGuess(null);
    setResults([]);
    setRoundResult(null);
    setCopied(false);
  };

  const handleCopy = async () => {
    const scoreEmojiLine = results
      .map((result) => {
        if (result.points >= 750) return "🔴";
        if (result.points >= 400) return "⚪";
        return "⚫";
      })
      .join("");

    const lines = [
      `GeoBadger ${totalScore}/5000`,
      finalRating,
      scoreEmojiLine,
    ];
    await navigator.clipboard.writeText(lines.join("\n"));
    setCopied(true);
  };

  if (isComplete) {
    return (
      <main className="page">
        <section className="card final-card">
          <h1 className="final-title">🎉 UW–Madison Geo Quiz Complete!</h1>
          <div className="final-score-panel">
            <p className="final-score-label">Final Score</p>
            <h2 className="final-score">{animatedTotalScore.toLocaleString()} / 5000</h2>
            <p className="final-rating">{finalRating}</p>
          </div>
          <ul>
            {results.map((result, i) => (
              <li key={`${result.answerLabel}-${i}`}>
                {i + 1}. {result.answerLabel}: {result.points}/1000 ({result.insideRadiusZone ? "Inside correct area" : formatDistance(result.distanceMeters)})
              </li>
            ))}
          </ul>
          <div className="actions">
            <button onClick={handleReset}>Play again</button>
            <button onClick={handleCopy}>Copy/share result</button>
          </div>
          {copied && <p className="copy-note">Result copied to clipboard.</p>}
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="card">
        <GeoBadgerTitle />
        <p className="question-count">
          Question {index + 1} of {questions.length}
        </p>
        <h2>{currentQuestion.prompt}</h2>

        <QuizMap
          guess={guess}
          answer={roundResult ? roundResult.answer : null}
          onGuess={(lat, lng) => setGuess({ lat, lng })}
          revealAnswer={Boolean(roundResult)}
        />

        {!roundResult ? (
          <div className="actions">
            <button onClick={handleSubmit} disabled={!guess}>
              Submit guess
            </button>
          </div>
        ) : (
          <div className="result">
            {roundResult.points === 1000 && (
              <div className="perfect-guess" role="status" aria-live="polite">
                <div className="perfect-guess-confetti" aria-hidden="true">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <span key={i} className="perfect-guess-particle" />
                  ))}
                </div>
                <p className="perfect-guess-banner">PERFECT GUESS</p>
              </div>
            )}
            <p><strong>Correct location:</strong> {roundResult.answerLabel}</p>
            <p>
              <strong>Your guess:</strong> {roundResult.guess.lat.toFixed(5)}, {roundResult.guess.lng.toFixed(5)}
            </p>
            <div className={`result-stats ${roundResult.points === 1000 ? "result-stats-perfect" : ""}`}>
              <p><strong>Distance:</strong> {formatDistance(roundResult.distanceMeters)}</p>
              <p><strong>Points:</strong> {roundResult.points} / 1000</p>
              {roundResult.insideCorrectArea && <p><strong>Inside correct area</strong></p>}
            </div>
            <button onClick={handleNext}>Next question</button>
          </div>
        )}
      </section>
    </main>
  );
}
