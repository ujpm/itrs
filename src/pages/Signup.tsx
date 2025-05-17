import { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('citizen');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call backend signup API
    // On success: store JWT, redirect to /citizen
    // On error: setError('Signup failed')
    setError('Signup not implemented (MVP placeholder)');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
      <Paper elevation={3} sx={{ p: 4, minWidth: 340 }}>
        <Typography variant="h4" color="primary" mb={2}>Sign Up</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} fullWidth required margin="normal" />
          <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth required margin="normal" />
          {/* Role selection for MVP purposes */}
          <TextField label="Role" value={role} onChange={e => setRole(e.target.value)} fullWidth margin="normal" helperText="citizen or admin" />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Sign Up</Button>
        </form>
        <Typography variant="body2" mt={2} color="text.secondary">
          Already have an account? <Button color="secondary" onClick={() => navigate('/login')}>Login</Button>
        </Typography>
      </Paper>
    </Box>
  );
}
