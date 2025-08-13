import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Chip,
  Box,
} from '@mui/material';
import { Person, Circle } from '@mui/icons-material';
import { format } from 'date-fns';

const SalesmanList = ({ salesmen, onSalesmanSelect, selectedSalesmanId }) => {
  const getStatusColor = (isOnline) => {
    return isOnline ? 'success' : 'error';
  };

  const getAvatarColor = (isOnline) => {
    return isOnline ? '#4caf50' : '#f44336';
  };

  return (
    <List>
      {salesmen.map((salesman) => (
        <ListItem
          key={salesman.id}
          button
          selected={selectedSalesmanId === salesman.id}
          onClick={() => onSalesmanSelect(salesman)}
          sx={{
            borderRadius: 1,
            mb: 1,
            '&.Mui-selected': {
              backgroundColor: 'primary.light',
              color: 'primary.contrastText',
            },
          }}
        >
          <ListItemIcon>
            <Avatar sx={{ bgcolor: getAvatarColor(salesman.isOnline), width: 32, height: 32 }}>
              <Person fontSize="small" />
            </Avatar>
          </ListItemIcon>
          
          <ListItemText
            primary={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="subtitle2">
                  {salesman.name}
                </Typography>
                <Circle sx={{ fontSize: 8, color: getAvatarColor(salesman.isOnline) }} />
              </Box>
            }
            secondary={
              <Box>
                <Chip
                  label={salesman.isOnline ? 'Online' : 'Offline'}
                  size="small"
                  color={getStatusColor(salesman.isOnline)}
                  sx={{ mb: 0.5 }}
                />
                <Typography variant="caption" display="block" color="text.secondary">
                  {format(new Date(salesman.lastUpdate), 'HH:mm:ss')}
                </Typography>
              </Box>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default SalesmanList;
