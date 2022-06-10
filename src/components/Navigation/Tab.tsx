import Link from "next/link";
import { useRouter } from "next/router";

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

export default Tab;
