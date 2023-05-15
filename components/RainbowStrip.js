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

    const lightPalette = getComputedStyle(els[0])
      .getPropertyValue("--rainbow-light-palette")
      .trim()
      .split(", ");

    lightPalette.unshift("transparent");

    const breakpoints = dimensions
      .map(
        ([_top, _bottom, percentage], i) =>
          `${lightPalette[i]} ${percentage.toFixed(1)}%`
      )
      .join(", ");

    const gradient = `linear-gradient(transparent, ${breakpoints})`;

    setStyle({
      background: gradient,
    });
  }, [ids, setStyle]);

  return (
    <>
      <div className="rainbow-strip" style={style}></div>
      <div className="rainbow-strip" style={style}></div>
    </>
  );
}
