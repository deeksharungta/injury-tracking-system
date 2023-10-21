import ReportForm from "@/components/Form/ReportForm";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "@/styles/CreateReport.module.scss";

type Injuries = {
  [key: string]: string;
};

type ReportType = {
  id: number;
  name: string;
  dateOfInjury: string;
  injuries: Injuries;
};

const UpdateReport = () => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const { id } = router.query;
  const [reportData, setReportData] = useState<ReportType>({
    id: 0,
    name: "",
    dateOfInjury: "",
    injuries: {},
  });

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await fetch(`/api/fetch-report?id=${id}`);

        if (response.ok) {
          const { name, dateOfInjury, injuries } = await response.json();

          setReportData({ id: Number(id), name, dateOfInjury, injuries });
        } else {
          console.error("Error fetching report data");
        }
      } catch (error) {
        console.error("Error fetching report data", error);
      }
    };

    if (id) {
      fetchReportData();
    }
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!user) {
    router.push("/");
    return null;
  }

  return (
    <div className={styles["inner-container"]}>
      <h2>Update Injury Details</h2>
      <ReportForm data={reportData} />
    </div>
  );
};

export default UpdateReport;
