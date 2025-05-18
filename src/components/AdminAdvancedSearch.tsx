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

interface AdminAdvancedSearchProps {
  onSearch: (term: string) => void;
}

export default function AdminAdvancedSearch({ onSearch }: AdminAdvancedSearchProps) {
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState<string | { label: string; value: string } | null>(null);

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
      <IconButton color="primary" onClick={() => onSearch(selected ? (typeof selected === 'object' && 'value' in selected ? selected.value : selected) : input)}>
        <SearchIcon />
      </IconButton>
    </Box>
  );
}
