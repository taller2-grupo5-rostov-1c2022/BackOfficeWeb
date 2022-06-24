import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useState } from "react";
import { useAuthSWR } from "../../../services/requests";
import { Button } from "@mui/material";
import { FilterList } from "@material-ui/icons";

import styles from "./PaginatedTable.module.css";
import FiltersModal, { Filter, FilterValue } from "./FiltersModal";

type Column = {
  field: string;
  headerName: string;
  valueGetter?: (arg: any) => string | number;
  renderCell?: (arg: any) => JSX.Element;
};

type Props = {
  url: string;
  columns: Column[];
  filters?: Filter[];
};

const Cell = ({ data, column }: { data: any; column: Column }): JSX.Element => {
  const value = column.valueGetter
    ? column?.valueGetter({ row: data })
    : data[column.field];

  if (column.renderCell) return column.renderCell({ row: data, value });

  return <>{value}</>;
};

const PaginatedTable = ({ url, columns, filters: filterOptions }: Props) => {
  const [page, setPage] = useState(0);
  const size = 10;
  const [filters, setFilters] = useState<FilterValue[]>([]);
  const [editFilters, setEditFilters] = useState(false);
  const queryFilters = filters
    .map((filter) => `&${filter.field}=${filter.value}`)
    .join("");

  const { data, isValidating, error } = useAuthSWR(
    url + "?page=" + page + "&size=" + size + queryFilters
  );
  const { data: nextData } = useAuthSWR(
    url + "?page=" + (page + 1) + "&size=" + size + queryFilters
  );
  const loading = isValidating && !data;

  if (error) return <div>Error</div>;
  if (loading) return <div>Loading</div>;
  if (!data) return <div>No data</div>;

  const hasPrev = page > 0;
  const hasNext = nextData && nextData.length > 0;

  return (
    <>
      <TableContainer component={Paper} className={styles.Table}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns?.map((column: any, i: number) => (
                <TableCell key={i}>{column.headerName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row: any, i: number) => (
              <TableRow key={i}>
                {columns?.map((column: any, j: number) => (
                  <TableCell key={j}>
                    <Cell data={row} column={column} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {data?.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  style={{
                    textAlign: "center",
                  }}
                >
                  No data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.Controls}>
        <div className={styles.Filters}>
          {filterOptions ? (
            <Button onClick={() => setEditFilters(true)}>
              <FilterList />
              FILTERS
            </Button>
          ) : null}
        </div>
        <div className={styles.Pagination}>
          <Button
            onClick={() => hasPrev && setPage(page - 1)}
            disabled={!hasPrev}
          >
            Previous
          </Button>
          <Button
            onClick={() => hasNext && setPage(page + 1)}
            disabled={!hasNext}
          >
            Next
          </Button>
        </div>
      </div>
      {filterOptions ? (
        <FiltersModal
          open={editFilters}
          onClose={() => setEditFilters(false)}
          filterOptions={filterOptions}
          filters={filters}
          setFilters={setFilters}
        />
      ) : null}
    </>
  );
};

export default PaginatedTable;
