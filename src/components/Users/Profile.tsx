import { UserType, AuthUserType } from "../../util/types";
import { parseArray } from "../../util/util";
import RoleButton from "./RoleButton";

import styles from "./Users.module.css";
import KeyValuePair from "../util/KeyValuePair/KeyValuePair";
import SongsList from "../Content/SongsList";
import AlbumsList from "../Content/AlbumsList";
import DisabledButton from "./DisableButton";
import {
  useAddBalance,
  useGetSubName,
  useUserBalance,
} from "../../services/requests";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { useState } from "react";

const defaultPfp = "https://c.tenor.com/XdFv1bbfOdEAAAAd/user-icons.gif";

type ProfileProps = {
  user: UserType;
  authUser: AuthUserType;
  loading: boolean;
  error: any;
};
const Profile = ({ user, authUser, loading, error }: ProfileProps) => {
  const getSubName = useGetSubName();

  const [canRecharge, setCanRecharge] = useState(true);
  const [updatedBalance, setUpdatedBalance] = useState<string>();
  const balance = useUserBalance(authUser?.uid);
  const _addBalance = useAddBalance(authUser?.uid);
  const addBalance = async () => {
    setCanRecharge(false);
    const rechargeAmount = "0.0001";
    try {
      await _addBalance(rechargeAmount);
      toast.success(`Recharged ${rechargeAmount}`);
      setUpdatedBalance((updatedBalance) =>
        String(
          parseFloat(rechargeAmount) + parseFloat(updatedBalance ?? balance)
        )
      );
    } catch (e: any) {
      toast.error(e?.message);
    }
    // setCanRecharge(true);
    // limit use
  };

  if (!user && !authUser) {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error?.message}</div>;
    return <div>User not found</div>;
  }

  if (authUser && !user) {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error?.message}</div>;
    return <div>User {authUser?.email ?? authUser?.uid} has no profile</div>;
  }

  return (
    <div className={styles.Profile}>
      <div className={styles.ProfileHeader + " borderbox"}>
        <div>
          <img
            src={user?.pfp ?? defaultPfp}
            alt="profile picture"
            width="180"
            height="180"
          />
        </div>
        <div>
          <h1>{user?.name}</h1>
          <h3>{authUser?.email}</h3>
          <h5>{authUser?.uid}</h5>
          <RoleButton user={authUser} />
        </div>
        <div className={styles.data}>
          <KeyValuePair
            label="Last Sign In"
            value={authUser?.metadata?.lastSignInTime}
          />
          <KeyValuePair label="Location" value={user?.location} />
          <KeyValuePair
            label="Interests"
            value={parseArray(user?.interests).join(", ")}
          />
          <KeyValuePair
            label="Subscription"
            value={getSubName(user?.sub_level)}
          />
          <KeyValuePair label="Wallet" value={user?.wallet} />
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <KeyValuePair label="Balance" value={updatedBalance ?? balance} />
            <Button
              variant="text"
              sx={{ padding: "0 5px", margin: "0 5px" }}
              onClick={addBalance}
              disabled={!canRecharge}
            >
              Add Balance
            </Button>
          </div>
        </div>
        <div className={styles.disabledButton}>
          <DisabledButton user={authUser} />
        </div>
      </div>

      <h2>Songs</h2>
      <SongsList songs={user?.songs} />

      <h2>Albums</h2>
      <AlbumsList albums={user?.albums} />
    </div>
  );
};

export default Profile;
