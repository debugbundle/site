export type AgentAssistPromptId = 'critical-path-alerts' | 'remote-probes';

type AgentAssistPromptDefinition = {
  title: string;
  teaser: string;
  dialogDescription: string;
  docsHref: string;
  docsLabel: string;
  prompt: string;
};

const agentAssistPromptDefinitions: Record<AgentAssistPromptId, AgentAssistPromptDefinition> = {
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

export const agentAssistPromptIds: AgentAssistPromptId[] = ['critical-path-alerts', 'remote-probes'];

export function getAgentAssistPrompt(id: AgentAssistPromptId): AgentAssistPromptDefinition {
  return agentAssistPromptDefinitions[id];
}
