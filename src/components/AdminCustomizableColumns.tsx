import { Box, FormGroup, FormControlLabel, Checkbox, Typography } from '@mui/material';

const defaultColumns = [
  { key: 'id', label: 'ID' },
  { key: 'citizen', label: 'Citizen' },
  { key: 'category', label: 'Category' },
  { key: 'status', label: 'Status' },
  { key: 'date', label: 'Date' },
  { key: 'assignee', label: 'Assignee' },
];

export default function AdminCustomizableColumns({ columns, onChange }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle2" mb={1}>Customize Columns:</Typography>
      <FormGroup row>
        {defaultColumns.map(col => (
          <FormControlLabel
            key={col.key}
            control={
              <Checkbox
                checked={columns.includes(col.key)}
                onChange={(_, checked) => onChange(col.key, checked)}
              />
            }
            label={col.label}
          />
        ))}
      </FormGroup>
    </Box>
  );
}
