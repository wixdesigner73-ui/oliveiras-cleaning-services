import type { Metadata } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import "./globals.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

// Bodoni Moda: high-contrast fashion/luxury serif. Jost: clean geometric sans for text.
const display = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--f-display",
  display: "swap",
});
const body = Jost({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--f-body", display: "swap" });

export const metadata: Metadata = {
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/icon.svg` },
  title: "Oliveira’s Cleaning Services | Kendall, Miami",
  description:
    "Oliveira’s Cleaning Services — thoughtful cleaning for homes and spaces in Kendall, Miami, Florida. Request a free quote.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
