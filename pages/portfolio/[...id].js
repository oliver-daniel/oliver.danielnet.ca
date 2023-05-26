import ProjectDetailLayout from "@/components/ProjectDetailLayout";
import ContentService from "@/lib/ContentService";

const ProjectDetailPage = ({ data, content }) => {
  return (
    <ProjectDetailLayout>
      <div
        id="content"
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </ProjectDetailLayout>
  );
};

export default ProjectDetailPage;

export const getStaticProps = async ({ params: { id } }) => {
  const {data, content} = ContentService.findProjectbyURI(id);
  return {
    props: {
      data,
      content
    }
  }
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
