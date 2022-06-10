import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import { useMemo } from "react";
import { userMetrics } from "../../client/metrics";
import MetricsNav from "../../components/Navigation/MetricsNav";
import { useAuthSWR, authApi } from "../../services/requests";

import styles from "../../styles/Home.module.css";
import Metrics from "../../components/Metrics/Metrics";

const UserMetrics: any = () => {
  const { data, loading, error } = useAuthSWR(authApi);
  const users = data?.users;

  const metrics = useMemo(() => userMetrics(users), [users]);

  return (
    <div className={styles.container}>
      <MetricsNav />
      {loading ? "LOADING..." : null}
      {error ? "ERROR" : null}
      <main className={styles.main}>
        <Metrics metrics={metrics} />
      </main>
    </div>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(UserMetrics);
