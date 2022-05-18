import { SongType } from "../../util/types";
import KeyValuePair from "../util/KeyValuePair/KeyValuePair";
import styles from "./Content.module.css";
import DisableButton from "./DisableButton";

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
      <div className="borderbox">
        <h1>{song?.name}</h1>
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
        <div className={styles.disabledButton}>
          <DisableButton
            id={song?.id}
            isDisabled={song?.blocked}
            type={"song"}
          />
        </div>
      </div>
    </div>
  );
};

export default Song;
