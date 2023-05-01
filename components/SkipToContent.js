import { useEffect, useState } from "react";

export default function SkipToContent({ href    }) {
  const [handler, setHandler] = useState();
  useEffect(() => {
    const target = href
      ? document.getElementById(href)
      : document.querySelector("section");

    setHandler(() => () => {
      target.scrollIntoView({
        behavior: "auto",
      });
      target.focus();
      if (href) {
        location.hash = href;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button id="skip-to-content" onClick={handler} className="secondary">
      Skip to content
    </button>
  );
}
