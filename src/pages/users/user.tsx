import { useRouter } from "next/router";
import { usersApi, authFetcher } from "../../services/requests";
import useSwr from "swr";
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";

const User = () => {
  const router = useRouter();
  const AuthUser = useAuthUser() as any;
  const token = AuthUser?.firebaseUser?.accessToken;
  const uid = router?.query?.uid as string;

  const {
    data,
    isValidating: loading,
    error,
  } = useSwr(usersApi + uid, authFetcher(token));

  return (
    <div>
      <h1>User {uid}</h1>
      <button
        onClick={() => {
          console.log(data);
        }}
      >
        BTN
      </button>
    </div>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(User);
