import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChatWidget } from "@/components/ai/AIChatWidget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KillanyCode - Modern Snippet Manager",
  description: "A comprehensive platform for developers to manage and execute code snippets, developed by Eng. Mohamed Elkillany.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <AIChatWidget />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
