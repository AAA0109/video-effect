import { useEffect } from "react";
import { SessionProvider } from "next-auth/react"
import Head from "next/head";
import "styles/globals.scss";
import { ThemeProvider } from "next-themes";
import { ShortcutProvider } from "@shopify/react-shortcuts";
import { RecoilRoot, useRecoilState } from "recoil";
import { Toaster } from "react-hot-toast";
import { DirectusProvider } from 'react-directus';
import Modal from "components/Modal";
import { modalState } from "state/global";

function MyApp({ Component, pageProps: { session, ...pageProps }}) {
  // Crisp Chat
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID) return () => {};

    // Initialize Crisp Chat
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;

    (() => {
      const doc = document;
      const script = doc.createElement("script");
      script.src = "https://client.crisp.chat/l.js";
      script.async = 1;
      doc.getElementsByTagName("body")[0].appendChild(script);
    })();
  });

  return (
    <SessionProvider session={session}>
      <DirectusProvider apiUrl="https://vs.contentportal.link">
        <RecoilRoot>
          <Head>
            <meta
              name="viewport"
              content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
            />
          </Head>
          <ShortcutProvider>
            <ThemeProvider attribute="class">
              <Component {...pageProps} />
              <Toaster />
              <ModalHandler />
            </ThemeProvider>
          </ShortcutProvider>
        </RecoilRoot>
      </DirectusProvider>
    </SessionProvider>
  );
}

const ModalHandler = () => {
  const [modal] = useRecoilState(modalState);

  if (modal.isOpen) return <Modal content={modal?.content} />;

  return <></>;
};

export default MyApp;
