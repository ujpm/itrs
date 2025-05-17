import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1A237E', // Deep Blue
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF9800', // Vibrant Orange
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#00C853', // Emerald Green
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F5F7FA', // Soft Gray
      paper: '#FFFFFF',  // Surface
    },
    error: {
      main: '#D32F2F',
      contrastText: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
