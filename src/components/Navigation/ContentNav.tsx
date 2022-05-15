import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Nav.module.css";

const Tab = ({ url, label }: { url: string; label: string }) => {
  const router = useRouter();
  const currentRoute = router.pathname;
  const isActive = currentRoute === url;

  return (
    <Link href={url}>
      <a aria-selected={isActive}>{label}</a>
    </Link>
  );
};

const ContentNav = () => {
  return (
    <div className={styles.ContentNav}>
      <Tab url="/content/songs" label="Songs" />
      <Tab url="/content/albums" label="Albums" />
      <Tab url="/content/playlists" label="Playlists" />
    </div>
  );
};

export default ContentNav;
