import matter from "gray-matter";
import { marked } from "marked";
import fs from "fs";

export default class ContentService {
  static FS_PREFIX = "content";

  static readDir(subpath, options) {
    const path = [process.cwd(), this.FS_PREFIX, subpath].join("/");
    const dir = fs.readdirSync(path);

    return dir.map((file) => {
      const extIndex = file.indexOf(".");
      const fileId = file.substring(0, extIndex);
      const uri = `${subpath}/${fileId}`;
      return this.getPageData(uri, options);
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
      id: uri,
      data,
      content,
    };
  }

  static getAllProjects(options) {
    const path = [process.cwd(), this.FS_PREFIX, "portfolio"].join("/");
    const dir = fs
      .readdirSync(path, { withFileTypes: true })
      .filter((sub) => sub.isDirectory());

    const projects = {};
    for (const { name: subdir } of dir) {
      projects[subdir] = this.readDir(`portfolio/${subdir}`, options);
    }
    return projects;
  }

  static findProjectbyURI(uri, options) {
    for (const sublist of Object.values(this.getAllProjects(options))) {
      const project = sublist.find(({ id }) => id.endsWith("/" + uri));
      if (project) return project;
    }
      throw new Error(`Project with uri ${uri} not found.`);
  }
}
