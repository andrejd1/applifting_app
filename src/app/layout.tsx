import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { Container } from "@/components/bootstrap";
import React from "react";
import NavBar from "@/components/NavBar/NavBar";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Applifting Cat Blog",
  description: "The best cat blog ever",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar session={session} />
        <main>
          <Container className="py-4">{children}</Container>
        </main>
      </body>
    </html>
  );
}
