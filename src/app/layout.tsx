import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import { SettingsProvider } from '@/components/providers/settings-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Al-Quran • Read with Peace',
  description: 'Beautiful, responsive Quran reader with Arabic text and English translation',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} text-zinc-100`}>
        <SettingsProvider>
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            {children}
          </main>
        </SettingsProvider>
      </body>
    </html>
  );
}