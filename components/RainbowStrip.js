import { useLayoutEffect, useState } from "react";

export default function RainbowStrip({ ids }) {
  useLayoutEffect(() => {
    const breakpoints = ids.map((id) => {
      const el = document.getElementById(id);
      console.log(el);
      const { top, bottom } = el.getBoundingClientRect();
      return [top, bottom];
    });

    const els = Array.from(document.querySelectorAll(".rainbow-strip"));

    const palette = getComputedStyle(els[0])
      .getPropertyValue("--rainbow-strip-palette")
      .trim()
      .split(", ");

      
  }, [ids]);

  return (
    <>
      <div className="rainbow-strip"></div>
      <div className="rainbow-strip"></div>
    </>
  );
}
