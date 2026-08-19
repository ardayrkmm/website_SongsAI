import { useState, useEffect } from 'react';
import { modelService } from '../services/modelService';
import type { ModelStatus } from '../services/modelService';
import { preprocessingService } from '../services/preprocessingService';

export function useMusicModel() {
  const [status, setStatus] = useState<ModelStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initModel = async () => {
      try {
        setStatus('loading');
        // Pre-load model and metadata
        await Promise.all([
          modelService.loadModel(),
          preprocessingService.loadMetadata()
        ]);
        
        if (isMounted) {
          setStatus('ready');
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setStatus('error');
          setError(err instanceof Error ? err.message : 'Failed to initialize AI model');
        }
      }
    };

    initModel();

    return () => {
      isMounted = false;
    };
  }, []);

  return { status, error };
}
