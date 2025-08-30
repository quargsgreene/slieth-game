import Link from "next/link";
import type { AppProps } from "next/app";
import React from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <Head>
        <title>Pet Care App</title>
      </Head> */}

      <div>
        <div>
          <Link href="/">Home</Link>
          <Link href="/">Start New Game</Link>
          <Link href="/">Resume Game</Link>
        </div>
      </div>
      <div>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;