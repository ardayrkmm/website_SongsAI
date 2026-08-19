import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon } from './Icons';
import styles from './GlobalSearch.module.css';

export const GlobalSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      
      // Escape to close
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      navigate(`/explore?q=${encodeURIComponent(query)}`);
      setQuery('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={() => setIsOpen(false)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <SearchIcon />
          <input
            ref={inputRef}
            type="text"
            className={styles.searchInput}
            placeholder="Search tracks, artists, albums..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" style={{ display: 'none' }}>Search</button>
          <div className={styles.shortcutHint}>
            <kbd>ESC</kbd>
          </div>
        </form>
        
        <div className={styles.resultsArea}>
          <p className={styles.instruction}>Type and press Enter to search the global music database.</p>
        </div>
      </div>
    </div>
  );
};
