import { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Box,
  ListItemButton,
  IconButton,
  Tooltip,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MapIcon from '@mui/icons-material/Map';
import TableChartIcon from '@mui/icons-material/TableChart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 220;

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, to: '/admin' },
  { text: 'Complaints Map', icon: <MapIcon />, to: '/admin#heatmap' },
  { text: 'Complaints Table', icon: <TableChartIcon />, to: '/admin#table' },
  { text: 'Citizen View', icon: <DashboardIcon />, to: '/citizen' },
  { text: 'Logout', icon: <ExitToAppIcon />, to: '/login' },
];


export default function AdminSidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [hovered, setHovered] = useState(false);

  const isMini = !open && !hovered;

  return (
    <Drawer
      variant="permanent"
      open={open}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        width: open || hovered ? drawerWidth : 64,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        transition: 'width 0.2s',
        [`& .MuiDrawer-paper`]: {
          width: open || hovered ? drawerWidth : 64,
          transition: 'width 0.2s',
          overflowX: 'hidden',
          bgcolor: 'background.paper',
        },
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: open || hovered ? 'flex-end' : 'center', px: 1 }}>
        <IconButton onClick={() => setOpen((prev) => !prev)} size="small">
          {open || hovered ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Toolbar>
      <Divider />
      <Box sx={{ overflow: 'auto', mt: 1 }}>
        <List>
          {navItems.map((item) => (
            <Tooltip key={item.text} title={isMini ? item.text : ''} placement="right" arrow disableInteractive={!isMini}>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  component={Link}
                  to={item.to}
                  selected={location.pathname === item.to.split('#')[0]}
                  sx={{
                    minHeight: 48,
                    justifyContent: isMini ? 'center' : 'flex-start',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 0, mr: isMini ? 'auto' : 2, justifyContent: 'center' }}>
                    {item.icon}
                  </ListItemIcon>
                  {!isMini && <ListItemText primary={item.text} sx={{ opacity: 1 }} />}
                </ListItemButton>
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
