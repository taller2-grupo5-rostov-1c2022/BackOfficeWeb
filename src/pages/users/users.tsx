import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";

import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";

import styles from "../../styles/Home.module.css";
import { authApi, useAuthSWR } from "../../services/requests";
import AppHead from "../../components/util/AppHead";

const UserButton = ({ user }: any) => {
  return (
    <Link href={"/users/user?uid=" + user.uid}>
      <a>View</a>
    </Link>
  );
};

const columns = [
  { field: "uid", headerName: "UID", minWidth: 200, flex: 1 },
  { field: "displayName", headerName: "Name", minWidth: 200, flex: 1 },
  { field: "email", headerName: "Email", minWidth: 200, flex: 1 },
  {
    field: "role",
    headerName: "Role",
    minWidth: 80,
    flex: 1,
    valueGetter: ({ row: user }: any) => user?.customClaims?.role ?? "listener",
  },
  {
    field: "detail",
    headerName: "Detail",
    width: 100,
    renderCell: ({ row: user }: any) => <UserButton user={user} />,
  },
];
const Users: any = () => {
  const { data, loading, error } = useAuthSWR(authApi);
  const users = data?.users;

  return (
    <div className={styles.container}>
      <AppHead title="Users" />

      <main className={styles.main}>
        <h2 className="w80">Users</h2>
        {error ? (
          <p>Error</p>
        ) : users ? (
          <DataGrid
            autoHeight={true}
            className="w80"
            rows={users ?? []}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 50, 100]}
            getRowId={(row) => row.uid}
          />
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          <p>No users</p>
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
})(Users);
