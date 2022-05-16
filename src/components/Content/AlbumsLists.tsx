import { AlbumType } from "../../util/types";
import Link from "next/link";
import { DataGrid } from "@mui/x-data-grid";

const AlbumsButton = ({ album }: any) => {
  return (
    <Link href={"/content/album?id=" + album.id}>
      <a>View</a>
    </Link>
  );
};

const AlbumsList = ({ albums }: { albums: AlbumType[] }) => {
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "name", headerName: "Name", minWidth: 200, flex: 1 },
    { field: "description", headerName: "Description", minWidth: 250, flex: 1 },
    { field: "genre", headerName: "Genre", width: 100 },
    { field: "sub_level", headerName: "Subscription", width: 100 },
    {
      field: "songs",
      headerName: "Songs",
      minWidth: 150,
      flex: 1,
      valueGetter: ({ row: album }: any) =>
        album?.songs?.map(({ id, name }: any) => `${name} [${id}]`).join(", "),
    },
    {
      field: "detail",
      headerName: "Detail",
      width: 100,
      renderCell: ({ row: album }: any) => <AlbumsButton album={album} />,
    },
  ];

  return (
    <DataGrid
      autoHeight={true}
      className="w100"
      rows={albums ?? []}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[5, 10, 50, 100]}
      getRowId={(row) => row.id}
    />
  );
};

export default AlbumsList;
