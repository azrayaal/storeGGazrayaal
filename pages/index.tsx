// import type { NextPage } from "next";

import AOS from 'aos';
import Head from 'next/head';
import { useEffect } from 'react';
import Features from '../components/organisms/features';
import Footer from '../components/organisms/footer';
import MainBanner from '../components/organisms/mainBanner';
import TransactionStep from '../components/organisms/mainBanner/transaction-step';
import Navbar from '../components/organisms/navbar';
import Reached from '../components/organisms/reached';
import Story from '../components/organisms/storyhome';

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <Head>
        <title>Store Azrayaal - Get a new Experience in gaming with azrayaal</title>
        <meta name="description" content="Kami menyediakan voucer top up game yang tidak dijual di manapun" />
        <meta property="og:title" content="Store Azrayaal - Get a new Experience in gaming with azrayaal" />
        <meta property="og:description" content="Kami menyediakan voucer top up game yang tidak dijual di manapun" />
        <meta property="og:img" content="/icon/favicon.ico" />
        <meta property="og:url" content="https://storeGGazrayaal" />
      </Head>
      <Navbar />
      <MainBanner />
      <TransactionStep />
      <Features />
      <Reached />
      <Story />
      <Footer />
    </>
  );
}
