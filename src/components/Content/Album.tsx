import { AlbumType } from "../../util/types";
import KeyValuePair from "../util/KeyValuePair/KeyValuePair";
import styles from "./Content.module.css";
import SongsList from "./SongsList";

type AlbumProps = {
  album: AlbumType;
  loading: boolean;
  error: any;
};
const Album = ({ album, loading, error }: AlbumProps) => {
  if (!album) {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return <div>User not found</div>;
  }

  return (
    <div className={styles.Album}>
      <h1>{album?.name}</h1>
      <div className={styles.header + " borderbox"}>
        <div>
          <img
            src={album?.cover}
            alt={"album cover"}
            width="180"
            height="180"
          />
        </div>
        <div className={styles.data}>
          <KeyValuePair label="Description" value={album?.description} />
          <KeyValuePair label="Genre" value={album?.genre} />
          <KeyValuePair label="Subscription" value={album?.sub_level} />
          <KeyValuePair label="Creator" value={album?.creator_id} />
        </div>
      </div>
      <h1>Songs</h1>
      <SongsList songs={album?.songs} />
    </div>
  );
};

export default Album;
