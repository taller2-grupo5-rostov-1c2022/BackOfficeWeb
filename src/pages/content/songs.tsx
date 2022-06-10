import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import styles from "../../styles/Home.module.css";
import { songsApi, useAuthSWR } from "../../services/requests";
import ContentNav from "../../components/Navigation/ContentNav";
import SongsList from "../../components/Content/SongsList";

const Songs: any = () => {
  const { data: songs, isValidating: loading, error } = useAuthSWR(songsApi);

  return (
    <div className={styles.container}>
      <ContentNav />
      <main className={styles.main}>
        {error ? (
          <p>Error</p>
        ) : songs ? (
          <SongsList songs={songs} />
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          <p>No Songs</p>
        )}
      </main>
    </div>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Songs);
