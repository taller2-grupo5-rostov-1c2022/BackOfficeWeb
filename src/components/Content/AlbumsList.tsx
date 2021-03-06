import { AlbumType } from "../../util/types";
import Link from "next/link";
import { DataGrid } from "@mui/x-data-grid";
import { albumsApi } from "../../services/requests";
import PaginatedTable from "../util/PaginatedTable/PaginatedTable";
import { Button } from "@mui/material";

const AlbumsButton = ({ album }: any) => {
  return (
    <Button
      variant="contained"
      sx={{
        margin: "-10px 0",
      }}
    >
      <Link href={"/content/album?id=" + album.id}>
        <a>View</a>
      </Link>
    </Button>
  );
};

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "name", headerName: "Name", minWidth: 200, flex: 1 },
  { field: "description", headerName: "Description", minWidth: 250, flex: 1 },
  { field: "genre", headerName: "Genre", width: 100 },
  {
    field: "songs",
    headerName: "Songs",
    minWidth: 150,
    flex: 1,
    valueGetter: ({ row: album }: any) =>
      album?.songs?.map(({ name }: any) => name).join(", "),
  },
  {
    field: "detail",
    headerName: "Detail",
    width: 100,
    renderCell: ({ row: album }: any) => <AlbumsButton album={album} />,
  },
];

const AlbumsList = ({ albums }: { albums: AlbumType[] }) => {
  return (
    <DataGrid
      autoHeight={true}
      className="w100"
      rows={albums ?? []}
      columns={columns}
      pageSize={10}
      getRowId={(row) => row.id}
    />
  );
};

export default AlbumsList;

export const AlbumsTable = () => {
  const filters = [
    {
      field: "name",
      label: "Name",
    },
    {
      field: "artist",
      label: "Artist",
    },
    {
      field: "genre",
      label: "Genre",
    },
  ];
  return <PaginatedTable url={albumsApi} columns={columns} filters={filters} />;
};
