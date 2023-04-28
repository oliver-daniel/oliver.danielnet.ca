import BlogService from "@/lib/BlogService";

const TestPage = ({ posts }) => {
  return (
    <main id="testpage">
      <div className="box"></div>
      <ul>
        {posts.map(({ title, key }) => (
          <li key={key}>{title}</li>
        ))}
      </ul>
    </main>
  );
};

export async function getStaticProps() {
  const posts = []; // await BlogService.getPosts();

  if (process.env.NODE_ENV !== "development") {
    return { notFound: true };
  }

  return {
    props: {
      posts,
    },
  };
}

export default TestPage;
