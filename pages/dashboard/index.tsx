import BarGraph from "@/components/BarGraph/BarGraph";
import InjuriesReported from "@/components/InjuriesReported/InjuriesReported";
import DonutChart from "@/components/PieChart/PieChart";
import styles from "@/styles/Dashboard.module.scss";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";

const Dashboard = () => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (user) {
    return (
      <div className={styles["inner-container"]}>
        <h2>Dashboard</h2>
        <div className={styles.center}>
          <div className={styles["flex-row"]}>
            <BarGraph />
          </div>
          <div className={styles["flex-row"]}>
            <DonutChart />
            <div className={styles["flex-column"]}>
              <InjuriesReported identifier="you" />
              <InjuriesReported identifier="total" />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    router.push("/");
  }
};

export default Dashboard;
