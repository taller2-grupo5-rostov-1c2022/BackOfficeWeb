import type { NextPage } from "next";
import Head from "next/head";
import { logOut } from "../client/auth";

import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";

import styles from "../styles/Home.module.css";

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
      <Head>
        <title>Spotifiuby - Back Office</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
