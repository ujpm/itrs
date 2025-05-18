import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

function convertToCSV(rows, columns) {
  const header = columns.join(',');
  const body = rows.map(row => columns.map(col => JSON.stringify(row[col] || '')).join(',')).join('\n');
  return header + '\n' + body;
}

export default function AdminExportCSV({ rows, columns }) {
  function handleExport() {
    const csv = convertToCSV(rows, columns);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'complaints_export.csv';
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <Button variant="outlined" startIcon={<DownloadIcon />} onClick={handleExport} sx={{ mb: 2 }}>
      Export CSV
    </Button>
  );
}
