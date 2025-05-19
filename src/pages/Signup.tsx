import { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Alert, FormControlLabel, Radio, RadioGroup, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { governmentAgencies } from '../data/agencyMapping';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAgency, setIsAgency] = useState<'yes' | 'no'>('no');
  const [selectedAgency, setSelectedAgency] = useState('');
  const [otherAgency, setOtherAgency] = useState('');
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
          <Typography variant="body2" sx={{ mt: 2 }}>Are you registering as a government agency?</Typography>
          <RadioGroup
            row
            value={isAgency}
            onChange={e => setIsAgency(e.target.value as 'yes' | 'no')}
            sx={{ mb: 2 }}
          >
            <FormControlLabel value="no" control={<Radio />} label="No" />
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          </RadioGroup>
          {isAgency === 'yes' && (
            <>
              <FormControl fullWidth margin="normal">
                <InputLabel>Department / Agency</InputLabel>
                <Select
                  value={selectedAgency}
                  label="Department / Agency"
                  onChange={e => setSelectedAgency(e.target.value)}
                  required
                >
                  {governmentAgencies.map(agency => (
                    <MenuItem key={agency} value={agency}>{agency}</MenuItem>
                  ))}
                  <MenuItem value="other">Other (please specify)</MenuItem>
                </Select>
              </FormControl>
              {selectedAgency === 'other' && (
                <TextField
                  label="Please specify your agency/department"
                  value={otherAgency}
                  onChange={e => setOtherAgency(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
              )}
            </>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Sign Up</Button>
        </form>
        <Typography variant="body2" mt={2} color="text.secondary">
          Already have an account? <Button color="secondary" onClick={() => navigate('/login')}>Login</Button>
        </Typography>
      </Paper>
    </Box>
  );
}
