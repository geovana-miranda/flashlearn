import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header>
      <p className={styles.title}>
        <Link to="/">FlashLearn</Link>
      </p>
      <nav>
        <ul className={styles.nav}>
          <li className={styles.nav__item}>
            <Link to="/">início</Link>
          </li>
          <li className={styles.nav__item}>
            <Link to="/baralhos">baralhos</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
