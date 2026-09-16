import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

const cairo = Cairo({
  subsets: ['latin', 'arabic'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Dual Platform Portal | Authentication System',
  description: 'Enterprise Auth & Authz with Clerk, Next.js, and Cairo Typography',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#2E5E99',
          colorBackground: '#121620',
          colorText: '#F1F5F9',
          colorInputBackground: '#0A0D14',
          colorInputText: '#F1F5F9',
          fontFamily: 'var(--font-cairo)',
        },
      }}
    >
      <html lang="en" className={`${cairo.variable} dark`}>
        <body className="font-cairo bg-brand-dark text-slate-100 min-h-screen antialiased flex flex-col">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
