import { logOut } from "../client/auth";

import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";

import styles from "../styles/Home.module.css";
import AppHead from "../components/util/AppHead";

const Home: any = () => {
  const AuthUser = useAuthUser();

  const handleLogOut = () => {
    console.log("signing out");
    logOut()
      .then(async () => {
        await AuthUser.signOut();
        console.log("signed out");
      })
      .catch((error) => {
        console.error("error signing out", error);
      });
  };

  return (
    <div className={styles.container}>
      <AppHead title="Back Office Home" />

      <main className={styles.main}>
        <h2>Welcome to the Back Office</h2>

        <h4>{AuthUser?.email}</h4>

        <div onClick={handleLogOut}>sign out</div>
      </main>
    </div>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Home);
