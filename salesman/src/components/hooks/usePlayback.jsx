import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

export const usePlayback = (trackingData) => {
  const locations = trackingData?.locations || [];
  const total = locations.length;

  // Precompute start/end times
  const startTime = useMemo(() => (total ? new Date(locations[0].timestamp).getTime() : null), [total, locations]);
  const endTime = useMemo(
    () => (total ? new Date(locations[total - 1].timestamp).getTime() : null),
    [total, locations]
  );
  const durationMs = useMemo(() => (startTime && endTime ? endTime - startTime : 0), [startTime, endTime]);

  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentTimeMs, setCurrentTimeMs] = useState(startTime || null);

  const rafRef = useRef(null);
  const lastTickRef = useRef(null);

  // Helpers
  const clampTime = useCallback(
    (t) => {
      if (!durationMs || startTime == null || endTime == null) return null;
      return Math.min(endTime, Math.max(startTime, t));
    },
    [durationMs, startTime, endTime]
  );

  const progress = useMemo(() => {
    if (!durationMs || startTime == null || currentTimeMs == null) return 0;
    return ((currentTimeMs - startTime) / durationMs) * 100;
  }, [currentTimeMs, startTime, durationMs]);

  const currentPosition = useMemo(() => {
    if (!total || currentTimeMs == null) return null;

    // Find segment around currentTimeMs
    let i = 0;
    while (i < total - 1 && new Date(locations[i + 1].timestamp).getTime() <= currentTimeMs) {
      i++;
    }
    const A = locations[i];
    const B = locations[Math.min(i + 1, total - 1)];

    const t0 = new Date(A.timestamp).getTime();
    const t1 = new Date(B.timestamp).getTime();

    if (t1 === t0 || currentTimeMs <= t0) return { ...A };
    if (currentTimeMs >= t1) return { ...B };

    const alpha = (currentTimeMs - t0) / (t1 - t0);
    return {
      lat: A.lat + (B.lat - A.lat) * alpha,
      lng: A.lng + (B.lng - A.lng) * alpha,
      timestamp: new Date(currentTimeMs).toISOString(),
      address: alpha < 0.5 ? A.address : B.address,
      speed: B.speed, // approximate
    };
  }, [currentTimeMs, locations, total]);

  const animate = useCallback(() => {
    if (!isPlaying || !durationMs || startTime == null || endTime == null) return;

    const now = performance.now();
    if (lastTickRef.current == null) lastTickRef.current = now;
    const dt = now - lastTickRef.current;
    lastTickRef.current = now;

    const advance = dt * playbackSpeed; // 1ms wall time -> 1ms playback time at 1x
    setCurrentTimeMs((prev) => {
      const next = clampTime((prev ?? startTime) + advance);
      if (next >= endTime) {
        // stop at end
        setIsPlaying(false);
        return endTime;
      }
      return next;
    });

    rafRef.current = requestAnimationFrame(animate);
  }, [isPlaying, playbackSpeed, clampTime, endTime, durationMs, startTime]);

  // Start/stop RAF
  useEffect(() => {
    if (isPlaying) {
      lastTickRef.current = null;
      rafRef.current = requestAnimationFrame(animate);
    } else if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, animate]);

  // Reset when data changes
  useEffect(() => {
    if (!total) {
      setIsPlaying(false);
      setCurrentTimeMs(null);
      return;
    }
    setIsPlaying(false);
    setCurrentTimeMs(startTime);
  }, [total, startTime]);

  // Controls
  const play = useCallback(() => {
    if (!total) return;
    // If at end, restart
    setCurrentTimeMs((prev) => {
      if (prev != null && endTime != null && prev >= endTime) return startTime;
      return prev ?? startTime;
    });
    setIsPlaying(true);
  }, [total, startTime, endTime]);

  const pause = useCallback(() => setIsPlaying(false), []);

  const seek = useCallback(
    (progressPercent) => {
      if (!durationMs || startTime == null) return;
      const t = startTime + (progressPercent / 100) * durationMs;
      setCurrentTimeMs(clampTime(t));
    },
    [durationMs, startTime, clampTime]
  );

  // Rewind 30 seconds wall-clock in the timeline (30000ms)
  const rewind = useCallback(() => {
    if (currentTimeMs == null) return;
    setCurrentTimeMs((prev) => clampTime((prev ?? startTime) - 30000));
  }, [currentTimeMs, clampTime, startTime]);

  const setSpeed = useCallback((speed) => setPlaybackSpeed(speed), []);

  const jumpToStart = useCallback(() => {
    if (!total) return;
    setIsPlaying(false);
    setCurrentTimeMs(startTime);
  }, [total, startTime]);

  const jumpToEnd = useCallback(() => {
    if (!total) return;
    setIsPlaying(false);
    setCurrentTimeMs(endTime);
  }, [total, endTime]);

  return {
    currentPosition, // interpolated position for map/avatar
    currentTime: currentTimeMs ?? null,
    progress,
    isPlaying,
    playbackSpeed,
    play,
    pause,
    seek,
    rewind,
    setSpeed,
    jumpToStart,
    jumpToEnd,
  };
};
