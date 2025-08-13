import React from 'react';
import {
  Box,
  IconButton,
  Typography,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Tooltip,
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  Replay10,
  SkipPrevious,
  SkipNext,
  Speed,
} from '@mui/icons-material';
import { format } from 'date-fns';
import TimelineSlider from './TimelineSlider';
import SpeedSelector from './SpeedSelector';

const PlaybackControls = ({
  isPlaying,
  currentTime,
  progress,
  playbackSpeed,
  onPlay,
  onPause,
  onSeek,
  onRewind,
  onSpeedChange,
  onJumpToStart,
  onJumpToEnd,
  trackingData,
}) => {
  const totalDuration = trackingData?.locations?.length > 0 
    ? new Date(trackingData.locations[trackingData.locations.length - 1].timestamp).getTime() - 
      new Date(trackingData.locations[0].timestamp).getTime()
    : 0;

  const formatTime = (timestamp) => {
    return format(new Date(timestamp), 'HH:mm:ss');
  };

  const formatDuration = (duration) => {
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((duration % (1000 * 60)) / 1000);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Timeline */}
      <Box sx={{ mb: 2 }}>
        <TimelineSlider
          progress={progress}
          onSeek={onSeek}
          trackingData={trackingData}
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="caption" color="text.secondary">
            {currentTime ? formatTime(currentTime) : '--:--'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Duration: {totalDuration ? formatDuration(totalDuration) : '--:--'}
          </Typography>
        </Box>
      </Box>

      {/* Controls */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
        <Tooltip title="Jump to Start">
          <IconButton onClick={onJumpToStart} disabled={!trackingData}>
            <SkipPrevious />
          </IconButton>
        </Tooltip>

        <Tooltip title="Rewind 30 seconds">
          <IconButton onClick={onRewind} disabled={!trackingData}>
            <Replay10 />
          </IconButton>
        </Tooltip>

        <Tooltip title={isPlaying ? 'Pause' : 'Play'}>
          <IconButton
            onClick={isPlaying ? onPause : onPlay}
            disabled={!trackingData}
            sx={{ 
              bgcolor: 'primary.main', 
              color: 'white',
              '&:hover': { bgcolor: 'primary.dark' },
              mx: 2,
            }}
          >
            {isPlaying ? <Pause /> : <PlayArrow />}
          </IconButton>
        </Tooltip>

        <Tooltip title="Jump to End">
          <IconButton onClick={onJumpToEnd} disabled={!trackingData}>
            <SkipNext />
          </IconButton>
        </Tooltip>

        <SpeedSelector
          speed={playbackSpeed}
          onSpeedChange={onSpeedChange}
          disabled={!trackingData}
        />
      </Box>

      {/* Current Location Info */}
      {trackingData && (
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Progress: {Math.round(progress)}% • Speed: {playbackSpeed}x
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PlaybackControls;
