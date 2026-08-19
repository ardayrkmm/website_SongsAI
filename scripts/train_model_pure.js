import * as tf from '@tensorflow/tfjs';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

const DATASET_PATH = 'E:/Bisnis/MachineLearning/Model_SongsAI/dataset/songs.csv';
const MAX_SAMPLES = 10000;
const LABELS = ['Energetic', 'Melancholic', 'Chill', 'Euphoric'];
const FEATURE_NAMES = ['danceability', 'energy', 'valence', 'tempo', 'acousticness', 'instrumentalness'];

// Rule-based logic to assign a Vibe label based on real spotify features
function assignLabel(energy, valence) {
  if (energy >= 0.6 && valence >= 0.5) return 'Euphoric';
  if (energy >= 0.6 && valence < 0.5) return 'Energetic';
  if (energy < 0.6 && valence >= 0.5) return 'Chill';
  return 'Melancholic'; // energy < 0.6 && valence < 0.5
}

async function loadAndProcessDataset() {
  return new Promise((resolve, reject) => {
    const xs = [];
    const ys = [];
    
    const fileStream = fs.createReadStream(DATASET_PATH);
    const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });
    
    let isHeader = true;
    let count = 0;
    
    // Headers standard format expected:
    // id,name,album_name,artists,danceability,energy,key,loudness,mode,speechiness,acousticness,instrumentalness,liveness,valence,tempo,...
    
    let colIdx = {};

    rl.on('line', (line) => {
      if (count >= MAX_SAMPLES) {
        rl.close();
        return;
      }
      
      // Simple CSV split (ignores quotes, but good enough for float columns)
      // Since some names have quotes, we will only parse from the end or just split
      // We'll extract features using regex or robust split if possible.
      // Actually, a simple regex split for CSV that ignores commas in quotes:
      const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      
      if (isHeader) {
        values.forEach((col, idx) => {
          colIdx[col.trim()] = idx;
        });
        isHeader = false;
        return;
      }

      try {
        const danceability = parseFloat(values[colIdx['danceability']]);
        const energy = parseFloat(values[colIdx['energy']]);
        const valence = parseFloat(values[colIdx['valence']]);
        const tempo = parseFloat(values[colIdx['tempo']]);
        const acousticness = parseFloat(values[colIdx['acousticness']]);
        const instrumentalness = parseFloat(values[colIdx['instrumentalness']]);

        if ([danceability, energy, valence, tempo, acousticness, instrumentalness].some(isNaN)) {
          return; // Skip invalid rows
        }

        const labelStr = assignLabel(energy, valence);
        const labelIdx = LABELS.indexOf(labelStr);
        
        xs.push([danceability, energy, valence, tempo, acousticness, instrumentalness]);
        
        const y = new Array(LABELS.length).fill(0);
        y[labelIdx] = 1;
        ys.push(y);
        
        count++;
      } catch (err) {
        // Skip malformed row
      }
    });

    rl.on('close', () => {
      console.log(`Loaded ${xs.length} real samples from CSV.`);
      
      // Shuffle dataset
      for (let i = xs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [xs[i], xs[j]] = [xs[j], xs[i]];
        [ys[i], ys[j]] = [ys[j], ys[i]];
      }
      resolve({ xs, ys });
    });
    
    rl.on('error', reject);
  });
}

async function run() {
  console.log('Streaming and processing dataset...');
  const { xs, ys } = await loadAndProcessDataset();

  const numFeatures = FEATURE_NAMES.length;
  const means = new Array(numFeatures).fill(0);
  const stds = new Array(numFeatures).fill(0);

  // Mean
  for (let i = 0; i < xs.length; i++) {
    for (let j = 0; j < numFeatures; j++) {
      means[j] += xs[i][j];
    }
  }
  for (let j = 0; j < numFeatures; j++) { means[j] /= xs.length; }

  // Std
  for (let i = 0; i < xs.length; i++) {
    for (let j = 0; j < numFeatures; j++) {
      stds[j] += Math.pow(xs[i][j] - means[j], 2);
    }
  }
  for (let j = 0; j < numFeatures; j++) { stds[j] = Math.sqrt(stds[j] / xs.length) || 1; }

  // Normalize
  const normalizedXs = xs.map(row => row.map((val, j) => (val - means[j]) / stds[j]));

  console.log('Building model...');
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 32, activation: 'relu', inputShape: [numFeatures] }));
  model.add(tf.layers.dense({ units: 16, activation: 'relu' }));
  model.add(tf.layers.dense({ units: LABELS.length, activation: 'softmax' }));

  model.compile({ optimizer: tf.train.adam(0.01), loss: 'categoricalCrossentropy', metrics: ['accuracy'] });

  const xTensor = tf.tensor2d(normalizedXs);
  const yTensor = tf.tensor2d(ys);

  console.log('Training model on Real Data...');
  await model.fit(xTensor, yTensor, { epochs: 30, batchSize: 64, validationSplit: 0.1 });

  console.log('Extracting topology and weights...');
  const modelDir = path.resolve('./public/model');
  if (!fs.existsSync(modelDir)) fs.mkdirSync(modelDir, { recursive: true });

  // Custom File IO for Node JS
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
    version: '1.1.0' // upgraded version
  };
  fs.writeFileSync(path.join(modelDir, 'preprocessing.json'), JSON.stringify(metadata, null, 2));

  console.log('Model successfully exported to public/model using REAL dataset!');
}

run();
