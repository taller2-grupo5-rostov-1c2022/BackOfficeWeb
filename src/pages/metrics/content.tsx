import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import MetricsNav from "../../components/Navigation/MetricsNav";
import AppHead from "../../components/util/AppHead";

import styles from "../../styles/Home.module.css";

const Content: any = () => {
  return (
    <div className={styles.container}>
      <AppHead title="Content Metrics" />
      <MetricsNav />
      <main className={styles.main}>
        <h2>Welcome to the Content Metrics Page</h2>
        <h4>There is nothing to see here</h4>
      </main>
    </div>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Content);