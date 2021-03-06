import { PlaylistType } from "../../util/types";
import Link from "next/link";
import { DataGrid } from "@mui/x-data-grid";
import { playlistsApi } from "../../services/requests";
import PaginatedTable from "../util/PaginatedTable/PaginatedTable";
import { Button } from "@mui/material";

const PlaylistsButton = ({ song }: any) => {
  return (
    <Button
      variant="contained"
      sx={{
        margin: "-10px 0",
      }}
    >
      <Link href={"/content/playlist?id=" + song.id}>
        <a>View</a>
      </Link>
    </Button>
  );
};

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "name", headerName: "Name", minWidth: 200, flex: 1 },
  { field: "description", headerName: "Description", minWidth: 250, flex: 1 },
  {
    field: "detail",
    headerName: "Detail",
    width: 100,
    renderCell: ({ row: song }: any) => <PlaylistsButton song={song} />,
  },
];

const PlaylistsList = ({ playlists }: { playlists: PlaylistType[] }) => {
  return (
    <DataGrid
      autoHeight={true}
      className="w100"
      rows={playlists ?? []}
      columns={columns}
      pageSize={10}
      getRowId={(row) => row.id}
    />
  );
};

export default PlaylistsList;

export const PlaylistsTable = () => {
  const filters = [
    {
      field: "name",
      label: "Name",
    },
  ];
  return (
    <PaginatedTable url={playlistsApi} columns={columns} filters={filters} />
  );
};
