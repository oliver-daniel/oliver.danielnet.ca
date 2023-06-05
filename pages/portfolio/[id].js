import ProjectDetailLayout from "@/components/ProjectDetailLayout";
import ContentService from "@/lib/ContentService";
import replacements from "@/components/PortfolioFigure";
import Head from "next/head";
import { useLayoutEffect } from "react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { render } from "react-dom";

const ProjectDetailPage = ({ data, content }) => {
  const pageTitle = `${data.name} | Oliver Daniel`;

  // const figureRE = /<figure id="(?<id>.+)"><\/figure>/g

  // content = content.replace(figureRE, (match, id, index) => {
  //   const replacement = replacements[id]
  //   return `<figure id="${id}">${renderToString(replacement)}</figure>`
  // })

  // for (const {groups, indices} of content.matchAll(figureRE)) {
  //   const replacement = renderToString(replacements[groups.id]);
  //   const [start, end] = indices
  //   console.log(content.substring(start[0], start[1]))
  //   content = content.substring(0, start) + replacement + content.substring(end)
  // }

  useLayoutEffect(() => {
    document.querySelectorAll("figure").forEach((node) => {
      const replacement = replacements[node.id];
      // TODO: fix!!!!!!
      // Will probably require shopping out to eg mdx
      render(replacement, node);
    });
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

export const getStaticPaths = async () => {
  const publishedProjectIDs = ContentService.getPublishedProjectURIs();

  const paths = publishedProjectIDs.map((id) => ({
    params: {
      id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
