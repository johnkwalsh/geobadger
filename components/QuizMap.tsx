"use client";

import { MapContainer, Marker, Polyline, TileLayer, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

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
      {guess && <Marker position={[guess.lat, guess.lng]} />}
      {revealAnswer && answer && <Marker position={[answer.lat, answer.lng]} />}
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
