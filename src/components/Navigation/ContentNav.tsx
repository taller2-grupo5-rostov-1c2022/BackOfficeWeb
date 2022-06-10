import Tab from "./Tab";
import styles from "./Nav.module.css";

const ContentNav = () => {
  return (
    <div className={styles.SubNav}>
      <Tab url="/content/songs" label="Songs" />
      <Tab url="/content/albums" label="Albums" />
      <Tab url="/content/playlists" label="Playlists" />
    </div>
  );
};

export default ContentNav;
