import { useRouter } from "next/router";
import { playlistsApi, useAuthFetcher } from "../../services/requests";
import PlaylistData from "../../components/Content/Playlist";
import useSwr from "swr";
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import styles from "../../styles/Home.module.css";

const Playlist = () => {
  const router = useRouter();
  const { authFetcher, token } = useAuthFetcher();
  const id = router?.query?.id as string;

  const {
    data: playlist,
    isValidating: loading,
    error,
  } = useSwr(token ? playlistsApi + id : null, authFetcher);

  return (
    <div className={styles.container}>
      <PlaylistData playlist={playlist} loading={loading} error={error} />
    </div>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Playlist);
