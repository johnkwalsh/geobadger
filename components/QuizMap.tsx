"use client";

import { CircleMarker, MapContainer, Marker, Polyline, TileLayer, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";

const answerMarkerIcon = L.divIcon({
  className: "custom-marker-wrapper",
  html: '<div class="custom-marker custom-marker-answer"><span>Answer</span></div>',
  iconSize: [64, 64],
  iconAnchor: [32, 32],
});

type QuizMapProps = {
  guess: { lat: number; lng: number } | null;
  answer: { lat: number; lng: number } | null;
  onGuess: (lat: number, lng: number) => void;
  revealAnswer: boolean;
};

type MapClickHandlerProps = {
  onPick: (lat: number, lng: number) => void;
  revealAnswer: boolean;
};

function LockedMapClickHandler({ onPick, revealAnswer }: MapClickHandlerProps) {
  useMapEvents({
    click(event) {
      if (revealAnswer) return;
      onPick(event.latlng.lat, event.latlng.lng);
    },
  });
  return null;
}

type FitToResultProps = {
  guess: { lat: number; lng: number };
  answer: { lat: number; lng: number };
  revealAnswer: boolean;
};

function FitToResult({ guess, answer, revealAnswer }: FitToResultProps) {
  const map = useMap();

  useEffect(() => {
    if (!revealAnswer) return;
    const bounds = L.latLngBounds([
      [guess.lat, guess.lng],
      [answer.lat, answer.lng],
    ]);
    map.flyToBounds(bounds, {
      padding: [40, 40],
      maxZoom: 17,
      animate: true,
      duration: 1.1,
    });
  }, [answer.lat, answer.lng, guess.lat, guess.lng, map, revealAnswer]);

  return null;
}

const MADISON_CENTER: [number, number] = [43.0731, -89.4012];

type AnimatedResultLineProps = {
  guess: { lat: number; lng: number };
  answer: { lat: number; lng: number };
  revealAnswer: boolean;
};

function AnimatedResultLine({ guess, answer, revealAnswer }: AnimatedResultLineProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!revealAnswer) {
      setProgress(0);
      return;
    }

    let animationFrameId = 0;
    const durationMs = 800;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(1, elapsed / durationMs);
      const easedProgress = 1 - (1 - rawProgress) * (1 - rawProgress);
      setProgress(easedProgress);

      if (rawProgress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [revealAnswer, guess.lat, guess.lng, answer.lat, answer.lng]);

  const currentLat = guess.lat + (answer.lat - guess.lat) * progress;
  const currentLng = guess.lng + (answer.lng - guess.lng) * progress;

  return (
    <Polyline
      positions={[
        [guess.lat, guess.lng],
        [currentLat, currentLng],
      ]}
      pathOptions={{
        color: "#9b0000",
        weight: 7,
        opacity: 0.95,
      }}
    />
  );
}

export default function QuizMap({ guess, answer, onGuess, revealAnswer }: QuizMapProps) {
  return (
    <MapContainer center={MADISON_CENTER} zoom={14} scrollWheelZoom style={{ height: "50vh", minHeight: 320, width: "100%" }}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LockedMapClickHandler onPick={onGuess} revealAnswer={revealAnswer} />
      {guess && (
  <CircleMarker
    center={[guess.lat, guess.lng]}
    radius={12}
    pathOptions={{
      color: "#C5050C",
      fillColor: "#FFFFFF",
      fillOpacity: 1,
      weight: 4,
    }}
  />
)}
      {revealAnswer && answer && <Marker position={[answer.lat, answer.lng]} icon={answerMarkerIcon} />}
      {revealAnswer && guess && answer && (
        <>
          <AnimatedResultLine guess={guess} answer={answer} revealAnswer={revealAnswer} />
          <FitToResult guess={guess} answer={answer} revealAnswer={revealAnswer} />
        </>
      )}
    </MapContainer>
  );
}
