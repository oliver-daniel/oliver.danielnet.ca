import Link from "next/link";
import Header from "./Header";
import SkipToContent from "./SkipToContent";

const PageHeader = ({ name }) => (
  <Header>
    <section className="navbar-center navbar-section">
      <ul className="breadcrumb">
        <li className="breadcrumb-item">
          <Link href="/portfolio">Portfolio</Link>
        </li>
        <li className="breadcrumb-item">
          <Link href="#">{name}</Link>
        </li>
      </ul>
    </section>
    <section className="navbar-section" id="dummy"></section>
  </Header>
);

const ProjectDetailLayout = ({ id, headerName, children }) => {
  const pageProps = {
    id,
  };
  return (
    <>
      <PageHeader name={headerName} />
      <SkipToContent />
      <main {...pageProps} className="page project-detail container grid-lg">
        {children}
      </main>
    </>
  );
};

export default ProjectDetailLayout;
