import ProjectDetailLayout from "@/components/ProjectDetailLayout";
import ContentService from "@/lib/ContentService";
import Head from "next/head";

const ProjectDetailPage = ({ data, content }) => {
  const pageTitle = `${data.name} | Oliver Daniel`;
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <ProjectDetailLayout>
        <section
          id="content"
          dangerouslySetInnerHTML={{
            __html: content || "<h3>Coming soon</h3>",
          }}
          style={{
            minHeight: "75vh"
          }}
        />
      </ProjectDetailLayout>
    </>
  );
};

export default ProjectDetailPage;

export const getStaticProps = async ({ params: { id } }) => {
  const { data, content } = ContentService.findProjectbyURI(id);
  return {
    props: {
      data,
      content,
    },
  };
};

export const getStaticPaths = async () => {
  const exclude = [];

  const paths = [];

  const projects = ContentService.getAllProjects();

  for (const subdir in projects) {
    paths.push(
      ...projects[subdir]
        .filter(({ id }) => !exclude.includes(id))
        .map(({ id }) => ({
          params: {
            id: id.split("/").slice(-1),
          },
        }))
    );
  }

  return {
    paths,
    fallback: false,
  };
};
