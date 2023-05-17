import ContentService from "@/lib/ContentService";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import SkipToContent from "@/components/SkipToContent";
import Socials from "@/components/Socials";
import RainbowStrip from "@/components/RainbowStrip";
import config from "@/config/next-seo.config";
import PortfolioMenu from "@/components/PortfolioMenu";

import Logo from "../public/svg/logo.svg";
import useScrollDirection, { UP } from "@/lib/useScrollDirection";

const links = [
  ["About", "#about"],
  ["Projects", "#projects"],
  ["Design", "#design"],
  ["Skills", "#skills"],
  ["Contact", "#contact"],
];

const sectionIds = links.map(([_, id]) => id.slice(1));
sectionIds.unshift("hero");

const Header = () => {
  const scrollDirection = useScrollDirection()
  return (
    <header data-show={scrollDirection === UP} className="navbar hide-sm container grid-lg" role="banner">
      <section className="navbar-section">
        <div className="hide-sm" id="logo">
          <Link href="#" tabIndex={-1}>
            <Image src={Logo} alt="" />
          </Link>
        </div>
      </section>
      <section className="navbar-section" id="sections">
        {links.map(([text, href]) => (
          <Link key={text} scroll={false} href={href}>
            {text}
          </Link>
        ))}
      </section>
    </header>
  );
};

export default function Home({ sections, portfolio }) {
  return (
    <>
      <Head>
        <title>Oliver Daniel</title>
        <meta name="description" content="Oliver Daniel's portfolio site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SkipToContent href="about" />
      <Header />
      <main id="home" className="container grid-lg" role="main">
        <RainbowStrip ids={sectionIds} />
        <section id="hero" className="centered">
          <hgroup>
            <h1>Oliver Daniel</h1>
            <h2>Full Stack Developer</h2>
          </hgroup>
          <div className="row socials">
            <Socials />
          </div>
        </section>
        <section id="about">
          <h2>ABOUT</h2>
          <div className="columns col-gapless">
            <div className="img-container column col-sm-12 col">
              <Image {...config.headshot} sizes="210px"/>
              <div />
            </div>
            <div
              className="column col-sm-12 col"
              dangerouslySetInnerHTML={{ __html: sections.about.content }}
            />
          </div>
          {/* TODO */}
          <Link href="#" className="cta hide-sm">
            Download Resume
          </Link>
        </section>
        <section id="projects">
          <h2>PROJECTS</h2>
          <PortfolioMenu items={portfolio.dev} />
          {/* TODO */}
          <Link href="#" className="cta hide-sm">
            Full Portfolio
          </Link>
        </section>
        <section id="design">
          <h2>DESIGN</h2>
          <PortfolioMenu items={portfolio.design} />
          {/* TODO */}
          <Link href="#" className="cta hide-sm">
            Full Portfolio
          </Link>
        </section>
        <section id="skills">
          <h2>SKILLS</h2>
          {/* TODO */}
          <Link href="#" className="cta hide-sm">
            Download Resume
          </Link>
        </section>
        <section id="contact">
          <h2>CONTACT</h2>
          <form id="contact-form" action="POST">
            <fieldset>
              <div className="form-group">
                <input type="text" placeholder="Name" />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Email" />
              </div>
              <div className="form-group">
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Message"
                />
              </div>
            </fieldset>
          </form>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const sections = {};

  for (const section of ["about"]) {
    sections[section] = ContentService.getPageData(`home/${section}`);
  }

  const portfolio = {};

  for (const subdir of ["dev", "design"]) {
    portfolio[subdir] = ContentService.readDir(`home/portfolio/${subdir}`).sort(
      (a, b) => a.data.index - b.data.index
    );
  }

  return {
    props: {
      sections,
      portfolio,
    },
  };
}
