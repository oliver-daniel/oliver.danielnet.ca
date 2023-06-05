import Header from "@/components/Header";

const ResumePreview = () => {
  return (
    <>
    <Header />
      <main id="resume" className="container grid-lg">
        <iframe
          src={`${process.env.NEXT_PUBLIC_RESUME_PREVIEW_URL}#view=fitH`}
          height="100%"
          width="100%"
          frameBorder={0}
        />
      </main>
    </>
  );
};

export default ResumePreview;
