import "react-icons";
import {
  FaCss3Alt,
  FaHtml5,
  FaNodeJs,
  FaPython,
  FaReact,
} from "react-icons/fa";
import { SiDjango, SiNextdotjs } from "react-icons/si";

const CONVERSIONS = {
  // js
  node: { name: "Node.js", icon: FaNodeJs },
  react: { name: "React", icon: FaReact },
  next: { name: "Next.js", icon: SiNextdotjs },
  // web
  html: { name: "HTML", icon: FaHtml5 },
  css: { name: "CSS", icon: FaCss3Alt },
  // python
  python: { name: "Python", icon: FaPython },
  django: { name: "Django", icon: SiDjango },
};

export const convertIcon = (name) => {
  if (!(name in CONVERSIONS)) {
    throw new Error(`Unknown icon "${name}"`);
  }
  return CONVERSIONS[name];
};
