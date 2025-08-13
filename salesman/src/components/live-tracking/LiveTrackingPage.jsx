// // import React, { useState, useEffect } from 'react';
// // import { Box } from '@mui/material';
// // import Sidebar from '../common/Sidebar';
// // import LiveMap from './LiveMap';
// // import { useSalesmanData } from '../hooks/useSalesmanData';

// // const LiveTrackingPage = () => {
// //   const { data: salesmen, refetch } = useSalesmanData();
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [visibleSalesmen, setVisibleSalesmen] = useState([]);
// //   const [selectedSalesman, setSelectedSalesman] = useState(null);

// //   // Initialize visible salesmen when data loads
// //   useEffect(() => {
// //     if (salesmen && visibleSalesmen.length === 0) {
// //       setVisibleSalesmen(salesmen.map(s => s.id));
// //     }
// //   }, [salesmen, visibleSalesmen.length]);

// //   // Auto-refresh data every 10 seconds
// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       refetch();
// //     }, 10000);

// //     return () => clearInterval(interval);
// //   }, [refetch]);

// //   const handleSalesmanClick = (salesman) => {
// //     setSelectedSalesman(salesman);
// //   };

// //   const handleToggleVisibility = (salesmanId, visible) => {
// //     if (visible) {
// //       setVisibleSalesmen(prev => [...prev, salesmanId]);
// //     } else {
// //       setVisibleSalesmen(prev => prev.filter(id => id !== salesmanId));
// //     }
// //   };

// //   const visibleSalesmenData = salesmen?.filter(s => visibleSalesmen.includes(s.id)) || [];

// //   return (
// //     <Box sx={{ display: 'flex', height: '100%' }}>
// //       <Sidebar
// //         salesmen={salesmen || []}
// //         onSalesmanClick={handleSalesmanClick}
// //         searchTerm={searchTerm}
// //         onSearchChange={setSearchTerm}
// //         visibleSalesmen={visibleSalesmen}
// //         onToggleVisibility={handleToggleVisibility}
// //       />
      
// //       <Box sx={{ flex: 1, position: 'relative' }}>
// //         <LiveMap
// //           salesmen={visibleSalesmenData}
// //           selectedSalesman={selectedSalesman}
// //           onMarkerClick={handleSalesmanClick}
// //         />
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default LiveTrackingPage;
// import React, { useState, useEffect } from 'react';
// import { Box } from '@mui/material';
// import Select from 'react-select';
// import LiveMap from './LiveMap';
// import { useSalesmanData } from '../hooks/useSalesmanData';

// const LiveTrackingPage = () => {
//   const { data: salesmen, refetch } = useSalesmanData();
//   const [selectedSalesmen, setSelectedSalesmen] = useState([]);
//   const [selectedSalesman, setSelectedSalesman] = useState(null);

//   // Prepare react-select options with avatar URLs
//   const options = (salesmen || []).map(s => ({
//     value: s.id,
//     label: s.name,
//     avatarUrl: s.avatarUrl
//   }));

//   // Auto-refresh salesmen every 10 seconds
//   useEffect(() => {
//     const interval = setInterval(() => refetch(), 10000);
//     return () => clearInterval(interval);
//   }, [refetch]);

//   // Pre-select first 0 salesmen when data loads
//   useEffect(() => {
//     if (options.length && selectedSalesmen.length === 0) {
//       setSelectedSalesmen([options[0]]); // pre-select 0 // user will select the number of salesman on his/her own.
//     }
//   }, [options, selectedSalesmen.length]);

//   // Filter actual salesman data for visible markers
//   const visibleSalesmen = salesmen?.filter(s =>
//     selectedSalesmen.some(sel => sel.value === s.id)
//   ) || [];

//   // Avatar-based label for dropdown
//   const formatOptionLabel = ({ label, avatarUrl }) => (
//     <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//       {avatarUrl && (
//         <img
//           src={avatarUrl}
//           alt={label}
//           style={{
//             width: 26,
//             height: 26,
//             borderRadius: '50%',
//             objectFit: 'cover'
//           }}
//         />
//       )}
//       <span>{label}</span>
//     </div>
//   );

//   const handleMarkerClick = salesman => setSelectedSalesman(salesman);

//   return (
//     <Box sx={{ display: 'flex', height: '100%' }}>
//       {/* Left Sidebar Filter Replaced with Multi-Select */}
//       <Box
//         sx={{
//           width: 300,
//           p: 2,
//           borderRight: '1px solid #ddd',
//           backgroundColor: '#fafafa'
//         }}
//       >
//         <h3>Select Salesmen</h3>
//         <Select
//           options={options}
//           value={selectedSalesmen}
//           onChange={setSelectedSalesmen}
//           isMulti
//           closeMenuOnSelect={false}
//           placeholder="Select salesmen..."
//           formatOptionLabel={formatOptionLabel}
//           maxMenuHeight={250}
//         />
//       </Box>

