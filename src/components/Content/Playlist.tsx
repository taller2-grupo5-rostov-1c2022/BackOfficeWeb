import { PlaylistType } from "../../util/types";
import KeyValuePair from "../util/KeyValuePair/KeyValuePair";
import styles from "./Content.module.css";
import SongsList from "./SongsList";

type PlaylistProps = {
  playlist: PlaylistType;
  loading: boolean;
  error: any;
};
const Playlist = ({ playlist, loading, error }: PlaylistProps) => {
  if (!playlist) {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return <div>Playlist not found</div>;
  }

  return (
    <div className={styles.playlist}>
      <h1>{playlist?.name}</h1>
      <div className={" borderbox"}>
        <KeyValuePair label="Description" value={playlist?.description} />
        <KeyValuePair label="Creator" value={playlist?.creator_id} />
      </div>
      <h2>Songs</h2>
      <SongsList songs={playlist?.songs ?? []} />
    </div>
  );
};

export default Playlist;
