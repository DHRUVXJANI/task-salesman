import React from 'react';
import { Slider, Box } from '@mui/material';
import { format } from 'date-fns';

const TimelineSlider = ({ progress, onSeek, trackingData }) => {
  const handleChange = (event, newValue) => {
    onSeek(newValue);
  };

  // Generate slider marks at unique, evenly spaced indexes (no repeats)
  const getTimeMarks = () => {
    if (!trackingData?.locations || trackingData.locations.length === 0) return [];
    const locations = trackingData.locations;
    const total = locations.length;
    // Even intervals: always cover start/end, and try to get at least 5 marks
    const rawIndexes = [
      0,
      Math.floor((total - 1) * 0.25),
      Math.floor((total - 1) * 0.5),
      Math.floor((total - 1) * 0.75),
      total - 1
    ];
    // Filter unique label values
    const seen = new Set();
    const marks = [];
    rawIndexes.forEach(idx => {
      if (idx >= 0 && idx < total) {
        const label = format(new Date(locations[idx].timestamp), 'HH:mm');
        if (!seen.has(label)) {
          seen.add(label);
          marks.push({
            value: (idx / (total - 1)) * 100, // percent
            label
          });
        }
      }
    });
    return marks;
  };

  return (
    <Box sx={{ px: 2 }}>
      <Slider
        value={progress}
        onChange={handleChange}
        aria-labelledby="timeline-slider"
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${Math.round(value)}%`}
        marks={getTimeMarks()}
        min={0}
        max={100}
        disabled={!trackingData}
        sx={{
          '& .MuiSlider-thumb': {
            width: 20,
            height: 20,
            '&:hover': {
              boxShadow: '0px 0px 0px 8px rgba(33, 150, 243, 0.16)',
            },
          },
          '& .MuiSlider-track': { height: 4 },
          '& .MuiSlider-rail': { height: 4, opacity: 0.3 },
          '& .MuiSlider-mark': {
            backgroundColor: 'currentColor',
            height: 8,
            width: 2,
            '&.MuiSlider-markActive': { opacity: 1, backgroundColor: 'currentColor' },
          },
          '& .MuiSlider-markLabel': {
            fontSize: '0.75rem',
            color: 'text.secondary',
          },
        }}
      />
    </Box>
  );
};

export default TimelineSlider;
