import React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TableSortLabel from '@mui/material/TableSortLabel';
import Grid from '@mui/material/Grid';
import AdminAnalyticsWidgets from '../components/AdminAnalyticsWidgets';
import AdminSidebar from '../components/AdminSidebar';
import ComplaintHeatmap from '../components/ComplaintHeatmap';
import { governmentAgencies } from '../data/agencyMapping';

import AdminNotifications from '../components/AdminNotifications';
import AdminBulkActionsBar from '../components/AdminBulkActionsBar';



import AdminThreadedComments from '../components/AdminThreadedComments';

// --- Types ---
type Complaint = {
  id: number;
  citizen: string;
  category: string;
  subcategory: string;
  status: string;
  date: string;
  assignee: string;
  agency: string;
  comments: any[];
};

const staffList = ['John', 'Jane', 'Alice', 'Dept. A', 'Dept. B'];
const defaultColumns: string[] = ['id', 'citizen', 'category', 'status', 'date', 'assignee', 'agency'];
const statusList: string[] = ['All', 'Pending', 'In Progress', 'Resolved'];
const agencyList: string[] = governmentAgencies;



const initialComplaints: Complaint[] = [
  { id: 1, citizen: 'John Doe', category: 'Infrastructure', subcategory: 'Roads', status: 'Pending', date: '2025-05-15', assignee: 'Dept. A', agency: 'MININFRA', comments: [
    { id: 1, sender: 'Citizen', text: 'Pothole on Main St.', date: '2025-05-15 09:00', replies: [ { id: 2, sender: 'Admin', text: 'We are reviewing your complaint.', date: '2025-05-15 10:00' } ] },
    { id: 3, sender: 'Citizen', text: 'Thank you!', date: '2025-05-15 11:00', replies: [] },
  ] },
  { id: 2, citizen: 'Jane Smith', category: 'Sanitation', subcategory: 'Waste', status: 'In Progress', date: '2025-05-12', assignee: 'John', agency: 'WASAC', comments: [
    { id: 4, sender: 'Citizen', text: 'Garbage not collected.', date: '2025-05-12 08:00', replies: [] },
    { id: 5, sender: 'Admin', text: 'Team dispatched.', date: '2025-05-12 09:30', replies: [] },
  ] },
  { id: 3, citizen: 'Alice Lee', category: 'Governance', subcategory: 'Transparency', status: 'Resolved', date: '2025-04-29', assignee: 'Dept. B', agency: 'RGB', comments: [
    { id: 6, sender: 'Citizen', text: 'Request for budget info.', date: '2025-04-28 12:00', replies: [] },
    { id: 7, sender: 'Admin', text: 'Info provided.', date: '2025-04-29 08:00', replies: [] },
  ] },
];

function statusColor(status: string) {
  switch (status) {
    case 'Pending': return 'warning';
    case 'In Progress': return 'info';
    case 'Resolved': return 'success';
    default: return 'default';
  }
}

// --- Admin Dashboard with All Interactive Features ---

import { Card, CardContent, CardHeader, IconButton, Fade, Tooltip } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PublicIcon from '@mui/icons-material/Public';


