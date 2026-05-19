"use client";

import { MapContainer, Marker, Polyline, TileLayer, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

const userMarkerIcon = L.divIcon({
  className: "custom-marker-wrapper",
  html: '<div class="custom-marker custom-marker-user"><span class="bucky-ear bucky-ear-left"></span><span class="bucky-ear bucky-ear-right"></span><span class="bucky-face"><span class="bucky-eye bucky-eye-left"></span><span class="bucky-eye bucky-eye-right"></span><span class="bucky-nose"></span><span class="bucky-stripe"></span></span></div>',
  iconSize: [56, 56],
  iconAnchor: [28, 28],
});

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

type LockedMapClickHandlerProps = {
  onPick: (lat: number, lng: number) => void;
  revealAnswer: boolean;
};

function LockedMapClickHandler({ onPick, revealAnswer }: LockedMapClickHandlerProps) {
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
    map.fitBounds(bounds, {
      padding: [40, 40],
      maxZoom: 17,
    });
  }, [answer.lat, answer.lng, guess.lat, guess.lng, map, revealAnswer]);

  return null;
}

const MADISON_CENTER: [number, number] = [43.0731, -89.4012];

export default function QuizMap({ guess, answer, onGuess, revealAnswer }: QuizMapProps) {
  return (
    <MapContainer center={MADISON_CENTER} zoom={14} scrollWheelZoom style={{ height: "50vh", minHeight: 320, width: "100%" }}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LockedMapClickHandler onPick={onGuess} revealAnswer={revealAnswer} />
      {guess && <Marker position={[guess.lat, guess.lng]} icon={userMarkerIcon} />}
      {revealAnswer && answer && <Marker position={[answer.lat, answer.lng]} icon={answerMarkerIcon} />}
      {revealAnswer && guess && answer && (
        <>
          <Polyline
            positions={[
              [guess.lat, guess.lng],
              [answer.lat, answer.lng],
            ]}
            pathOptions={{
              color: "#9b0000",
              weight: 7,
              opacity: 0.95,
            }}
          />
          <FitToResult guess={guess} answer={answer} revealAnswer={revealAnswer} />
        </>
      )}
    </MapContainer>
  );
}
