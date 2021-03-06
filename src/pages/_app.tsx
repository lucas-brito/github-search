import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import NProgress from "nprogress";
import Head from "next/head";

import "../styles/globals.css";
import "../styles/nprogress.css";
import { useApollo } from "../lib/apollo";

NProgress.configure({ showSpinner: false });

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => NProgress.start();
    const handleRouteChangeComplete = () => NProgress.done();
    const handleRouteChangeError = () => NProgress.done();

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <title>Github Search</title>
        <meta name="description" content="Search for github users profiles" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
