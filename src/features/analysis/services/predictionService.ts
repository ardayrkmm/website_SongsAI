import * as tf from '@tensorflow/tfjs';
import { preprocessingService } from './preprocessingService';

export interface PredictionResult {
  predictedClass: string;
  confidence: number;
  predictions: Array<{ label: string; probability: number }>;
  modelVersion: string;
}

class PredictionService {
  private model: tf.Sequential | null = null;
  private isInitializing = false;

  async initialize() {
    if (this.model || this.isInitializing) return;
    this.isInitializing = true;

    try {
      // 1. Fetch raw weights exported from Python
      console.log('Loading raw weights from /model/weights.json');
      const response = await fetch('/model/weights.json');
      const layersData = await response.json();

      // 2. Fetch preprocessing metadata for labels
      const meta = await preprocessingService.loadMetadata();

      // 3. Construct the exact same Sequential model architecture
      this.model = tf.sequential();
      
      // Layer 1: Dense (64 units, relu)
      this.model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [11] }));
      
      // Layer 2: Dropout (omitted for tfjs inference since no weights)
      
      // Layer 3: Dense (32 units, relu)
      this.model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
      
      // Layer 4: Dense (output units, softmax)
      this.model.add(tf.layers.dense({ units: meta.labels.length, activation: 'softmax' }));

      // 4. Inject the weights
      const denseLayers = this.model.layers;
      
      denseLayers[0].setWeights([
        tf.tensor(layersData[0].weights),
        tf.tensor(layersData[0].biases)
      ]);
      
      denseLayers[1].setWeights([
        tf.tensor(layersData[1].weights),
        tf.tensor(layersData[1].biases)
      ]);
      
      denseLayers[2].setWeights([
        tf.tensor(layersData[2].weights),
        tf.tensor(layersData[2].biases)
      ]);

      console.log('Model manually reconstructed and initialized successfully');
    } catch (error) {
      console.error('Failed to initialize prediction model:', error);
      throw error;
    } finally {
      this.isInitializing = false;
    }
  }

  async predict(features: Record<string, number>): Promise<PredictionResult> {
    if (!this.model) {
      await this.initialize();
    }
    
    const meta = await preprocessingService.loadMetadata();

    // Run inference within tidy to prevent memory leaks
    const result = tf.tidy(() => {
      // 1. Preprocess synchronously
      const rawArray = meta.featureNames.map(name => features[name] ?? 0);
      const normalizedArray = rawArray.map((val, i) => (val - meta.mean[i]) / meta.std[i]);
      const inputTensor = tf.tensor2d([normalizedArray]);

      // 2. Predict
      const predictionTensor = this.model!.predict(inputTensor) as tf.Tensor;
      
      // 3. Extract data synchronously inside tidy
      const probabilities = predictionTensor.dataSync();
      return Array.from(probabilities);
    });

    // Map probabilities to labels
    const predictions = meta.labels.map((label, index) => ({
      label,
      probability: Math.round(result[index] * 100)
    }));

    // Sort descending
    predictions.sort((a, b) => b.probability - a.probability);

    return {
      predictedClass: predictions[0].label,
      confidence: predictions[0].probability,
      predictions,
      modelVersion: meta.version
    };
  }
}

export const predictionService = new PredictionService();
