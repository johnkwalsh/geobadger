"use client";

import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

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

const MADISON_CENTER: [number, number] = [43.0731, -89.4012];

export default function QuizMap({ guess, answer, onGuess, revealAnswer }: QuizMapProps) {
  return (
    <MapContainer center={MADISON_CENTER} zoom={14} scrollWheelZoom style={{ height: "50vh", minHeight: 320, width: "100%" }}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapClickHandler onPick={onGuess} />
      {guess && <Marker position={[guess.lat, guess.lng]} />}
      {revealAnswer && answer && <Marker position={[answer.lat, answer.lng]} />}
    </MapContainer>
  );
}
