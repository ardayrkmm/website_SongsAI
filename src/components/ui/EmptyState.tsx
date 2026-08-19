import { Link } from 'react-router-dom';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  actionLink?: string;
  icon?: React.ReactNode;
}

export const EmptyState = ({ title, description, actionText, actionLink, icon }: EmptyStateProps) => {
  return (
    <div className={styles.emptyContainer}>
      <div className={styles.iconWrapper}>
        {icon || (
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 18V5l12-2v13"></path>
            <circle cx="6" cy="18" r="3"></circle>
            <circle cx="18" cy="16" r="3"></circle>
          </svg>
        )}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      
      {actionText && actionLink && (
        <Link to={actionLink} className={styles.actionBtn}>
          {actionText}
        </Link>
      )}
    </div>
  );
};