//       {/* Map */}
//       <Box sx={{ flex: 1, position: 'relative' }}>
//         <LiveMap
//           salesmen={visibleSalesmen}
//           selectedSalesman={selectedSalesman}
//           onMarkerClick={handleMarkerClick}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default LiveTrackingPage;
// import React, { useState, useEffect } from 'react';
// import { Box, Paper } from '@mui/material';
// import Select from 'react-select';
// import LiveMap from './LiveMap';
// import { useSalesmanData } from '../hooks/useSalesmanData';

// export default function LiveTrackingPage() {
//   const { data: salesmen, refetch } = useSalesmanData();
//   const [selectedSalesmen, setSelectedSalesmen] = useState([]);
//   const [selectedSalesman, setSelectedSalesman] = useState(null);

//   const options = (salesmen || []).map(s => ({
//     value: s.id, label: s.name, avatarUrl: s.avatarUrl
//   }));

//   useEffect(() => { const i = setInterval(refetch, 10000); return () => clearInterval(i); }, [refetch]);
//   useEffect(() => { if (options.length && !selectedSalesmen.length) setSelectedSalesmen([options[0]]); },
//     [options, selectedSalesmen.length]);

//   const visibleSalesmen = salesmen?.filter(s => selectedSalesmen.some(sel => sel.value === s.id)) || [];

//   const formatOptionLabel = ({ label, avatarUrl }) => (
//     <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//       {avatarUrl && <img src={avatarUrl} alt={label} style={{ width: 26, height: 26, borderRadius: '50%' }} />}
//       <span>{label}</span>
//     </div>
//   );

//   return (
//     <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
//       <Paper sx={{ width: 300, p: 3, borderRadius: 3, boxShadow: 3, bgcolor: 'background.paper' }}>
//         <h3 style={{ marginBottom: '1rem' }}>Select Salesmen</h3>
//         <Select
//           options={options}
//           value={selectedSalesmen}
//           onChange={setSelectedSalesmen}
//           isMulti
//           closeMenuOnSelect={false}
//           placeholder="Select salesmen..."
//           formatOptionLabel={formatOptionLabel}
//           maxMenuHeight={250}
//         />
//       </Paper>
//       <Box sx={{ flex: 1, p: 2 }}>
//         <LiveMap
//           salesmen={visibleSalesmen}
//           selectedSalesman={selectedSalesman}
//           onMarkerClick={setSelectedSalesman}
//         />
//       </Box>
//     </Box>
//   );
// }


import React, { useState, useEffect } from 'react';
import { Box, Paper } from '@mui/material';
import Select from 'react-select';
import LiveMap from './LiveMap';
import { useSalesmanData } from '../hooks/useSalesmanData';

export default function LiveTrackingPage() {
  const { data: salesmen, refetch } = useSalesmanData();
  const [selectedSalesmen, setSelectedSalesmen] = useState([]);
  const [selectedSalesman, setSelectedSalesman] = useState(null);

  const options = (salesmen || []).map((s) => ({
    value: s.id,
    label: s.name,
    avatarUrl: s.avatarUrl
  }));

  useEffect(() => {
    const i = setInterval(refetch, 10000);
    return () => clearInterval(i);
  }, [refetch]);

  useEffect(() => {
    if (options.length && !selectedSalesmen.length) {
      setSelectedSalesmen([options[0]]);
    }
  }, [options, selectedSalesmen.length]);

  const visibleSalesmen =
    salesmen?.filter((s) => selectedSalesmen.some((sel) => sel.value === s.id)) || [];

  const formatOptionLabel = ({ label, avatarUrl }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {avatarUrl && (
        <img
          src={avatarUrl}
          alt={label}
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
      )}
      <span>{label}</span>
    </div>
  );

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
      <Paper
        sx={{
          width: 300,
          p: 3,
          m: 2,
          backdropFilter: 'blur(10px)',
          background: 'rgba(255,255,255,0.8)',
          boxShadow: 4,
        }}
      >
        <h3 style={{ marginBottom: '1rem' }}>Select Salesmen</h3>
        <Select
          options={options}
          value={selectedSalesmen}
          onChange={setSelectedSalesmen}
          isMulti
          closeMenuOnSelect={false}
          placeholder="Search or select..."
          formatOptionLabel={formatOptionLabel}
          maxMenuHeight={250}
        />
      </Paper>
      <Box sx={{ flex: 1, m: 2 }}>
        <LiveMap
          salesmen={visibleSalesmen}
          selectedSalesman={selectedSalesman}
          onMarkerClick={setSelectedSalesman}
        />
      </Box>
    </Box>
  );
}
