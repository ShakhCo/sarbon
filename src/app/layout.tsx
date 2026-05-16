import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n/I18nProvider";

const sans = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sarbon · Barcha yuklar",
  description:
    "Dispatcher cargo list — search, filter and page through freight loads on the Sarbon network.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={`${sans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
