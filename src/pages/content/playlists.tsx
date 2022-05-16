import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import styles from "../../styles/Home.module.css";
import { playlistsApi, useAuthFetcher } from "../../services/requests";
import useSwr from "swr";
import ContentNav from "../../components/Navigation/ContentNav";

const PlaylistsButton = ({ song }: any) => {
  return (
    <Link href={"/content/playlist?id=" + song.id}>
      <a>View</a>
    </Link>
  );
};

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "name", headerName: "Name", minWidth: 200, flex: 1 },
  { field: "description", headerName: "Description", minWidth: 250, flex: 1 },
  { field: "creator_id", headerName: "Creator", width: 100 },
  {
    field: "detail",
    headerName: "Detail",
    width: 100,
    renderCell: ({ row: song }: any) => <PlaylistsButton song={song} />,
  },
];
const Playlists: any = () => {
  const { authFetcher, token } = useAuthFetcher();

  const {
    data: playlists,
    isValidating: loading,
    error,
  } = useSwr(token ? playlistsApi : null, authFetcher);

  return (
    <div className={styles.container}>
      <ContentNav />
      <main className={styles.main}>
        <h2>Welcome to the Playlists Page</h2>

        {error ? (
          <p>Error</p>
        ) : playlists ? (
          <DataGrid
            autoHeight={true}
            className="w80"
            rows={playlists ?? []}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 50, 100]}
          />
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          <p>No Playlists</p>
        )}
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
