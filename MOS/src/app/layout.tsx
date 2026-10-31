import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MOS",
  description: "Multimodal Operating System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <body className="min-h-screen bg-black text-white">{children}</body>
    </html>
  );
}