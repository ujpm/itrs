import { Box, Typography, Button, TextField, Stack } from '@mui/material';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';

// Fix default marker icon issue for Leaflet in React
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface MapPickerProps {
  onChange?: (coords: { lat: number; lng: number }) => void;
}

export default function MapPicker({ onChange }: MapPickerProps) {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [map, setMap] = useState<any>(null);
  const defaultCenter = { lat: -1.9441, lng: 30.0619 }; // Kigali, Rwanda

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        if (onChange) onChange(e.latlng);
      },
    });
    return position ? <Marker position={position} /> : null;
  }

  // Find My Location handler
  const handleFindLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setPosition(coords);
          if (map) map.setView(coords, 15);
          if (onChange) onChange(coords);
        },
        () => alert('Unable to retrieve your location'),
        { enableHighAccuracy: true }
      );
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };

  return (
    <Box sx={{ mt: 3, mb: 2 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" mb={1} gap={2}>
        <Typography variant="subtitle1">Select Location (click on the map):</Typography>
        <Button variant="outlined" size="small" onClick={handleFindLocation}>
          Find My Location
        </Button>
      </Stack>
      <Box sx={{ height: 300, width: '100%', borderRadius: 2, overflow: 'hidden', border: '1px solid #bbb' }}>
        <MapContainer
          center={position || defaultCenter}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
          whenReady={(event: any) => setMap(event.target)}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
        </MapContainer>
      </Box>
      <TextField
        label="Selected Coordinates"
        value={position ? `${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}` : ''}
        margin="normal"
        fullWidth
        InputProps={{ readOnly: true }}
        sx={{ mt: 2 }}
      />
    </Box>
  );
}
