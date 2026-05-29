import type { ReactElement, ReactNode } from 'react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  ArrowUpRight,
  Coffee,
  Gem,
  Hexagon,
  Package,
  PanelsTopLeft,
  Smartphone,
  SquareTerminal,
  Workflow,
} from 'lucide-react';
import { CodeBlockTab, CodeBlockTabs, CodeBlockTabsList } from 'fumadocs-ui/components/codeblock';
import { ServerCodeBlock } from 'fumadocs-ui/components/codeblock.rsc';

import { QuickInstallInteractionScope, QuickInstallTabTrigger } from './quick-install-interaction-scope';

const focusOutlineClassName =
  'focus-visible:[outline-color:var(--site-focus)] focus-visible:[outline-style:solid] focus-visible:[outline-width:2px] focus-visible:[outline-offset:2px]';
const focusButtonClassName =
  'focus-visible:[outline-color:var(--site-focus)] focus-visible:[outline-style:solid] focus-visible:[outline-width:2px] focus-visible:[outline-offset:2px]';
const linkClassName =
  `font-medium !text-[var(--site-docs-link)] !underline !decoration-[var(--site-docs-link)] decoration-[0.08em] underline-offset-[0.16em] transition-[color,text-decoration-color,text-decoration-thickness] duration-200 hover:!text-[var(--site-docs-link-hover)] hover:!decoration-[var(--site-docs-link-hover)] hover:!decoration-[0.12em] focus-visible:rounded-sm ${focusOutlineClassName}`;
const sectionLinkClassName =
  `inline-flex items-center justify-center gap-2 rounded-full border border-[var(--site-border)] bg-[var(--site-surface)] px-4 py-2 text-sm font-medium leading-none !text-[var(--site-text-muted)] transition hover:border-[var(--site-border-strong)] hover:!text-[var(--site-text)] focus-visible:[border-color:var(--site-focus)] ${focusButtonClassName}`;
const ctaButtonClassName =
  `inline-flex items-center gap-2 rounded-full bg-fd-primary px-4 py-2 text-sm font-medium !text-fd-primary-foreground transition hover:bg-fd-primary/80 hover:!text-fd-primary-foreground ${focusButtonClassName}`;
const tabTriggerClassName =
  'relative inline-flex items-center gap-2 text-nowrap rounded-lg border border-transparent px-2 pt-1.5 pb-3 text-sm font-medium leading-none text-[var(--site-text-muted)] transition-[border-color,color] hover:text-[var(--site-text)] focus-visible:[border-color:var(--site-focus)] focus-visible:outline-none data-[state=active]:text-[var(--site-text)] after:absolute after:inset-x-2 after:bottom-0 after:h-px after:bg-transparent data-[state=active]:after:bg-[var(--site-text)] [&_svg]:size-3.5 [&_svg]:shrink-0';

type RuntimeGuideDefinition = {
  value: string;
  label: string;
  icon: LucideIcon;
  installLang?: string;
  installCode?: string;
  setupLang?: string;
  setupCode?: string;
  description: ReactNode;
  action?: ReactNode;
};

type RuntimeGuide = RuntimeGuideDefinition & {
  installBlock: ReactNode | null;
  setupBlock: ReactNode | null;
};

async function renderHighlightedBlock(lang: string, code: string): Promise<ReactNode> {
  return ServerCodeBlock({
    lang,
    code,
    codeblock: { className: 'mx-0 mt-0 mb-0 overflow-hidden rounded-xl' },
  });
}

