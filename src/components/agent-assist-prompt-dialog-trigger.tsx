"use client";

import Link from 'next/link';
import {
  Close as DialogClose,
  Content as DialogContent,
  Description as DialogDescription,
  Overlay as DialogOverlay,
  Portal as DialogPortal,
  Root as DialogRoot,
  Title as DialogTitle,
  Trigger as DialogTrigger,
} from '@radix-ui/react-dialog';
import { Bot, Check, Copy, X } from 'lucide-react';
import { useState, type ReactElement, type ReactNode } from 'react';

type AgentAssistPromptDialogClientProps = {
  dialogDescription: string;
  docsHref: string;
  docsLabel: string;
  promptText: string;
  title: string;
  codeBlock: ReactNode;
  variant?: 'icon' | 'button';
};

const focusRingClassName =
  'focus-visible:[outline-color:var(--site-focus)] focus-visible:[outline-style:solid] focus-visible:[outline-width:2px] focus-visible:[outline-offset:2px]';

export function AgentAssistPromptDialogClient({
  dialogDescription,
  docsHref,
  docsLabel,
  promptText,
  title,
  codeBlock,
  variant = 'icon',
}: AgentAssistPromptDialogClientProps): ReactElement {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <DialogRoot>
      <DialogTrigger asChild>
        {variant === 'button' ? (
          <button
            type="button"
            className={`inline-flex items-center gap-2 rounded-full border border-[var(--site-border)] bg-[var(--site-surface)] px-4 py-2 text-sm font-medium text-[var(--site-text)] transition hover:border-[var(--site-border-strong)] hover:text-[var(--site-accent)] ${focusRingClassName}`}
          >
            <Bot className="size-4" aria-hidden="true" />
            Open agent prompt
          </button>
        ) : (
          <button
            type="button"
            aria-label={`Open agent prompt for ${title}`}
            title={`Open agent prompt for ${title}`}
            className={`inline-flex size-9 items-center justify-center rounded-full border border-[var(--site-border)] bg-[var(--site-surface)] text-[var(--site-text-muted)] transition hover:border-[var(--site-border-strong)] hover:text-[var(--site-accent)] ${focusRingClassName}`}
          >
            <Bot className="size-4" aria-hidden="true" />
          </button>
        )}
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-50 bg-fd-overlay backdrop-blur-xs data-[state=closed]:animate-fd-fade-out data-[state=open]:animate-fd-fade-in" />
        <DialogContent
          className={`fixed left-1/2 top-4 z-50 w-[calc(100%-1rem)] max-w-3xl -translate-x-1/2 rounded-xl border border-[var(--site-border)] bg-[var(--site-surface)] text-[var(--site-text)] shadow-2xl shadow-black/50 data-[state=closed]:animate-fd-dialog-out data-[state=open]:animate-fd-dialog-in md:top-[8vh] ${focusRingClassName}`}
        >
          <div className="border-b border-[var(--site-border)] px-5 py-4 sm:px-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--site-text-subtle)]">
                  Agent prompt
                </p>
                <DialogTitle className="text-lg font-semibold text-[var(--site-text)]">{title}</DialogTitle>
                <DialogDescription className="max-w-2xl text-sm leading-7 text-[var(--site-text-muted)]">
                  {dialogDescription}
                </DialogDescription>
              </div>
              <DialogClose
                aria-label="Close prompt dialog"
                className={`inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-[var(--site-border)] bg-[var(--site-surface)] text-[var(--site-text-muted)] transition hover:border-[var(--site-border-strong)] hover:text-[var(--site-text)] ${focusRingClassName}`}
              >
                <X className="size-4" aria-hidden="true" />
              </DialogClose>
            </div>
          </div>

          <div className="px-5 py-5 sm:px-6 sm:py-6">
            <div className="overflow-hidden rounded-xl [&_figure]:my-0 [&_pre]:max-h-[26vh] [&_pre]:overflow-auto sm:[&_pre]:max-h-[28vh]">
              {codeBlock}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 border-t border-[var(--site-border)] px-5 py-4 sm:px-6">
            <div className="flex flex-wrap items-center justify-end gap-3">
              <Link
                href={docsHref}
                className={`inline-flex items-center gap-2 rounded-full border border-[var(--site-border)] px-4 py-2 text-sm font-medium text-[var(--site-text)] transition hover:border-[var(--site-border-strong)] hover:text-[var(--site-accent)] ${focusRingClassName}`}
              >
                {docsLabel}
              </Link>
              <button
                type="button"
                onClick={handleCopy}
                className={`inline-flex items-center gap-2 rounded-full bg-[var(--site-accent)] px-4 py-2 text-sm font-medium text-[var(--site-accent-foreground)] transition hover:opacity-90 ${focusRingClassName}`}
              >
                {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
                {copied ? 'Copied' : 'Copy prompt'}
              </button>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
}
