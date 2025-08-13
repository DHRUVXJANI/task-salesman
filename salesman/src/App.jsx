// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import Header from './components/common/Header';
// import LiveTrackingPage from './components/live-tracking/LiveTrackingPage';
// import HistoricalTrackingPage from './components/historical-tracking/HistoricalTrackingPage';

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       retry: 1,
//     },
//   },
// });

// const theme = createTheme({
//   palette: {
//     mode: 'light',
//     primary: {
//       main: '#1976d2',
//     },
//     secondary: {
//       main: '#dc004e',
//     },
//   },
// });

// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <Router>
//           <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
//             <Header />
//             <div style={{ flex: 1, overflow: 'hidden' }}>
//               <Routes>
//                 <Route path="/" element={<LiveTrackingPage />} />
//                 <Route path="/live" element={<LiveTrackingPage />} />
//                 <Route path="/historical" element={<HistoricalTrackingPage />} />
//               </Routes>
//             </div>
//           </div>
//         </Router>
//       </ThemeProvider>
//     </QueryClientProvider>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/common/Header';
import LiveTrackingPage from './components/live-tracking/LiveTrackingPage';
import HistoricalTrackingPage from './components/historical-tracking/HistoricalTrackingPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: 1 }
  }
});

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#0d6efd' },
    secondary: { main: '#6610f2' },
    background: { default: '#f4f6f8', paper: '#ffffff' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    h6: { fontWeight: 700 },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiButton: {
      styleOverrides: { root: { textTransform: 'none', fontWeight: 500 } }
    },
    MuiPaper: { styleOverrides: { root: { borderRadius: 14 } } }
  }
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<LiveTrackingPage />} />
            <Route path="/live" element={<LiveTrackingPage />} />
            <Route path="/historical" element={<HistoricalTrackingPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
