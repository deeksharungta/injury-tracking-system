import Link from "next/link";
import styles from "./ReportHeader.module.scss";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

interface ReportHeaderProps {
  onSearch: (term: string) => void;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchInput(term);
    onSearch(term);
  };

  return (
    <header className={styles.container}>
      <h2 className={styles.heading}>Reports</h2>
      <form className={styles["search-input"]}>
        <SearchOutlined style={{ fontSize: "24px", color: "#757D8A" }} />
        <input
          id="searchInput"
          type="text"
          placeholder="Search for reports"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
      </form>
      <Link href="/reports/create">Add Report</Link>
    </header>
  );
};

export default ReportHeader;
