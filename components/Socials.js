import Link from "next/link";
import config from "../config/next-seo.config";

import { FaAt, FaGithub, FaLinkedin } from "react-icons/fa";

const data = {
  GitHub: [FaGithub, config.github],
  LinkedIn: [FaLinkedin, config.linkedin],
  Email: [FaAt, "/#contact"],
  Portfolio: [() => <span>Portfolio</span>, "/portfolio"],
  Resume: [() => <span>Resume</span>, "/resume"],
};

const Socials = () =>
  Object.entries(data).map(([key, [Icon, href]]) => (
    <Link key={key} href={href} title={key}>
      <Icon />
    </Link>
  ));

export default Socials;
