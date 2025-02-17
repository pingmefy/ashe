import { ADSection } from "@components/ADSection";
import { Toaster } from "@components/components/ui/toaster";
import { Header } from "@components/Header";
import { Navbar } from "@components/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
        <Navbar />
        <Header />
        <div className="lg:grid lg:grid-cols-[21%_auto_21%] w-full min-h-screen">
          <aside>
            <ADSection />
          </aside>
          <main className={"overflow-x-hidden"}>
            <div className={"flex flex-col items-center "}>{children}</div>
          </main>
          <aside>
            <ADSection />
          </aside>
        </div>
      </div>
      <Toaster />
    </body>
  </html>
);
export default Layout;
