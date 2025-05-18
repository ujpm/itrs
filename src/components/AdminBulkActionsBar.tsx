import React from 'react';
import { Box, Button, Stack, MenuItem, Select, Typography } from '@mui/material';


type AdminBulkActionsBarProps = {
  selectedIds: number[];
  onBulkStatus: (status: string) => void;
  onBulkAssign: (assignee: string) => void;
  statusList: string[];
  staffList: string[];
};

export default function AdminBulkActionsBar({ selectedIds, onBulkStatus, onBulkAssign, statusList, staffList }: AdminBulkActionsBarProps) {
  const [bulkStatus, setBulkStatus] = React.useState('');
  const [bulkAssignee, setBulkAssignee] = React.useState('');

  return (
    <Box sx={{ p: 1, bgcolor: '#f9fbe7', borderRadius: 1, mb: 2, display: selectedIds.length ? 'block' : 'none' }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
        <Typography variant="subtitle2">Bulk Actions for {selectedIds.length} selected:</Typography>
        <Select
          size="small"
          value={bulkStatus}
          displayEmpty
          onChange={e => setBulkStatus((e.target as HTMLInputElement).value as string)}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="">Update Status</MenuItem>
          {statusList.filter((s: string) => s !== 'All').map((s: string) => (
            <MenuItem key={s} value={s}>{s}</MenuItem>
          ))}
        </Select>
        <Button
          variant="contained"
          color="primary"
          disabled={!bulkStatus}
          onClick={() => {
            onBulkStatus(bulkStatus);
            setBulkStatus('');
          }}
        >Apply</Button>
        <Select
          size="small"
          value={bulkAssignee}
          displayEmpty
          onChange={e => setBulkAssignee((e.target as HTMLInputElement).value as string)}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="">Assign To</MenuItem>
          {staffList.map((staff: string) => <MenuItem key={staff} value={staff}>{staff}</MenuItem>)}
        </Select>
        <Button
          variant="contained"
          color="secondary"
          disabled={!bulkAssignee}
          onClick={() => {
            onBulkAssign(bulkAssignee);
            setBulkAssignee('');
          }}
        >Assign</Button>
      </Stack>
    </Box>
  );
}
