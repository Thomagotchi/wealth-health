import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

/**
 * Header component — displays the HRnet logo/title and top navigation.
 *
 * Props:
 *  None — this is a static header shared across all pages.
 *
 * Usage:
 *   <Header />
 */
function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          <span className={styles.brandIcon}>💼</span>
          <span className={styles.brandName}>HRnet</span>
          <span className={styles.brandSub}>WealthHealth</span>
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          <Link to="/" className={styles.navLink}>
            Create Employee
          </Link>
          <Link to="/employees" className={styles.navLink}>
            View Employees
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
