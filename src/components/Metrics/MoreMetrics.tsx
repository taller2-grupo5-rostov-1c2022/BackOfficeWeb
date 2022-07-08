import { MoreUserMetricsData } from "../../util/types";
import { Alert, Container } from "@mui/material";
import styles from "./Metrics.module.css";
import { Loading } from "../util/Status/Loading";
import { ErrorBox } from "../util/Status/Error";

type Props = {
  metrics: MoreUserMetricsData | undefined;
};

type Status = {
  loading: boolean;
  error: any;
};

const OtherMetrics = ({ metrics, loading, error }: Props & Status) => {
  return (
    <Container>
      <h2>Other Metrics</h2>
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : error ? (
        <ErrorBox />
      ) : metrics ? (
        <>
          <p>• Password Resets: {metrics?.passwordReset}</p>
        </>
      ) : (
        <Alert severity="info">No data available</Alert>
      )}
    </Container>
  );
};

const MoreMetrics = ({ metrics, loading, error }: Props & Status) => {
  return (
    <Container className={styles.DataContainer}>
      <Container className={styles.Data}>
        <OtherMetrics metrics={metrics} loading={loading} error={error} />
      </Container>
    </Container>
  );
};

export default MoreMetrics;
