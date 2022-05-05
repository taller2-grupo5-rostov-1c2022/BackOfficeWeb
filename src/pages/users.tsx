import type { NextPage } from "next";
import Head from "next/head";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";

import styles from "../styles/Home.module.css";
import { usersApi, setRole, jsonFetcher } from "../services/requests";
import useSwr from "swr";

const LogButton = ({ user }: any) => {
  return <button onClick={() => console.log(user)}>LOG</button>;
};

const RoleButton = ({ user }: any) => {
  const [currentRole, setCurrentRole] = useState(
    user?.customClaims?.role ?? "listener"
  );

  const _setRole = async (role: string) => {
    const res = await setRole(user?.uid, role);
    setCurrentRole(res.role);
  };

  const roles = ["listener", "artist", "admin"];

  return (
    <Stack spacing={2} direction="row">
      {roles.map((role, index) => (
        <Button
          key={index}
          onClick={() => _setRole(role)}
          variant={currentRole === role ? "contained" : "outlined"}
        >
          {role}
        </Button>
      ))}
    </Stack>
  );
};

const columns = [
  { field: "uid", headerName: "UID", width: 200 },
  { field: "displayName", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  {
    field: "role",
    headerName: "Role",
    width: 400,
    renderCell: ({ row: user }: any) => <RoleButton user={user} />,
  },
  {
    field: "log",
    headerName: "log",
    width: 100,
    valueGetter: ({ row: user }: any) => user?.customClaims?.role ?? "listener",
    renderCell: ({ row: user }: any) => <LogButton user={user} />,
  },
];
const Users: any = () => {
  const { data, isValidating: loading, error } = useSwr(usersApi, jsonFetcher);
  const users = data?.users;

  return (
    <div className={styles.container}>
      <Head>
        <title>Spotifiuby - Back Office</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2>Welcome to the Users Page</h2>

        {error ? (
          <p>Error</p>
        ) : users ? (
          <DataGrid
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
        <button
          onClick={() => {
            console.log(data);
            console.log(loading);
            console.log(error);
          }}
        >
          CLICK
        </button>
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
