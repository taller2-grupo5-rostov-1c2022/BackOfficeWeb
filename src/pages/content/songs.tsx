import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import styles from "../../styles/Home.module.css";
import { songsApi, useAuthFetcher } from "../../services/requests";
import useSwr from "swr";
import ContentNav from "../../components/Navigation/ContentNav";

const SongsButton = ({ song }: any) => {
  return (
    <Link href={"/content/song?id=" + song.id}>
      <a>View</a>
    </Link>
  );
};

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "name", headerName: "Name", width: 200, flex: 1 },
  { field: "description", headerName: "Description", width: 250, flex: 1 },
  { field: "genre", headerName: "Genre", width: 100 },
  {
    field: "album",
    headerName: "Album",
    width: 150,
    valueGetter: ({ row: song }: any) =>
      `${song?.album?.name} [${song?.album?.id}]`,
  },
  {
    field: "artists",
    headerName: "Artists",
    width: 200,
    flex: 1,
    valueGetter: ({ row: song }: any) =>
      song?.artists?.map((artist: any) => artist?.name).join(", "),
  },
  {
    field: "detail",
    headerName: "Detail",
    width: 100,
    renderCell: ({ row: song }: any) => <SongsButton song={song} />,
  },
];
const Songs: any = () => {
  const { authFetcher, token } = useAuthFetcher();

  const {
    data: songs,
    isValidating: loading,
    error,
  } = useSwr(token ? songsApi : null, authFetcher);

  return (
    <div className={styles.container}>
      <ContentNav />
      <main className={styles.main}>
        <h2>Welcome to the Songs Page</h2>

        {error ? (
          <p>Error</p>
        ) : songs ? (
          <DataGrid
            autoHeight={true}
            className="w80"
            rows={songs ?? []}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 50, 100]}
          />
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          <p>No Songs</p>
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
})(Songs);
