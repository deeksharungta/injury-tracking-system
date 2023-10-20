import { ReactNode, useEffect, useState } from "react";
import styles from "./Layout.module.scss";
import SideBar from "../SideBar/SideBar";
import { useUser } from "@auth0/nextjs-auth0/client";
import Modal from "../Modal/Modal";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, error, isLoading } = useUser();
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const onClose = () => {
    setShowSidebar(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (user) {
    return (
      <div className={styles.container}>
        <SideBar />
        <div className={styles["inner-container"]}>{children}</div>
      </div>
    );
  } else {
    return <>{children}</>;
  }
};

export default Layout;
