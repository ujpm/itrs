import { useState } from 'react';
import { IconButton, Badge, Popover, List, ListItem, ListItemText, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const mockNotifications = [
  { message: 'New complaint received', time: '1 min ago', urgent: true },
  { message: 'Complaint #3 overdue', time: '10 min ago', urgent: true },
  { message: 'Citizen replied to complaint #2', time: '15 min ago', urgent: false },
];

export default function AdminNotifications() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton color="primary" onClick={handleOpen}>
        <Badge badgeContent={mockNotifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <List sx={{ minWidth: 300 }}>
          {mockNotifications.map((n, idx) => (
            <ListItem key={idx} sx={{ bgcolor: n.urgent ? 'rgba(255,0,0,0.07)' : undefined }}>
              <ListItemText
                primary={<Typography color={n.urgent ? 'error' : 'text.primary'}>{n.message}</Typography>}
                secondary={n.time}
              />
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
}
