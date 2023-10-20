import ReportForm from "@/components/Form/ReportForm";
import SideBar from "@/components/SideBar/SideBar";
import styles from "@/styles/CreateReport.module.scss";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";

const CreateReport = () => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (user) {
    return (
      <div className={styles["inner-container"]}>
        <h2>Add Injury Details</h2>
        <ReportForm />
      </div>
    );
  } else {
    router.push("/");
  }
};

export default CreateReport;
