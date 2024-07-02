import Header from "@/components/Header";
import Head from "next/head";

const ResumePreview = () => {
  return (
    <>
      <Head>
        <title>Resume | Oliver Daniel</title>
      </Head>
      <Header />
      <main id="resume" className="container grid-lg">
        <a
          href={`https://docs.google.com/document/d/${process.env.NEXT_PUBLIC_RESUME_DOC_ID}/export?format=pdf`}
        >
          <button>Download resume</button>
        </a>
        <iframe
          src={`https://docs.google.com/document/d/e/${process.env.NEXT_PUBLIC_RESUME_PREVIEW_ID}/pub?embedded=true`}
          height="100%"
          width="100%"
          frameBorder={0}
        />
      </main>
    </>
  );
};

export default ResumePreview;
