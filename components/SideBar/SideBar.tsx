import styles from "./SideBar.module.scss";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  AreaChartOutlined,
  FileTextOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SideBar() {
  const { user } = useUser();
  const router = useRouter();

  const truncateString = (str: string | undefined | null, maxLen: number) =>
    (str ?? "").length > maxLen
      ? (str ?? "").slice(0, maxLen) + "..."
      : str ?? "";

  return (
    <div className={styles.sidebar}>
      <div className={styles.title}>
        <div>
          <p>Welcome back,</p>
          <span>{truncateString(user?.name, 16)}</span>
        </div>
      </div>
      <nav className={styles.nav}>
        <Link
          href="/dashboard"
          className={`${router.pathname === "/dashboard" ? styles.active : ""}`}
        >
          <AreaChartOutlined style={{ fontSize: "16px", color: "#757D8A" }} />
          Dashboard
        </Link>
        <Link
          href="/reports"
          className={`${router.pathname === "/reports" ? styles.active : ""}`}
        >
          <FileTextOutlined style={{ fontSize: "16px", color: "#757D8A" }} />
          Reports
        </Link>
      </nav>
      <Link href=" /api/auth/logout" className={styles["sign-out"]}>
        <PoweroffOutlined style={{ fontSize: "16px", color: "#757D8A" }} />
        Sign Out
      </Link>
    </div>
  );
}
