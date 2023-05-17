import { useLayoutEffect } from "react";

export default function RainbowStrip({ ids }) {
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

    const el = document.querySelector(".rainbow-strip");

    for (const variant of ["light", "dark"]) {
      const name = `--rainbow-${variant}-palette`;
      const palette = getComputedStyle(el)
        .getPropertyValue(name)
        .split(",")
        .map(val => val.trim())

      if (palette[0].startsWith("linear-gradient")) {
        return;
      }

      palette.unshift("transparent");

      const breakpoints = dimensions
        .map(
          ([_top, _bottom, percentage], i) =>
            `${palette[i]} ${percentage.toFixed(1)}%`
        )
        .join(", ");

      document.documentElement.style.setProperty(
        name,
        `linear-gradient(transparent, ${breakpoints})`
      );
    }
  }, [ids]);

  return (
    <>
      <div className="rainbow-strip"></div>
      <div className="rainbow-strip"></div>
    </>
  );
}
