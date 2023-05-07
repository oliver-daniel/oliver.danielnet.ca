import { Fragment, useState } from "react";
import cls from "classnames";
import { convertIcon } from "@/lib/SkillIcons";

const MenuItem = ({ data, content, active }) => {
  const skillIcons = data.skills.map(convertIcon);
  return (
    <div className={cls("menu-item", { active })}>
        <hgroup>
            <h3 dangerouslySetInnerHTML={{
                __html: data.name
            }}/>
            <h4>{data.role}, {data.term}</h4>
        </hgroup>
        {<div dangerouslySetInnerHTML={{
            __html: content
        }}/> }
      <div className="skill-icons">
        {skillIcons.map(({ icon: Icon, name }) => (
          <Icon key={name} />
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
      <div className="tabs">
        <ul className="tab tab-block">
          {items.map(({ id, data: { short_name } }, i) => (
            <li
              key={id}
              className={cls("tab-item", { active: index === i })}
              onClick={handleTabClick(i)}
            >
              {short_name}
            </li>
          ))}
        </ul>
        {items.map((props, i) => (
          <MenuItem key={props.id} active={i === index} {...props} />
        ))}
      </div>
    </div>
  );
};

export default PortfolioMenu;
