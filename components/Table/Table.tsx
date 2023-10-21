import React, { useEffect, useState } from "react";
import styles from "./Table.module.scss";
import {
  EditOutlined,
  DeleteOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  FilterOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

type TableRow = {
  id: number;
  name: string;
  dateOfInjury: string;
  dateOfReport: string;
  injuries: string;
};

const Table: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const { user } = useUser();
  const [data, setData] = useState<TableRow[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<{ [key: string]: "asc" | "desc" }>(
    {
      name: "asc",
      dateOfInjury: "asc",
      dateOfReport: "asc",
    }
  );
  const [filterVisible, setFilterVisible] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const response = await fetch("/api/fetch-reports", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user,
          }),
        });

        if (response.ok) {
          const { reports } = await response.json();
          setData(reports);
        } else {
          console.error("Error fetching user email");
        }
      } catch (error) {
        console.error("Error fetching user email", error);
      }
    };

    fetchUserEmail();
  }, [user]);

  const handleSort = (column: keyof TableRow) => {
    const sortedData = [...data].sort((a, b) => {
      const aValue = a[column] as string;
      const bValue = b[column] as string;

      if (sortOrder[column] === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    setData(sortedData);

    setSortOrder((prevSortOrder) => ({
      ...prevSortOrder,
      [column]: prevSortOrder[column] === "asc" ? "desc" : "asc",
    }));
  };

  const handleEdit = async (id: number) => {
    try {
      router.push(`reports/update/${id}`);
    } catch (error) {
      toast.error("Report update failed");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch("/api/delete-report", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });

      if (response.ok) {
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
        toast.success(`Report deleted successfully`);
      } else {
        toast.error("Error deleting report");
      }
    } catch (error) {
      toast.error("Error deleting report");
    }
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const filterData = () => {
    return data
      .filter(
        (item) =>
          (!startDate || new Date(item.dateOfReport) >= new Date(startDate)) &&
          (!endDate || new Date(item.dateOfReport) <= new Date(endDate))
      )
      .filter((item) =>
        Object.values(item).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
  };

  const filteredData = filterData();

  const handleFilterButtonClick = () => {
    setFilterVisible(!filterVisible);
  };

  return (
    <>
      <ToastContainer />
      <div className={styles.filter}>
        <div>
          <h3>Reports</h3>
          <p>{filteredData.length} results found</p>
        </div>
        <button onClick={handleFilterButtonClick}>
          <FilterOutlined style={{ fontSize: "24px", color: "#757D8A" }} />
        </button>
      </div>
      {filterVisible && (
        <div className={styles["filter-options"]}>
          <div>
            <label htmlFor="start-date">Start Date:</label>
            <input
              id="start-date"
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </div>
          <div>
            <label htmlFor="end-date">End Date:</label>
            <input
              id="end-date"
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
            />
          </div>
        </div>
      )}
      <div style={{ overflowX: "auto" }}>
        <table className={styles["injuries-table"]}>
          <thead className={styles["table-head"]}>
            <tr>
              <th onClick={() => handleSort("name")}>
                <span>Name of Reporter</span>
                {sortOrder.name === "asc" ? (
                  <CaretDownOutlined
                    style={{ fontSize: "12px", color: "#B1B1B1" }}
                  />
                ) : (
                  <CaretUpOutlined
                    style={{ fontSize: "12px", color: "#B1B1B1" }}
                  />
                )}
              </th>
              <th onClick={() => handleSort("dateOfInjury")}>
                <span> Date of Injury</span>
                {sortOrder.dateOfInjury === "asc" ? (
                  <CaretDownOutlined
                    style={{ fontSize: "12px", color: "#B1B1B1" }}
                  />
                ) : (
                  <CaretUpOutlined
                    style={{ fontSize: "12px", color: "#B1B1B1" }}
                  />
                )}
              </th>
              <th onClick={() => handleSort("dateOfReport")}>
                <span> Date of Report</span>
                {sortOrder.dateOfReport === "asc" ? (
                  <CaretDownOutlined
                    style={{ fontSize: "12px", color: "#B1B1B1" }}
                  />
                ) : (
                  <CaretUpOutlined
                    style={{ fontSize: "12px", color: "#B1B1B1" }}
                  />
                )}
              </th>
              <th>
                <span>Injuries</span>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className={styles["table-body"]}>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{new Date(item.dateOfInjury).toLocaleString()}</td>
                <td>{new Date(item.dateOfReport).toLocaleString()}</td>
                <td>
                  <ul>
                    {Object.entries(item.injuries).map(
                      ([injury, description]) => (
                        <li key={injury}>
                          <strong>{injury}:</strong> {description}
                        </li>
                      )
                    )}
                  </ul>
                </td>
                <td>
                  <Link href={`/reports/${item.id}`}>
                    <EyeOutlined
                      style={{ fontSize: "16px", color: "#757D8A" }}
                    />
                  </Link>
                  <button onClick={() => handleEdit(item.id)}>
                    <EditOutlined
                      style={{ fontSize: "16px", color: "#757D8A" }}
                    />
                  </button>
                  <button onClick={() => handleDelete(item.id)}>
                    <DeleteOutlined
                      style={{ fontSize: "16px", color: "#757D8A" }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
