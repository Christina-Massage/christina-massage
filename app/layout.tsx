import "./globals.css";
import type { Metadata } from "next";

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
      <body>{children}</body>
    </html>
  );
}
