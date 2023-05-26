import "@/styles/main.scss";
import Head from "next/head";
import React from "react";

// https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85?permalink_comment_id=3886909#gistcomment-3886909
// suppress client-side render warnings

if (typeof document === "undefined") {
  React.useLayoutEffect = React.useEffect;
} else if (process.env.NODE_ENV !== "production") {
  const axe = require("@axe-core/react");
  const ReactDOM = require("react-dom");
  axe(React, ReactDOM, 1000);
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="description" content="Oliver Daniel's portfolio site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
