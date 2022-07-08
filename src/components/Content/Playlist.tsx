import { PlaylistType } from "../../util/types";
import KeyValuePair from "../util/KeyValuePair/KeyValuePair";
import styles from "./Content.module.css";
import SongsList from "./SongsList";
import { Alert } from "@mui/material";
import { ErrorBox } from "../util/Status/Error";
import { Loading } from "../util/Status/Loading";
import DisableButton from "./DisableButton";

type PlaylistProps = {
  playlist: PlaylistType;
  loading: boolean;
  error: any;
};
const Playlist = ({ playlist, loading, error }: PlaylistProps) => {
  if (!playlist) {
    if (loading) return <Loading />;
    if (error) return <ErrorBox />;
    return <Alert severity="warning">Playlist not found</Alert>;
  }

  return (
    <div className={styles.Playlist}>
      <div className={" borderbox"}>
        <h1>{playlist?.name}</h1>
        <KeyValuePair label="Description" value={playlist?.description} />
        <KeyValuePair
          label="Creator"
          value={playlist?.creator_id}
          url={"/users/user?uid=" + playlist?.creator_id}
        />
        <div className={styles.disabledButton}>
          <DisableButton
            id={playlist?.id}
            isDisabled={playlist?.blocked}
            type={"playlist"}
          />
        </div>
      </div>
      <h2>Songs</h2>
      <SongsList songs={playlist?.songs ?? []} />
    </div>
  );
};

export default Playlist;
