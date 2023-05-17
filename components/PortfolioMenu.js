import { useState } from "react";
import cls from "classnames";
import { convertIcon } from "@/lib/SkillIcons";

import { Laptop, Mobile, Tablet } from "@/lib/mockups";
import Image from "next/image";

// TODO: hidden-until-found beforematch listener
// https://developer.chrome.com/articles/hidden-until-found/
const Mockup = ({ type, src }) => {
  const Container = {
    laptop: Laptop,
    mobile: Mobile,
    tablet: Tablet,
  }[type];

  if (!Container) {
    throw new Error(`Unknown screen type ${type}`);
  }

  return (
    <figure className={cls("mockup", type)}>
      {/* <Container /> */}
      <Image src={src} fill alt={`A mockup of the project on ${type}.`} 
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

const MenuItem = ({ data, content, active }) => {
  const skillIcons = data.skills.map(convertIcon);
  return (
    <div className={cls("menu-item", { active })} role="tabpanel">
      <hgroup>
        <h3
          dangerouslySetInnerHTML={{
            __html: data.name,
          }}
        />
        <h4>
          {data.role}, {data.term}
        </h4>
      </hgroup>
      {
        <div
          className="description"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      }
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
