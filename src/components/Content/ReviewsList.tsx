import Link from "next/link";
import { DataGrid } from "@mui/x-data-grid";
import { useAuthSWR, albumsApi } from "../../services/requests";

const reviewerLink = ({ row: review }: any) => (
  <Link href={`/users/user?uid=${review?.reviewer?.id}`}>
    {review?.reviewer?.name}
  </Link>
);

const ReviewsList = ({ albumId }: { albumId: string | number }) => {
  const {
    data: reviews,
    isValidating: loading,
    error,
  } = useAuthSWR(albumId ? albumsApi + albumId + "/reviews/" : null);

  const columns = [
    { field: "score", headerName: "Score", minWidth: 10, flex: 1 },
    { field: "text", headerName: "Description", minWidth: 250, flex: 3 },
    {
      field: "reviewer",
      headerName: "Reviewer",
      width: 250,
      flex: 1,
      valueGetter: ({ row: review }: any) => review?.reviewer?.name,
      renderCell: reviewerLink,
    },
  ];

  return (
    <DataGrid
      autoHeight={true}
      className="w100"
      loading={!reviews && loading}
      rows={reviews ?? []}
      columns={columns}
      pageSize={10}
      getRowId={(row) => row?.reviewer?.id}
    />
  );
};

export default ReviewsList;
