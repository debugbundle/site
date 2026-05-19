import type { Metadata } from 'next';
import type { ReactElement, ReactNode } from 'react';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { RootProvider } from 'fumadocs-ui/provider/next';

import { DogfoodingBootstrap } from '@/components/dogfooding-bootstrap';
import { DocsSearchDialog } from '@/components/docs-search-dialog';
import { JsonLdScript } from '@/components/json-ld';
import { siteConfig } from '@/site-config';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  title: {
    default: 'DebugBundle',
    template: '%s | DebugBundle',
  },
  description: siteConfig.description,
  applicationName: 'DebugBundle',
  openGraph: {
    title: 'DebugBundle',
    description: siteConfig.description,
    url: siteConfig.domain,
    siteName: 'DebugBundle',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: siteConfig.domain,
  },
};

export default function RootLayout({ children }: { children: ReactNode }): ReactElement {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DebugBundle',
    url: 'https://debugbundle.com',
    logo: 'https://debugbundle.com/icon.svg',
    description: siteConfig.description,
  };

  return (
    <html className={`${inter.variable} ${jetbrainsMono.variable}`} lang="en" suppressHydrationWarning>
      <body className="font-[family-name:var(--font-inter)] antialiased">
        <JsonLdScript id="organization-jsonld" data={organizationJsonLd} />
        <DogfoodingBootstrap />
        <RootProvider
          theme={{
            attribute: 'class',
            defaultTheme: 'system',
            enableSystem: true,
            disableTransitionOnChange: true,
          }}
          search={{ SearchDialog: DocsSearchDialog, options: { api: '/search-index.json' } }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
