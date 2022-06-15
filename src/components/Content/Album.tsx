import { AlbumType } from "../../util/types";
import KeyValuePair from "../util/KeyValuePair/KeyValuePair";
import styles from "./Content.module.css";
import SongsList from "./SongsList";
import DisableButton from "./DisableButton";
import CommentsList from "./CommentsList";

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
          <h1>{album?.name}</h1>
          <KeyValuePair label="Description" value={album?.description} />
          <KeyValuePair label="Genre" value={album?.genre} />
          <KeyValuePair
            label="Creator"
            value={album?.album_creator_id}
            url={"/users/user?uid=" + album?.album_creator_id}
          />
        </div>
        <div className={styles.disabledButton}>
          <DisableButton
            id={album?.id}
            isDisabled={album?.blocked}
            type={"album"}
          />
        </div>
      </div>
      <h2>Songs</h2>
      <SongsList songs={album?.songs} />
      <h2>Comments</h2>
      <CommentsList albumId={album?.id} />
    </div>
  );
};

export default Album;
