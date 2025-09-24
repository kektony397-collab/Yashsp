
import { useState, useEffect, useRef } from 'react';
import KalmanFilter from 'kalman-filter';
import { haversineDistance } from '../lib/haversine';
import { useBikeActions } from '../store';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  speed: number | null; // in m/s
  error: GeolocationPositionError | null;
}

const kf = new KalmanFilter({
  observation: 2,
  dynamic: 'constant-velocity'
});

export const useGeolocation = () => {
  const { setBikeState, addTripKm } = useBikeActions();
  const [position, setPosition] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    speed: null,
    error: null,
  });
  const lastPositionRef = useRef<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setBikeState({ isGpsAvailable: false });
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, speed } = pos.coords;

        // Apply Kalman Filter for smoothing
        const prediction = kf.predict();
        const corrected = kf.correct([latitude, longitude]);
        const smoothedLatitude = corrected.state[0];
        const smoothedLongitude = corrected.state[1];

        setPosition({
          latitude: smoothedLatitude,
          longitude, // keep original longitude for some uses if needed
          speed,
          error: null,
        });
        
        const speedKph = speed ? speed * 3.6 : 0;
        setBikeState({ currentSpeedKph: speedKph, isGpsAvailable: true });

        const currentSmoothedPosition = { latitude: smoothedLatitude, longitude: smoothedLongitude };

        if (lastPositionRef.current && speedKph > 2) { // Only calculate distance if moving
          const distanceIncrement = haversineDistance(lastPositionRef.current, currentSmoothedPosition);
          if (distanceIncrement > 0.001) { // Threshold to avoid jitter when stationary
            addTripKm(distanceIncrement);
          }
        }
        
        lastPositionRef.current = currentSmoothedPosition;
      },
      (err) => {
        setPosition((prev) => ({ ...prev, error: err }));
        setBikeState({ isGpsAvailable: false });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return position;
};
