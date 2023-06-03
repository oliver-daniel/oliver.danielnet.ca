import Link from "next/link";
import Socials from "./Socials";

export default function Footer() {
  return (
    <footer role="contentinfo">
      <div className="container grid-lg columns">
        <div className="column col col-sm-12"></div>
        <div className="column col col-sm-12">
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/credit">Credit</Link>
        </div>
        <div className="column col col-sm-12 row socials">
          {Socials().slice(1)}
        </div>
      </div>
    </footer>
  );
}
