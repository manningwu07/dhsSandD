import Head from "next/head";
import LandingPage from "./LandingPage";

export default function Home() {
  return (
    <>
      <Head>
        <title>DHS Speech and Debate</title>
        <meta
          name="description"
          content="Brand"
        />
      </Head>
      <LandingPage />
    </>
  );
}
