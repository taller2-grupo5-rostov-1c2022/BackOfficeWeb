import { SongType } from "../../util/types";
import KeyValuePair from "../util/KeyValuePair/KeyValuePair";
import styles from "./Content.module.css";

type SongProps = {
  song: SongType;
  loading: boolean;
  error: any;
};
const Song = ({ song, loading, error }: SongProps) => {
  if (!song) {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return <div>User not found</div>;
  }

  return (
    <div className={styles.Song}>
      <h1>{song?.name}</h1>
      <div className="borderbox">
        <KeyValuePair label="Description" value={song?.description} />
        <KeyValuePair label="Genre" value={song?.genre} />
        <KeyValuePair
          label="Artist"
          value={song?.artists?.map(({ name }) => name).join(", ")}
        />
        <KeyValuePair
          label="Album"
          value={song?.album?.name}
          url={"/content/album?id=" + song?.album?.id}
        />
      </div>
    </div>
  );
};

export default Song;
