import {ADSection} from "@components/ADSection";
import {Content} from "@components/Content";
import {Header} from "@components/Header";
import {Navbar} from "@components/Navbar";
import type { Metadata } from "next";
import { Inter} from "next/font/google";
import React from "react";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LetsPlayTo",
  description: "-",
};

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => (
  <html lang="en">
  <body className={inter.className}>
  <div className={"flex flex-col min-h-[100vh] w-full"}>
    <Navbar/>
    <Header/>
    <Content>
      <ADSection/>
      <div className={"flex flex-col min-h-[100vh] flex-1 items-center"}>
        {children}
      </div>
      <ADSection/>
    </Content>
  </div>

  </body>
  </html>
);

export default Layout;
