import * as tf from '@tensorflow/tfjs';
import { modelService } from './modelService';
import { preprocessingService } from './preprocessingService';

export interface PredictionResult {
  predictedClass: string;
  confidence: number;
  predictions: Array<{ label: string; probability: number }>;
  modelVersion: string;
}

class PredictionService {
  async predict(features: Record<string, number>): Promise<PredictionResult> {
    const model = await modelService.loadModel();
    const meta = await preprocessingService.loadMetadata();

    // Run inference within tidy to prevent memory leaks
    const result = tf.tidy(() => {
      // 1. Preprocess synchronously (we already ensured meta is loaded)
      const rawArray = meta.featureNames.map(name => features[name] ?? 0);
      const normalizedArray = rawArray.map((val, i) => (val - meta.mean[i]) / meta.std[i]);
      const inputTensor = tf.tensor2d([normalizedArray]);

      // 2. Predict
      const predictionTensor = model.predict(inputTensor) as tf.Tensor;
      
      // 3. Extract data synchronously inside tidy to allow tensor disposal
      const probabilities = predictionTensor.dataSync();
      return Array.from(probabilities);
    });

    // Map probabilities to labels
    const predictions = meta.labels.map((label, index) => ({
      label,
      probability: Math.round(result[index] * 100) // Percentage
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
