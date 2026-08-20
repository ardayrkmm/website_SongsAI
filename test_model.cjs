const tf = require('@tensorflow/tfjs');
const fs = require('fs');

async function testModel() {
  const songs = JSON.parse(fs.readFileSync('public/songs_db.json', 'utf8'));
  const prep = JSON.parse(fs.readFileSync('public/model/preprocessing.json', 'utf8'));

  // Use file:// URL if in Node, but wait, tf.loadLayersModel needs proper handler in Node.
  // Actually, I can just write the preprocessing logic and see if all features map to the same normalized space.
  
  let labelCounts = { Energetic: 0, Melancholic: 0, Chill: 0, Euphoric: 0 };
  
  // Just print the first 5 songs' normalized features
  for (let i = 0; i < 5; i++) {
    const track = songs[i];
    const rawArray = prep.featureNames.map(name => track.features[name]);
    const normalizedArray = rawArray.map((val, idx) => (val - prep.mean[idx]) / prep.std[idx]);
    console.log(`Song: ${track.name}`);
    console.log(`Features:`, rawArray);
    console.log(`Normalized:`, normalizedArray);
  }
}

testModel();
