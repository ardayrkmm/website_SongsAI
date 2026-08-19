import * as tf from '@tensorflow/tfjs';

export type ModelStatus = 'idle' | 'loading' | 'ready' | 'error';

class ModelService {
  private model: tf.LayersModel | null = null;
  private status: ModelStatus = 'idle';
  private loadingPromise: Promise<tf.LayersModel> | null = null;

  async loadModel(): Promise<tf.LayersModel> {
    if (this.model) {
      return this.model;
    }
    
    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    this.status = 'loading';
    this.loadingPromise = (async () => {
      try {
        console.log('Loading TFJS model from /model/model.json');
        const loadedModel = await tf.loadLayersModel('/model/model.json');
        this.model = loadedModel;
        this.status = 'ready';
        return loadedModel;
      } catch (error) {
        this.status = 'error';
        console.error('Failed to load TFJS model', error);
        throw error;
      }
    })();

    return this.loadingPromise;
  }

  getModel(): tf.LayersModel | null {
    return this.model;
  }

  getStatus(): ModelStatus {
    return this.status;
  }
}

// Singleton instance
export const modelService = new ModelService();
