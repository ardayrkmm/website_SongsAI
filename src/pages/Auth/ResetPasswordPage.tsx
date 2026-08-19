import { Link } from 'react-router-dom';
import styles from './Auth.module.css';

export const ResetPasswordPage = () => {
  return (
    <div className={styles.authContainer}>
      <div className={styles.header}>
        <h1>Reset Password</h1>
        <p>Enter your email and we'll send you a recovery link</p>
      </div>

      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.formGroup}>
          <label>Email Address</label>
          <input type="email" placeholder="name@example.com" className={styles.input} required />
        </div>

        <button type="submit" className={styles.primaryBtn}>Send Recovery Link</button>
      </form>

      <p className={styles.footerText} style={{marginTop: '16px'}}>
        Remembered your password? <Link to="/login" className={styles.link}>Sign In</Link>
      </p>
    </div>
  );
};
