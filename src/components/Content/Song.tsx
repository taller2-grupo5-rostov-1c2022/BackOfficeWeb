import { useGetSubName } from "../../services/requests";
import { SongType } from "../../util/types";
import KeyValuePair from "../util/KeyValuePair/KeyValuePair";
import { Alert } from "@mui/material";
import { ErrorBox } from "../util/Status/Error";
import { Loading } from "../util/Status/Loading";
import DisableButton from "./DisableButton";
import styles from "./Content.module.css";

type SongProps = {
  song: SongType;
  loading: boolean;
  error: any;
};
const Song = ({ song, loading, error }: SongProps) => {
  const getSubName = useGetSubName();

  if (!song) {
    if (loading) return <Loading />;
    if (error) return <ErrorBox />;
    return <Alert severity="warning">Song not found</Alert>;
  }

  return (
    <div className={styles.Song}>
      <div className="borderbox">
        <h1>{song?.name}</h1>
        <KeyValuePair label="Description" value={song?.description} />
        <KeyValuePair label="Level" value={getSubName(song?.sub_level)} />
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
