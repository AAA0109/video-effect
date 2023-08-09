import { Html, Head, Main, NextScript } from "next/document";
// import { Partytown } from "@builder.io/partytown/react";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="description"
          content="Create jaw-dropping mockups/animations. Just drag-drop your screen-recordings, select a template, and export"
        />
        <meta name="theme-color" content="#0069FE" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/icons/apple-touch.png"></link>
        {/* ==== Third Party Scripts ==== */}
        {/* <Partytown debug={true} forward={["dataLayer.push"]} /> */}
        {/* Analytics */}

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
