import ProjectDetailLayout from "@/components/ProjectDetailLayout";
import ContentService from "@/lib/ContentService";
import { REPLACEMENTS } from "@/lib/replacePortfolioFigure";
import Head from "next/head";
import { useLayoutEffect } from "react";
import { render } from "react-dom";
import { renderToString } from "react-dom/server";

const ProjectDetailPage = ({ data, content }) => {
  const pageTitle = `${data.name} | Oliver Daniel`;
  // content = replacePortfolioFigure(content, 'vaccine.lofi-mobile')

  useLayoutEffect(() => {
    for (const [key, replacement] of Object.entries(REPLACEMENTS)) {
      const selection = document.querySelector(`figure#${key}`);
      if (!selection) continue;
      render(replacement, selection)
    }
  }, []);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <ProjectDetailLayout id={data.id} headerName={data.name}>
        <section
          id="content"
          dangerouslySetInnerHTML={{
            __html: content || "<h3>Coming soon</h3>",
          }}
          style={{
            minHeight: "75vh",
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

export const include = ["studdibuddi", "vaccine", "srhr"];
export const getStaticPaths = async () => {

  const paths = include.map((id) => ({
    params: {
      id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
