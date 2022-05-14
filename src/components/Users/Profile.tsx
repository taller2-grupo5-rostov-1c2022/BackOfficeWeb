import { UserType, AuthUserType } from "../../util/types";
import { parseArray } from "../../util/util";
import RoleButton from "./RoleButton";
import UserSongs from "./UserSongs";
import UserAlbums from "./UserAlbums";

import styles from "./Users.module.css";

const defaultPfp = "https://c.tenor.com/XdFv1bbfOdEAAAAd/user-icons.gif";

type KeyValuePairProps = {
  label: string;
  value: string;
};
const KeyValuePair = ({ label, value }: KeyValuePairProps) => {
  return (
    <div className={styles.KeyValuePair}>
      <div className={styles.Label}>{label} :</div>
      <div className={styles.Value}>{value}</div>
    </div>
  );
};

type ProfileProps = {
  user: UserType;
  authUser: AuthUserType;
  loading: boolean;
  error: any;
};
const Profile = ({ user, authUser, loading, error }: ProfileProps) => {
  if (!user && !authUser) {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return <div>User not found</div>;
  }

  if (authUser && !user) {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return <div>User {authUser?.email ?? authUser?.uid} has no profile</div>;
  }

  return (
    <div className={styles.Profile}>
      <div className={styles.ProfileHeader}>
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
          <KeyValuePair
            label="Disabled"
            value={authUser?.disabled ? "Yes" : "No"}
          />
          <KeyValuePair label="Location" value={user?.location} />
          <KeyValuePair
            label="Interests"
            value={parseArray(user?.interests).join(", ")}
          />
          <KeyValuePair label="Wallet" value={user?.wallet} />
        </div>
      </div>

      <h2>Songs</h2>
      <UserSongs songs={user?.songs} />

      <h2>Albums</h2>
      <UserAlbums albums={user?.albums} />
    </div>
  );
};

export default Profile;
