import { DataGrid } from "@mui/x-data-grid";
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import styles from "../../styles/Home.module.css";
import { albumsApi, useAuthFetcher } from "../../services/requests";
import useSwr from "swr";
import ContentNav from "../../components/Navigation/ContentNav";
import AlbumsList from "../../components/Content/AlbumsLists";

const Albums: any = () => {
  const { authFetcher, token } = useAuthFetcher();

  const {
    data: albums,
    isValidating: loading,
    error,
  } = useSwr(token ? albumsApi : null, authFetcher);

  return (
    <div className={styles.container}>
      <ContentNav />
      <main className={styles.main}>
        {error ? (
          <p>Error</p>
        ) : albums ? (
          <AlbumsList albums={albums} />
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          <p>No Albums</p>
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
})(Albums);
