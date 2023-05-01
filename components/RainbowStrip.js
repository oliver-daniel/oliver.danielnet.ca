import { useEffect, useLayoutEffect, useState } from "react";

export default function RainbowStrip({ ids }) {
  const [style, setStyle] = useState(null);
  useLayoutEffect(() => {
    const { height: mainHeight } = document
      .getElementById("home")
      .getBoundingClientRect();
    const dimensions = ids.map((id) => {
      const el = document.getElementById(id);
      let { top, bottom } = el.getBoundingClientRect();
      top += window.scrollY;
      bottom += window.scrollY;
      return [top, bottom, (100 * (bottom + top)) / (2 * mainHeight)];
    });

    const els = document.querySelectorAll(".rainbow-strip");

    const palette = getComputedStyle(els[0])
      .getPropertyValue("--rainbow-strip-palette")
      .trim()
      .split(", ");

    palette.unshift("transparent");

    const breakpoints = dimensions
      .map(
        ([_top, _bottom, percentage], i) =>
          `${palette[i]} ${percentage.toFixed(1)}%`
      )
      .join(", ");

    const gradient = `linear-gradient(transparent, ${breakpoints})`;

    setStyle({
      background: gradient,
    });
  }, [ids, setStyle]);

  return Array(2).fill(<div className="rainbow-strip" style={style}></div>);

  //   return (
  //     // <>
  //     //   <div className="rainbow-strip" style={style}>
  //     //     <div className="glow-overlay" style={style}></div>
  //     //   </div>
  //     //   <div className="rainbow-strip" style={style}>
  //     //     <div className="glow-overlay" style={style}></div>
  //     //   </div>
  //     // </>
  //   );
}
