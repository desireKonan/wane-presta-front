import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HomeService Pro - Reliable Home Services at Your Doorstep",
  description: "Find trusted professionals for all your home service needs. From cleaning to repairs, HomeService Pro connects you with top-rated local experts.",
  keywords: "home services, cleaning, repairs, maintenance, plumbing, electrical, handyman, local experts",
  viewport: "width=device-width, initial-scale=1",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}