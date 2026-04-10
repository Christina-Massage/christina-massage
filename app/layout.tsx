import "./globals.css";
import type { Metadata } from "next";
import CookieBanner from "./components/CookieBanner"; // relativer Import

export const metadata: Metadata = {
  title: "Christina Massage",
  description: "Massage, Entspannung und Wohlbefinden in Hohenpeißenberg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}