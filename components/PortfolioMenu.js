import { useState } from "react";
import cls from "classnames";
import { convertIcon } from "@/lib/SkillIcons";

import Image from "next/image";
import Link from "next/link";

// TODO: hidden-until-found beforematch listener
// https://developer.chrome.com/articles/hidden-until-found/
const Mockup = ({ type, src }) => {
  return (
    <figure className={cls("mockup", type)}>
      <Image
        src={src}
        fill
        alt={`A mockup of the project on ${type}.`}
        sizes="300px"
      />
    </figure>
  );
};

const MockupSection = ({ name, mockups }) =>
  mockups && (
    <div className="mockups columns">
      {Object.entries(mockups).map(([type, src]) => (
        <div
          className={cls("column", "col-md-12", `${type}-container`)}
          key={`mockup-${name}-${type}`}
        >
          <Mockup type={type} src={src} />
        </div>
      ))}
    </div>
  );

const MenuItem = ({ id: path, data, active }) => {
  const skillIcons = data.skills.map(convertIcon);
  const id = path.split("/").slice(-1);

  const TitleWrap = ({ children }) =>
    data.url ? (
      <Link className="accent" href={data.url}>
        {children}
      </Link>
    ) : (
      children
    );

  return (
    <div
      className={cls("menu-item", { active })}
      id={`menu-item-${id}`}
      role="tabpanel"
    >
      <hgroup>
        <TitleWrap>
          <h3
            dangerouslySetInnerHTML={{
              __html: data.name,
            }}
          />
        </TitleWrap>
        <h4>
          {data.role}, {data.term}
        </h4>
      </hgroup>
      {
        <div
          className="description"
          dangerouslySetInnerHTML={{
            __html: data.blurb,
          }}
        />
      }
      {data.published && (
        <div className="see-case-study">
          <Link href={`/portfolio/${id}`} className="accent">See case study</Link>
        </div>
      )}
      <MockupSection name={data.name} mockups={data.mockups} />
      <div className="skill-icons row">
        {skillIcons.map(({ icon: Icon, name }) => (
          <div
            tabIndex={0}
            key={name}
            className="tooltip tooltip-bottom"
            data-tooltip={name}
          >
            <Icon />
          </div>
        ))}
      </div>
    </div>
  );
};

const PortfolioMenu = ({ items }) => {
  const [index, setIndex] = useState(0);

  const handleTabClick = (i) => (e) => {
    e.preventDefault();
    setIndex(i);
  };

  return (
    <div className="portfolio-menu">
      <nav className="tab tab-block" role="tablist">
        {items.map(({ id, data: { short_name } }, i) => (
          <button
            role="tab"
            aria-selected={index === i}
            key={id}
            className={cls("tab-item", { active: index === i })}
            onClick={handleTabClick(i)}
          >
            {short_name}
          </button>
        ))}
      </nav>
      {items.map((props, i) => (
        <MenuItem key={props.id} active={i === index} {...props} />
      ))}
    </div>
  );
};

export default PortfolioMenu;
