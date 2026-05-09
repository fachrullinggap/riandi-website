import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "JALINK ACADEMY",
  description:
    "Master Japanese from Zero with Guided Lessons, and Build Your Future Career in Japan.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-screen overflow-x-hidden">
        
        {/* Background Image */}
        <div className="fixed inset-0 -z-10">
          <Image
            src="/background.png"
            alt="Japanese Background"
            fill
            priority
            className="object-cover blur-[2px] brightness-45"
          />

          {/* Soft Overlay */}
          <div className="absolute inset-0 bg-[#f5e9d7]/60" />
        </div>

        {/* Website Content */}
        <main className="relative z-10">
          {children}
        </main>

      </body>
    </html>
  );
}