import type { Metadata, Viewport } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
});

export const metadata: Metadata = {
  title: "StreamFlex - Premium OTT Platform",
  description: "Watch unlimited movies, TV shows and original content on StreamFlex. Stream anytime, anywhere.",
  keywords: "streaming, movies, tv shows, entertainment, OTT platform",
  authors: [{ name: "StreamFlex Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${ubuntu.variable} font-ubuntu antialiased bg-black text-white min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
