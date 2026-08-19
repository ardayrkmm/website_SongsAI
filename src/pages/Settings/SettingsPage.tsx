import styles from './SettingsPage.module.css';

export const SettingsPage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.subtitle}>Manage your account preferences and integrations.</p>
      </header>

      <div className={styles.contentLayout}>
        <nav className={styles.settingsNav}>
          <button className={`${styles.navItem} ${styles.active}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            Account
          </button>
          <button className={styles.navItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
            Preferences
          </button>
          <button className={styles.navItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            Privacy
          </button>
          <button className={styles.navItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            Notifications
          </button>
        </nav>

        <div className={styles.settingsContent}>
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <h2>Account Profile</h2>
              <p>Update your basic profile information and how others see you on the platform.</p>
            </div>
            
            <div className={styles.profileEdit}>
              <div className={styles.avatarWrap}>
                <div className={styles.avatar}></div>
              </div>
              <div className={styles.photoActions}>
                <button className={styles.btnOutline}>Change Photo</button>
                <p>JPG, GIF or PNG. 1MB max.</p>
              </div>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>First Name</label>
                <input type="text" defaultValue="Alex" className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label>Last Name</label>
                <input type="text" defaultValue="Chen" className={styles.input} />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Email Address</label>
              <div className={styles.inputIconWrap}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.inputIcon}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <input type="email" defaultValue="alex.chen@example.com" className={`${styles.input} ${styles.inputWithIcon}`} />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Bio</label>
              <textarea defaultValue="Data Scientist & Electronic Music Producer." className={styles.textarea}></textarea>
            </div>
          </div>

          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <h2>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path></svg>
                Experience Preferences
              </h2>
              <p>Customize how Sonora AI looks and behaves.</p>
            </div>

            <div className={styles.formGroup}>
              <label>Interface Theme</label>
              <div className={styles.themeSelector}>
                <div className={styles.themeOption}>
                  <div className={styles.themeMockup} style={{backgroundColor: '#e0e0e0'}}>
                    <div className={styles.mockHeader} style={{backgroundColor: '#ccc'}}></div>
                  </div>
                  <span>Light</span>
                </div>
                <div className={`${styles.themeOption} ${styles.themeActive}`}>
                  <div className={styles.themeMockup} style={{backgroundColor: '#0c0e12'}}>
                    <div className={styles.mockHeader} style={{backgroundColor: '#1a1d24'}}></div>
                  </div>
                  <span>Dark (Default)</span>
                </div>
                <div className={styles.themeOption}>
                  <div className={styles.themeMockup} style={{backgroundColor: '#1a1d24'}}>
                    <div className={styles.mockHeader} style={{backgroundColor: '#2b303b'}}></div>
                  </div>
                  <span>System</span>
                </div>
              </div>
            </div>

            <div className={styles.toggleGroup}>
              <div className={styles.toggleInfo}>
                <h4>Enable Background Animations</h4>
                <p>Show WebGL shader effects on canvas areas.</p>
              </div>
              <div className={styles.toggleSwitch} data-on="true">
                <div className={styles.toggleHandle}></div>
              </div>
            </div>

            <div className={styles.toggleGroup}>
              <div className={styles.toggleInfo}>
                <h4>High-Density Data View</h4>
                <p>Compact lists and smaller charts for expert users.</p>
              </div>
              <div className={styles.toggleSwitch} data-on="false">
                <div className={styles.toggleHandle}></div>
              </div>
            </div>

            <div className={styles.formGroup} style={{marginTop: '24px'}}>
              <label>Default Analysis Model</label>
              <select className={styles.select}>
                <option>Sonora Multi-Modal V2 (Recommended)</option>
                <option>Sonora Multi-Modal V1</option>
                <option>Fast Audio Heuristics</option>
              </select>
            </div>
          </div>

          <div className={styles.actionsFooter}>
            <button className={styles.btnText}>Discard Changes</button>
            <button className={styles.btnPrimary}>Save Configuration</button>
          </div>
        </div>
      </div>
    </div>
  );
};
