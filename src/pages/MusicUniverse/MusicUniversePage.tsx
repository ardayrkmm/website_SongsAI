import { useState, useRef, useEffect } from 'react';
import type { MouseEvent } from 'react';
import styles from './MusicUniversePage.module.css';

// Mock data generation for the clustering map
const CLUSTERS = [
  { id: 'energetic', name: 'High Energy / Driving', color: '#ff5e5e', centerX: 70, centerY: 30 },
  { id: 'melancholic', name: 'Melancholic / Deep', color: '#5e94ff', centerX: 25, centerY: 70 },
  { id: 'chill', name: 'Chill / Atmospheric', color: '#4ecc71', centerX: 75, centerY: 75 },
  { id: 'euphoric', name: 'Euphoric / Uplifting', color: '#c0c1ff', centerX: 30, centerY: 30 }
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

const generateMockNodes = (count: number): NodeData[] => {
  const nodes: NodeData[] = [];
  for (let i = 0; i < count; i++) {
    const cluster = CLUSTERS[Math.floor(Math.random() * CLUSTERS.length)];
    // Add random spread around cluster center (Gaussian-ish)
    const offsetX = (Math.random() + Math.random() + Math.random() - 1.5) * 20;
    const offsetY = (Math.random() + Math.random() + Math.random() - 1.5) * 20;
    
    nodes.push({
      id: `node-${i}`,
      title: `Track ${i + 1}`,
      artist: `Artist ${String.fromCharCode(65 + (i % 26))}`,
      cluster: cluster.id,
      x: Math.max(5, Math.min(95, cluster.centerX + offsetX)),
      y: Math.max(5, Math.min(95, cluster.centerY + offsetY)),
      size: Math.random() * 8 + 4 // Size between 4 and 12
    });
  }
  return nodes;
};

export const MusicUniversePage = () => {
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [filter, setFilter] = useState('all');
  const [hoveredNode, setHoveredNode] = useState<NodeData | null>(null);
  
  // Pan and zoom state
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Generate 150 points for the map
    setNodes(generateMockNodes(150));
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
                  opacity: filter !== 'all' && filter !== node.cluster ? 0.2 : 0.8
                }}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
              />
            );
          })}
        </div>

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
