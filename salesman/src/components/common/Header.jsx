// import React from 'react';
// import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
// import { Link, useLocation } from 'react-router-dom';
// import { LocationOn, History } from '@mui/icons-material';

// const Header = () => {
//   const location = useLocation();

//   return (
//     <AppBar position="static" elevation={2}>
//       <Toolbar>
//         <LocationOn sx={{ mr: 2 }} />
//         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//           Salesman Tracking System
//         </Typography>
//         <Box sx={{ display: 'flex', gap: 1 }}>
//           <Button
//             color="inherit"
//             component={Link}
//             to="/live"
//             variant={location.pathname === '/live' || location.pathname === '/' ? 'outlined' : 'text'}
//             startIcon={<LocationOn />}
//           >
//             Live Tracking
//           </Button>
//           <Button
//             color="inherit"
//             component={Link}
//             to="/historical"
//             variant={location.pathname === '/historical' ? 'outlined' : 'text'}
//             startIcon={<History />}
//           >
//             Historical
//           </Button>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { LocationOn, History } from '@mui/icons-material';

export default function Header() {
  const location = useLocation();
  const active = (path) =>
    location.pathname === path || location.pathname.startsWith(path);

  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'linear-gradient(90deg, #0d6efd, #6610f2)',
        boxShadow: 4,
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
          📍 Salesman Tracking
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            component={Link}
            to="/live"
            color="inherit"
            variant={active('/live') || location.pathname === '/' ? 'contained' : 'outlined'}
            startIcon={<LocationOn />}
            sx={{ bgcolor: active('/live') ? 'white' : 'transparent', color: active('/live') ? 'primary.main' : 'white' }}
          >
            Live Tracking
          </Button>
          <Button
            component={Link}
            to="/historical"
            color="inherit"
            variant={active('/historical') ? 'contained' : 'outlined'}
            startIcon={<History />}
            sx={{ bgcolor: active('/historical') ? 'white' : 'transparent', color: active('/historical') ? 'primary.main' : 'white' }}
          >
            Historical
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
