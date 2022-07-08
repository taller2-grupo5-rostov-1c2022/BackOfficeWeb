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
import DataGridWrapper from "../../components/util/DataGrid";
import { ErrorBox } from "../../components/util/Status/Error";
import { Loading } from "../../components/util/Status/Loading";

const etherUrl = "https://rinkeby.etherscan.io";

const getEnrichedTransactions = (transactions: any, users: any) => {
  if (!transactions) return [];
  if (!users) return transactions;
  return transactions.map((transaction: any) => ({
    ...transaction,
    user: users?.find((user: any) => user.uid === transaction.user_id),
  }));
};

const SystemDetails = ({ system, loading, error }: any) => {
  return (
    <div className="w80">
      <h2>System</h2>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorBox />
      ) : (
        <>
          <KeyValuePair
            label="Wallet"
            value={system?.systemWallet}
            url={etherUrl + "/address/" + system?.systemWallet}
          />
          <KeyValuePair label="Balance" value={system?.balance} />
        </>
      )}
    </div>
  );
};

const renderTransaction = (params: any) => (
  <Link href={etherUrl + "/tx/" + params.value}>
    <a>{params.value}</a>
  </Link>
);

const renderUser = (params: any) => {
  return (
    <Link href={"/users/user?uid=" + params?.row?.user_id}>
      <a>{params?.value ?? params?.row?.user_id}</a>
    </Link>
  );
};

const getUser = (params: any) => params?.value?.displayName;

// eslint-disable-next-line react/display-name
const getType = (systemWallet: string) => (params: any) =>
  systemWallet === params?.row?.sender_address
    ? "Payment to User"
    : systemWallet === params?.row?.receiver_address
    ? "Deposit to System"
    : "Unknown";

const Payments: any = () => {
  const {
    data: transactions,
    loading,
    error,
  } = useAuthSWR(paymentsAPi + "transactions");
  const {
    data: system,
    loading: sysLoading,
    error: sysError,
  } = useAuthSWR(paymentsAPi + "balances/system");
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
      valueGetter: getUser,
      renderCell: renderUser,
    },
    { field: "amount", headerName: "Amount", minWidth: 200, flex: 1 },
    {
      field: "type",
      headerName: "Type",
      minWidth: 200,
      flex: 1,
      valueGetter: getType(system?.systemWallet),
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
        <SystemDetails system={system} loading={sysLoading} error={sysError} />
        <h2 className="w80">Transactions</h2>
        {error ? (
          <div className="w80">
            <ErrorBox />
          </div>
        ) : enrichedTransactions ? (
          <DataGridWrapper
            autoHeight={true}
            className="w80"
            rows={enrichedTransactions ?? []}
            columns={columns}
            pageSize={10}
          />
        ) : loading ? (
          <div className="w80">
            <Loading />
          </div>
        ) : null}
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
