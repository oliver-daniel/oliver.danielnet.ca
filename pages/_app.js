import "@/styles/main.scss";
import React from "react";

// https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85?permalink_comment_id=3886909#gistcomment-3886909
// suppress client-side render warnings

if (typeof document === "undefined") React.useLayoutEffect = React.useEffect;

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
