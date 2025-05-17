import { useState } from 'react';
import { Box, Button, TextField, MenuItem, FormControl, InputLabel, Select, Switch, FormControlLabel, Typography, Paper } from '@mui/material';
import { categories } from '../data/categories';
import MapPicker from './MapPicker';


export default function ComplaintForm() {
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [issue, setIssue] = useState('');
  const [detail, setDetail] = useState('');
  const [privacy, setPrivacy] = useState(false);

  // Get selected category and subcategory objects
  const selectedCategory = categories.find(cat => cat.label === category);
  const selectedSubcategory = selectedCategory?.subcategories.find(sub => sub.label === subcategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: call API to submit complaint
    alert(`Submitted: ${category} > ${subcategory} > ${issue} > ${detail}, Privacy: ${privacy ? 'Public' : 'Private'}`);
  };

  return (
    <Box sx={{ width: '100%', px: { xs: 1, sm: 3, md: 6 }, py: { xs: 2, md: 4 } }}>
      <Paper>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 900, mx: 'auto', textAlign: 'left' }}>
          <Typography variant="h5" mb={2}>Report an Issue</Typography>
          {/* Horizontal Selectable Category Cards */}
          <Box sx={{ display: 'flex', overflowX: 'auto', gap: 2, mb: 3, pb: 1 }}>
            {categories.map(cat => (
              <Box
                key={cat.label}
                onClick={() => {
                  setCategory(cat.label);
                  setSubcategory('');
                  setIssue('');
                }}
                sx={{
                  minWidth: 120,
                  px: 2,
                  py: 1.5,
                  borderRadius: 2,
                  border: 2,
                  borderColor: category === cat.label ? 'primary.main' : 'grey.300',
                  bgcolor: category === cat.label ? 'primary.light' : 'grey.100',
                  color: category === cat.label ? 'primary.contrastText' : 'text.primary',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: category === cat.label ? 2 : 0,
                  transition: 'all 0.2s',
                  flex: '0 0 auto',
                  '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.50' }
                }}
              >
                {cat.label}
              </Box>
            ))}
          </Box>
          {/* Subcategory Dropdown */}
          {category && (
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Subcategory</InputLabel>
              <Select
                value={subcategory}
                label="Subcategory"
                onChange={e => {
                  setSubcategory(e.target.value);
                  setIssue('');
                }}
              >
                {selectedCategory?.subcategories.map(sub => <MenuItem key={sub.label} value={sub.label}>{sub.label}</MenuItem>)}
              </Select>
            </FormControl>
          )}
          {/* Issue Dropdown */}
          {subcategory && (
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Issue</InputLabel>
              <Select
                value={issue}
                label="Issue"
                onChange={e => setIssue(e.target.value)}
              >
                {selectedSubcategory?.issues.map(issueVal => <MenuItem key={issueVal} value={issueVal}>{issueVal}</MenuItem>)}
              </Select>
            </FormControl>
          )}

          {/* Map Picker */}
          <MapPicker />

          <TextField
            label="Description"
            value={detail}
            onChange={e => setDetail(e.target.value)}
            multiline
            rows={3}
            fullWidth
            margin="normal"
            required
          />
          <FormControlLabel
            control={<Switch checked={privacy} onChange={e => setPrivacy(e.target.checked)} />}
            label="Make complaint public (visible on map)"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={!category || !subcategory || !issue || !detail}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
