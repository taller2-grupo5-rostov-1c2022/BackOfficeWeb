import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import styles from "../../styles/Home.module.css";
import ContentNav from "../../components/Navigation/ContentNav";
import { AlbumsTable } from "../../components/Content/AlbumsList";
import AppHead from "../../components/util/AppHead";

const Albums: any = () => {
  return (
    <div className={styles.container}>
      <AppHead title="Albums" />
      <ContentNav />
      <main className={styles.main}>
        <AlbumsTable />
      </main>
    </div>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Albums);
