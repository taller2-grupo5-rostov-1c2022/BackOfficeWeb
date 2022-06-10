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
  transformLabel: (s: string) => string = (s) => s
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
          Object.keys(metrics?.[atribute] ?? {}).map((value, i) => {
            // @ts-ignore
            const n = metrics?.[atribute]?.[value];
            return (
              <TableRow key={i}>
                <TableCell>{transformLabel(value)}</TableCell>
                <TableCell>{n}</TableCell>
                <TableCell>
                  {((n / metrics.total) * 100)?.toFixed(2)} %
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
    customUserTable(metrics, title, atribute);

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

  return (
    <>
      <Details metrics={metrics} />
      <Container className={styles.DataContainer}>
        <Classification metrics={metrics} />
        <TimeData metrics={metrics} />
      </Container>
    </>
  );
};

export default Metrics;
