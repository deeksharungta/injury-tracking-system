import { useEffect, useState } from "react";
import styles from "./InjuriesReported.module.scss";
import { useUser } from "@auth0/nextjs-auth0/client";

type InjuriesReportedProps = {
  identifier: string;
};

const InjuriesReported: React.FC<InjuriesReportedProps> = ({ identifier }) => {
  const { user } = useUser();
  const [reportCount, setReportCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchReportCount = async () => {
      try {
        const response = await fetch(
          `/api/get-reports-count/?identifier=${identifier}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user,
            }),
          }
        );

        if (response.ok) {
          const { reportCount } = await response.json();
          setReportCount(reportCount);
        } else {
          console.error("Error fetching user email");
        }
      } catch (error) {
        console.error("Error fetching user email", error);
      }
    };

    fetchReportCount();
  }, [identifier, user]);

  return (
    <div className={styles.container}>
      {identifier === "total" && <h3>Total no. of reports created</h3>}
      {identifier === "you" && <h3>Reports created by you</h3>}
      {reportCount !== null ? <p>{reportCount}</p> : <p>Loading...</p>}
    </div>
  );
};

export default InjuriesReported;
