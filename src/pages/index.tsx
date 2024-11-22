import Head from "next/head";
import LandingPage from "./LandingPage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Dublin High School Speech & Debate Club</title>
        <meta
          name="description"
          content="The Dublin High School Speech and Debate Club empowers students to build confidence, hone public speaking skills, and engage in competitive debate. Through various speech formats and debate events, members develop critical thinking, teamwork, and leadership skills, competing at local and national levels while fostering a supportive community focused on personal growth and academic excellence." 
        />
        <meta name="keywords" content="DHS, Dublin High School, Speech, Debate, Dublin CA, High School, Club" />
        <meta name="author" content="DHS Speech and Debate, Manning Wu" />
        <meta name="google-site-verification" content="A6YrIHHiVDJIA8O5_fVIFMNVm8W7lxnVZd6TYIy5w4Q" />
      </Head>
      <LandingPage />
    </>
  );
}
