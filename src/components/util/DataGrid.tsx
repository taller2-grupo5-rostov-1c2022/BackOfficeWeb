import { DataGrid } from "@mui/x-data-grid";

const DataGridWrapper = (props: any) => (
  <div
    style={{
      height: "631px",
      width: "80%",
      display: "flex",
      alignItems: "flex-start",
    }}
  >
    <DataGrid {...props} />
  </div>
);

export default DataGridWrapper;
