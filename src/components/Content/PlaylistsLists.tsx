import { PlaylistType } from "../../util/types";
import Link from "next/link";
import { DataGrid } from "@mui/x-data-grid";

const PlaylistsButton = ({ song }: any) => {
  return (
    <Link href={"/content/playlist?id=" + song.id}>
      <a>View</a>
    </Link>
  );
};

const PlaylistsList = ({ playlists }: { playlists: PlaylistType[] }) => {
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "name", headerName: "Name", minWidth: 200, flex: 1 },
    { field: "description", headerName: "Description", minWidth: 250, flex: 1 },
    { field: "creator_id", headerName: "Creator", width: 100 },
    {
      field: "detail",
      headerName: "Detail",
      width: 100,
      renderCell: ({ row: song }: any) => <PlaylistsButton song={song} />,
    },
  ];

  return (
    <DataGrid
      autoHeight={true}
      className="w100"
      rows={playlists ?? []}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[5, 10, 50, 100]}
      getRowId={(row) => row.id}
    />
  );
};

export default PlaylistsList;
