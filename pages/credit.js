import SkipToContent from "@/components/SkipToContent";
import ContentService from "@/lib/ContentService";

export default function CreditPage({ content }) {
  return (
    <>
      <SkipToContent />
      <main id="credit" className="container">
        <section
          id="content"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const { content } = await ContentService.getPageData("credit");
  return {
    props: {
      content,
    },
  };
}
