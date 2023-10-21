import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import styles from "@/styles/ViewReport.module.scss";
import { useEffect, useState } from "react";

type ReportType = {
  name: string;
  dateOfInjury: string;
  dateOfReport: string;
  injuries: { [key: string]: any }[];
};

const ViewReport = () => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const { id } = router.query;
  const [reportData, setReportData] = useState<ReportType>({
    name: "",
    dateOfInjury: "",
    dateOfReport: "",
    injuries: [],
  });

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch(`/api/fetch-report?id=${id}`);

        if (response.ok) {
          const { name, dateOfInjury, dateOfReport, injuries } =
            await response.json();

          setReportData({ name, dateOfInjury, dateOfReport, injuries });
        } else {
          console.error("Error fetching report");
        }
      } catch (error) {
        console.error("Error fetching report", error);
      }
    };
    fetchReport();
  }, [id]);

  const formatInjuries = () => {
    const injuries = reportData.injuries;
    const formattedInjuries = Object.keys(injuries).map((bodyPart: any) => {
      return `${bodyPart}: ${injuries[bodyPart]}`;
    });
    return formattedInjuries.join(", ");
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (user) {
    return (
      <div className={styles["inner-container"]}>
        <h2>View Injury Details</h2>
        <h3>
          Name: <p>{reportData.name}</p>
        </h3>
        <h3>
          Date of Injury:{" "}
          <p>{new Date(reportData.dateOfInjury).toLocaleString()}</p>
        </h3>
        <h3>
          Date of Report:{" "}
          <p>{new Date(reportData.dateOfReport).toLocaleString()}</p>
        </h3>
        <h3>
          Injuries: <p>{formatInjuries()}</p>
        </h3>
      </div>
    );
  } else {
    router.push("/");
  }
};

export default ViewReport;
