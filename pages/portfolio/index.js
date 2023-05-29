import ContentService from "@/lib/ContentService";
import Link from "next/link";
import { include } from "./[id]";

const PortfolioPage = ({ projects }) => {
  return (
    <main id="portfolio-home" className="page container grid-lg">
      The main portfolio page. Styling coming soon.
      <ul>
        {projects.map(({ link, data }) => (
          <li key={data.short_name}>
            <Link href={link}>{data.short_name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default PortfolioPage;

export const getStaticProps = async () => {
  const projects = include.map((uri) => {
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
