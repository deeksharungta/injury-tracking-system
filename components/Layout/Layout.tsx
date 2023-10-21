import { ReactNode, useState } from "react";
import styles from "./Layout.module.scss";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import SideBar from "../SideBar/SideBar";
import { useUser } from "@auth0/nextjs-auth0/client";
import Modal from "../Modal/Modal";
import Head from "next/head";

type LayoutProps = {
  children: ReactNode;
};

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
      <>
        <Head>
          <title>Injury Tracker</title>
          <meta name="description">
            It is a web application that can be used by an organization (such as
            the police) to easily record and track the injuries reported by a
            person
          </meta>
        </Head>
        <div className={styles.container}>
          {showSidebar ? (
            <Modal onClose={onClose}>
              <SideBar showSidebar={showSidebar} />
            </Modal>
          ) : (
            <SideBar showSidebar={showSidebar} />
          )}
          <div className={styles["inner-container"]}>{children}</div>
          {showSidebar ? (
            <button className={styles.closeButton} onClick={toggleSidebar}>
              <CloseOutlined />
            </button>
          ) : (
            <button className={styles.openButton} onClick={toggleSidebar}>
              <MenuOutlined style={{ fontSize: "16px" }} />
            </button>
          )}
        </div>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>Injury Tracker</title>
          <meta name="description">
            This text will appear in the description section of search engine
            results.
          </meta>
        </Head>
        {children}
      </>
    );
  }
};

export default Layout;
