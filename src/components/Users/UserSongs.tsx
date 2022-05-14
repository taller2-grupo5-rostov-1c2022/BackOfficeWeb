import { SongType } from "../../util/types";
import { DataGrid } from "@mui/x-data-grid";

const ArtistRow = ({ song }: { song: SongType }) => {
  return <div>{song?.artists?.map(({ name }) => name).join(", ")}</div>;
};

const AlbumRow = ({ song }: { song: SongType }) => {
  return (
    <div>
      {song?.album?.name} [{song?.album?.id}]
    </div>
  );
};

const UserSongs = ({ songs }: { songs: SongType[] }) => {
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "genre", headerName: "Genre", width: 200 },
    {
      field: "artists",
      headerName: "Artists",
      width: 400,
      renderCell: ({ row: song }: any) => <ArtistRow song={song} />,
    },
    {
      field: "album.id",
      headerName: "Album",
      width: 400,
      renderCell: ({ row: song }: any) => <AlbumRow song={song} />,
    },
  ];

  return (
    <DataGrid
      autoHeight={true}
      className="w100"
      rows={songs ?? []}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[5, 10, 50, 100]}
      getRowId={(row) => row.id}
    />
  );
};

export default UserSongs;
