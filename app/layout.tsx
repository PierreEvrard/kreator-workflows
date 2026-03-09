import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kreator Bootcamp — Workflows",
  description: "Workflows visuels interactifs pour le bootcamp Kreator",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-[#0f0f0f] text-white antialiased">{children}</body>
    </html>
  );
}
