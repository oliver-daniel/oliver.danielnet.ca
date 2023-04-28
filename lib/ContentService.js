import matter from "gray-matter";
import { marked } from "marked";
import fs from 'fs'

export default class ContentService {
    static FS_PREFIX = 'content';
    
    static getPageData(uri, renderMarkdown = true){
        const path = [process.cwd(), this.FS_PREFIX, `${uri}.md`].join('/')
        const file = fs.readFileSync(path)
        let { data, content } = matter(file);
        if (renderMarkdown) {
            content = marked(content);
        }
        return {
            data, content
        }
    }
}