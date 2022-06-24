import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import styles from "../../styles/Home.module.css";
import ContentNav from "../../components/Navigation/ContentNav";
import { SongsTable } from "../../components/Content/SongsList";
import AppHead from "../../components/util/AppHead";

const Songs: any = () => {
  return (
    <div className={styles.container}>
      <AppHead title="Songs" />
      <ContentNav />
      <main className={styles.main}>
        <SongsTable />
      </main>
    </div>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Songs);
