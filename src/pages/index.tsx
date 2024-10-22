import Head from "next/head";
import Navbar from "~/components/navbar";
import LandingPage from "./LandingPage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Brand</title>
        <meta
          name="description"
          content="Brand"
        />
        <link rel="icon" href="/logo.jpg" />
      </Head>
      <LandingPage />
    </>
  );
}
