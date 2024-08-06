import App from "@components/App";
import Head from "next/head";
import React from 'react';
import 'react-roulette-pro/dist/index.css';
import {AppProvider} from "../context/AppContext";

const Home = () => {
  return (
    <>
      <Head>
        <title>letsplayto</title>
{/*        <script async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4760699435451370"
                crossOrigin="anonymous"></script>
        <meta name='impact-site-verification'
              content='9120e37b-5149-4abb-9a84-4c951a1f5ec4'/>*/}
      </Head>
      <main>
        <div>
          <AppProvider>
            <App/>
          </AppProvider>
        </div>
      </main>
    </>
  );
}

export default Home;
