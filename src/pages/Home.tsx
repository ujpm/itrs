import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Box sx={{ p: 2, textAlign: 'center' }}>
      <Typography variant="h3" mb={2}>Citizen Engagement Platform</Typography>
      <Typography variant="h6" mb={4}>Report issues, track progress, and help improve public services.</Typography>
      <Button variant="contained" component={Link} to="/citizen" sx={{ mr: 2 }}>Citizen Portal</Button>
      <Button variant="outlined" component={Link} to="/admin">Admin Portal</Button>
    </Box>
  );
}
