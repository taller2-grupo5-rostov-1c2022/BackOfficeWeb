import Tab from "./Tab";
import styles from "./Nav.module.css";

const MetricsNav = () => {
  return (
    <div className={styles.SubNav}>
      <Tab url="/metrics/users" label="Users" />
      <Tab url="/metrics/content" label="Content" />
      <Tab url="/metrics/transactions" label="Transactions" />
    </div>
  );
};

export default MetricsNav;
