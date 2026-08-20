const tf = require('@tensorflow/tfjs');
const fs = require('fs');
const path = require('path');

async function runPredictions() {
  const songs = JSON.parse(fs.readFileSync('public/songs_db.json', 'utf8'));
  const prep = JSON.parse(fs.readFileSync('public/model/preprocessing.json', 'utf8'));
  
  // Create a quick model with tfjs to see if we can load it.
  // We can just load the file:// url in node >= 18 with tfjs-node, but we only have @tensorflow/tfjs.
  // Let's check tf.loadLayersModel('file://...')
  try {
    const modelPath = 'file://' + path.resolve('public/model/model.json');
    const model = await tf.loadLayersModel(modelPath);
    
    let counts = { Energetic: 0, Melancholic: 0, Chill: 0, Euphoric: 0 };
    
    for(let i=0; i<30; i++) {
      const track = songs[i];
      const rawArray = prep.featureNames.map(name => track.features[name]);
      const normalizedArray = rawArray.map((val, idx) => (val - prep.mean[idx]) / prep.std[idx]);
      
      const inputTensor = tf.tensor2d([normalizedArray]);
      const predTensor = model.predict(inputTensor);
      const probabilities = predTensor.arraySync()[0];
      
      const maxIdx = probabilities.indexOf(Math.max(...probabilities));
      const label = prep.labels[maxIdx];
      
      counts[label]++;
      // console.log(`${track.name}: ${label} (${Math.max(...probabilities).toFixed(2)})`);
    }
    
    console.log("Prediction Counts for first 30 songs:", counts);
    
  } catch (err) {
    console.error("TF error:", err.message);
  }
}

runPredictions();
