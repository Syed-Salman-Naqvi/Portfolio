import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Syed Muhammad Salman Naqvi — Creative Developer",
  description: "Portfolio of Syed Muhammad Salman Naqvi — front-end developer and digital creative.",
  icons: { icon: "https://cdn.jsdelivr.net/gh/Syed-Salman-Naqvi/Portfolio@master/images/SOLOWEBCIRCLE.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
