import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";
import AIChatWidget from '@/components/ai/AIChatWidget';
import PageTransition from "@/components/layout/PageTransition";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const cairo = Cairo({ subsets: ["arabic"], variable: "--font-arabic", weight: ["400", "500", "600", "700", "800", "900"] });

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
      <body className={`${inter.variable} ${cairo.variable} antialiased font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
              <AIChatWidget />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
