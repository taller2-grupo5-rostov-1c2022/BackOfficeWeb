import { useRouter } from "next/router";
import { playlistsApi, useAuthSWR } from "../../services/requests";
import PlaylistData from "../../components/Content/Playlist";
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import styles from "../../styles/Home.module.css";
import AppHead from "../../components/util/AppHead";

const Playlist = () => {
  const router = useRouter();
  const id = router?.query?.id as string;

  const {
    data: playlist,
    isValidating: loading,
    error,
  } = useAuthSWR(id ? playlistsApi + id : null);

  return (
    <div className={styles.pad_container}>
      <AppHead title="Playlist" />
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
