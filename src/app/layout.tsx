import type { Metadata, Viewport } from 'next';
import { Archivo, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import { profile, site, themes } from '@/content/portfolio';
import { siteUrl } from '@/lib/site';
import './globals.css';

const archivo = Archivo({ subsets: ['latin', 'latin-ext'], axes: ['wdth'], variable: '--font-archivo', display: 'swap' });
const instrument = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-instrument', display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-jetbrains', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: site.title,
  description: site.description,
  applicationName: `${profile.name} — Portfolio`,
  authors: [{ name: profile.name, url: profile.linkedin }],
  creator: profile.name,
  keywords: ['Full-stack developer', 'AI engineer', 'Real-time voice', 'TypeScript', 'React', 'Next.js', 'Electron', 'Tbilisi'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    url: '/',
    siteName: profile.name,
    title: site.title,
    description: site.description,
    locale: 'en_US',
    firstName: 'Beka',
    lastName: 'Natchkebia',
  },
  twitter: { card: 'summary_large_image', title: site.title, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ECEBE7' },
    { media: '(prefers-color-scheme: dark)', color: '#0F0F0E' },
  ],
};

// Applies the saved theme before first paint (no flash). Keep in sync with ThemeButton.
const themeScript = `try{var t=localStorage.getItem('theme');if(${JSON.stringify(themes)}.indexOf(t)>-1)document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="Paper" className={`${archivo.variable} ${instrument.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <noscript>
          <style>{'.reveal{opacity:1!important;transform:none!important}'}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
