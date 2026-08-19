import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import styles from './Auth.module.css';

export const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setMessage('');
      setError('');
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      setMessage('Check your inbox for further instructions');
    } catch (err: any) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.header}>
        <h1>Reset Password</h1>
        <p>Enter your email and we'll send you a recovery link</p>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}
      {message && <div className={styles.successMessage}>{message}</div>}

      <form className={styles.form} onSubmit={handleReset}>
        <div className={styles.formGroup}>
          <label>Email Address</label>
          <input 
            type="email" 
            placeholder="name@example.com" 
            className={styles.input} 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>

        <button type="submit" className={styles.primaryBtn} disabled={loading}>
          {loading ? 'Sending...' : 'Send Recovery Link'}
        </button>
      </form>

      <p className={styles.footerText} style={{marginTop: '16px'}}>
        Remembered your password? <Link to="/login" className={styles.link}>Sign In</Link>
      </p>
    </div>
  );
};
