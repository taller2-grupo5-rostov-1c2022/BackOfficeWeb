import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import styles from "../../styles/Home.module.css";
import { albumsApi, useAuthSWR } from "../../services/requests";
import ContentNav from "../../components/Navigation/ContentNav";
import AlbumsList from "../../components/Content/AlbumsList";

const Albums: any = () => {
  const { data: albums, isValidating: loading, error } = useAuthSWR(albumsApi);

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