export async function QuickInstallGuide(): Promise<ReactElement> {
  const cliBlock = await renderHighlightedBlock(
    'bash',
    ['npm install -g @debugbundle/cli', 'debugbundle --version'].join('\n'),
  );

  const sdkGuideDefinitions: RuntimeGuideDefinition[] = [
    {
      value: 'node-js',
      label: 'Node.js',
      icon: Hexagon,
      installLang: 'bash',
      installCode: 'npm install @debugbundle/sdk-node',
      setupLang: 'typescript',
      setupCode: [
        "import DebugBundle from '@debugbundle/sdk-node';",
        '',
        'DebugBundle.init({',
        "  projectToken: 'local',",
        "  environment: 'production',",
        "  service: 'api',",
        '});',
      ].join('\n'),
      description: (
        <>
          Framework exports include Express, Fastify, Next.js, and browser relay handlers. See{' '}
          <Link className={linkClassName} href="/docs/sdks/node/">
            Node.js SDK
          </Link>
          .
        </>
      ),
    },
    {
      value: 'browser',
      label: 'Browser',
      icon: PanelsTopLeft,
      installLang: 'bash',
      installCode: 'npm install @debugbundle/sdk-browser',
      setupLang: 'typescript',
      setupCode: [
        "import DebugBundle from '@debugbundle/sdk-browser';",
        '',
        'DebugBundle.init({',
        "  endpoint: '/debugbundle/browser',",
        "  environment: 'production',",
        "  service: 'frontend',",
        '});',
      ].join('\n'),
      description: (
        <>
          Browser events should usually go through a same-origin backend relay. See{' '}
          <Link className={linkClassName} href="/docs/sdks/browser/">
            Browser SDK
          </Link>{' '}
          and{' '}
          <Link className={linkClassName} href="/docs/sdks/browser-relay/">
            Browser Relay Setup
          </Link>
          .
        </>
      ),
    },
    {
      value: 'python',
      label: 'Python',
      icon: Package,
      installLang: 'bash',
      installCode: 'pip install debugbundle-python',
      setupLang: 'python',
      setupCode: [
        'import debugbundle',
        '',
        'debugbundle.init(',
        '    project_token="local",',
        '    environment="production",',
        '    service="api",',
        ')',
      ].join('\n'),
      description: (
        <>
          Django, Flask, FastAPI, structlog, and loguru integrations are included. See{' '}
          <Link className={linkClassName} href="/docs/sdks/python/">
            Python SDK
          </Link>
          .
        </>
      ),
    },
    {
      value: 'php',
      label: 'PHP',
      icon: Package,
      installLang: 'bash',
      installCode: 'composer require debugbundle/sdk-php',
      setupLang: 'php',
      setupCode: [
        '<?php',
        '',
        'use DebugBundle\\DebugBundle;',
        '',
        'DebugBundle::init([',
        "    'projectToken' => 'local',",
        "    'environment' => 'production',",
        "    'service' => 'api',",
        ']);',
      ].join('\n'),
      description: (
        <>
          Laravel, Symfony, and Monolog integrations are included. See{' '}
          <Link className={linkClassName} href="/docs/sdks/php/">
            PHP SDK
          </Link>
          .
        </>
      ),
    },
    {
      value: 'java-spring',
      label: 'Java / Spring',
      icon: Coffee,
      installLang: 'xml',
      installCode: [
        '<dependency>',
        '  <groupId>com.debugbundle</groupId>',
        '  <artifactId>debugbundle-spring-boot-starter</artifactId>',
        '  <version>0.1.1</version>',
        '</dependency>',
      ].join('\n'),
      setupLang: 'yaml',
      setupCode: [
        'debugbundle:',
        '  project-token: ${DEBUGBUNDLE_PROJECT_TOKEN}',
        '  environment: production',
        '  service: api',
        '  project-mode: connected',
      ].join('\n'),
      description: (
        <>
          Use this path for Spring Boot 3.x. For servlet WARs, JAX-RS services, WildFly, or JBoss deployments, use the broader{' '}
          <Link className={linkClassName} href="/docs/sdks/java/">
            Java SDK
          </Link>{' '}
          setup.
        </>
      ),
    },
    {
      value: 'go',
      label: 'Go',
      icon: Package,
      installLang: 'bash',
      installCode: 'go get github.com/debugbundle/debugbundle-go',
      setupLang: 'go',
      setupCode: [
        'client := debugbundle.New(debugbundle.Config{',
        '	ProjectToken: os.Getenv("DEBUGBUNDLE_PROJECT_TOKEN"),',
        '	Environment:  "production",',
        '	Service:      "api",',
        '})',
        'defer func() { _ = client.Flush(context.Background()) }()',
      ].join('\n'),
      description: (
        <>
          net/http, Gin, Echo, slog, zap, zerolog, local file transport, remote capture policy, probes, and browser relay handlers are included. See{' '}
          <Link className={linkClassName} href="/docs/sdks/go/">
            Go SDK
          </Link>
          .
        </>
      ),
    },
    {
      value: 'ruby',
      label: 'Ruby',
      icon: Gem,
      installLang: 'ruby',
      installCode: 'gem "debugbundle"',
      setupLang: 'ruby',
      setupCode: [
        'require "debugbundle"',
        '',
        'DebugBundle.init(',
        '  project_token: ENV["DEBUGBUNDLE_PROJECT_TOKEN"],',
        '  environment: "production",',
        '  service: "api"',
        ')',
      ].join('\n'),
      description: (
        <>
          Rails, Rack, Sidekiq, Ruby Logger, Semantic Logger, local file transport, remote capture policy, probes, and browser relay handlers are included. See{' '}
          <Link className={linkClassName} href="/docs/sdks/ruby/">
            Ruby SDK
          </Link>
          .
        </>
      ),
    },
    {
      value: 'android',
      label: 'Android',
      icon: Smartphone,
      installLang: 'kotlin',
      installCode: [
        'dependencies {',
        '    implementation(platform("com.debugbundle:debugbundle-android-bom:0.1.0"))',
        '    implementation("com.debugbundle:debugbundle-android")',
        '    implementation("com.debugbundle:debugbundle-android-okhttp")',
        '}',
      ].join('\n'),
      setupLang: 'kotlin',
      setupCode: [
        'DebugBundle.init(',
        '    application = this,',
        '    config = DebugBundleConfig(',
        '        projectToken = BuildConfig.DEBUGBUNDLE_PROJECT_TOKEN,',
        '        environment = "production",',
        '        service = "android-app",',
        '    ),',
        ')',
      ].join('\n'),
      description: (
        <>
          Android runtime capture, crash/ANR replay, WorkManager flushing, OkHttp, Ktor client, Navigation, Compose, Timber, offline queueing, and probes are included in the pre-release Android SDK. See{' '}
          <Link className={linkClassName} href="/docs/sdks/android/">
            Android SDK
          </Link>
          .
        </>
      ),
    },
    {
      value: 'swift',
      label: 'Swift',
      icon: Smartphone,
      installLang: 'swift',
      installCode: [
        '.package(',
        '    url: "https://github.com/debugbundle/debugbundle-swift",',
        '    from: "0.1.0"',
        ')',
      ].join('\n'),
      setupLang: 'swift',
      setupCode: [
        'DebugBundle.initialize(',
        '    DebugBundleConfig(',
        '        projectToken: Bundle.main.debugBundleProjectToken,',
        '        environment: "production",',
        '        service: "ios-app"',
        '    )',
        ')',
      ].join('\n'),
      description: (
        <>
          Swift runtime capture, UIKit and SwiftUI breadcrumbs, URLSession, Alamofire, SwiftLog, crash replay, offline queueing, and probes are included in the Swift SDK. See{' '}
          <Link className={linkClassName} href="/docs/sdks/swift/">
            Swift SDK
          </Link>
          .
        </>
      ),
    },
    {
      value: 'wordpress',
      label: 'WordPress',
      icon: Workflow,
      description: (
        <>
          <p>
            Download the plugin ZIP from the{' '}
            <a className={linkClassName} href="https://github.com/debugbundle/debugbundle-wordpress/releases">
              debugbundle-wordpress releases page
            </a>
            , then upload it in WordPress under <span className="font-medium">Plugins -&gt; Add New -&gt; Upload Plugin</span>.
          </p>
          <div>
            <a className={ctaButtonClassName} href="https://github.com/debugbundle/debugbundle-wordpress/releases" target="_blank">
              Get WordPress plugin
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
          <p>
            After activation, open <span className="font-medium">Settings -&gt; DebugBundle</span>, paste your project token, and save. The plugin bundles the PHP and browser SDKs, creates the same-origin browser relay, and keeps the project token server-side. See{' '}
            <Link className={linkClassName} href="/docs/integrations/wordpress/">
              WordPress Plugin
            </Link>
            .
          </p>
        </>
      ),
    },
  ];

  const sdkGuides: RuntimeGuide[] = await Promise.all(
    sdkGuideDefinitions.map(async (guide) => ({
      ...guide,
      installBlock: guide.installLang && guide.installCode ? await renderHighlightedBlock(guide.installLang, guide.installCode) : null,
      setupBlock: guide.setupLang && guide.setupCode ? await renderHighlightedBlock(guide.setupLang, guide.setupCode) : null,
    })),
  );

  return (
    <QuickInstallInteractionScope>
      <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--site-text)]">Quick installation guide</h2>
          <p className="text-base leading-7 text-[var(--site-text-muted)]">
            Install the CLI first, then add the SDK or ingestion path that matches your runtime.
          </p>
        </div>
        <Link className={sectionLinkClassName} href="/docs/installation/" style={{ outlineColor: 'var(--site-focus)' }}>
          Full installation guide
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <SquareTerminal className="size-5 text-[var(--site-accent)]" aria-hidden="true" />
          <h3 className="text-xl font-semibold tracking-tight text-[var(--site-text)]">CLI</h3>
        </div>
        {cliBlock}
        <p className="text-sm leading-7 text-[var(--site-text-muted)]">
          The CLI runs setup, local processing, incident inspection, token management, cloud connection, and verification.
        </p>
      </div>

      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <Package className="size-5 text-[var(--site-accent)]" aria-hidden="true" />
          <h3 className="text-xl font-semibold tracking-tight text-[var(--site-text)]">SDKs</h3>
        </div>
        <CodeBlockTabs
          className="mt-2 overflow-hidden rounded-2xl border border-[var(--site-border)] bg-[var(--site-surface)] shadow-[0_1px_0_rgba(0,0,0,0.04)]"
          defaultValue="node-js"
        >
          <CodeBlockTabsList className="border-b border-[var(--site-border)] bg-[var(--site-surface)] px-4 pt-3">
            {sdkGuides.map((guide) => (
              <QuickInstallTabTrigger key={guide.value} className={tabTriggerClassName} value={guide.value}>
                <guide.icon aria-hidden="true" />
                {guide.label}
              </QuickInstallTabTrigger>
            ))}
          </CodeBlockTabsList>
          {sdkGuides.map((guide) => (
            <CodeBlockTab
              key={guide.value}
              className="space-y-5 rounded-b-2xl bg-[var(--site-surface)] px-4 pb-5 pt-5 md:px-5"
              value={guide.value}
            >
              {guide.installBlock || guide.setupBlock ? (
                <div>
                  {guide.installBlock ? <div>{guide.installBlock}</div> : null}
                  {guide.setupBlock ? <div className="pt-4">{guide.setupBlock}</div> : null}
                </div>
              ) : null}
              <div className="space-y-4 text-sm leading-7 text-[var(--site-text-muted)]">{guide.description}</div>
              {guide.action ? <div className="pt-1">{guide.action}</div> : null}
            </CodeBlockTab>
          ))}
        </CodeBlockTabs>
      </div>
      </section>
    </QuickInstallInteractionScope>
  );
}
