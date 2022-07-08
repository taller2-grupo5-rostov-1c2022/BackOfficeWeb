import { useRouter } from "next/router";
import { albumsApi, useAuthSWR } from "../../services/requests";
import AlbumData from "../../components/Content/Album";
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import styles from "../../styles/Home.module.css";
import AppHead from "../../components/util/AppHead";

const Album = () => {
  const router = useRouter();
  const id = router?.query?.id as string;

  const {
    data: album,
    isValidating: loading,
    error,
  } = useAuthSWR(id ? albumsApi + id : null);

  return (
    <div className={styles.pad_container}>
      <AppHead title="Album" />
      <AlbumData album={album} loading={loading} error={error} />
    </div>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Album);
