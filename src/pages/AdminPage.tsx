import { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, ButtonGroup, Dialog, DialogTitle, DialogContent, Chip, Stack, FormControl, InputLabel, Select, MenuItem, Checkbox, TableSortLabel } from '@mui/material';
import Grid from '@mui/material/Grid';
import AdminAnalyticsWidgets from '../components/AdminAnalyticsWidgets';
import AdminSidebar from '../components/AdminSidebar';
import ComplaintHeatmap from '../components/ComplaintHeatmap';
import AdminActivityFeed from '../components/AdminActivityFeed';
import AdminNotifications from '../components/AdminNotifications';
import AdminBulkActionsBar from '../components/AdminBulkActionsBar';
import AdminAdvancedSearch from '../components/AdminAdvancedSearch';
import AdminCustomizableColumns from '../components/AdminCustomizableColumns';
import AdminExportCSV from '../components/AdminExportCSV';
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

type TableColumn = 'id' | 'citizen' | 'category' | 'status' | 'date' | 'assignee' | 'agency';

const staffList = ['John', 'Jane', 'Alice', 'Dept. A', 'Dept. B'];
const defaultColumns: TableColumn[] = ['id', 'citizen', 'category', 'status', 'date', 'assignee', 'agency'];
const statusList: string[] = ['All', 'Pending', 'In Progress', 'Resolved'];
const categoryList: string[] = ['All', 'Infrastructure', 'Sanitation', 'Governance'];


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

export default function AdminPage() {
  // --- State ---
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [agencyFilter, setAgencyFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [statusUpdate, setStatusUpdate] = useState('');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [columns, setColumns] = useState<TableColumn[]>(defaultColumns);
  const [sortBy, setSortBy] = useState<TableColumn>('date');
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
    if (a[sortBy] < b[sortBy]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortDirection === 'asc' ? 1 : -1;
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
  function handleColumnChange(col: TableColumn, checked: boolean) {
    setColumns(prev => checked ? [...prev, col] : prev.filter(c => c !== col));
  }
  function handleSelectAll(checked: boolean) {
    setSelectedIds(checked ? filteredRows.map(row => row.id) : []);
  }
  function handleSelectRow(id: number, checked: boolean) {
    setSelectedIds(prev => checked ? [...prev, id] : prev.filter(i => i !== id));
  }
  function handleSort(col: TableColumn) {
    if (sortBy === col) {
      setSortDirection(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(col);
      setSortDirection('asc');
    }
  }
  function handleSearch(term: string) {
    setSearchTerm(term);
  }


  // --- Render ---
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AdminSidebar />
      <Box sx={{ flex: 1, p: { xs: 1, md: 3 }, maxWidth: '100vw' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">Admin Dashboard</Typography>
          <AdminNotifications />
        </Stack>
        <AdminAnalyticsWidgets />
        <Paper sx={{ my: 2, p: 2 }} id="heatmap">
          <Typography variant="h6" mb={1}>Complaints Heatmap</Typography>
          <ComplaintHeatmap />
        </Paper>
        <Grid container spacing={2} id="table">
          <Grid item xs={12} md={9}>
            <AdminBulkActionsBar
              selectedIds={selectedIds}
              onBulkStatus={handleBulkStatus}
              onBulkAssign={handleBulkAssign}
              statusList={statusList}
              staffList={staffList}
            />
            <AdminAdvancedSearch onSearch={handleSearch} />
            <AdminCustomizableColumns columns={columns} onChange={handleColumnChange} />
            <AdminExportCSV rows={filteredRows} columns={columns} />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={2}>
              <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel>Status</InputLabel>
                <Select value={statusFilter} label="Status" onChange={e => setStatusFilter(e.target.value)}>
                  {statusList.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel>Category</InputLabel>
                <Select value={categoryFilter} label="Category" onChange={e => setCategoryFilter(e.target.value)}>
                  {categoryList.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel>Agency</InputLabel>
                <Select value={agencyFilter} label="Agency" onChange={e => setAgencyFilter(e.target.value)}>
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="MININFRA">MININFRA</MenuItem>
                  <MenuItem value="WASAC">WASAC</MenuItem>
                  <MenuItem value="RGB">RGB</MenuItem>
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
                  {columns.map((col: TableColumn) => (
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
                  {(() => {
                    // Group complaints by agency
                    const grouped = filteredRows.reduce((acc, row) => {
                      acc[row.agency] = acc[row.agency] || [];
                      acc[row.agency].push(row);
                      return acc;
                    }, {} as Record<string, Complaint[]>);
                    return Object.entries(grouped).map(([agency, rows]) => [
                      <TableRow key={`agency-header-${agency}`} sx={{ bgcolor: 'background.paper' }}>
                        <TableCell colSpan={columns.length + 2} sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>
                          {agency} ({rows.length} complaints)
                        </TableCell>
                      </TableRow>,
                      ...rows.map((row: Complaint) => (
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
                      ))
                    ]).flat();
                  })()}

                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper sx={{ mb: 2, p: 2 }}>
              <Typography variant="h6" mb={1}>Rwanda Complaints Heatmap</Typography>
              <ComplaintHeatmap />
            </Paper>
            <AdminActivityFeed />
          </Grid>
        </Grid>
        {/* Complaint Details Dialog */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>Complaint Details</DialogTitle>
          <DialogContent dividers>
            {selectedComplaint && (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  <b>Citizen:</b> {selectedComplaint?.citizen}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <b>Category:</b> {selectedComplaint?.category} / {selectedComplaint?.subcategory}
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
