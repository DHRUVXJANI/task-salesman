import React, { useState } from 'react';
import {
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Typography,
  Grid,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Search, Download } from '@mui/icons-material';
import HistoricalMap from './HistoricalMap';
import PlaybackControls from './PlaybackControls';
import { useSalesmanData } from "../hooks/useSalesmanData";
import { usePlayback } from "../hooks/usePlayback";
import { generateHistoricalData } from '../utils/mockData';
import { subDays, startOfDay, endOfDay } from 'date-fns';

const HistoricalTrackingPage = () => {
  const { data: salesmen } = useSalesmanData();
  const [selectedSalesmanId, setSelectedSalesmanId] = useState('');
  const [startDate, setStartDate] = useState(startOfDay(subDays(new Date(), 1)));
  const [endDate, setEndDate] = useState(endOfDay(new Date()));
  const [trackingData, setTrackingData] = useState(null);
  
  const {
    currentPosition,
    isPlaying,
    currentTime,
    progress,
    playbackSpeed,
    play,
    pause,
    seek,
    rewind,
    setSpeed,
    jumpToStart,
    jumpToEnd,
  } = usePlayback(trackingData);

  const handleSearch = () => {
    if (!selectedSalesmanId || !startDate || !endDate) return;
    
    const data = generateHistoricalData(selectedSalesmanId, startDate, endDate);
    setTrackingData(data);
  };

  const handleExport = () => {
    if (!trackingData) return;
    
    const dataStr = JSON.stringify(trackingData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `tracking_${selectedSalesmanId}_${startDate.getTime()}_${endDate.getTime()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const selectedSalesman = salesmen?.find(s => s.id === selectedSalesmanId);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Controls Panel */}
        <Paper sx={{ p: 2, m: 2, mb: 1 }} elevation={2}>
          <Typography variant="h6" gutterBottom>
            Historical Tracking
          </Typography>
          
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Select Salesman</InputLabel>
                <Select
                  value={selectedSalesmanId}
                  label="Select Salesman"
                  onChange={(e) => setSelectedSalesmanId(e.target.value)}
                >
                  {salesmen?.map((salesman) => (
                    <MenuItem key={salesman.id} value={salesman.id}>
                      {salesman.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <DateTimePicker
                label="Start Date & Time"
                value={startDate}
                onChange={setStartDate}
                renderInput={(params) => <TextField {...params} size="small" fullWidth />}
              />
            </Grid>
            
            <Grid item xs={12} md={3}>
              <DateTimePicker
                label="End Date & Time"
                value={endDate}
                onChange={setEndDate}
                renderInput={(params) => <TextField {...params} size="small" fullWidth />}
              />
            </Grid>
            
            <Grid item xs={12} md={2}>
              <Button
                variant="contained"
                startIcon={<Search />}
                onClick={handleSearch}
                disabled={!selectedSalesmanId || !startDate || !endDate}
                fullWidth
              >
                Search
              </Button>
            </Grid>
            
            <Grid item xs={12} md={1}>
              <Button
                variant="outlined"
                startIcon={<Download />}
                onClick={handleExport}
                disabled={!trackingData}
                fullWidth
              >
                Export
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Map Container */}
        <Box sx={{ flex: 1, mx: 2, position: 'relative' }}>
          <HistoricalMap
            trackingData={trackingData}
            currentPosition={currentPosition}
            salesman={selectedSalesman}
          />
        </Box>

        {/* Playback Controls */}
        {trackingData && (
          <Paper sx={{ m: 2, mt: 1 }} elevation={2}>
            <PlaybackControls
              isPlaying={isPlaying}
              currentTime={currentTime}
              progress={progress}
              playbackSpeed={playbackSpeed}
              onPlay={play}
              onPause={pause}
              onSeek={seek}
              onRewind={rewind}
              onSpeedChange={setSpeed}
              onJumpToStart={jumpToStart}
              onJumpToEnd={jumpToEnd}
              trackingData={trackingData}
            />
          </Paper>
        )}
      </Box>
    </LocalizationProvider>
  );
};

export default HistoricalTrackingPage;
