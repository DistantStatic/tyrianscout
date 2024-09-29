'use client'
//import type { Metadata } from "next";
import { createContext, useState } from 'react';
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

/*export const metadata: Metadata = {
  title: "Tyrian Scout",
  description: "Guild Wars 2 Account Details and Dailies",
};*/

export const Context_ApiKey = createContext("");
export const Context_Account = createContext("");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	const [account, setAccount] = useState();
	const [apiKey, setApiKey] = useState();

  return (
    <html lang="en">
	<head>
	<script src="http://localhost:8097"></script>
	</head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Context_ApiKey.Provider value={{"apiKey": apiKey, "setApiKey": setApiKey}}>
	  	  <Context_Account.Provider value={account, setAccount}>
        {children}
			</Context_Account.Provider>
		</Context_ApiKey.Provider>
      </body>
    </html>
  );
}
