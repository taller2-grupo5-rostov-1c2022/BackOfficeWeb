import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import styles from "../../styles/Home.module.css";
import ContentNav from "../../components/Navigation/ContentNav";
import { PlaylistsTable } from "../../components/Content/PlaylistsList";
import AppHead from "../../components/util/AppHead";

const Playlists: any = () => {
  return (
    <div className={styles.container}>
      <AppHead title="Playlists" />
      <ContentNav />
      <main className={styles.main}>
        <PlaylistsTable />
      </main>
    </div>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Playlists);
