import { useState } from 'react';
import { Box, Button, TextField, MenuItem, FormControl, InputLabel, Select, Switch, FormControlLabel, Typography } from '@mui/material';
import { categories } from '../data/categories';


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
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2, maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h5" mb={2}>Report an Issue</Typography>
      {/* Category Dropdown */}
      <FormControl fullWidth margin="normal" required>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          label="Category"
          onChange={e => {
            setCategory(e.target.value);
            setSubcategory('');
            setIssue('');
          }}
        >
          {categories.map(cat => <MenuItem key={cat.label} value={cat.label}>{cat.label}</MenuItem>)}
        </Select>
      </FormControl>
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
  );
}
