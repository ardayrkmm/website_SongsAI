import { useState, useRef, useEffect } from 'react';
import type { MouseEvent } from 'react';
import styles from './MusicUniversePage.module.css';

// Cluster definitions matching our AI Vibe Model
const CLUSTERS = [
  { id: 'Energetic', name: 'High Energy / Driving', color: '#ff5e5e' },
  { id: 'Melancholic', name: 'Melancholic / Deep', color: '#5e94ff' },
  { id: 'Chill', name: 'Chill / Atmospheric', color: '#4ecc71' },
  { id: 'Euphoric', name: 'Euphoric / Uplifting', color: '#c0c1ff' }
];

interface NodeData {
  id: string;
  title: string;
  artist: string;
  cluster: string;
  x: number;
  y: number;
  size: number;
}

export const MusicUniversePage = () => {
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [filter, setFilter] = useState('all');
  const [hoveredNode, setHoveredNode] = useState<NodeData | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Pan and zoom state
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Fetch real data from the local JSON DB
    const loadRealData = async () => {
      try {
        const response = await fetch('/songs_db.json');
        const db = await response.json();
        
        // Take up to 500 songs for the map to prevent lag
        const mapNodes = db.slice(0, 500).map((song: any) => ({
          id: song.id,
          title: song.name,
          artist: song.artist,
          cluster: song.vibe || 'Chill', // fallback
          x: song.x !== undefined ? song.x : Math.random() * 90 + 5,
          y: song.y !== undefined ? song.y : Math.random() * 90 + 5,
          size: 6 // Uniform size
        }));
        
        setNodes(mapNodes);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load map data", err);
        setLoading(false);
      }
    };
    
    loadRealData();
  }, []);

  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const visibleNodes = filter === 'all' ? nodes : nodes.filter(n => n.cluster === filter);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Music Universe Map</h1>
        <p className={styles.subtitle}>
          Interactive 2D embedding space representing the AI-derived acoustic relationships between tracks.
        </p>
      </div>

      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <span className={styles.controlLabel}>Highlight Cluster</span>
          <select 
            className={styles.filterSelect}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Clusters</option>
            {CLUSTERS.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div 
        className={styles.mapContainer}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {loading ? (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'var(--color-on-surface-variant)'}}>
            Computing Universal Embeddings...
          </div>
        ) : (
          <div 
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              transform: `translate(${pan.x}px, ${pan.y}px)`,
              transition: isDragging ? 'none' : 'transform 0.1s ease-out'
            }}
          >
            {visibleNodes.map(node => {
              const clusterDef = CLUSTERS.find(c => c.id === node.cluster);
              return (
                <div
                  key={node.id}
                  className={styles.node}
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    width: `${node.size}px`,
                    height: `${node.size}px`,
                    backgroundColor: clusterDef?.color || '#fff',
                    opacity: filter !== 'all' && filter !== node.cluster ? 0.1 : 0.85
                  }}
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                />
              );
            })}
          </div>
        )}

        {hoveredNode && (
          <div 
            className={styles.tooltip}
            style={{
              left: `calc(${hoveredNode.x}% + ${pan.x}px)`,
              top: `calc(${hoveredNode.y}% + ${pan.y}px)`
            }}
          >
            <h4 className={styles.tooltipTitle}>{hoveredNode.title}</h4>
            <p className={styles.tooltipArtist}>{hoveredNode.artist}</p>
            <span 
              className={styles.tooltipCluster}
              style={{ backgroundColor: CLUSTERS.find(c => c.id === hoveredNode.cluster)?.color + '40', color: CLUSTERS.find(c => c.id === hoveredNode.cluster)?.color }}
            >
              {CLUSTERS.find(c => c.id === hoveredNode.cluster)?.name}
            </span>
          </div>
        )}
      </div>

      <div className={styles.legend}>
        {CLUSTERS.map(c => (
          <div key={c.id} className={styles.legendItem}>
            <div className={styles.legendDot} style={{ backgroundColor: c.color }} />
            {c.name}
          </div>
        ))}
      </div>
    </div>
  );
};
