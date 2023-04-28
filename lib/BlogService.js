import config from "../config/next-seo.config";

export default class BlogService {
  static endpoint = "api/read/json";
  static params = {
    type: "text",
    filter: "text",
    callback: "_",
  };

  static formatPostData(post) {
    const {
      "regular-title": title,
      "reblog-key": key,
      "url-with-slug": url,
    } = post;

    return {
      title,
      key,
      url,
    };
  }

  static async getPosts(options = {}) {
    const { blog } = config;
    const url = new URL(`${blog}/${this.endpoint}`);
    for (const [key, value] of Object.entries(this.params)) {
      url.searchParams.append(key, value);
    }
    url.searchParams.append("num", options.num || 3);
    const response = await fetch(url);
    const text = (await response.text()).slice(2, -2);
    const { posts } = JSON.parse(text);
    return posts.map(this.formatPostData);
  }
}
