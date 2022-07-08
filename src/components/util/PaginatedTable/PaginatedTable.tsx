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

type Data = {
  items: any[];
  total: number;
  limit: number;
  offset: number;
};
const useCursorPagination = (data: Data, setOffset: any) => {
  const [pageData, setPageData] = useState({
    page: 0,
    offset: [0],
  });
  const { page, offset } = pageData;
  const totalPages = Math.ceil(data?.total / data?.limit);

  const reset = () => {
    setPageData({
      page: 0,
      offset: [0],
    });
    setOffset(0);
  };

  const hasPrev = page > 0;
  const hasNext = page < totalPages - 1;
  const prev = () => {
    if (!hasPrev) return;
    const newOffset = offset[page - 1];
    setPageData({
      page: page - 1,
      offset,
    });

    setOffset(newOffset);
  };
  const next = () => {
    if (!hasNext) return;
    const newOffset = data?.offset;
    setPageData({
      page: page + 1,
      offset: [...offset, newOffset],
    });

    setOffset(newOffset);
  };

  return {
    items: data?.items,
    hasPrev,
    hasNext,
    prev,
    next,
    reset,
    page: page + 1,
    totalPages,
  };
};

const getQuery = (
  url: string,
  offset: number | string | undefined,
  limit: number,
  filters: FilterValue[]
) => {
  const queryFilters = filters
    .map((filter) => `&${filter.field}=${filter.value}`)
    .join("");

  const offsetQuery = offset ? `&offset=${offset}` : "";

  return url + "?limit=" + limit + offsetQuery + queryFilters;
};

const Cell = ({ data, column }: { data: any; column: Column }): JSX.Element => {
  const value = column.valueGetter
    ? column?.valueGetter({ row: data })
    : data[column.field];

  if (column.renderCell) return column.renderCell({ row: data, value });

  return <>{value}</>;
};

const PaginatedTableBody = ({ items, columns, status }: any) => {
  return status?.any || items?.length === 0 ? (
    <TableBody>
      <TableRow>
        <TableCell
          colSpan={columns.length}
          style={{
            textAlign: "center",
          }}
        >
          {status.display ?? "No data"}
        </TableCell>
      </TableRow>
    </TableBody>
  ) : (
    <TableBody>
      {items?.map((row: any, i: number) => (
        <TableRow key={i}>
          {columns?.map((column: any, j: number) => (
            <TableCell key={j}>
              <Cell data={row} column={column} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

const PaginatedTable = ({ url, columns, filters: filterOptions }: Props) => {
  const [offset, setOffset] = useState();
  const limit = 10;
  const [filters, setFilters] = useState<FilterValue[]>([]);
  const [editFilters, setEditFilters] = useState(false);

  const { data, isValidating, error } = useAuthSWR(
    getQuery(url, offset, limit, filters)
  );
  useAuthSWR(getQuery(url, data?.offset, limit, filters)); // cache next

  const loading = isValidating && !data;
  const { items, hasPrev, hasNext, prev, next, reset, page, totalPages } =
    useCursorPagination(data, setOffset);

  const _setFilters = (filters: FilterValue[]) => {
    setFilters(filters);
    reset();
  };

  const status = {
    loading,
    error,
    data: !!data,
    any: loading || error || !data,
    display: loading
      ? "Loading..."
      : error
      ? error.message
      : !data
      ? "No data"
      : "",
  };

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
          <PaginatedTableBody items={items} columns={columns} status={status} />
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
          <Button onClick={prev} disabled={!hasPrev || status?.any}>
            Previous
          </Button>
          {page}/{totalPages ?? ""}
          <Button onClick={next} disabled={!hasNext || status?.any}>
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
          setFilters={_setFilters}
        />
      ) : null}
    </>
  );
};

export default PaginatedTable;
