import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "death in numbers",
  description: "web application to visualize mortality data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
