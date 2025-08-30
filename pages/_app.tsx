import type { AppProps } from "next/app";
import { Press_Start_2P } from 'next/font/google';
import React from 'react';
import '../css/style.css';
import Nav from "../components/Nav";

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className={pressStart2P.className}>
        <Nav />
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;