import { Box, Typography } from '@mui/material';
import ComplaintForm from '../components/ComplaintForm';

export default function CitizenDashboard() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" mb={3}>Citizen Dashboard</Typography>
      <ComplaintForm />
      {/* TODO: List user's complaints, show status, map view */}
    </Box>
  );
}
