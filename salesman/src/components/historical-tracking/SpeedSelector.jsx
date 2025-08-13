import React from 'react';
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Tooltip,
} from '@mui/material';
import { Speed } from '@mui/icons-material';

const SpeedSelector = ({ speed, onSpeedChange, disabled }) => {
  const speedOptions = [0.5, 1, 2, 4, 8];

  const handleSpeedChange = (event, newSpeed) => {
    if (newSpeed !== null) {
      onSpeedChange(newSpeed);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
      <Tooltip title="Playback Speed">
        <Speed color={disabled ? 'disabled' : 'action'} />
      </Tooltip>
      
      <ToggleButtonGroup
        value={speed}
        exclusive
        onChange={handleSpeedChange}
        aria-label="playback speed"
        size="small"
        disabled={disabled}
      >
        {speedOptions.map((speedOption) => (
          <ToggleButton
            key={speedOption}
            value={speedOption}
            aria-label={`${speedOption}x speed`}
            sx={{ 
              px: 1,
              minWidth: 40,
              fontSize: '0.75rem',
            }}
          >
            {speedOption}x
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export default SpeedSelector;
