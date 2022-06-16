import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";

import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";

import styles from "../../styles/Home.module.css";
import { paymentsAPi, useAuthSWR } from "../../services/requests";
import AppHead from "../../components/util/AppHead";

const columns = [
  { field: "id", headerName: "ID", minWidth: 200, flex: 1 },
  { field: "user_id", headerName: "User", minWidth: 200, flex: 1 },
  { field: "amount", headerName: "Amount", minWidth: 200, flex: 1 },
  { field: "receiver_address", headerName: "Receiver", minWidth: 200, flex: 1 },
  { field: "sender_address", headerName: "Sender", minWidth: 200, flex: 1 },
  {
    field: "date",
    headerName: "Date",
    minWidth: 200,
    flex: 1,
    valueGetter: ({ row: t }: any) => `${t?.year}/${t?.month}/${t?.day}`,
  },
];
const Payments: any = () => {
  const {
    data: transactions,
    loading,
    error,
  } = useAuthSWR(paymentsAPi + "transactions");

  return (
    <div className={styles.container}>
      <AppHead title="Payments" />

      <main className={styles.main}>
        <h2 className="w80">Transactions</h2>
        {error ? (
          <p>Error</p>
        ) : transactions ? (
          <DataGrid
            autoHeight={true}
            className="w80"
            rows={transactions ?? []}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 50, 100]}
          />
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          <p>No Transactions</p>
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
})(Payments);
