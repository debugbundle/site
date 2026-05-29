import type { ReactElement } from 'react';

import { ServerCodeBlock } from 'fumadocs-ui/components/codeblock.rsc';

import { getSharedAgentInstallPrompt } from '@/lib/agent-install-prompt';
import type { AgentInstallPromptMode } from '@/lib/agent-install-prompt';

type AgentInstallPromptBlockProps = {
  compact?: boolean;
  mode?: AgentInstallPromptMode;
};

export async function AgentInstallPromptBlock({ compact = false, mode = 'shared' }: AgentInstallPromptBlockProps): Promise<ReactElement> {
  const codeBlock = await ServerCodeBlock({
    lang: 'text',
    code: getSharedAgentInstallPrompt({ mode, singleLine: compact }),
    codeblock: { className: 'mx-0 mt-0 mb-0 overflow-hidden rounded-xl' },
  });

  return <>{codeBlock}</>;
}