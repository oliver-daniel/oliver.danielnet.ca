import Header from "./Header";

const PageHeader = () => <Header></Header>;

const ProjectDetailLayout = ({ id, children }) => {
  const pageProps = {
    id,
  };
  return (
    <>
      <PageHeader />
      <main {...pageProps} className="page project-detail container grid-lg">
        {children}
      </main>
    </>
  );
};

export default ProjectDetailLayout;
