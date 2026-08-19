import * as tf from '@tensorflow/tfjs-node';
import * as fs from 'fs';
import * as path from 'path';

// Define the labels
const LABELS = ['Energetic', 'Melancholic', 'Chill', 'Euphoric'];

// Number of samples to generate
const NUM_SAMPLES = 2000;

// Generate synthetic dataset
function generateDataset() {
  const xs = [];
  const ys = [];

  for (let i = 0; i < NUM_SAMPLES; i++) {
    const labelIdx = i % LABELS.length;
    const label = LABELS[labelIdx];

    let danceability, energy, valence, tempo, acousticness, instrumentalness;

    // Generate features based on class
    switch (label) {
      case 'Energetic':
        danceability = 0.6 + Math.random() * 0.4; // 0.6 to 1.0
        energy = 0.7 + Math.random() * 0.3;       // 0.7 to 1.0
        valence = 0.4 + Math.random() * 0.4;      // 0.4 to 0.8
        tempo = 120 + Math.random() * 60;         // 120 to 180
        acousticness = Math.random() * 0.2;       // 0.0 to 0.2
        instrumentalness = Math.random() * 0.2;
        break;
      case 'Melancholic':
        danceability = 0.2 + Math.random() * 0.4; // 0.2 to 0.6
        energy = 0.1 + Math.random() * 0.4;       // 0.1 to 0.5
        valence = 0.1 + Math.random() * 0.3;      // 0.1 to 0.4
        tempo = 60 + Math.random() * 50;          // 60 to 110
        acousticness = 0.5 + Math.random() * 0.5; // 0.5 to 1.0
        instrumentalness = Math.random() * 0.5;
        break;
      case 'Chill':
        danceability = 0.4 + Math.random() * 0.4; // 0.4 to 0.8
        energy = 0.2 + Math.random() * 0.4;       // 0.2 to 0.6
        valence = 0.4 + Math.random() * 0.4;      // 0.4 to 0.8
        tempo = 70 + Math.random() * 40;          // 70 to 110
        acousticness = 0.4 + Math.random() * 0.5; // 0.4 to 0.9
        instrumentalness = 0.2 + Math.random() * 0.6; // 0.2 to 0.8
        break;
      case 'Euphoric':
        danceability = 0.5 + Math.random() * 0.4; // 0.5 to 0.9
        energy = 0.6 + Math.random() * 0.4;       // 0.6 to 1.0
        valence = 0.7 + Math.random() * 0.3;      // 0.7 to 1.0
        tempo = 110 + Math.random() * 40;         // 110 to 150
        acousticness = Math.random() * 0.3;       // 0.0 to 0.3
        instrumentalness = Math.random() * 0.4;
        break;
    }

    xs.push([danceability, energy, valence, tempo, acousticness, instrumentalness]);
    
    // One-hot encode labels
    const y = new Array(LABELS.length).fill(0);
    y[labelIdx] = 1;
    ys.push(y);
  }

  // Shuffle dataset
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

  // Feature names
  const featureNames = ['danceability', 'energy', 'valence', 'tempo', 'acousticness', 'instrumentalness'];

  // Calculate Mean and STD for Standard Scaling
  const numFeatures = featureNames.length;
  const means = new Array(numFeatures).fill(0);
  const stds = new Array(numFeatures).fill(0);

  // Mean
  for (let i = 0; i < xs.length; i++) {
    for (let j = 0; j < numFeatures; j++) {
      means[j] += xs[i][j];
    }
  }
  for (let j = 0; j < numFeatures; j++) {
    means[j] /= xs.length;
  }

  // Std
  for (let i = 0; i < xs.length; i++) {
    for (let j = 0; j < numFeatures; j++) {
      stds[j] += Math.pow(xs[i][j] - means[j], 2);
    }
  }
  for (let j = 0; j < numFeatures; j++) {
    stds[j] = Math.sqrt(stds[j] / xs.length);
  }

  // Standardize xs
  const normalizedXs = xs.map(row => 
    row.map((val, j) => (val - means[j]) / stds[j])
  );

  console.log('Building model...');
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 16, activation: 'relu', inputShape: [numFeatures] }));
  model.add(tf.layers.dropout({ rate: 0.2 }));
  model.add(tf.layers.dense({ units: 16, activation: 'relu' }));
  model.add(tf.layers.dense({ units: LABELS.length, activation: 'softmax' }));

  model.compile({
    optimizer: tf.train.adam(0.01),
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy']
  });

  const xTensor = tf.tensor2d(normalizedXs);
  const yTensor = tf.tensor2d(ys);

  console.log('Training model...');
  await model.fit(xTensor, yTensor, {
    epochs: 40,
    batchSize: 32,
    validationSplit: 0.2,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        if (epoch % 10 === 0) {
          console.log(`Epoch ${epoch}: loss = ${logs.loss.toFixed(4)}, val_acc = ${logs.val_acc.toFixed(4)}`);
        }
      }
    }
  });

  console.log('Saving model...');
  const modelDir = path.resolve('public/model');
  await model.save(`file://${modelDir}`);

  // Save metadata
  const metadata = {
    featureNames,
    mean: means,
    std: stds,
    labels: LABELS,
    version: '1.0.0',
    description: 'AI Music Classification Model based on Spotify Audio Features'
  };

  fs.writeFileSync(path.join(modelDir, 'preprocessing.json'), JSON.stringify(metadata, null, 2));

  console.log('Training complete! Model and metadata saved to public/model.');
}

run();
