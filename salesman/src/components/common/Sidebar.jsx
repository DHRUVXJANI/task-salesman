import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Chip,
  TextField,
  FormControlLabel,
  Switch,
  Divider
} from '@mui/material';
import { Person, Circle } from '@mui/icons-material';
import { format } from 'date-fns';

const Sidebar = ({ 
  salesmen, 
  onSalesmanClick, 
  searchTerm, 
  onSearchChange, 
  visibleSalesmen, 
  onToggleVisibility 
}) => {
  const getStatusColor = (isOnline) => {
    return isOnline ? '#4caf50' : '#f44336';
  };

  const getStatusText = (isOnline) => {
    return isOnline ? 'Online' : 'Offline';
  };

  const filteredSalesmen = salesmen.filter(salesman =>
    salesman.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 320,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 320,
          boxSizing: 'border-box',
          top: 64,
          height: 'calc(100vh - 64px)',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Salesmen ({salesmen.length})
        </Typography>
        
        <TextField
          fullWidth
          size="small"
          placeholder="Search salesmen..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Divider sx={{ mb: 2 }} />
      </Box>

      <List sx={{ flex: 1, overflow: 'auto' }}>
        {filteredSalesmen.map((salesman) => (
          <ListItem
            key={salesman.id}
            button
            onClick={() => onSalesmanClick(salesman)}
            sx={{
              borderLeft: `4px solid ${getStatusColor(salesman.isOnline)}`,
              mb: 1,
              mx: 1,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="subtitle2" fontWeight="bold">
                  {salesman.name}
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      size="small"
                      checked={visibleSalesmen.includes(salesman.id)}
                      onChange={(e) => onToggleVisibility(salesman.id, e.target.checked)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  }
                  label=""
                />
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Circle sx={{ fontSize: 8, color: getStatusColor(salesman.isOnline) }} />
                <Chip
                  label={getStatusText(salesman.isOnline)}
                  size="small"
                  color={salesman.isOnline ? 'success' : 'error'}
                  variant="outlined"
                />
              </Box>
              
              <Typography variant="caption" color="text.secondary">
                Last update: {format(new Date(salesman.lastUpdate), 'HH:mm:ss')}
              </Typography>
              
              {salesman.currentLocation?.address && (
                <Typography variant="caption" color="text.secondary" display="block">
                  📍 {salesman.currentLocation.address}
                </Typography>
              )}
            </Box>
          </ListItem>
        ))}
      </List>

      <div className="sidebar card">
        <nav>
          <a href="/live" style={{ display: 'block', marginBottom: '16px', fontWeight: 500 }}>Live Tracking</a>
          <a href="/historical" style={{ display: 'block', fontWeight: 500 }}>Historical Tracking</a>
        </nav>
      </div>
    </Drawer>
  );
};

export default Sidebar;
