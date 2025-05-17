import { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call backend login API
    // On success: store JWT, redirect to /citizen or /admin based on role
    // On error: setError('Login failed')
    setError('Login not implemented (MVP placeholder)');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
      <Paper elevation={3} sx={{ p: 4, minWidth: 340 }}>
        <Typography variant="h4" color="primary" mb={2}>Login</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} fullWidth required margin="normal" />
          <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth required margin="normal" />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Login</Button>
        </form>
        <Typography variant="body2" mt={2} color="text.secondary">
          Don't have an account? <Button color="secondary" onClick={() => navigate('/signup')}>Sign up</Button>
        </Typography>
      </Paper>
    </Box>
  );
}
