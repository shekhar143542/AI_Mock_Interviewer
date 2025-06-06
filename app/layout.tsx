import type { Metadata } from "next";
import { Mona_Sans as Geist_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "PrepPro",
  description: "Your professional partner for mastering interviews with real-time mock sessions and expert feedback.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} antialiased bg-pattern` }
      >
        {children}

        <Toaster/>
      </body>
    </html>
  );
}
