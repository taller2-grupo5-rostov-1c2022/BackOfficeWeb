import { AlbumType, SongType } from "../../util/types";
import { DataGrid } from "@mui/x-data-grid";

const SongsRow = ({ songs }: { songs: SongType[] }) => {
  return <div>{songs.map(({ id, name }) => `${name} [${id}]`).join(", ")}</div>;
};

const UserAlbums = ({ albums }: { albums: AlbumType[] }) => {
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "genre", headerName: "Genre", width: 200 },
    { field: "sub_level", headerName: "Subscription", width: 200 },
    {
      field: "songs",
      headerName: "Songs",
      width: 400,
      renderCell: ({ row: album }: any) => (
        <SongsRow songs={album?.songs ?? []} />
      ),
    },
  ];

  return (
    <DataGrid
      autoHeight={true}
      className="w80"
      rows={albums ?? []}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[5, 10, 50, 100]}
      getRowId={(row) => row.id}
    />
  );
};

export default UserAlbums;
