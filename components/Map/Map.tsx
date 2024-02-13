"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export default function Map(props: any) {
  const { position, zoom } = props;

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={false}
      className="w-full h-96"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        autoPan
        alt="Franz-Flemming-Straße, 04179 Leipzig, Niemcy"
        position={position}
      >
        <Popup>Franz-Flemming-Straße, 04179 Leipzig, Niemcy</Popup>
      </Marker>
    </MapContainer>
  );
}
