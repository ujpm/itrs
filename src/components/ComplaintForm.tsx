import { useState } from 'react';
import { Box, Button, TextField, MenuItem, FormControl, InputLabel, Select, Switch, FormControlLabel, Typography } from '@mui/material';
import { categories } from '../data/categories';
import MapPicker from './MapPicker';


export default function ComplaintForm() {
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [issue, setIssue] = useState('');
  const [detail, setDetail] = useState('');
  const [privacy, setPrivacy] = useState(false);
  const [customCategory, setCustomCategory] = useState('');
  const [customSubcategory, setCustomSubcategory] = useState('');
  const [customIssue, setCustomIssue] = useState('');

  // Get selected category and subcategory objects
  const selectedCategory = categories.find(cat => cat.label === category);
  const selectedSubcategory = selectedCategory?.subcategories.find(sub => sub.label === subcategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: call API to submit complaint
    const finalCategory = category === "__custom_category__" ? customCategory : category;
    const finalSubcategory = subcategory === "__custom_subcategory__" ? customSubcategory : subcategory;
    const finalIssue = issue === "__custom_issue__" ? customIssue : issue;
    alert(`Submitted: ${finalCategory} > ${finalSubcategory} > ${finalIssue} > ${detail}, Privacy: ${privacy ? 'Public' : 'Private'}`);
  };

  return (
    <Box sx={{ width: '100%', py: 2 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', textAlign: 'left' }}>
        <Typography variant="h5" mb={2}>Report an Issue</Typography>
          {/* Horizontal Selectable Category Cards */}
          <Box sx={{ display: 'flex', overflowX: 'auto', gap: 2, mb: 3, pb: 1 }}>
            {categories.map(cat => (
              <Box
                key={cat.label}
                onClick={() => {
                  setCategory(cat.label);
                  setCustomCategory('');
                  setSubcategory('');
                  setCustomSubcategory('');
                  setIssue('');
                  setCustomIssue('');
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
            {/* Custom category button */}
            <Box
              key="__custom_category_btn__"
              onClick={() => {
                setCategory("__custom_category__");
                setCustomCategory('');
                setSubcategory('');
                setCustomSubcategory('');
                setIssue('');
                setCustomIssue('');
              }}
              sx={{
                minWidth: 120,
                px: 2,
                py: 1.5,
                borderRadius: 2,
                border: 2,
                borderColor: category === "__custom_category__" ? 'primary.main' : 'grey.300',
                bgcolor: category === "__custom_category__" ? 'primary.light' : 'grey.100',
                color: category === "__custom_category__" ? 'primary.contrastText' : 'text.primary',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: category === "__custom_category__" ? 2 : 0,
                transition: 'all 0.2s',
                flex: '0 0 auto',
                '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.50' }
              }}
            >
              Custom
            </Box>
          </Box>
          {/* Show custom category field if custom is selected */}
          {category === "__custom_category__" && (
            <>
              <TextField
                label="Custom Category"
                value={customCategory}
                onChange={e => setCustomCategory(e.target.value)}
                margin="normal"
                fullWidth
                required
              />
              <TextField
                label="Custom Subcategory"
                value={customSubcategory}
                onChange={e => setCustomSubcategory(e.target.value)}
                margin="normal"
                fullWidth
                required
              />
            </>
          )}
          {/* Subcategory Dropdown */}
          {category && category !== "__custom_category__" && (
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Subcategory</InputLabel>
              <Select
                value={subcategory}
                onChange={e => {
                  setSubcategory(e.target.value);
                  setCustomSubcategory('');
                  setIssue('');
                  setCustomIssue('');
                }}
                label="Subcategory"
              >
                {selectedCategory?.subcategories.map(sub => (
                  <MenuItem key={sub.label} value={sub.label}>{sub.label}</MenuItem>
                ))}
                <MenuItem value="__custom_subcategory__">Custom (type your own)</MenuItem>
              </Select>
            </FormControl>
          )}
          {subcategory === "__custom_subcategory__" && (
            <TextField
              label="Custom Subcategory"
              value={customSubcategory}
              onChange={e => setCustomSubcategory(e.target.value)}
              margin="normal"
              fullWidth
              required
            />
          )}
          {/* Issue Dropdown */}
          {selectedSubcategory && (
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Issue</InputLabel>
              <Select
                value={issue}
                onChange={e => {
                  setIssue(e.target.value);
                  setCustomIssue('');
                }}
                label="Issue"
              >
                {selectedSubcategory.issues.map(issue => (
                  <MenuItem key={issue} value={issue}>{issue}</MenuItem>
                ))}
                <MenuItem value="__custom_issue__">Custom (type your own)</MenuItem>
              </Select>
            </FormControl>
          )}
          {issue === "__custom_issue__" && (
            <TextField
              label="Custom Issue"
              value={customIssue}
              onChange={e => setCustomIssue(e.target.value)}
              margin="normal"
              fullWidth
              required
            />
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
    </Box>
  );
}
