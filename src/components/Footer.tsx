import { Box, Typography, Link, Stack, Divider } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupIcon from '@mui/icons-material/Group';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import InfoIcon from '@mui/icons-material/Info';
import GavelIcon from '@mui/icons-material/Gavel';

const Footer = () => (
  <Box component="footer" sx={{
    width: '100%',
    bgcolor: 'primary.main',
    color: 'common.white',
    borderTop: 0,
    mt: 'auto',
    boxShadow: 1,
    px: { xs: 2, md: 8 },
    py: { xs: 4, md: 6 },
  }}>
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }}>
      {/* Intro Section */}
      <Box sx={{ flex: 2, minWidth: 220 }}>
        <Typography variant="h6" color="inherit" gutterBottom>
          ITRS Platform
        </Typography>
        <Typography variant="body2" color="inherit">
          The Integrated Transparency & Reporting System (ITRS) empowers citizens and government agencies to collaborate for a more transparent, accountable, and responsive public service. Submit complaints, track progress, and help build a better community.
        </Typography>
      </Box>
      {/* Navigation Links */}
      <Box sx={{ flex: 1, minWidth: 180 }}>
        <Typography variant="subtitle1" color="text.primary" gutterBottom>
          Quick Links
        </Typography>
        <Stack direction="column" spacing={1}>
          <Link href="/" underline="hover" color="inherit" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><HomeIcon fontSize="small" color="inherit" /> Home</Link>
          <Link href="/admin" underline="hover" color="inherit" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><AdminPanelSettingsIcon fontSize="small" color="inherit" /> Admin</Link>
          <Link href="/citizen" underline="hover" color="inherit" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><GroupIcon fontSize="small" color="inherit" /> Citizen Dashboard</Link>
          <Link href="/complaint" underline="hover" color="inherit" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><ReportProblemIcon fontSize="small" color="inherit" /> Complaints</Link>
          <Link href="/about" underline="hover" color="inherit" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><InfoIcon fontSize="small" color="inherit" /> About</Link>
          <Link href="/privacy" underline="hover" color="inherit" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><GavelIcon fontSize="small" color="inherit" /> Privacy Policy</Link>
        </Stack>
      </Box>
      {/* Contact Section */}
      <Box sx={{ flex: 1, minWidth: 200 }}>
        <Typography variant="subtitle1" color="text.primary" gutterBottom>
          Contact Us
        </Typography>
        <Stack direction="column" spacing={1}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EmailIcon fontSize="small" color="inherit" />
            <Typography variant="body2" color="inherit">support@itrs.gov.rw</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PhoneIcon fontSize="small" color="inherit" />
            <Typography variant="body2" color="inherit">+250 788 123 456</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <HomeIcon fontSize="small" color="inherit" />
            <Typography variant="body2" color="inherit">Kigali, Rwanda</Typography>
          </Box>
        </Stack>
      </Box>
    </Stack>
    <Divider sx={{ my: 3 }} />
    <Typography variant="body2" color="inherit" align="center">
      &copy; {new Date().getFullYear()} ITRS. All rights reserved.
    </Typography>
  </Box>
);

export default Footer;
