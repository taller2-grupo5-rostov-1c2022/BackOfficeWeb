import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import styles from "../../styles/Home.module.css";
import { playlistsApi, useAuthSWR } from "../../services/requests";
import ContentNav from "../../components/Navigation/ContentNav";
import PlaylistsList from "../../components/Content/PlaylistsList";
import AppHead from "../../components/util/AppHead";

const Playlists: any = () => {
  const {
    data: playlists,
    isValidating: loading,
    error,
  } = useAuthSWR(playlistsApi);

  return (
    <div className={styles.container}>
      <AppHead title="Playlists" />
      <ContentNav />
      <main className={styles.main}>
        {error ? (
          <p>Error</p>
        ) : playlists ? (
          <PlaylistsList playlists={playlists} />
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          <p>No Playlists</p>
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
})(Playlists);
