import { Box, Paper, Typography } from '@mui/material';
// import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

export default function MapPicker() {
  return (
    <Box>
      <Paper sx={{ mt: 3, mb: 2, p: 2, bgcolor: 'grey.50', border: '1px dashed #aaa', textAlign: 'center' }}>
        <Typography color="text.secondary">Map picker coming soon (Leaflet integration)</Typography>
      </Paper>
    </Box>
  );
}
