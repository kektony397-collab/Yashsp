
import { useState, useEffect } from 'react';
import { useBikeActions } from '../store';

export const useNetworkStatus = () => {
  const { setBikeState } = useBikeActions();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setBikeState({ isNetworkAvailable: true });
    };
    const handleOffline = () => {
      setIsOnline(false);
      setBikeState({ isNetworkAvailable: false });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setBikeState]);

  return isOnline;
};
