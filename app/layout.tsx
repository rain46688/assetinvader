import type { Metadata } from "next";
import Head from "next/head";
import { Rubik } from 'next/font/google'
import "./globals.css";
import { CustomProvider } from './provider'

// font
const rubik = Rubik({ subsets: ['latin'] })

// title
export const metadata: Metadata = {
  title: "FindMyWealth",
  description: "Find Yout Wealth",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <body className={rubik.className}>
        <CustomProvider>
          {children}
        </CustomProvider>
      </body>
    </html>
  );
}
