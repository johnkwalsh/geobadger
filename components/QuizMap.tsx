"use client";

import { CircleMarker, MapContainer, Polyline, TileLayer, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

type MapClickHandlerProps = {
  onPick: (lat: number, lng: number) => void;
};

function MapClickHandler({ onPick }: MapClickHandlerProps) {
  useMapEvents({
    click(event) {
      onPick(event.latlng.lat, event.latlng.lng);
    },
  });
  return null;
}

type QuizMapProps = {
  guess: { lat: number; lng: number } | null;
  answer: { lat: number; lng: number } | null;
  onGuess: (lat: number, lng: number) => void;
  revealAnswer: boolean;
};

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
      <MapClickHandler onPick={onGuess} />
      {guess && (
        <CircleMarker
          center={[guess.lat, guess.lng]}
          radius={11}
          pathOptions={{
            color: "#0f172a",
            weight: 2,
            fillColor: "#2563eb",
            fillOpacity: 0.95,
          }}
        />
      )}
      {revealAnswer && answer && (
        <CircleMarker
          center={[answer.lat, answer.lng]}
          radius={11}
          pathOptions={{
            color: "#14532d",
            weight: 2,
            fillColor: "#22c55e",
            fillOpacity: 0.95,
          }}
        />
      )}
      {revealAnswer && guess && answer && (
        <>
          <Polyline
            positions={[
              [guess.lat, guess.lng],
              [answer.lat, answer.lng],
            ]}
            pathOptions={{
              color: "#c5050c",
              weight: 6,
              opacity: 0.95,
            }}
          />
          <FitToResult guess={guess} answer={answer} revealAnswer={revealAnswer} />
        </>
      )}
    </MapContainer>
  );
}
