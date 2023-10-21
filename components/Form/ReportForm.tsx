import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { BodyComponent } from "reactjs-human-body";
import styles from "./ReportForm.module.scss";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Injuries = {
  [key: string]: string;
};

type ReportFormProps = {
  data?: {
    id: number;
    name: string;
    dateOfInjury: string;
    injuries: Injuries;
  };
};

const ReportForm: React.FC<ReportFormProps> = ({ data }) => {
  const { user } = useUser();
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [dateOfInjury, setDateOfInjury] = useState<string>("");
  const [injuries, setInjuries] = useState<Injuries>({});

  useEffect(() => {
    if (data) {
      setName(data.name);
      setDateOfInjury(data.dateOfInjury.slice(0, 16));
      setInjuries(data.injuries);
    }
  }, [data]);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDateOfInjuryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDateOfInjury(event.target.value);
  };

  const handleBodyPartClick = (partName: string) => {
    setInjuries((prevInjuries) => {
      const updatedInjuries = { ...prevInjuries };
      const propertyExists = updatedInjuries.hasOwnProperty(partName);
      if (!propertyExists) {
        updatedInjuries[partName] = "";
      } else {
        delete updatedInjuries[partName];
      }
      return updatedInjuries;
    });
  };

  const handleDescriptionChange = (partName: string, value: string) => {
    setInjuries((prevInjuries) => ({
      ...prevInjuries,
      [partName]: value,
    }));
  };

  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (
      name === "" ||
      dateOfInjury === "" ||
      Object.keys(injuries).length === 0
    ) {
      toast.error("Please enter all the details");
    } else {
      if (data) {
        updateReport(data.id);
      } else {
        createReport();
      }
      router.push("/reports");
    }
  };

  const createReport = async () => {
    const response = await fetch("/api/save-report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
        name,
        dateOfInjury,
        injuries,
      }),
    });

    if (response.ok) {
      toast.success("Report created successfully");
    } else {
      toast.error("Error creating report");
    }
  };

  const updateReport = async (reportId: number) => {
    const response = await fetch(`/api/edit-report?id=${reportId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        dateOfInjury,
        injuries,
      }),
    });

    if (response.ok) {
      toast.success("Report updated successfully");
    } else {
      toast.error("Error updating report");
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={formSubmitHandler} className={styles.form}>
        <div className={styles["inner-container"]}>
          <div>
            <label>
              Name of Reporter <span>*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter the Reporter's Name"
            />
          </div>
          <div>
            <label>
              Date of Injury <span>*</span>
            </label>
            <input
              type="datetime-local"
              value={dateOfInjury}
              onChange={handleDateOfInjuryChange}
              placeholder="Enter the date and time of injury"
            />
          </div>
        </div>
        <p>Select the injured body part</p>
        <div className={styles["injuries-container"]}>
          <BodyComponent
            partsInput={{
              head: { show: true },
              leftShoulder: { show: true },
              rightShoulder: { show: true },
              chest: { show: true },
              leftArm: { show: true },
              rightArm: { show: true },
              leftHand: { show: true },
              rightHand: { show: true },
              stomach: { show: true },
              leftLeg: { show: true },
              rightLeg: { show: true },
              leftFoot: { show: true },
              rightFoot: { show: true },
            }}
            onClick={(partName: string) => handleBodyPartClick(partName)}
          />
          <div>
            {Object.keys(injuries).map((partName) => (
              <div key={partName}>
                <label>
                  {partName} <span>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Add description"
                  onChange={(e) =>
                    handleDescriptionChange(partName, e.target.value)
                  }
                  value={injuries[partName] || ""}
                />
              </div>
            ))}
          </div>
        </div>
        <button type="submit">
          {data ? "Update Report" : "Create Report"}
        </button>
      </form>
    </>
  );
};

export default ReportForm;
