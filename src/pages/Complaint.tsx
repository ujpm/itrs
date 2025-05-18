import { Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import ComplaintForm from '../components/ComplaintForm';

export default function ComplaintPage() {
  return (
    <Box sx={{ width: '100%' }}>
      <Button
        variant="outlined"
        color="primary"
        component={Link}
        to="/citizen"
        sx={{ mb: 2 }}
      >
        Go to Dashboard
      </Button>
      <ComplaintForm />
    </Box>
  );
}
