import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import styles from "../../styles/Home.module.css";
import { songsApi, useAuthFetcher } from "../../services/requests";
import useSwr from "swr";
import ContentNav from "../../components/Navigation/ContentNav";
import SongsList from "../../components/Content/SongsList";

const Songs: any = () => {
  const { authFetcher, token } = useAuthFetcher();

  const {
    data: songs,
    isValidating: loading,
    error,
  } = useSwr(token ? songsApi : null, authFetcher);

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
