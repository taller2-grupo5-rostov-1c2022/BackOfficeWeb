import { useRouter } from "next/router";
import { usersApi, authApi, useAuthSWR } from "../../services/requests";
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import styles from "../../styles/Home.module.css";
import Profile from "../../components/Users/Profile";
import AppHead from "../../components/util/AppHead";

const User = () => {
  const router = useRouter();
  const uid = router?.query?.uid as string;

  const {
    data: user,
    isValidating: user_loading,
    error: user_error,
  } = useAuthSWR(uid ? usersApi + uid : null);
  const {
    data: authUser,
    isValidating: authUser_loading,
    error: authUser_error,
  } = useAuthSWR(uid ? authApi + "/data/" + uid : null);

  return (
    <div className={styles.pad_container}>
      <AppHead title="User" />
      <Profile
        user={user}
        authUser={authUser?.user}
        loading={user_loading || authUser_loading}
        error={
          authUser_error
          // || user_error // user may not have profile
        }
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
