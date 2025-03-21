
import React, { useRef } from 'react';

interface MiniMapProps {
  address: string;
  height?: string;
}

const MiniMap: React.FC<MiniMapProps> = ({ address, height = "300px" }) => {
  const mapRef = useRef<HTMLIFrameElement>(null);

  // Check if address is coordinates (contains a comma and numbers)
  const isCoordinates = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/.test(address);
  
  // Build the map URL differently based on whether we have coordinates or an address
  let mapUrl;
  if (isCoordinates) {
    // For coordinates, use q parameter with the coordinates
    mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${address}&zoom=17`;
  } else if (address.includes("+")) {
    // For plus codes, use q parameter with the plus code
    mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(address)}&zoom=18`;
  } else {
    // For addresses, encode the full address
    const encodedAddress = encodeURIComponent(address);
    mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodedAddress}&zoom=16`;
  }

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-border" style={{ height }}>
      <iframe
        ref={mapRef}
        className="absolute inset-0 w-full h-full"
        frameBorder="0"
        src={mapUrl}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map"
      />
    </div>
  );
};

export default MiniMap;
