import { AlbumType } from "../../util/types";
import KeyValuePair from "../util/KeyValuePair/KeyValuePair";
import styles from "./Content.module.css";
import SongsList from "./SongsList";
import { Alert } from "@mui/material";
import { ErrorBox } from "../util/Status/Error";
import { Loading } from "../util/Status/Loading";
import DisableButton from "./DisableButton";
import { ReviewsTable } from "./ReviewsList";

type AlbumProps = {
  album: AlbumType;
  loading: boolean;
  error: any;
};
const Album = ({ album, loading, error }: AlbumProps) => {
  if (!album) {
    if (loading) return <Loading />;
    if (error) return <ErrorBox />;
    return <Alert severity="warning">Album not found</Alert>;
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
            value={album?.creator_id}
            url={"/users/user?uid=" + album?.creator_id}
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
      <h2>Reviews</h2>
      <ReviewsTable albumId={album?.id} />
    </div>
  );
};

export default Album;
