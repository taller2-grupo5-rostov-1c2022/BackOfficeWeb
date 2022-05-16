import { DataGrid } from "@mui/x-data-grid";
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import styles from "../../styles/Home.module.css";
import { playlistsApi, useAuthFetcher } from "../../services/requests";
import useSwr from "swr";
import ContentNav from "../../components/Navigation/ContentNav";
import PlaylistsList from "../../components/Content/PlaylistsLists";

const Playlists: any = () => {
  const { authFetcher, token } = useAuthFetcher();

  const {
    data: playlists,
    isValidating: loading,
    error,
  } = useSwr(token ? playlistsApi : null, authFetcher);

  return (
    <div className={styles.container}>
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
