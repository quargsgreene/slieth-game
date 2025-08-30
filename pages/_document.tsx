import {Head, Main, NextScript } from "next/document";
import React from 'react';

export default function Document() {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </>
  );
}