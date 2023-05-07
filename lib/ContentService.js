import matter from "gray-matter";
import { marked } from "marked";
import fs from "fs";

export default class ContentService {
  static FS_PREFIX = "content";

  static readDir(subpath, options = undefined) {
    const path = [process.cwd(), this.FS_PREFIX, subpath].join("/");
    const dir = fs.readdirSync(path);

    return dir.map((file) => {
      const extIndex = file.indexOf(".");
      const fileId = file.substring(0, extIndex)
      const uri = `${subpath}/${fileId}`;
      return {id: fileId, ...this.getPageData(uri, options)};
    });
  }

  static getPageData(uri, options = { renderMarkdown: true }) {
    const path = [process.cwd(), this.FS_PREFIX, `${uri}.md`].join("/");
    const file = fs.readFileSync(path);
    let { data, content } = matter(file);
    if (options.renderMarkdown) {
      content = marked(content);
    }
    return {
      data,
      content,
    };
  }
}
