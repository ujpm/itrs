import { Box, Paper, Typography, Stack } from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const pieData = [
  { name: 'Pending', value: 7 },
  { name: 'In Progress', value: 5 },
  { name: 'Resolved', value: 12 },
];
const COLORS = ['#ff9800', '#2196f3', '#4caf50'];

const barData = [
  { date: 'May 1', complaints: 3 },
  { date: 'May 2', complaints: 2 },
  { date: 'May 3', complaints: 5 },
  { date: 'May 4', complaints: 7 },
  { date: 'May 5', complaints: 4 },
];

export default function AdminAnalyticsWidgets() {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mb={3}>
      <Paper sx={{ flex: 1, p: 2 }}>
        <Typography variant="h6" mb={2}>Complaints by Status</Typography>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
              {pieData.map((entry, idx) => <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Paper>
      <Paper sx={{ flex: 2, p: 2 }}>
        <Typography variant="h6" mb={2}>Complaints Trend</Typography>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={barData}>
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="complaints" fill="#1976d2" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Stack>
  );
}
