"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { CountryItem } from '@/hooks/useDatabase';
import 'leaflet/dist/leaflet.css';

export type CountryData = CountryItem & {
   mortality: number;
};

type Props = {
   data: CountryData[];
}

export default function WorldMap({ data }: Props) {
   function createCustomIcon(value: number) {
      const size = value > 10000 ? 50 : 40;
      return L.divIcon({
         className: "custom-circle-marker",
         html: `
      <div style="
        background: #14213D;
        color: white;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        font-weight: 300;
        border: 1px solid white;
      ">
        ${value}
      </div>
    `,
         iconSize: [size, size],
         iconAnchor: [size / 2, size / 2]
      });
   }

   return (
      <MapContainer center={[20, 0]}
         zoom={3}
         style={{ height: '100vh', width: '100vw', zIndex: 1 }}
         scrollWheelZoom={false}
         attributionControl={false}>
         <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
         {data.map((country) => (
            <Marker
               key={country.code}
               position={[country.lat, country.lon]}
               icon={createCustomIcon(country.mortality)}
            >
               <Popup>
                  <strong>{country.name}</strong><br />
                  mortality: {country.mortality}
               </Popup>
            </Marker>
         ))}
      </MapContainer>
   );
}