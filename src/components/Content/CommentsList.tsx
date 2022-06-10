import Link from "next/link";
import { DataGrid } from "@mui/x-data-grid";
import { useAuthSWR, albumsApi } from "../../services/requests";

const CommenterLink = ({ row: comment }: any) => (
  <Link href={`/users/user?uid=${comment?.commenter?.id}`}>
    {comment?.commenter?.name}
  </Link>
);

const CommentsList = ({ albumId }: { albumId: string | number }) => {
  const {
    data: comments,
    isValidating: loading,
    error,
  } = useAuthSWR(albumId ? albumsApi + albumId + "/comments/" : null);

  const columns = [
    { field: "score", headerName: "Score", minWidth: 50, flex: 1 },
    { field: "text", headerName: "Comment", minWidth: 250, flex: 1 },
    {
      field: "commenter",
      headerName: "Commenter",
      width: 250,
      flex: 1,
      valueGetter: ({ row: comment }: any) => comment?.commenter?.name,
      renderCell: CommenterLink,
    },
  ];

  return (
    <DataGrid
      autoHeight={true}
      className="w100"
      loading={!comments && loading}
      rows={comments ?? []}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[5, 10, 50, 100]}
      getRowId={(row) => row?.commenter?.id}
    />
  );
};

export default CommentsList;
