export type AgentAssistPromptId =
  | 'product-analytics-workflow'
  | 'critical-path-alerts'
  | 'availability-checks'
  | 'remote-probes';

type AgentAssistPromptDefinition = {
  title: string;
  teaser: string;
  dialogDescription: string;
  docsHref: string;
  docsLabel: string;
  prompt: string;
};

const agentAssistPromptDefinitions: Record<AgentAssistPromptId, AgentAssistPromptDefinition> = {
  'product-analytics-workflow': {
    title: 'Product analytics workflow',
    teaser:
      'Use an agent to identify the routes, actions, funnel steps, and conversions that explain product usage without collecting raw interaction data.',
    dialogDescription:
      'Use this once browser capture and a hosted or self-hosted analytics backend are available. The prompt asks an agent to inspect the app, define a bounded measurement plan, preserve privacy and transport boundaries, and verify one useful journey end to end.',
    docsHref: '/docs/analytics',
    docsLabel: 'Open Analytics docs',
    prompt: [
      'Review this repository and set up a focused, privacy-safe DebugBundle product analytics workflow for the browser application.',
      'Read the relevant DebugBundle docs first: https://debugbundle.com/docs/analytics, https://debugbundle.com/docs/sdks/browser, https://debugbundle.com/docs/analytics/privacy, https://debugbundle.com/docs/cli/analytics, and https://debugbundle.com/docs/quickstart.',
      'Inspect the existing Browser SDK initialization, router, authentication/session state, consent or privacy controls, and the main user journeys before changing code. Confirm whether the app already uses direct browser ingestion, a backend relay, or a self-hosted endpoint.',
      'Keep the current Browser SDK integration and preserve the existing direct or relay transport. Never expose a server credential in browser code. Direct mode may use only a dedicated public write-only project token with allowed browser origins; relay mode must remain credential-free in the browser.',
      'Treat analytics as a separate opt-in from incident capture. Enable it locally with `analytics.enabled: true` and confirm the project analytics setting is enabled through an authorized dashboard, API, CLI, or MCP path. Remote settings may restrict local capture but must never silently opt the app in. Debug capture must keep working independently when analytics is disabled, consent-blocked, sampled out, quota-blocked, or unavailable.',
      'Before implementation, propose a small measurement plan: normalized routes that matter, 3 to 7 stable semantic actions, one primary funnel with ordered steps, 1 to 3 meaningful conversions, and only the low-cardinality segments needed to compare outcomes. Explain what product question each signal answers and avoid collecting events without a decision-making purpose.',
      'Use `analytics.track(...)` for semantic product actions, `analytics.funnel(...)` for completed funnel steps, and `analytics.convert(...)` for meaningful outcomes. Instrument state or success boundaries instead of every click, rely on automatic page and route capture where it already applies, and guard against duplicate SPA events or repeated conversion emission.',
      'Use the app\'s existing consent state with `analytics.setConsent(true|false)` when consent is required; never assume or force consent. Start with strict privacy unless the product requirements and consent model justify another mode. Consent withdrawal must stop future analytics without disabling error and incident capture.',
      'Do not capture form values, visible text, selectors, DOM snapshots, screenshots, raw query strings, precise location, secrets, emails, user or account IDs, order IDs, workspace IDs, or free-form user input. Use only approved, low-cardinality custom dimensions; prefer built-in auth state and stable enum-like values over arbitrary metadata.',
      'Create or propose the matching saved funnel definition through an authorized management interface so the emitted funnel key and ordered step keys exactly match the reusable analysis definition. Do not create one analytics bundle per visit; normal usage should update aggregates and generated analytics bundles should answer bounded analysis questions.',
      'If safe and authorized, implement the smallest useful setup and verify one representative browser journey through route capture, a semantic action, funnel steps, and a conversion. Then inspect the resulting summary, actions, funnel metrics, and journey evidence through the dashboard, CLI, API, or MCP after background processing completes. Also verify that missing consent or disabled analytics produces no analytics events while a representative debug event still follows the existing incident path.',
      'Finish with the measurement plan, files changed, project-side settings or saved-funnel steps that still require an owner, verification performed, expected processing delay, and the exact places where a human or agent can inspect the resulting metrics and analytics bundles.',
    ].join('\n'),
  },
  'critical-path-alerts': {
    title: 'Alert on critical paths',
    teaser:
      'Use an agent to identify the routes, jobs, and integrations where DebugBundle alerts should stay high-signal and business-relevant.',
    dialogDescription:
      'Use this after basic DebugBundle capture works. The prompt asks an agent to inspect the repository, find the paths where failures matter most, and propose or implement the smallest safe alerting improvements.',
    docsHref: '/docs/alerts',
    docsLabel: 'Open Alerts docs',
    prompt: [
      'Review this repository and improve incident signal quality for the business-critical paths.',
      'Read the relevant DebugBundle docs first: https://debugbundle.com/docs/alerts, https://debugbundle.com/docs/api/alerts, https://debugbundle.com/docs/capture-policy, https://debugbundle.com/docs/sdks, and https://debugbundle.com/docs/quickstart.',
      'Inspect the existing capture, logging, error handling, queues, schedulers, controllers, auth, billing, webhook, and integration paths before changing code.',
      'Identify the small set of routes, jobs, or external edges where failures should become explicit incidents or high-signal alerts. Recommend services, severities, thresholds, filters, and why each rule matters.',
      'Prefer an app-owned incident reporting helper or facade, such as reportIncident(...), over scattering DebugBundle-specific calls or text through business code. Keep it provider-neutral enough that another incident service could replace DebugBundle with limited changes.',
      'Build in conservative throttling or debounce behavior for manual incident capture so repeated looped failures do not flood DebugBundle or the app. Account for SDK duplicate suppression, but do not rely on it as the only guard for intentional custom capture.',
      'Avoid noise from expected retries, health checks, generic 404s, bot traffic, and other low-value events unless the path is clearly critical.',
      'If safe, implement the smallest useful capture or alert changes, preserve runtime behavior, and verify with one representative intentional failure plus the command or UI path to inspect the resulting incident or alert.',
    ].join('\n'),
  },
  'availability-checks': {
    title: 'Hosted health checks',
    teaser:
      'Use an agent to choose the safest public endpoints to monitor and wire availability failures into the normal incident workflow.',
    dialogDescription:
      'Use this after cloud setup works. The prompt asks an agent to inspect the app, recommend public health-check targets, verify them safely, and configure checks through API, CLI, or MCP.',
    docsHref: '/docs/availability-checks',
    docsLabel: 'Open Availability Checks docs',
    prompt: [
      'Review this repository and prepare a safe hosted availability-check setup for the production-facing services.',
      'Read the relevant DebugBundle docs first: https://debugbundle.com/docs/availability-checks, and https://debugbundle.com/docs/alerts.',
      'Identify the public endpoints that best represent user-visible availability, such as /health, /ready, a lightweight landing page, or a status endpoint. Avoid private hosts, localhost, metadata service addresses, internal-only URLs, endpoints with credentials in the URL, and endpoints that mutate state.',
      'For each recommended check, propose name, URL, method, expected status range, timeout, interval, failure threshold, recovery threshold, environment, and service label. Respect plan limits.',
      'Use a side-effect-free test first through `debugbundle health checks test` or MCP `test_health_check`. Do not create a saved check until the target and status expectations are clear.',
      'Explain how availability incidents will flow through normal DebugBundle incidents, bundles, alerts, webhooks, CLI, MCP, and dashboard views. If alerting is needed, recommend a small high-signal alert rule rather than noisy broad paging.',
      'If safe and authorized, configure the smallest useful set of checks, then list checks and recent results to verify the setup. Leave disabled or paused checks visible and explain what must change before they execute.',
    ].join('\n'),
  },
  'remote-probes': {
    title: 'Remote probes on demand',
    teaser:
      'Use an agent to identify a small set of high-leverage probe points that improve live debugging without adding noisy permanent instrumentation.',
    dialogDescription:
      'Use this after the main integration is in place. The prompt asks an agent to choose a few probe points, keep them safe and bounded, and explain how to activate them during a live incident.',
    docsHref: '/docs/probes',
    docsLabel: 'Open Probes docs',
    prompt: [
      'Review this repository and prepare a focused remote probe plan for live incident debugging.',
      'Read the relevant DebugBundle docs first: https://debugbundle.com/docs/probes, https://debugbundle.com/docs/api/probes, https://debugbundle.com/docs/sdks, and https://debugbundle.com/docs/quickstart.',
      'Inspect the existing capture setup and the areas with the most runtime uncertainty, such as downstream calls, queue payloads, auth/session resolution, billing decisions, feature flags, webhooks, workers, and state transitions.',
      'Identify 3 to 5 probe points that would materially improve live debugging. Use stable dot-notation labels and briefly explain what each probe captures, why it matters, and when to activate it.',
      'Keep probe payloads bounded, structured, and safe. Exclude secrets, tokens, passwords, raw PII, full request bodies, and other sensitive data. Use heavy or lazy probes for expensive data collection where the SDK supports them.',
      'Prefer a small app-owned diagnostic helper or facade when that keeps business code clean and provider-neutral. Avoid scattering DebugBundle-only wording or one-off instrumentation throughout core logic.',
      'Keep probes low-overhead by default and avoid adding permanent high-volume capture. Where probes could fire repeatedly, use existing debounce/throttle patterns or add a minimal guard.',
      'If safe, implement the most useful hooks without changing application behavior, then show how to activate them with a short TTL, scope by service or environment, and verify the resulting probe data through the normal DebugBundle workflow.',
    ].join('\n'),
  },
};

export const agentAssistPromptIds: AgentAssistPromptId[] = [
  'product-analytics-workflow',
  'critical-path-alerts',
  'availability-checks',
  'remote-probes',
];

export function getAgentAssistPrompt(id: AgentAssistPromptId): AgentAssistPromptDefinition {
  return agentAssistPromptDefinitions[id];
}
