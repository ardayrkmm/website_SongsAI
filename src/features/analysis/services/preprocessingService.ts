import * as tf from '@tensorflow/tfjs';

export interface PreprocessingMetadata {
  featureNames: string[];
  mean: number[];
  std: number[];
  labels: string[];
  version: string;
}

class PreprocessingService {
  private metadata: PreprocessingMetadata | null = null;
  private loadPromise: Promise<PreprocessingMetadata> | null = null;

  async loadMetadata(): Promise<PreprocessingMetadata> {
    if (this.metadata) return this.metadata;
    if (this.loadPromise) return this.loadPromise;

    this.loadPromise = (async () => {
      const response = await fetch('/model/preprocessing.json');
      if (!response.ok) {
        throw new Error('Failed to load preprocessing metadata');
      }
      this.metadata = await response.json();
      return this.metadata!;
    })();
    return this.loadPromise;
  }

  getMetadata(): PreprocessingMetadata | null {
    return this.metadata;
  }

  async preprocess(features: Record<string, number>): Promise<tf.Tensor2D> {
    const meta = await this.loadMetadata();
    
    // Order features strictly according to metadata
    const rawArray = meta.featureNames.map(name => {
      const val = features[name];
      if (val === undefined) {
        console.warn(`Feature ${name} is missing. Defaulting to 0.`);
        return 0;
      }
      return val;
    });

    // Standard Scaling: (X - mean) / std
    const normalizedArray = rawArray.map((val, i) => {
      const mean = meta.mean[i];
      const std = meta.std[i];
      return (val - mean) / std;
    });

    // Return 2D tensor [batch_size, num_features]
    return tf.tensor2d([normalizedArray]);
  }
}

export const preprocessingService = new PreprocessingService();
