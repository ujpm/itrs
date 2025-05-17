import { useState } from 'react';
import { Box, Button, TextField, MenuItem, FormControl, InputLabel, Select, Switch, FormControlLabel, Typography } from '@mui/material';

const categories = [
  { label: 'Infrastructure', subcategories: [ { label: 'Roads', subcategories: ['Potholes', 'Streetlights'] } ] },
  { label: 'Governance', subcategories: [ { label: 'Corruption', subcategories: ['Bribery'] } ] },
];


export default function ComplaintForm() {
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [detail, setDetail] = useState('');
  const [privacy, setPrivacy] = useState(false);

  // Nested dropdown logic
  const selectedCategory = categories.find(cat => cat.label === category);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: call API to submit complaint
    alert(`Submitted: ${category} > ${subcategory} > ${detail}, Privacy: ${privacy ? 'Public' : 'Private'}`);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2, maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h5" mb={2}>Report an Issue</Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select value={category} label="Category" onChange={e => { setCategory(e.target.value); setSubcategory(''); }} required>
          {categories.map(cat => <MenuItem key={cat.label} value={cat.label}>{cat.label}</MenuItem>)}
        </Select>
      </FormControl>
      {category && (
        <FormControl fullWidth margin="normal">
          <InputLabel>Subcategory</InputLabel>
          <Select value={subcategory} label="Subcategory" onChange={e => setSubcategory(e.target.value)} required>
            {selectedCategory?.subcategories.map(sub => <MenuItem key={sub.label} value={sub.label}>{sub.label}</MenuItem>)}
          </Select>
        </FormControl>
      )}
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
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Submit</Button>
    </Box>
  );
}
