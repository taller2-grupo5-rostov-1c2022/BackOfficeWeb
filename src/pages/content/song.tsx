import { useRouter } from "next/router";
import { songsApi, useAuthSWR } from "../../services/requests";
import SongData from "../../components/Content/Song";
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import styles from "../../styles/Home.module.css";

const Song = () => {
  const router = useRouter();
  const id = router?.query?.id as string;

  const {
    data: song,
    isValidating: loading,
    error,
  } = useAuthSWR(id ? songsApi + id : null);

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
