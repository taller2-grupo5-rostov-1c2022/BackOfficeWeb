import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";

import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";

import styles from "../../styles/Home.module.css";
import { authApi, paymentsAPi, useAuthSWR } from "../../services/requests";
import AppHead from "../../components/util/AppHead";
import KeyValuePair from "../../components/util/KeyValuePair/KeyValuePair";
import { useMemo } from "react";
import transactions from "../metrics/transactions";

const etherUrl = "https://rinkeby.etherscan.io";

const getEnrichedTransactions = (transactions: any, users: any) => {
  if (!transactions) return [];
  if (!users) return transactions;
  return transactions.map((transaction: any) => ({
    ...transaction,
    user: users?.find((user: any) => user.uid === transaction.user_id),
  }));
};

const SystemDetails = ({ system }: any) => {
  return (
    <div className="w80">
      <h2>System</h2>
      <KeyValuePair
        label="Wallet"
        value={system?.systemWallet}
        url={etherUrl + "/address/" + system?.systemWallet}
      />
      <KeyValuePair label="Balance" value={system?.balance} />
    </div>
  );
};

const renderTransaction = (params: any) => (
  <Link href={etherUrl + "/tx/" + params.value}>
    <a>{params.value}</a>
  </Link>
);

const renderUser = (params: any) => (
  <Link href={"/users/user?uid=" + params.value?.uid ?? params?.row?.user_id}>
    <a>{params?.value?.displayName ?? params?.row?.user_id}</a>
  </Link>
);

// eslint-disable-next-line react/display-name
const renderType = (systemWallet: string) => (params: any) =>
  (
    <div>
      {systemWallet === params?.row?.sender_address
        ? "Payment to User"
        : systemWallet === params?.row?.receiver_address
        ? "Deposit to System"
        : "Unknown"}
    </div>
  );

const Payments: any = () => {
  const {
    data: transactions,
    loading,
    error,
  } = useAuthSWR(paymentsAPi + "transactions");
  const { data: system } = useAuthSWR(paymentsAPi + "balances/system");
  const { data: users } = useAuthSWR(authApi);

  const enrichedTransactions = useMemo(
    () => getEnrichedTransactions(transactions, users?.users),
    [transactions, users]
  );

  const columns = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 200,
      flex: 1,
      renderCell: renderTransaction,
    },
    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 1,
      renderCell: renderUser,
    },
    { field: "amount", headerName: "Amount", minWidth: 200, flex: 1 },
    {
      field: "type",
      headerName: "Type",
      minWidth: 200,
      flex: 1,
      renderCell: renderType(system?.systemWallet),
    },
    {
      field: "date",
      headerName: "Date",
      minWidth: 200,
      flex: 1,
      valueGetter: ({ row: t }: any) => `${t?.year}/${t?.month}/${t?.day}`,
    },
  ];

  return (
    <div className={styles.container}>
      <AppHead title="Payments" />

      <main className={styles.main}>
        <SystemDetails system={system} />
        <h2 className="w80">Transactions</h2>
        {error ? (
          <p>Error</p>
        ) : enrichedTransactions ? (
          <DataGrid
            autoHeight={true}
            className="w80"
            rows={enrichedTransactions ?? []}
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
