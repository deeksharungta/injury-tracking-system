import styles from "@/styles/Home.module.scss";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";

export default function Home() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    router.push("/reports");
  }

  return (
    <main className={styles.container}>
      <h1>InjuryTracker</h1>
      <h2>Streamlining Incident Documentation for Organizations</h2>
      <p>
        In todays dynamic environment, efficient record-keeping is crucial,
        especially for organizations like the police. Introducing InjuryTracker,
        a robust web application designed to simplify the process of recording
        and tracking reported injuries.
      </p>
      <Link href="/api/auth/login">Get Started</Link>
    </main>
  );
}