export default function AdminPage() {
  // --- State ---
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedAgency] = useState<string>('All');
  
  // Example admin name, could come from context or props
  const adminName = 'Admin';
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [agencyFilter, setAgencyFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [statusUpdate, setStatusUpdate] = useState('');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [columns] = useState<string[]>(defaultColumns);
  const [sortBy, setSortBy] = useState<string>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // --- Real-time update simulation ---
  useEffect(() => {
    const interval = setInterval(() => {
      // TODO: Replace with backend polling/websocket
      setComplaints([...initialComplaints]);
    }, 10000); // every 10s
    return () => clearInterval(interval);
  }, []);

  // --- Filtering, search, and sort ---
  let filteredRows = complaints.filter(row =>
    (statusFilter === 'All' || row.status === statusFilter) &&
    (categoryFilter === 'All' || row.category === categoryFilter) &&
    (agencyFilter === 'All' || row.agency === agencyFilter) &&
    (searchTerm === '' ||
      row.id.toString().includes(searchTerm) ||
      row.citizen.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.subcategory.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  filteredRows = filteredRows.sort((a, b) => {
    if (sortBy === 'date') {
      return sortDirection === 'asc'
        ? a.date.localeCompare(b.date)
        : b.date.localeCompare(a.date);
    }
    if ((a as any)[sortBy] < (b as any)[sortBy]) return sortDirection === 'asc' ? -1 : 1;
    if ((a as any)[sortBy] > (b as any)[sortBy]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // --- Handlers ---
  function handleOpenDialog(complaint: Complaint) {
    setSelectedComplaint(complaint);
    setStatusUpdate(complaint.status);
    setDialogOpen(true);
  }
  function handleCloseDialog() {
    setDialogOpen(false);
  }
  function handleBulkStatus(newStatus: string) {
    // TODO: Integrate with backend
    setComplaints(prev => prev.map(c => selectedIds.includes(c.id) ? { ...c, status: newStatus } : c));
    setSelectedIds([]);
  }
  function handleBulkAssign(newAssignee: string) {
    // TODO: Integrate with backend
    setComplaints(prev => prev.map(c => selectedIds.includes(c.id) ? { ...c, assignee: newAssignee } : c));
    setSelectedIds([]);
  }
  function handleSelectAll(checked: boolean) {
    setSelectedIds(checked ? filteredRows.map(row => row.id) : []);
  }
  function handleSelectRow(id: number, checked: boolean) {
    setSelectedIds(prev => checked ? [...prev, id] : prev.filter(i => i !== id));
  }
  function handleSort(col: string) {
    if (sortBy === col) {
      setSortDirection(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(col);
      setSortDirection('asc');
    }
  }

  // --- Render ---
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', bgcolor: darkMode ? '#181a20' : '#f6f7fb', transition: 'background 0.3s' }}>
      {/* HEADER */}
      <Box sx={{
        width: '100%',
        position: 'sticky',
        top: 0,
        zIndex: 1201,
        bgcolor: 'background.paper',
        boxShadow: 2,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: { xs: 2, md: 6 }, pt: 4, pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ width: 58, height: 58, bgcolor: 'primary.main', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 3 }}>
              <PublicIcon sx={{ color: 'white', fontSize: 36 }} />
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: darkMode ? 'grey.100' : 'primary.main' }}>Welcome, {adminName}!</Typography>
              <Typography variant="body1" sx={{ color: darkMode ? 'grey.300' : 'text.secondary' }}>
                "Leadership is not a position or a title, it is action and example."
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
              <IconButton onClick={() => setDarkMode(dm => !dm)}>
                {darkMode ? <WbSunnyIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>
            <AdminNotifications />
          </Box>
        </Box>
        {/* SVG ART */}
        <Box sx={{ width: '100%', maxWidth: 900, mx: 'auto', mt: 2, mb: 3 }}>
          <svg width="100%" height="60" viewBox="0 0 900 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="450" cy="30" rx="440" ry="15" fill={darkMode ? '#23263a' : '#e3e8f0'} />
            <ellipse cx="450" cy="35" rx="390" ry="10" fill={darkMode ? '#23263a' : '#f6f7fb'} />
          </svg>
        </Box>
      </Box>
      {/* Main Content Area: Sidebar + Dashboard */}
      <Box sx={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden', width: '100%' }}>
        {/* Sidebar */}
        <Box sx={{ flex: '0 0 auto', zIndex: 1200, alignSelf: 'flex-start', height: 'auto', minHeight: 0, pt: { xs: '72px', md: '112px' } }}>
          <AdminSidebar />
        </Box>
        {/* Dashboard Content */}
        <Box sx={{ flex: 1, overflow: 'auto', p: { xs: 1, md: 3 }, maxWidth: '100vw', minWidth: 0, pt: { xs: '72px', md: '112px' } }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} mb={2} gap={2}>
            <Typography variant="h4" sx={{ fontSize: { xs: '1.3rem', md: '2rem' } }}>Admin Dashboard</Typography>
          </Stack>
        <Fade in timeout={600}>
          <Box>
            <Card sx={{ mb: 2, boxShadow: 3 }}>
              <CardHeader avatar={<EmojiEventsIcon color="primary" />} title="Analytics" />
              <CardContent sx={{ pb: 0 }}>
                <AdminAnalyticsWidgets />
              </CardContent>
            </Card>
            <Card sx={{ mb: 2, boxShadow: 3 }}>
              <CardHeader avatar={<PublicIcon color="success" />} title="Complaints Heatmap" />
              <CardContent>
                <ComplaintHeatmap />
              </CardContent>
            </Card>
          </Box>
        </Fade>
        <Grid container columns={12} spacing={2} id="table">
          <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 9' } }}>
            <Box>
              <AdminBulkActionsBar
                selectedIds={selectedIds}
                onBulkStatus={handleBulkStatus}
                onBulkAssign={handleBulkAssign}
                statusList={statusList}
                staffList={staffList}
              />
              {/* Government Agency CTA */}
              <Box sx={{ mb: 2, p: 2, bgcolor: '#e3f2fd', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="subtitle1" sx={{ flex: 1 }}>
                  Are you a government agency? <b>Click here</b> to filter complaints associated with your department.
                </Typography>
                <FormControl size="small" sx={{ minWidth: 220 }}>
                  <InputLabel>Filter by Agency</InputLabel>
                  <Select
                    value={agencyFilter}
                    label="Filter by Agency"
                    onChange={e => setAgencyFilter(e.target.value)}
                  >
                    <MenuItem value="All">All Government Agencies</MenuItem>
                    {agencyList.map(agency => (
                      <MenuItem key={agency} value={agency}>{agency}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
                {/* Search Field */}
                <TextField
                  size="small"
                  label="Search complaints"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  sx={{ minWidth: 200 }}
                />
                {/* Status Filter */}
                <FormControl size="small" sx={{ minWidth: 140 }}>
                  <InputLabel>Status</InputLabel>
                  <Select value={statusFilter} label="Status" onChange={e => setStatusFilter(e.target.value)}>
                    <MenuItem value="All">All Statuses</MenuItem>
                    {statusList.filter(s => s !== 'All').map(status => (
                      <MenuItem key={status} value={status}>{status}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* Category Filter */}
                <FormControl size="small" sx={{ minWidth: 160 }}>
                  <InputLabel>Category</InputLabel>
                  <Select value={categoryFilter} label="Category" onChange={e => setCategoryFilter(e.target.value)}>
                    <MenuItem value="All">All Categories</MenuItem>
                    {[...new Set(complaints.map(c => c.category))].sort().map(cat => (
                      <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
              <TableContainer component={Paper} sx={{ mb: 3 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          indeterminate={selectedIds.length > 0 && selectedIds.length < filteredRows.length}
                          checked={filteredRows.length > 0 && selectedIds.length === filteredRows.length}
                          onChange={e => handleSelectAll(e.target.checked)}
                        />
                      </TableCell>
                      {columns.map((col: string) => (
                        <TableCell key={col} sortDirection={sortBy === col ? sortDirection : false}>
                          <TableSortLabel
                            active={sortBy === col}
                            direction={sortBy === col ? sortDirection : 'asc'}
                            onClick={() => handleSort(col)}
                          >
                            {col.charAt(0).toUpperCase() + col.slice(1)}
                          </TableSortLabel>
                        </TableCell>
                      ))}
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(
                      filteredRows
                        .filter(row => selectedAgency === 'All' || row.agency === selectedAgency)
                        .reduce((acc, row) => {
                          acc[row.agency] = acc[row.agency] || [];
                          acc[row.agency].push(row);
                          return acc;
                        }, {} as Record<string, Complaint[]>)
                    ).map(([agency, rows]: [string, Complaint[]]) => (
                      <React.Fragment key={agency}>
                        <TableRow sx={{ bgcolor: 'background.paper' }}>
                          <TableCell colSpan={columns.length + 2} sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>
                            {agency} ({rows.length} complaints)
                          </TableCell>
                        </TableRow>
                        {rows.map((row: Complaint) => (
                          <TableRow key={row.id} selected={selectedIds.includes(row.id)}>
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={selectedIds.includes(row.id)}
                                onChange={e => handleSelectRow(row.id, e.target.checked)}
                              />
                            </TableCell>
                            {columns.includes('id') && <TableCell>{row.id}</TableCell>}
                            {columns.includes('citizen') && <TableCell>{row.citizen}</TableCell>}
                            {columns.includes('category') && <TableCell>{row.category} / {row.subcategory}</TableCell>}
                            {columns.includes('status') && <TableCell><Chip label={row.status} color={statusColor(row.status)} size="small" /></TableCell>}
                            {columns.includes('date') && <TableCell>{row.date}</TableCell>}
                            {columns.includes('assignee') && <TableCell>{row.assignee}</TableCell>}
                            {columns.includes('agency') && <TableCell>{row.agency}</TableCell>}
                            <TableCell>
                              <ButtonGroup size="small" variant="outlined">
                                <Button onClick={() => handleOpenDialog(row)}>Details</Button>
                              </ButtonGroup>
                            </TableCell>
                          </TableRow>
                        ))}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Complaint Details</DialogTitle>
        <DialogContent dividers>
          {selectedComplaint && (
            <>
              <Typography variant="subtitle1" gutterBottom>
                <b>Citizen:</b> {selectedComplaint.citizen}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <b>Category:</b> {selectedComplaint.category} / {selectedComplaint.subcategory}
              </Typography>
              <FormControl size="small" sx={{ mt: 1, mb: 2, minWidth: 160 }}>
                <InputLabel>Status</InputLabel>
                <Select value={statusUpdate} label="Status" onChange={e => setStatusUpdate(e.target.value)}>
                  {statusList.filter(s => s !== 'All').map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                </Select>
              </FormControl>
              <Typography variant="body2" gutterBottom>
                <b>Date:</b> {selectedComplaint.date}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <b>Assignee:</b> {selectedComplaint.assignee}
              </Typography>
              <AdminThreadedComments comments={selectedComplaint.comments} />
            </>
          )}
        </DialogContent>
      </Dialog>
      </Box>

    </Box>
  );
}
