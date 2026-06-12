import type { ReactElement } from 'react';

import { AgentAssistPromptDialog } from '@/components/agent-assist-prompt-dialog';
import { agentAssistPromptIds, getAgentAssistPrompt } from '@/lib/agent-assist-prompts';

export function OptionalAgentImprovements(): ReactElement {
  return (
    <section className="not-prose mt-10 space-y-5">
      <div className="max-w-3xl space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--site-text)]">
          Optional Agent-Assisted Improvements
        </h2>
        <p className="text-base leading-7 text-[var(--site-text-muted)]">
          These are not required for your first DebugBundle incident. Use them once capture is working and you want an
          agent to improve signal quality or live-debugging coverage.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {agentAssistPromptIds.map((promptId) => {
          const prompt = getAgentAssistPrompt(promptId);

          return (
            <section
              key={promptId}
              className="flex h-full min-h-40 flex-col justify-between rounded-lg border border-[var(--site-border)] bg-[var(--site-surface)] p-6 shadow-[0_1px_0_rgba(0,0,0,0.04)]"
            >
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-[var(--site-text)]">{prompt.title}</h3>
                <p className="text-sm leading-7 text-[var(--site-text-muted)]">{prompt.teaser}</p>
              </div>
              <div className="mt-5">
                <AgentAssistPromptDialog promptId={promptId} variant="button" />
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
