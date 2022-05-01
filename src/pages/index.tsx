import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { logOut } from "../config/auth";

import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const router = useRouter();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("signed out");
        router.push("/login");
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

        <div onClick={handleLogOut}>sign out</div>
      </main>
    </div>
  );
};

export default Home;
