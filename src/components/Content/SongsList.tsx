import { SongType } from "../../util/types";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
import { songsApi, useGetSubName, useSubLevels } from "../../services/requests";
import PaginatedTable from "../util/PaginatedTable/PaginatedTable";
import { Button } from "@mui/material";

const SongsButton = ({ song }: any) => {
  return (
    <Button variant="contained">
      <Link href={"/content/song?id=" + song.id}>
        <a>View</a>
      </Link>
    </Button>
  );
};

const AlbumLink = ({ row: song }: any) => {
  return (
    <Link href={"/content/album?id=" + song?.album?.id}>
      <a>{song?.album?.name}</a>
    </Link>
  );
};

const getColumns = (getSubName: any) => [
  { field: "id", headerName: "ID", width: 50 },
  { field: "name", headerName: "Name", minWidth: 200, flex: 1 },
  { field: "description", headerName: "Description", minWidth: 250, flex: 1 },
  { field: "genre", headerName: "Genre", width: 100 },
  {
    field: "album",
    headerName: "Album",
    width: 150,
    valueGetter: ({ row: song }: any) => song?.album?.name,
    renderCell: AlbumLink,
  },
  {
    field: "artists",
    headerName: "Artists",
    minWidth: 200,
    flex: 1,
    valueGetter: ({ row: song }: any) =>
      song?.artists?.map((artist: any) => artist?.name).join(", "),
  },
  {
    field: "sub_level",
    headerName: "Level",
    minWidth: 80,
    flex: 1,
    valueGetter: ({ row: song }: any) => getSubName(song?.sub_level),
  },
  {
    field: "detail",
    headerName: "Detail",
    width: 100,
    renderCell: ({ row: song }: any) => <SongsButton song={song} />,
  },
];

const SongsList = ({ songs }: { songs: SongType[] }) => {
  const getSubName = useGetSubName();
  const columns = getColumns(getSubName);

  return (
    <DataGrid
      autoHeight={true}
      className="w100"
      rows={songs ?? []}
      columns={columns}
      pageSize={10}
      getRowId={(row) => row.id}
    />
  );
};

export default SongsList;

export const SongsTable = () => {
  const getSubName = useGetSubName();
  const columns = getColumns(getSubName);
  const subLevels = useSubLevels();
  const subOptions = subLevels.map((subLevel) => ({
    label: subLevel?.name,
    value: String(subLevel?.level),
  }));

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
    {
      field: "sub_level",
      label: "Level",
      options: subOptions ?? [],
    },
  ];

  return <PaginatedTable url={songsApi} columns={columns} filters={filters} />;
};
