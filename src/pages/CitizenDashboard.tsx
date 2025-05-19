import { useState } from 'react';
import { Box, Typography, Button, ButtonGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Stack, Paper, IconButton, Badge, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, FormControl, InputLabel, Select, Card, CardContent, Grid } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ComplaintHeatmap from '../components/ComplaintHeatmap';
import { Link } from 'react-router-dom';

const mockComplaints = [
  { id: 1, category: 'Infrastructure', subcategory: 'Roads', status: 'Pending', date: '2025-05-15', hasUnread: true, comments: [
    { sender: 'Department', text: 'Your complaint is being processed.', date: '2025-05-15 10:00' },
    { sender: 'You', text: 'Thank you.', date: '2025-05-15 10:05' },
  ] },
  { id: 2, category: 'Sanitation', subcategory: 'Waste', status: 'In Progress', date: '2025-05-12', hasUnread: false, comments: [
    { sender: 'Department', text: 'We have dispatched a team.', date: '2025-05-12 09:00' },
  ] },
  { id: 3, category: 'Governance', subcategory: 'Transparency', status: 'Resolved', date: '2025-04-29', hasUnread: false, comments: [
    { sender: 'Department', text: 'Your issue was resolved.', date: '2025-04-30 08:00' },
    { sender: 'You', text: 'Confirmed, thanks!', date: '2025-04-30 09:00' },
  ] },
];

function statusColor(status: string): "warning" | "info" | "success" | "default" {

  switch (status) {
    case 'Pending': return 'warning';
    case 'In Progress': return 'info';
    case 'Resolved': return 'success';
    default: return 'default';
  }
}


const statusList = ['All', 'Pending', 'In Progress', 'Resolved'];


export default function CitizenDashboard() {
  const [statusFilter, setStatusFilter] = useState('All');
  // Calculate stats
  const total = mockComplaints.length;
  const pending = mockComplaints.filter(c => c.status === 'Pending').length;
  const inProgress = mockComplaints.filter(c => c.status === 'In Progress').length;
  const resolved = mockComplaints.filter(c => c.status === 'Resolved').length;
  // Filter table
  const filteredRows = statusFilter === 'All' ? mockComplaints : mockComplaints.filter(c => c.status === statusFilter);

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [reply, setReply] = useState('');

  function handleOpenDialog(complaint: any) {
    setSelectedComplaint(complaint);
    setDialogOpen(true);
  }
  function handleCloseDialog() {
    setDialogOpen(false);
    setReply('');
  }
  function handleSendReply() {
    // In real app, send reply to backend
    alert('Reply sent: ' + reply);
    setReply('');
  }

  return (
    <Box sx={{ width: '100%', py: 2 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', sm: 'center' }} mb={3} gap={2}>
        <Stack direction="row" alignItems="center" gap={2}>
          <Typography variant="h4">Citizen Dashboard</Typography>
          <IconButton color="primary">
            <Badge color="error" variant="dot" invisible={!mockComplaints.some(c => c.hasUnread)}>
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Stack>
        <Button variant="contained" color="primary" component={Link} to="/complaint">
          Submit New Complaint
        </Button>
      </Stack>
      {/* Statistics Widgets */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>
            <CardContent>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h4">{total}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'warning.main', color: 'warning.contrastText' }}>
            <CardContent>
              <Typography variant="h6">Pending</Typography>
              <Typography variant="h4">{pending}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'info.main', color: 'info.contrastText' }}>
            <CardContent>
              <Typography variant="h6">In Progress</Typography>
              <Typography variant="h4">{inProgress}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'success.main', color: 'success.contrastText' }}>
            <CardContent>
              <Typography variant="h6">Resolved</Typography>
              <Typography variant="h4">{resolved}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* Filter Dropdown */}
      <FormControl sx={{ mb: 2, minWidth: 180 }} size="small">
        <InputLabel>Status Filter</InputLabel>
        <Select
          value={statusFilter}
          label="Status Filter"
          onChange={e => setStatusFilter(e.target.value)}
        >
          {statusList.map(s => (
            <MenuItem key={s} value={s}>{s}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Complaints Table */}
      <TableContainer component={Paper} sx={{ width: '100%', overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Subcategory</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.subcategory}</TableCell>
                <TableCell>
                  <Chip label={row.status} color={statusColor(row.status)} size="small" />
                </TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>
                  <ButtonGroup size="small" variant="outlined">
                    <Button onClick={() => handleOpenDialog(row)}>Track</Button>
                    <Button onClick={() => alert('Feedback feature coming soon!')}>Feedback</Button>
                    <Button onClick={() => alert('Raise Ticket feature coming soon!')}>Raise Ticket</Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6" mt={4} mb={1}>Complaints Heatmap</Typography>
      <ComplaintHeatmap />
      {/* Complaint Details Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Complaint Details</DialogTitle>
        <DialogContent dividers>
          {selectedComplaint && (
            <>
              <Typography variant="subtitle1" gutterBottom>
                <b>Category:</b> {selectedComplaint.category} / {selectedComplaint.subcategory}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                <b>Status:</b> {selectedComplaint.status}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <b>Date:</b> {selectedComplaint.date}
              </Typography>
              <Box my={2}>
                <Typography variant="h6" gutterBottom>Comments & Feedback</Typography>
                <Box sx={{ bgcolor: 'grey.100', borderRadius: 2, p: 2, mb: 1 }}>
                  {selectedComplaint.comments.map((c: any, idx: number) => (
                    <Box key={idx} mb={1}>
                      <Typography variant="subtitle2" color={c.sender === 'You' ? 'primary' : 'secondary'}>
                        {c.sender} <span style={{ fontWeight: 400, color: '#888', fontSize: 12 }}>({c.date})</span>
                      </Typography>
                      <Typography variant="body2">{c.text}</Typography>
                    </Box>
                  ))}
                </Box>
                <TextField
                  fullWidth
                  label="Reply"
                  value={reply}
                  onChange={e => setReply(e.target.value)}
                  multiline
                  minRows={2}
                  variant="outlined"
                  sx={{ mt: 1 }}
                />
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          <Button onClick={handleSendReply} disabled={!reply.trim()} variant="contained">Send Reply</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
