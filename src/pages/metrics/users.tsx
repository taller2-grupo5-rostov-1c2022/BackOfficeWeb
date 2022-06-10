import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import MetricsNav from "../../components/Navigation/MetricsNav";
import { useAuthSWR, authApi } from "../../services/requests";

import styles from "../../styles/Home.module.css";

const Metrics: any = () => {
  const { data, loading, error } = useAuthSWR(authApi);
  const users = data?.users;

  return (
    <div className={styles.container}>
      <MetricsNav />
      <main className={styles.main}>
        <h2>Welcome to the User Metrics Page</h2>
        {loading ? "LOADING..." : null}
        {error ? "ERROR" : null}
        <button
          onClick={() => {
            console.log(users);
          }}
        >
          CLICK
        </button>
      </main>
    </div>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Metrics);
