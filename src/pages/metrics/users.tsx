import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import { useMemo } from "react";
import { userMetrics } from "../../client/metrics";
import MetricsNav from "../../components/Navigation/MetricsNav";
import { useAuthSWR, authApi, useUserMetrics } from "../../services/requests";

import styles from "../../styles/Home.module.css";
import Metrics from "../../components/Metrics/Metrics";
import MoreMetrics from "../../components/Metrics/MoreMetrics";
import AppHead from "../../components/util/AppHead";

const UserMetrics: any = () => {
  const { data, loading, error } = useAuthSWR(authApi);
  const users = data?.users;

  const metrics = useMemo(() => userMetrics(users), [users]);
  const { data: moreMetrics } = useUserMetrics();

  return (
    <div className={styles.container}>
      <AppHead title="User Metrics" />
      <MetricsNav />
      {loading ? "LOADING..." : null}
      {error ? "ERROR" : null}
      <main className={styles.main}>
        <Metrics metrics={metrics} />
        <MoreMetrics metrics={moreMetrics} />
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
