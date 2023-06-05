import ContentService from "@/lib/ContentService";
import Link from "next/link";
import Head from "next/head";
import Header from "@/components/Header";

const PortfolioPage = ({ projects }) => {
  return (
    <>
      <Head>
        <title>Portfolio | Oliver Daniel</title>
      </Head>
      <Header />
      <main id="portfolio-home" className="page container grid-lg">
        <h1>Portfolio Projects</h1>
        <ul>
          {projects.map(({ link, data }) => (
            <li key={data.short_name}>
              <Link href={link}>{data.short_name}</Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default PortfolioPage;

export const getStaticProps = async () => {
  const projects = ContentService.getPublishedProjectURIs().map((uri) => {
    const {
      data: { short_name },
    } = ContentService.findProjectbyURI(uri);
    return {
      link: `/portfolio/${uri}`,
      data: { short_name },
    };
  });
  //   const projects = [];

  //   for (const sublist of Object.values(ContentService.getAllProjects())) {
  //     projects.push(
  //       ...sublist.map(({ id, data }) => {
  //         const [uri] = id.split("/").slice(-1);
  //         const { short_name } = data;

  //         return {
  //           link: `/portfolio/${uri}`,
  //           data: {
  //             short_name,
  //           },
  //         };
  //       })
  //     );
  //   }

  return {
    props: { projects },
  };
};
