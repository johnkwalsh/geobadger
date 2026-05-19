"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { questions } from "@/data/questions";

const QuizMap = dynamic(() => import("@/components/QuizMap"), {
  ssr: false,
});

type Guess = { lat: number; lng: number };
type RoundResult = {
  questionPrompt: string;
  answerLabel: string;
  answer: Guess;
  guess: Guess;
  distanceMeters: number;
  points: number;
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
  const maxDistanceForPoints = 6000;
  const normalized = Math.max(0, 1 - distanceMeters / maxDistanceForPoints);
  return Math.round(normalized * 1000);
}

function formatDistance(distanceMeters: number): string {
  const feet = distanceMeters * 3.28084;
  if (feet < 5280) {
    return `${Math.round(feet).toLocaleString()} ft`;
  }

  const miles = feet / 5280;
  return `${miles.toFixed(2)} mi`;
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

  const currentQuestion = questions[index];
  const isComplete = index >= questions.length;

  const totalScore = useMemo(
    () => results.reduce((sum, result) => sum + result.points, 0),
    [results],
  );

  const handleSubmit = () => {
    if (!guess || !currentQuestion) return;

    const answer = { lat: currentQuestion.lat, lng: currentQuestion.lng };
    const distanceMeters = haversineMeters(guess, answer);
    const points = scoreFromDistance(distanceMeters);

    const result: RoundResult = {
      questionPrompt: currentQuestion.prompt,
      answerLabel: currentQuestion.answerLabel,
      answer,
      guess,
      distanceMeters,
      points,
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
      scoreEmojiLine,
    ];
    await navigator.clipboard.writeText(lines.join("\n"));
    setCopied(true);
  };

  if (isComplete) {
    return (
      <main className="page">
        <section className="card">
          <GeoBadgerTitle />
          <h2 className="final-score">Final Score: {totalScore} / 5000</h2>
          <ul>
            {results.map((result, i) => (
              <li key={`${result.answerLabel}-${i}`}>
                {i + 1}. {result.answerLabel}: {result.points}/1000 ({formatDistance(result.distanceMeters)})
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
        <p>
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
            <p><strong>Correct location:</strong> {roundResult.answerLabel}</p>
            <p>
              <strong>Your guess:</strong> {roundResult.guess.lat.toFixed(5)}, {roundResult.guess.lng.toFixed(5)}
            </p>
            <p><strong>Distance:</strong> {formatDistance(roundResult.distanceMeters)}</p>
            <p><strong>Points:</strong> {roundResult.points} / 1000</p>
            <button onClick={handleNext}>Next question</button>
          </div>
        )}
      </section>
    </main>
  );
}
