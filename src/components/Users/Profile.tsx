import { UserType, AuthUserType } from "../../util/types";
import { parseArray } from "../../util/util";
import RoleButton from "./RoleButton";
import UserSongs from "./UserSongs";
import UserAlbums from "./UserAlbums";

import styles from "./Users.module.css";

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
  return (
    user && (
      <div className={styles.Profile}>
        <img src={user?.pfp} alt="profile picture" width="100" height="100" />
        <h1>{user?.name}</h1>
        <h3>
          {authUser?.email} - {authUser?.uid}
        </h3>
        <RoleButton user={authUser} />
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

        <h2>Songs</h2>
        <UserSongs songs={user?.songs} />

        <h2>Albums</h2>
        <UserAlbums albums={user?.albums} />
      </div>
    )
  );
};

export default Profile;
