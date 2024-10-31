import Head from "next/head";
import LandingPage from "./LandingPage";

export default function Home() {
  return (
    <>
      <Head>
        <title>DHS Speech and Debate</title>
        <meta
          name="description"
          content="The Dublin High School Speech and Debate Club empowers students to build confidence, hone public speaking skills, and engage in competitive debate. Through various speech formats and debate events, members develop critical thinking, teamwork, and leadership skills, competing at local and national levels while fostering a supportive community focused on personal growth and academic excellence." 
          // JSON + Admin page later?
        />
      </Head>
      <LandingPage />
    </>
  );
}
