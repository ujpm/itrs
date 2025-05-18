import { Box, Typography, Button, Stack, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh', width: '100vw', bgcolor: 'background.default', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4, md: 6 }, width: '100%', maxWidth: 600, mx: 'auto', textAlign: 'center', bgcolor: 'background.paper', borderRadius: 3, boxSizing: 'border-box' }}>
        <Typography variant="h3" color="primary" fontWeight={700} mb={2}>
          Welcome to ITRS
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={4}>
          A modern platform for reporting, tracking, and resolving public service issues in Rwanda.
        </Typography>
        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} justifyContent="center" mb={3}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to="/complaint"
          >
            Submit a Complaint
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="success"
            size="large"
            component={Link}
            to="/signup"
          >
            Signup
          </Button>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          For government agencies: <Button component={Link} to="/admin" color="secondary" size="small">Admin Portal</Button>
        </Typography>
      </Paper>
    </Box>
  );
}
