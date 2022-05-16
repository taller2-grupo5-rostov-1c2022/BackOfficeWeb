import Link from "next/link";
import styles from "./KeyValuePair.module.css";

type KeyValuePairProps = {
  label: string;
  value?: string | number | boolean;
  url?: string;
};
const KeyValuePair = ({ label, value, url }: KeyValuePairProps) => {
  return (
    <div className={styles.KeyValuePair}>
      <div className={styles.Label}>{label} :</div>
      <div className={styles.Value}>
        {url ? (
          <Link href={url}>
            <a>{value}</a>
          </Link>
        ) : (
          value
        )}
      </div>
    </div>
  );
};

export default KeyValuePair;
