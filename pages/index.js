import ContentService from "@/lib/ContentService";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import SkipToContent from "@/components/SkipToContent";
import Socials from "@/components/Socials";
import RainbowStrip from "@/components/RainbowStrip";
import config from "@/config/next-seo.config";
import PortfolioMenu from "@/components/PortfolioMenu";

import ImageModal from "@/components/ImageModal";
import Header from "@/components/Header";

const links = [
  ["About", "#about"],
  ["Projects", "#projects"],
  // ["Skills", "#skills"],
  ["Contact", "#contact"],
  ["Portfolio", "/portfolio"],
  ["Resume", "/resume"],
];

const sectionIds = ["hero"].concat(
  links
    .map(([_, id]) => id)
    .filter((id) => id.startsWith("#"))
    .map((id) => id.slice(1))
);

const HomeHeader = () => (
  <Header>
    <section className="navbar-section" id="sections">
      {links.map(([text, href]) => (
        <Link key={text} scroll={false} href={href}>
          {text}
        </Link>
      ))}
    </section>
  </Header>
);

export default function Home({ sections, portfolio }) {
  return (
    <>
      <Head>
        <title>Oliver Daniel</title>
      </Head>
      <SkipToContent href="about" />
      <HomeHeader />
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
              <Image {...config.headshot} sizes="210px" />
              <div />
            </div>
            <div
              className="column col-sm-12 col"
              dangerouslySetInnerHTML={{ __html: sections.about.content }}
            />
          </div>
          {/* TODO */}
          {/* <Link href="#" className="cta hide-sm">
            Download Resume
          </Link> */}
        </section>
        <section id="projects">
          <h2>PROJECTS</h2>
          <PortfolioMenu items={portfolio.dev} />
        </section>
        <section id="design">
          <h2>DESIGN</h2>
          <PortfolioMenu items={portfolio.design} />
          {/* TODO */}
        </section>
        {/* <section id="skills">
          <h2>SKILLS</h2>
          {/* TODO *REMOVEME/}
          <Link href="#" className="cta hide-sm">
            Download Resume
          </Link>
        </section> */}
        <section id="contact">
          <h2>CONTACT</h2>
          <form
            id="contact-form"
            action={process.env.NEXT_PUBLIC_FORMSPREE_URL}
            method="POST"
          >
            <fieldset>
              <div className="form-group">
                <input type="text" placeholder="Name" />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Email" />
              </div>
              <div className="form-group d-hide">
                <input type="text" name="_gotcha" />
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
            <button type="submit" className="button btn-secondary cta">
              Send message
            </button>
          </form>
        </section>
      </main>
      <ImageModal />
    </>
  );
}

export async function getStaticProps() {
  const sections = {};

  for (const section of ["about"]) {
    sections[section] = ContentService.getPageData(`home/${section}`);
  }

  const portfolio = ContentService.getAllProjects();

  for (const subdir in portfolio) {
    portfolio[subdir] = portfolio[subdir].sort(
      ({ data: a }, { data: b }) => a.index - b.index
    );
  }

  return {
    props: {
      sections,
      portfolio,
    },
  };
}
