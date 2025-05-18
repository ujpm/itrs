import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

const mockFeed = [
  { action: 'Status updated to Resolved', user: 'Admin', time: '2 min ago' },
  { action: 'Replied to complaint #2', user: 'Admin', time: '5 min ago' },
  { action: 'Assigned complaint #3 to John', user: 'Admin', time: '10 min ago' },
  { action: 'Bulk updated 3 complaints', user: 'Admin', time: '20 min ago' },
];

export default function AdminActivityFeed() {
  return (
    <Box sx={{ width: 320, bgcolor: 'background.paper', borderRadius: 2, p: 2, boxShadow: 2 }}>
      <Typography variant="h6" mb={2}>Activity Feed</Typography>
      <List dense>
        {mockFeed.map((item, idx) => (
          <>
            <ListItem key={idx} alignItems="flex-start">
              <ListItemText
                primary={item.action}
                secondary={<>{item.user} &bull; {item.time}</>}
              />
            </ListItem>
            {idx < mockFeed.length - 1 && <Divider component="li" />}
          </>
        ))}
      </List>
    </Box>
  );
}
