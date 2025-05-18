import { useState } from 'react';
import { Box, TextField, Autocomplete, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// Mock search options for autocomplete
const options = [
  { label: 'ID: 1', value: '1' },
  { label: 'ID: 2', value: '2' },
  { label: 'John Doe', value: 'John Doe' },
  { label: 'Garbage', value: 'Garbage' },
  { label: 'Pothole', value: 'Pothole' },
];

export default function AdminAdvancedSearch({ onSearch }) {
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState(null);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Autocomplete
        freeSolo
        options={options}
        getOptionLabel={option => typeof option === 'string' ? option : option.label}
        value={selected}
        inputValue={input}
        onInputChange={(_, v) => setInput(v)}
        onChange={(_, v) => setSelected(v)}
        sx={{ flex: 1, mr: 1 }}
        renderInput={params => (
          <TextField {...params} label="Search complaints" size="small" />
        )}
      />
      <IconButton color="primary" onClick={() => onSearch(selected ? (selected.value || selected) : input)}>
        <SearchIcon />
      </IconButton>
    </Box>
  );
}
