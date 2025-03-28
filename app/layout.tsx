import { Heebo, Caveat } from 'next/font/google';
import { Metadata } from 'next';
import './globals.css';
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Providers } from "./providers";

// Force dynamic rendering to prevent issues with SessionProvider
export const dynamic = 'force-dynamic';

// Initialize fonts with weight configurations
const heebo = Heebo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heebo',
  weight: ['300', '400', '500', '600', '700', '800'],
  preload: true,
});

const caveat = Caveat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-caveat',
  weight: ['400', '500', '600', '700'],
  preload: true,
});

export const metadata: Metadata = {
  title: 'Roberto Save Dreams Foundation',
  description: 'Empowering communities and transforming lives across Africa through education, microloans, and sustainable development initiatives.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${heebo.variable} ${caveat.variable}`} suppressHydrationWarning>
      <body className="font-heebo antialiased min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
} 