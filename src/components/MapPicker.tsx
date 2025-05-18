import { Box, Typography, Button, TextField, Stack } from '@mui/material';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';

// Fix default marker icon issue for Leaflet in React
import L from 'leaflet';

// Fix for marker icon not showing in Vite/React
import markerIcon2xUrl from 'leaflet/dist/images/marker-icon-2x.png?url';
import markerIconUrl from 'leaflet/dist/images/marker-icon.png?url';
import markerShadowUrl from 'leaflet/dist/images/marker-shadow.png?url';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2xUrl,
  iconUrl: markerIconUrl,
  shadowUrl: markerShadowUrl,
});

interface MapPickerProps {
  onChange?: (coords: { lat: number; lng: number }) => void;
}

import { useRef } from 'react';

import { useEffect } from 'react';

export default function MapPicker({ onChange }: MapPickerProps) {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [address, setAddress] = useState<string>('');
  const [addressLoading, setAddressLoading] = useState<boolean>(false);
  const [addressError, setAddressError] = useState<string>('');
  const [manualMode, setManualMode] = useState<boolean>(false);
  const [manualLocation, setManualLocation] = useState<string>('');
  const mapRef = useRef<any>(null);
  const defaultCenter = { lat: -1.9441, lng: 30.0619 }; // Kigali, Rwanda

  // Reverse geocode when position changes
  useEffect(() => {
    if (position) {
      setAddress('');
      setAddressError('');
      setAddressLoading(true);
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${position.lat}&lon=${position.lng}&format=json`)
        .then((res) => res.json())
        .then((data) => {
          setAddress(data.display_name || 'Address not found');
          setAddressLoading(false);
        })
        .catch(() => {
          setAddressError('Could not fetch address.');
          setAddressLoading(false);
        });
    } else {
      setAddress('');
      setAddressError('');
    }
  }, [position]);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        if (onChange) onChange(e.latlng);
        if (mapRef.current) mapRef.current.flyTo(e.latlng, mapRef.current.getZoom());
      },
    });
    // Explicitly set custom icon for Vite/React
    const customIcon = L.icon({
      iconRetinaUrl: markerIcon2xUrl,
      iconUrl: markerIconUrl,
      shadowUrl: markerShadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    return position ? <Marker position={position} icon={customIcon} /> : null;
  }

  return (
    <Box sx={{ mt: 3, mb: 2 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" mb={1} gap={2}>
        <Typography variant="subtitle1">Select Location (click on the map):</Typography>
        <Button variant="outlined" size="small" onClick={() => setManualMode((v) => !v)}>
          {manualMode ? 'Use Map Picker' : 'Type Location Manually'}
        </Button>
      </Stack>
      {manualMode ? (
        <TextField
          label="Custom Location (type address or place name)"
          value={manualLocation}
          onChange={e => setManualLocation(e.target.value)}
          margin="normal"
          fullWidth
          placeholder="e.g. Nyamirambo, Kigali, Rwanda"
        />
      ) : (
        <>
          <Box sx={{ height: 300, width: '100%', borderRadius: 2, overflow: 'hidden', border: '1px solid #bbb' }}>
            <MapContainer
              center={position || defaultCenter}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={true}
              ref={mapRef}
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
          {position && (
            <Box sx={{ mt: 1 }}>
              {addressLoading && <Typography variant="body2" color="text.secondary">Looking up address…</Typography>}
              {address && !addressLoading && !addressError && (
                <Typography variant="body2" color="text.secondary">{address}</Typography>
              )}
              {addressError && (
                <Typography variant="body2" color="error.main">{addressError}</Typography>
              )}
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
