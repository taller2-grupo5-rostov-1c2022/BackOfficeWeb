import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import styles from "../../styles/Home.module.css";
import { albumsApi, useAuthFetcher } from "../../services/requests";
import useSwr from "swr";
import ContentNav from "../../components/Navigation/ContentNav";

const AlbumsButton = ({ album }: any) => {
  return (
    <Link href={"/content/album?id=" + album.id}>
      <a>View</a>
    </Link>
  );
};

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "name", headerName: "Name", width: 200, flex: 1 },
  { field: "description", headerName: "Description", width: 250, flex: 1 },
  { field: "genre", headerName: "Genre", width: 100 },
  { field: "sub_level", headerName: "Subscription", width: 100 },
  {
    field: "songs",
    headerName: "Songs",
    width: 150,
    flex: 1,
    valueGetter: ({ row: album }: any) =>
      album?.songs?.map(({ id, name }: any) => `${name} [${id}]`).join(", "),
  },
  {
    field: "detail",
    headerName: "Detail",
    width: 100,
    renderCell: ({ row: album }: any) => <AlbumsButton album={album} />,
  },
];
const Albums: any = () => {
  const { authFetcher, token } = useAuthFetcher();

  const {
    data: albums,
    isValidating: loading,
    error,
  } = useSwr(token ? albumsApi : null, authFetcher);

  return (
    <div className={styles.container}>
      <ContentNav />
      <main className={styles.main}>
        <h2>Welcome to the Albums Page</h2>

        {error ? (
          <p>Error</p>
        ) : albums ? (
          <DataGrid
            autoHeight={true}
            className="w80"
            rows={albums ?? []}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 50, 100]}
          />
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          <p>No Albums</p>
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
})(Albums);
