import { MetricsData } from "../../util/types";
import { Container } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import styles from "./Metrics.module.css";

type SectionProps = { metrics: MetricsData };
type Props = { metrics: MetricsData | undefined };

const customUserTable = (
  metrics: MetricsData,
  title: string,
  atribute: string,
  transformLabel: (s: string) => string = (s) => s,
  sortTable?: boolean
) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>{title}</TableCell>
          <TableCell>Users</TableCell>
          <TableCell>Fraction</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          // @ts-ignore
          Object.keys(metrics?.[atribute] ?? {})
            .sort((value1: string, value2: string): number => {
              if (!sortTable) return 0;
              return (
                // @ts-ignore
                metrics?.[atribute]?.[value2]?.total -
                // @ts-ignore
                metrics?.[atribute]?.[value1]?.total
              );
            })
            .map((value, i) => {
              // @ts-ignore
              const datum = metrics?.[atribute]?.[value];
              const total = datum?.total;
              const title = datum?.details?.description ?? null;
              return (
                <TableRow key={i} title={title}>
                  <TableCell>{transformLabel(value)}</TableCell>
                  <TableCell>{total}</TableCell>
                  <TableCell>
                    {((total / metrics.total) * 100)?.toFixed(2)} %
                  </TableCell>
                </TableRow>
              );
            })
        }
      </TableBody>
    </Table>
  </TableContainer>
);
const transformDays = (days: string) => {
  const nDays = parseInt(days);
  if (nDays == 1) return "Day";
  return days + " days";
};

const Details = ({ metrics }: SectionProps) => {
  return (
    <Container className={styles.Details}>
      <h1>{metrics.total} Total Users</h1>
      <h3>{metrics.disabled} disabled</h3>
    </Container>
  );
};
const Classification = ({ metrics }: SectionProps) => {
  const display = (title: string, atribute: string) =>
    customUserTable(metrics, title, atribute, undefined, true);

  return (
    <Container className={styles.Data}>
      <Container>
        <h2>Roles</h2>
        {display("Role", "role")}
      </Container>
      <Container>
        <h2>Providers</h2>
        {display("Provider", "provider")}
      </Container>
    </Container>
  );
};

const TimeData = ({ metrics }: SectionProps) => {
  const display = (title: string, atribute: string) =>
    customUserTable(metrics, title, atribute, transformDays);
  return (
    <Container className={styles.Data}>
      <Container>
        <h2>New Accounts</h2>
        {display("In the last", "new")}
      </Container>
      <Container>
        <h2>Sign Ins</h2>
        {display("In the last", "signedIn")}
      </Container>
    </Container>
  );
};

const Metrics = ({ metrics }: Props) => {
  if (!metrics) return null;

  const debug = true;

  return (
    <>
      <Details metrics={metrics} />
      <Container className={styles.DataContainer}>
        <Classification metrics={metrics} />
        <TimeData metrics={metrics} />
      </Container>
      {debug && (
        <button onClick={() => console.log(metrics)}>[DEBUG LOG]</button>
      )}
    </>
  );
};

export default Metrics;
