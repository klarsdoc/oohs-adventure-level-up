import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ooh's Adventure - Level Up Journey",
  description: "Web app interaktif yang dirancang khusus oleh Nonik untuk Ooh berpetualang di usia barunya yang ke-20.",
  keywords: ["Ooh's Adventure", "Ooh's Level Up", "Ooh's Journey", "Ooh and Nonik", "All for K"],
  authors: [{ name: "klarsdoc" }],
  icons: {
    icon: "https://circular-fuchsia-7fgxlhpbzv.edgeone.app/",
  },
  openGraph: {
    title: "Ooh's Adventure - Level Up Journey",
    description: "Web app interaktif yang dirancang khusus oleh Nonik untuk Ooh berpetualang di usia barunya yang ke-20.",
    url: "https://oohs-adventure-level-up.vercel.app",
    siteName: "Vercel",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ooh's Adventure - Level Up Journey",
    description: "Web app interaktif yang dirancang khusus oleh Nonik untuk Ooh berpetualang di usia barunya yang ke-20.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
