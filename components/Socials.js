import Link from "next/link";
import config from "../config/next-seo.config";

import { FaAt, FaGithub, FaGitlab, FaLinkedin } from "react-icons/fa";

const Socials = () => [
  <Link key="email" href="#contact">
    <FaAt />
  </Link>,
  <Link key="github" href={config.github}>
    <FaGithub />
  </Link>,
  <Link key="gitlab" href={config.gitlab}>
    <FaGitlab />
  </Link>,
  <Link key="linkedin" href={config.linkedin}>
    <FaLinkedin />
  </Link>,
];

export default Socials;
