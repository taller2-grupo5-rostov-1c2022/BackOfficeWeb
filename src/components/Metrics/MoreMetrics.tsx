import { MoreUserMetricsData } from "../../util/types";
import { Container } from "@mui/material";
import styles from "./Metrics.module.css";

type Props = { metrics: MoreUserMetricsData | undefined };

const OtherMetrics = ({ metrics }: Props) => {
  return (
    <Container>
      <h2>Other Metrics</h2>
      <p>• Password Resets: {metrics?.passwordReset}</p>
    </Container>
  );
};

const MoreMetrics = ({ metrics }: Props) => {
  if (!metrics) return null;

  return (
    <Container className={styles.DataContainer}>
      <Container className={styles.Data}>
        <OtherMetrics metrics={metrics} />
      </Container>
    </Container>
  );
};

export default MoreMetrics;
