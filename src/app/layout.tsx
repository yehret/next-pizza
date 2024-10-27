import type { Metadata } from "next";
import localFont from "next/font/local";
import { Nunito } from "next/font/google"
import "./globals.css";
import { Header } from "@/components/shared";

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

const nunito = Nunito({
   subsets: ['cyrillic'],
   variable: '--font-nunito',
   weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: "Next Pizza",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} antialiased`}>
         <main className="min-h-screen">
            <Header />
            {children}
         </main>
      </body>
    </html>
  );
}
