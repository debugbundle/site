import { loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { server } from 'fumadocs-mdx/runtime/server';
import type { InternalTypeConfig } from 'fumadocs-mdx/runtime/types';

import type * as Config from '../source.config';

import * as blogLaunchPost from '../content/blog/launching-debugbundle.mdx';
import * as blogWhyPost from '../content/blog/why-debugbundle.mdx';
import * as blogAgentFirstPost from '../content/blog/agent-first-debugging.mdx';
import * as blogLocalFirstPost from '../content/blog/local-first-development.mdx';
import * as docsAgentWorkflowsPage from '../content/docs/agent-workflows.mdx';
import * as docsAgentWorkflowsSkillFilePage from '../content/docs/agent-workflows/skill-file.mdx';
import * as docsAgentWorkflowsRecipesPage from '../content/docs/agent-workflows/automation-recipes.mdx';
import * as docsBillingPage from '../content/docs/billing.mdx';
import * as docsCapturePolicy from '../content/docs/capture-policy.mdx';
import * as docsAlertsPage from '../content/docs/alerts.mdx';
import * as docsBundlesIndexPage from '../content/docs/bundles/index.mdx';
import * as docsBundlesImprovementBundlesPage from '../content/docs/bundles/improvement-bundles.mdx';
import * as docsBundlesSchemaPage from '../content/docs/bundles/schema.mdx';
import * as docsIncidentsIndexPage from '../content/docs/incidents/index.mdx';
import * as docsIncidentsReproductionPage from '../content/docs/incidents/reproduction.mdx';
import * as docsIntegrationsWordpressPage from '../content/docs/integrations/wordpress.mdx';
import * as docsProjectSetupIndexPage from '../content/docs/project-setup/index.mdx';
import * as docsProjectSetupProfilePage from '../content/docs/project-setup/profile.mdx';
import * as docsProjectSetupLocalOnlyPage from '../content/docs/project-setup/local-only.mdx';
import * as docsProjectSetupConnectPage from '../content/docs/project-setup/connect-to-cloud.mdx';
import * as docsProbesPage from '../content/docs/probes.mdx';
import * as docsWebhooksEventsPage from '../content/docs/webhooks/events.mdx';
import * as docsWebhooksVerificationPage from '../content/docs/webhooks/verification.mdx';
import * as docsApiAlertsPage from '../content/docs/api/alerts.mdx';
import * as docsApiBillingPage from '../content/docs/api/billing.mdx';
import * as docsApiAuthPage from '../content/docs/api/authentication.mdx';
import * as docsApiIncidentsPage from '../content/docs/api/incidents.mdx';
import * as docsApiIndexPage from '../content/docs/api/index.mdx';
import * as docsApiIngestionPage from '../content/docs/api/ingestion.mdx';
import * as docsApiMembersPage from '../content/docs/api/members.mdx';
import * as docsApiProbesPage from '../content/docs/api/probes.mdx';
import * as docsApiProjectsPage from '../content/docs/api/projects.mdx';
import * as docsApiWebhooksPage from '../content/docs/api/webhooks.mdx';
import * as docsApiPage from '../content/docs/v1/api.mdx';
import * as docsCliAlertsPage from '../content/docs/cli/alerts.mdx';
import * as docsCliCloudWorkflowPage from '../content/docs/cli/cloud-workflow.mdx';
import * as docsCliIndexPage from '../content/docs/cli/index.mdx';
import * as docsCliLocalWorkflowPage from '../content/docs/cli/local-workflow.mdx';
import * as docsCliLogIngestionPage from '../content/docs/cli/log-ingestion.mdx';
import * as docsCliSetupPage from '../content/docs/cli/setup.mdx';
import * as docsCliTokensPage from '../content/docs/cli/tokens.mdx';
import * as docsCliWebhooksPage from '../content/docs/cli/webhooks.mdx';
import * as docsCliPage from '../content/docs/v1/cli.mdx';
import * as docsChangelogPage from '../content/docs/changelog.mdx';
import * as docsCoreConceptsPage from '../content/docs/core-concepts.mdx';
import * as docsFaqPage from '../content/docs/faq.mdx';
import * as docsHowItWorksPage from '../content/docs/how-it-works.mdx';
import * as docsIndexPage from '../content/docs/index.mdx';
import * as docsInstallationPage from '../content/docs/installation.mdx';
import * as docsLlmsTxtPage from '../content/docs/llms-txt.mdx';
import * as docsMcpIndexPage from '../content/docs/mcp/index.mdx';
import * as docsMcpToolsPage from '../content/docs/mcp/tools.mdx';
import * as docsMcpWorkflowsPage from '../content/docs/mcp/workflows.mdx';
import * as docsMcpPage from '../content/docs/v1/mcp.mdx';
import * as docsOverviewPage from '../content/docs/v1/overview.mdx';
import * as docsQuickstartPage from '../content/docs/quickstart.mdx';
import * as docsSecurityPage from '../content/docs/security.mdx';
import * as docsSecurityRedactionPage from '../content/docs/security/redaction.mdx';
import * as docsSecurityTokensPage from '../content/docs/security/tokens.mdx';
import * as docsSelfHostingPage from '../content/docs/self-hosting.mdx';
import * as docsSdksAndroidPage from '../content/docs/sdks/android.mdx';
import * as docsSdksBrowserPage from '../content/docs/sdks/browser.mdx';
import * as docsSdksBrowserRelayPage from '../content/docs/sdks/browser-relay.mdx';
import * as docsSdksGoPage from '../content/docs/sdks/go.mdx';
import * as docsSdksIndexPage from '../content/docs/sdks/index.mdx';
import * as docsSdksJavaPage from '../content/docs/sdks/java.mdx';
import * as docsSdksNodePage from '../content/docs/sdks/node.mdx';
import * as docsSdksPhpPage from '../content/docs/sdks/php.mdx';
import * as docsSdksPythonPage from '../content/docs/sdks/python.mdx';
import * as docsSdksRubyPage from '../content/docs/sdks/ruby.mdx';
import * as docsPricingPage from '../content/docs/pricing.mdx';
import * as docsSdksUniversalInterfacePage from '../content/docs/sdks/universal-interface.mdx';
import * as docsTroubleshootingPage from '../content/docs/troubleshooting.mdx';
import * as docsWhatIsPage from '../content/docs/what-is-debugbundle.mdx';
import * as docsWebhooksNewPage from '../content/docs/webhooks.mdx';
import * as docsWebhooksPage from '../content/docs/v1/webhooks.mdx';

const create = server<typeof Config, InternalTypeConfig & { DocData: Record<string, never> }>({
  doc: {
    passthroughs: ['extractedReferences'],
  },
});

const docsCollection = await create.docs('docs', 'content/docs', {
  './meta.json': {
    title: 'Documentation',
    pages: [
      'index',
      '---Start Here---',
      'what-is-debugbundle',
      'quickstart',
      'installation',
      'how-it-works',
      'core-concepts',
      '---Interfaces---',
      'sdks',
      'integrations',
      'cli',
      'api',
      'mcp',
      '---Bundles & Incidents---',
      'bundles',
      'bundles/improvement-bundles',
      'bundles/schema',
      'incidents',
      'incidents/reproduction',
      '---Webhooks & Alerts---',
      '[Webhook][Webhooks](/docs/webhooks)',
      '[Zap][Webhook Events](/docs/webhooks/events)',
      '[ShieldCheck][Webhook Verification](/docs/webhooks/verification)',
      'alerts',
      '---Configuration---',
      '[Settings][Project Setup](/docs/project-setup)',
      '[UserCog][Profile Configuration](/docs/project-setup/profile)',
      '[HardDrive][Local-Only Mode](/docs/project-setup/local-only)',
      '[Cloud][Connect to Cloud](/docs/project-setup/connect-to-cloud)',
      'capture-policy',
      'self-hosting',
      '---Advanced Features---',
      'probes',
      '[GitBranch][GitHub Automation](/docs/agent-workflows/automation-recipes)',
      '---Security---',
      '[Shield][Security](/docs/security)',
      '[EyeOff][Redaction](/docs/security/redaction)',
      '[KeyRound][Tokens](/docs/security/tokens)',
      '---Agents---',
      '[Bot][Agent Workflows](/docs/agent-workflows)',
      '[FileCode][Agent Skill File](/docs/agent-workflows/skill-file)',
      '---Reference---',
      '[BookOpen][Reference Index](/docs/v1/reference)',
      '[Braces][API Endpoints](/docs/v1/reference/api-endpoints)',
      '[SquareTerminal][CLI Commands](/docs/v1/reference/cli-commands)',
      '[Bot][MCP Tools](/docs/v1/reference/mcp-tools)',
      '[Webhook][Webhook Events](/docs/v1/reference/webhook-events)',
      '[Package][Bundle Schema](/docs/v1/reference/bundle-schema)',
      '[FileCode][Profile Schema](/docs/v1/reference/profile-schema)',
      '[CircleAlert][Error Codes](/docs/v1/reference/error-codes)',
      '---Help---',
      'troubleshooting',
      'faq',
    ],
  },
  './sdks/meta.json': {
    title: 'SDKs',
    pages: ['index', 'node', 'browser', 'browser-relay', 'python', 'php', 'java', 'go', 'ruby', 'android', 'universal-interface'],
  },
  './integrations/meta.json': {
    title: 'Integrations',
    pages: ['wordpress'],
  },
  './cli/meta.json': {
    title: 'CLI',
    pages: ['index', 'setup', 'local-workflow', 'cloud-workflow', 'log-ingestion', 'tokens', 'webhooks', 'alerts'],
  },
  './api/meta.json': {
    title: 'API',
    pages: ['index', 'authentication', 'incidents', 'ingestion', 'webhooks', 'alerts', 'projects', 'members', 'probes', 'billing'],
  },
  './mcp/meta.json': {
    title: 'MCP',
    pages: ['index', 'tools', 'workflows'],
  },
  './bundles/meta.json': {
    title: 'Bundles',
    pages: ['index', 'improvement-bundles', 'schema'],
  },
  './incidents/meta.json': {
    title: 'Incidents',
    pages: ['index', 'reproduction'],
  },
  './webhooks/meta.json': {
    title: 'Webhooks',
    pages: ['events', 'verification'],
  },
  './project-setup/meta.json': {
    title: 'Project Setup',
    pages: ['index', 'profile', 'local-only', 'connect-to-cloud'],
  },
  './security/meta.json': {
    title: 'Security',
    pages: ['redaction', 'tokens'],
  },
  './agent-workflows/meta.json': {
    title: 'Agent Workflows',
    pages: ['skill-file'],
  },
  './v1/meta.json': {
    title: 'Reference',
    pages: ['overview', 'api', 'cli', 'mcp', 'webhooks'],
  },
}, {
  './agent-workflows.mdx': docsAgentWorkflowsPage,
  './agent-workflows/skill-file.mdx': docsAgentWorkflowsSkillFilePage,
  './agent-workflows/automation-recipes.mdx': docsAgentWorkflowsRecipesPage,
  './core-concepts.mdx': docsCoreConceptsPage,
  './faq.mdx': docsFaqPage,
  './how-it-works.mdx': docsHowItWorksPage,
  './index.mdx': docsIndexPage,
  './installation.mdx': docsInstallationPage,
  './quickstart.mdx': docsQuickstartPage,
  './alerts.mdx': docsAlertsPage,
  './billing.mdx': docsBillingPage,
  './changelog.mdx': docsChangelogPage,
  './llms-txt.mdx': docsLlmsTxtPage,
  './pricing.mdx': docsPricingPage,
  './probes.mdx': docsProbesPage,
  './security.mdx': docsSecurityPage,
  './bundles/index.mdx': docsBundlesIndexPage,
  './bundles/improvement-bundles.mdx': docsBundlesImprovementBundlesPage,
  './bundles/schema.mdx': docsBundlesSchemaPage,
  './incidents/index.mdx': docsIncidentsIndexPage,
  './incidents/reproduction.mdx': docsIncidentsReproductionPage,
  './integrations/wordpress.mdx': docsIntegrationsWordpressPage,
  './webhooks/events.mdx': docsWebhooksEventsPage,
  './webhooks/verification.mdx': docsWebhooksVerificationPage,
  './api/alerts.mdx': docsApiAlertsPage,
  './api/billing.mdx': docsApiBillingPage,
  './api/authentication.mdx': docsApiAuthPage,
  './api/incidents.mdx': docsApiIncidentsPage,
  './api/index.mdx': docsApiIndexPage,
  './api/ingestion.mdx': docsApiIngestionPage,
  './api/members.mdx': docsApiMembersPage,
  './api/probes.mdx': docsApiProbesPage,
  './api/projects.mdx': docsApiProjectsPage,
  './api/webhooks.mdx': docsApiWebhooksPage,
  './cli/index.mdx': docsCliIndexPage,
  './cli/alerts.mdx': docsCliAlertsPage,
  './cli/cloud-workflow.mdx': docsCliCloudWorkflowPage,
  './cli/local-workflow.mdx': docsCliLocalWorkflowPage,
  './cli/log-ingestion.mdx': docsCliLogIngestionPage,
  './cli/setup.mdx': docsCliSetupPage,
  './cli/tokens.mdx': docsCliTokensPage,
  './cli/webhooks.mdx': docsCliWebhooksPage,
  './sdks/android.mdx': docsSdksAndroidPage,
  './sdks/browser.mdx': docsSdksBrowserPage,
  './sdks/browser-relay.mdx': docsSdksBrowserRelayPage,
  './sdks/go.mdx': docsSdksGoPage,
  './sdks/index.mdx': docsSdksIndexPage,
  './sdks/java.mdx': docsSdksJavaPage,
  './sdks/node.mdx': docsSdksNodePage,
  './sdks/php.mdx': docsSdksPhpPage,
  './sdks/python.mdx': docsSdksPythonPage,
  './sdks/ruby.mdx': docsSdksRubyPage,
  './sdks/universal-interface.mdx': docsSdksUniversalInterfacePage,
  './troubleshooting.mdx': docsTroubleshootingPage,
  './what-is-debugbundle.mdx': docsWhatIsPage,
  './mcp/index.mdx': docsMcpIndexPage,
  './mcp/tools.mdx': docsMcpToolsPage,
  './mcp/workflows.mdx': docsMcpWorkflowsPage,
  './capture-policy.mdx': docsCapturePolicy,
  './project-setup/index.mdx': docsProjectSetupIndexPage,
  './project-setup/profile.mdx': docsProjectSetupProfilePage,
  './project-setup/local-only.mdx': docsProjectSetupLocalOnlyPage,
  './project-setup/connect-to-cloud.mdx': docsProjectSetupConnectPage,
  './self-hosting.mdx': docsSelfHostingPage,
  './security/redaction.mdx': docsSecurityRedactionPage,
  './security/tokens.mdx': docsSecurityTokensPage,
  './webhooks.mdx': docsWebhooksNewPage,
  './v1/api.mdx': docsApiPage,
  './v1/cli.mdx': docsCliPage,
  './v1/mcp.mdx': docsMcpPage,
  './v1/overview.mdx': docsOverviewPage,
  './v1/webhooks.mdx': docsWebhooksPage,
});

const blogCollection = await create.docs('blog', 'content/blog', {}, {
  './launching-debugbundle.mdx': blogLaunchPost,
  './why-debugbundle.mdx': blogWhyPost,
  './agent-first-debugging.mdx': blogAgentFirstPost,
  './local-first-development.mdx': blogLocalFirstPost,
});

export const docsSource = loader(docsCollection.toFumadocsSource(), {
  baseUrl: '/docs',
  plugins: [lucideIconsPlugin()],
});

export const blogSource = loader(blogCollection.toFumadocsSource(), {
  baseUrl: '/blog',
});
