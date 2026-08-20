import json
import numpy as np
from sklearn.decomposition import PCA

with open('public/songs_db.json', 'r', encoding='utf-8') as f:
    songs = json.load(f)

features_list = ['danceability', 'energy', 'key', 'loudness', 'mode', 'speechiness', 'acousticness', 'instrumentalness', 'liveness', 'valence', 'tempo']

X = []
y_labels = []

for song in songs:
    feat = song['features']
    row = [feat[f] for f in features_list]
    X.append(row)
    
    e = feat['energy']
    v = feat['valence']
    
    if e > 0.6 and v > 0.5:
        y_labels.append('Euphoric')
    elif e > 0.6 and v <= 0.5:
        y_labels.append('Energetic')
    elif e <= 0.6 and v > 0.5:
        y_labels.append('Chill')
    else:
        y_labels.append('Melancholic')

X = np.array(X)
mean = np.mean(X, axis=0)
std = np.std(X, axis=0)
std = np.where(std == 0, 1.0, std)
X_scaled = (X - mean) / std

pca = PCA(n_components=2)
X_pca = pca.fit_transform(X_scaled)

x_min, x_max = X_pca[:, 0].min(), X_pca[:, 0].max()
y_min, y_max = X_pca[:, 1].min(), X_pca[:, 1].max()

for i, song in enumerate(songs):
    nx = 5 + 90 * (X_pca[i, 0] - x_min) / (x_max - x_min)
    ny = 5 + 90 * (X_pca[i, 1] - y_min) / (y_max - y_min)
    song['x'] = float(nx)
    song['y'] = float(ny)
    song['vibe'] = y_labels[i]

with open('public/songs_db.json', 'w', encoding='utf-8') as f:
    json.dump(songs, f, separators=(',', ':'))

print("Updated songs_db.json successfully!")
