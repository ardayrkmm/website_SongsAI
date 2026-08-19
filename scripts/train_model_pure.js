import * as tf from '@tensorflow/tfjs';
import * as fs from 'fs';
import * as path from 'path';

const LABELS = ['Energetic', 'Melancholic', 'Chill', 'Euphoric'];
const NUM_SAMPLES = 2000;
const FEATURE_NAMES = ['danceability', 'energy', 'valence', 'tempo', 'acousticness', 'instrumentalness'];

function generateDataset() {
  const xs = [];
  const ys = [];
  for (let i = 0; i < NUM_SAMPLES; i++) {
    const labelIdx = i % LABELS.length;
    const label = LABELS[labelIdx];
    let d, e, v, t, a, i_f;
    switch (label) {
      case 'Energetic':
        d = 0.6 + Math.random() * 0.4;
        e = 0.7 + Math.random() * 0.3;
        v = 0.4 + Math.random() * 0.4;
        t = 120 + Math.random() * 60;
        a = Math.random() * 0.2;
        i_f = Math.random() * 0.2;
        break;
      case 'Melancholic':
        d = 0.2 + Math.random() * 0.4;
        e = 0.1 + Math.random() * 0.4;
        v = 0.1 + Math.random() * 0.3;
        t = 60 + Math.random() * 50;
        a = 0.5 + Math.random() * 0.5;
        i_f = Math.random() * 0.5;
        break;
      case 'Chill':
        d = 0.4 + Math.random() * 0.4;
        e = 0.2 + Math.random() * 0.4;
        v = 0.4 + Math.random() * 0.4;
        t = 70 + Math.random() * 40;
        a = 0.4 + Math.random() * 0.5;
        i_f = 0.2 + Math.random() * 0.6;
        break;
      case 'Euphoric':
        d = 0.5 + Math.random() * 0.4;
        e = 0.6 + Math.random() * 0.4;
        v = 0.7 + Math.random() * 0.3;
        t = 110 + Math.random() * 40;
        a = Math.random() * 0.3;
        i_f = Math.random() * 0.4;
        break;
    }
    xs.push([d, e, v, t, a, i_f]);
    const y = new Array(LABELS.length).fill(0);
    y[labelIdx] = 1;
    ys.push(y);
  }
  for (let i = xs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [xs[i], xs[j]] = [xs[j], xs[i]];
    [ys[i], ys[j]] = [ys[j], ys[i]];
  }
  return { xs, ys };
}

async function run() {
  console.log('Generating synthetic dataset...');
  const { xs, ys } = generateDataset();
  const numFeatures = FEATURE_NAMES.length;
  const means = new Array(numFeatures).fill(0);
  const stds = new Array(numFeatures).fill(0);

  for (let i = 0; i < xs.length; i++) {
    for (let j = 0; j < numFeatures; j++) {
      means[j] += xs[i][j];
    }
  }
  for (let j = 0; j < numFeatures; j++) { means[j] /= xs.length; }

  for (let i = 0; i < xs.length; i++) {
    for (let j = 0; j < numFeatures; j++) {
      stds[j] += Math.pow(xs[i][j] - means[j], 2);
    }
  }
  for (let j = 0; j < numFeatures; j++) { stds[j] = Math.sqrt(stds[j] / xs.length) || 1; }

  const normalizedXs = xs.map(row => row.map((val, j) => (val - means[j]) / stds[j]));

  console.log('Building model...');
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 16, activation: 'relu', inputShape: [numFeatures] }));
  model.add(tf.layers.dense({ units: 16, activation: 'relu' }));
  model.add(tf.layers.dense({ units: LABELS.length, activation: 'softmax' }));

  model.compile({ optimizer: tf.train.adam(0.01), loss: 'categoricalCrossentropy', metrics: ['accuracy'] });

  const xTensor = tf.tensor2d(normalizedXs);
  const yTensor = tf.tensor2d(ys);

  console.log('Training model...');
  await model.fit(xTensor, yTensor, { epochs: 30, batchSize: 32 });

  console.log('Training complete. Extracting topology and weights manually...');

  // Save via node filesystem
  const modelDir = path.resolve('./public/model');
  if (!fs.existsSync(modelDir)) fs.mkdirSync(modelDir, { recursive: true });

  // Use a custom IOHandler to write to files (Pure JS approach for Node)
  function customFileIO(dirPath) {
    return {
      save: async (modelArtifacts) => {
        const weightsFile = 'group1-shard1of1.bin';
        const modelJson = {
          format: 'layers-model',
          generatedBy: 'TensorFlow.js tfjs-layers',
          convertedBy: null,
          modelTopology: modelArtifacts.modelTopology,
          formatStrict: false,
          weightsManifest: [{
            paths: [weightsFile],
            weights: modelArtifacts.weightSpecs
          }]
        };

        fs.writeFileSync(path.join(dirPath, 'model.json'), JSON.stringify(modelJson, null, 2));
        fs.writeFileSync(path.join(dirPath, weightsFile), Buffer.from(modelArtifacts.weightData));
        return { modelArtifactsInfo: { dateSaved: new Date(), modelTopologyType: 'JSON' } };
      }
    };
  }

  await model.save(customFileIO(modelDir));

  const metadata = {
    featureNames: FEATURE_NAMES,
    mean: means,
    std: stds,
    labels: LABELS,
    version: '1.0.0'
  };
  fs.writeFileSync(path.join(modelDir, 'preprocessing.json'), JSON.stringify(metadata, null, 2));

  console.log('Model successfully exported to public/model!');
}

run();
