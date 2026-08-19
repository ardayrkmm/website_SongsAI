import os
import json
import numpy as np
import tensorflow as tf
import tensorflowjs as tfjs

# Create required directories
os.makedirs("public/model", exist_ok=True)

# 1. Configuration
LABELS = ["Energetic", "Melancholic", "Chill", "Euphoric"]
NUM_SAMPLES = 2000
FEATURE_NAMES = ["danceability", "energy", "valence", "tempo", "acousticness", "instrumentalness"]

# 2. Generate Synthetic Dataset
def generate_dataset():
    xs = []
    ys = []
    
    for i in range(NUM_SAMPLES):
        label_idx = i % len(LABELS)
        label = LABELS[label_idx]
        
        if label == "Energetic":
            d = np.random.uniform(0.6, 1.0)
            e = np.random.uniform(0.7, 1.0)
            v = np.random.uniform(0.4, 0.8)
            t = np.random.uniform(120, 180)
            a = np.random.uniform(0.0, 0.2)
            i_f = np.random.uniform(0.0, 0.2)
        elif label == "Melancholic":
            d = np.random.uniform(0.2, 0.6)
            e = np.random.uniform(0.1, 0.5)
            v = np.random.uniform(0.1, 0.4)
            t = np.random.uniform(60, 110)
            a = np.random.uniform(0.5, 1.0)
            i_f = np.random.uniform(0.0, 0.5)
        elif label == "Chill":
            d = np.random.uniform(0.4, 0.8)
            e = np.random.uniform(0.2, 0.6)
            v = np.random.uniform(0.4, 0.8)
            t = np.random.uniform(70, 110)
            a = np.random.uniform(0.4, 0.9)
            i_f = np.random.uniform(0.2, 0.8)
        else: # Euphoric
            d = np.random.uniform(0.5, 0.9)
            e = np.random.uniform(0.6, 1.0)
            v = np.random.uniform(0.7, 1.0)
            t = np.random.uniform(110, 150)
            a = np.random.uniform(0.0, 0.3)
            i_f = np.random.uniform(0.0, 0.4)
            
        xs.append([d, e, v, t, a, i_f])
        
        y = [0] * len(LABELS)
        y[label_idx] = 1
        ys.append(y)
        
    xs = np.array(xs)
    ys = np.array(ys)
    
    # Shuffle
    indices = np.arange(NUM_SAMPLES)
    np.random.shuffle(indices)
    
    return xs[indices], ys[indices]

X, y = generate_dataset()

# 3. Preprocessing (Standard Scaling)
means = np.mean(X, axis=0)
stds = np.std(X, axis=0)
X_norm = (X - means) / (stds + 1e-8)

# 4. Build Model
model = tf.keras.Sequential([
    tf.keras.layers.Dense(32, activation='relu', input_shape=(len(FEATURE_NAMES),)),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(16, activation='relu'),
    tf.keras.layers.Dense(len(LABELS), activation='softmax')
])

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# 5. Train Model
print("Training model...")
model.fit(X_norm, y, epochs=40, batch_size=32, validation_split=0.2, verbose=1)

# 6. Save Model to TF.js format
print("Converting to TensorFlow.js format...")
tfjs.converters.save_keras_model(model, "public/model")

# 7. Save Preprocessing Metadata
metadata = {
    "featureNames": FEATURE_NAMES,
    "mean": means.tolist(),
    "std": stds.tolist(),
    "labels": LABELS,
    "version": "1.0.0",
    "description": "AI Music Classification Model based on Spotify Audio Features"
}

with open("public/model/preprocessing.json", "w") as f:
    json.dump(metadata, f, indent=2)

print("Process completed successfully. Model and metadata saved in public/model/")
