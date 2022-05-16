import { useRouter } from "next/router";
import { albumsApi, useAuthFetcher } from "../../services/requests";
import AlbumData from "../../components/Content/Album";
import useSwr from "swr";
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import styles from "../../styles/Home.module.css";

const Album = () => {
  const router = useRouter();
  const { authFetcher, token } = useAuthFetcher();
  const id = router?.query?.id as string;

  const {
    data: album,
    isValidating: loading,
    error,
  } = useSwr(token ? albumsApi + id : null, authFetcher);

  return (
    <div className={styles.container}>
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
