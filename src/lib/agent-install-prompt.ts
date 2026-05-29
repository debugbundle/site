const sharedAgentInstallPromptSegments = [
    'Set up DebugBundle for this repository end to end.',
    'Inspect the project language, framework, package manager, entry points, logging setup, and whether it has a frontend, browser surface, or server-rendered UI.',
    'Read the relevant DebugBundle docs: https://debugbundle.com/docs/installation, https://debugbundle.com/docs/quickstart, https://debugbundle.com/docs/project-setup/connect-to-cloud, https://debugbundle.com/docs/cli/cloud-workflow, https://debugbundle.com/docs/cli/local-workflow, https://debugbundle.com/docs/sdks, and https://debugbundle.com/docs/agent-workflows/skill-file.',
    'Run `debugbundle setup`, then read and follow `.agents/skills/debugbundle/SKILL.md`.',
    'Choose Cloud mode for hosted deployment or shared incident workflows; otherwise use local-only mode.',
    'If Cloud is appropriate, run `debugbundle login` and `debugbundle connect`.',
    'Install the smallest safe integration path: backend SDK, WordPress plugin, or log ingestion.',
    'For browser-capturable UI, also install the Browser SDK and configure same-origin relay for full-stack apps or direct capture for frontend-only apps.',
    'Configure required env vars or tokens.',
    'Trigger one intentional test error through the real ingestion path.',
    'Verify with `debugbundle verify cloud` or `debugbundle verify local`, then show the incident using `debugbundle incidents --source cloud|local` and inspect it with `debugbundle inspect <incident-id>`.',
] as const;

const localOnlyAgentInstallPromptSegments = [
    'Set up DebugBundle for this repository in local-only mode.',
    'Inspect the project language, framework, package manager, entry points, logging setup, and whether it has a frontend, browser surface, or server-rendered UI.',
    'Read the relevant DebugBundle docs: https://debugbundle.com/docs/installation, https://debugbundle.com/docs/quickstart, https://debugbundle.com/docs/cli/local-workflow, https://debugbundle.com/docs/sdks, and https://debugbundle.com/docs/agent-workflows/skill-file.',
    'Run `debugbundle setup`, then read and follow `.agents/skills/debugbundle/SKILL.md`.',
    'Do not use DebugBundle Cloud for this setup. Keep the project in local-only mode and process incidents on this machine.',
    'Install the smallest safe integration path: backend SDK, WordPress plugin, or log ingestion.',
    'For browser-capturable UI, also install the Browser SDK and configure a backend same-origin relay because local-only browser capture still needs a relay target.',
    'Configure the local-only settings and any required local environment values.',
    'Trigger one intentional test error through the real local ingestion path.',
    'Run `debugbundle process`, then verify with `debugbundle verify local`, show the incident using `debugbundle incidents --source local`, and inspect it with `debugbundle inspect <incident-id>`.',
] as const;

export type AgentInstallPromptMode = 'shared' | 'local-only';

type SharedAgentInstallPromptOptions = {
  mode?: AgentInstallPromptMode;
  singleLine?: boolean;
};

export function getSharedAgentInstallPrompt({ mode = 'shared', singleLine = false }: SharedAgentInstallPromptOptions = {}): string {
  const segments = mode === 'local-only' ? localOnlyAgentInstallPromptSegments : sharedAgentInstallPromptSegments;

  return segments.join(singleLine ? ' ' : '\n');
}