import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import { Caveat } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Providers } from "./providers";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Roberto Save Dreams Foundation",
  description: "Empowering communities through education, microloans, and sustainable development initiatives",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en"
      suppressHydrationWarning={true}
      className={`${heebo.variable} ${caveat.variable}`}
    >
      <body className="antialiased min-h-screen flex flex-col" suppressHydrationWarning={true}>
        <Providers>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
