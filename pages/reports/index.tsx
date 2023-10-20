import Table from "@/components/Table/Table";
import ReportHeader from "@/components/Header/ReportHeader";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";

export default function Reports() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const saveUserDetails = async (user: any) => {
    const response = await fetch("/api/get-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    });

    if (response.ok) {
      router.push("/reports");
    }
  };

  useEffect(() => {
    saveUserDetails(user);
  }, [user]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (user) {
    return (
      <>
        <ReportHeader onSearch={(term) => setSearchTerm(term)} />
        <Table searchTerm={searchTerm} />
      </>
    );
  } else {
    router.push("/");
  }
}
