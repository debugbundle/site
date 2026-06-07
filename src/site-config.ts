export type ThemeMode = 'light' | 'dark' | 'system';

export const supportedThemes: ThemeMode[] = ['light', 'dark', 'system'];

type NavItem = {
  label: string;
  href: string;
};

type SiteConfig = {
  title: string;
  description: string;
  domain: string;
  appUrl: string;
  githubUrl: string;
  docsHome: string;
  blogHome: string;
  primaryNav: NavItem[];
  footerNav: NavItem[];
  docsNav: NavItem[];
  blogNav: NavItem[];
};

export const siteConfig: SiteConfig = {
  title: 'DebugBundle',
  description: 'Production debugging for AI agents.',
  domain: 'https://debugbundle.com',
  appUrl: 'https://app.debugbundle.com',
  githubUrl: 'https://github.com/debugbundle/debugbundle',
  docsHome: '/docs/',
  blogHome: '/blog/',
  primaryNav: [
    { label: 'Docs', href: '/docs/' },
    { label: 'Pricing', href: '/pricing/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Security', href: '/security/' },
  ],
  footerNav: [
    { label: 'Privacy', href: '/privacy/' },
    { label: 'Terms', href: '/terms/' },
    { label: 'About', href: '/about/' },
    { label: 'Contact', href: '/contact/' },
  ],
  docsNav: [
    { label: 'Overview', href: '/docs/v1/overview/' },
    { label: 'API', href: '/docs/v1/api/' },
    { label: 'CLI', href: '/docs/v1/cli/' },
    { label: 'MCP', href: '/docs/v1/mcp/' },
    { label: 'Webhooks', href: '/docs/v1/webhooks/' },
    { label: 'Reference', href: '/docs/v1/reference/' },
    { label: 'Agent Workflows', href: '/docs/agent-workflows/' },
  ],
  blogNav: [
    { label: 'All Posts', href: '/blog/' },
    { label: 'Why DebugBundle', href: '/blog/why-debugbundle/' },
    { label: 'Agent-First Debugging', href: '/blog/agent-first-debugging/' },
    { label: 'Local-First Development', href: '/blog/local-first-development/' },
    { label: 'Launch Post', href: '/blog/launching-debugbundle/' },
  ],
};
