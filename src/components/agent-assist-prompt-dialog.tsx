import type { ReactElement } from 'react';

import { ServerCodeBlock } from 'fumadocs-ui/components/codeblock.rsc';

import { AgentAssistPromptDialogClient } from '@/components/agent-assist-prompt-dialog-trigger';
import { getAgentAssistPrompt, type AgentAssistPromptId } from '@/lib/agent-assist-prompts';

type AgentAssistPromptDialogProps = {
  promptId: AgentAssistPromptId;
  variant?: 'icon' | 'button';
};

export async function AgentAssistPromptDialog({
  promptId,
  variant = 'icon',
}: AgentAssistPromptDialogProps): Promise<ReactElement> {
  const prompt = getAgentAssistPrompt(promptId);

  const codeBlock = await ServerCodeBlock({
    lang: 'text',
    code: prompt.prompt,
    codeblock: { className: 'mx-0 mt-0 mb-0 overflow-hidden rounded-xl' },
  });

  return (
    <AgentAssistPromptDialogClient
      codeBlock={codeBlock}
      dialogDescription={prompt.dialogDescription}
      docsHref={prompt.docsHref}
      docsLabel={prompt.docsLabel}
      promptText={prompt.prompt}
      title={prompt.title}
      variant={variant}
    />
  );
}
