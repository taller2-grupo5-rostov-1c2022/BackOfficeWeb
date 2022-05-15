import { useRouter } from "next/router";
import {
  usersApi,
  authApi,
  useAuthFetcher,
  jsonFetcher,
} from "../../services/requests";
import useSwr from "swr";
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import styles from "../../styles/Home.module.css";
import Profile from "../../components/Users/Profile";

const User = () => {
  const router = useRouter();
  const { authFetcher, token } = useAuthFetcher();
  const uid = router?.query?.uid as string;

  const {
    data: user,
    isValidating: user_loading,
    error: user_error,
  } = useSwr(token ? usersApi + uid : null, authFetcher);
  const {
    data: authUser,
    isValidating: authUser_loading,
    error: authUser_error,
  } = useSwr(uid ? authApi + "/data/" + uid : null, jsonFetcher);

  return (
    <div className={styles.container}>
      <Profile
        user={user}
        authUser={authUser?.user}
        loading={user_loading || authUser_loading}
        error={user_error || authUser_error}
      />
    </div>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(User);
