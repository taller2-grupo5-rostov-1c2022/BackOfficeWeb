import { useRouter } from "next/router";
import { songsApi, useAuthFetcher } from "../../services/requests";
import SongData from "../../components/Content/Song";
import useSwr from "swr";
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import styles from "../../styles/Home.module.css";

const Song = () => {
  const router = useRouter();
  const { authFetcher, token } = useAuthFetcher();
  const id = router?.query?.id as string;

  const {
    data: song,
    isValidating: loading,
    error,
  } = useSwr(token ? songsApi + id : null, authFetcher);

  return (
    <div className={styles.container}>
      <SongData song={song} loading={loading} error={error} />
    </div>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Song);
