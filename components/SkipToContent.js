import { useEffect, useState } from "react";

export default function SkipToContent({ href }) {
  const [handler, setHandler] = useState();
  useEffect(() => {
    const target = href
      ? document.getElementById(href)
      : document.querySelector("main>section");

    setHandler(() => (e) => {
      if (e.keyCode && e.keyCode !== 13) {
        return;
      }
      target.scrollIntoView({
        behavior: "auto",
      });
      target.focus();
      location.hash = target.id;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button
      className="toast"
      id="skip-to-content"
      onClick={handler}
      onSelect={handler}
      tabIndex={1}
    >
      Skip to content
    </button>
  );
}
