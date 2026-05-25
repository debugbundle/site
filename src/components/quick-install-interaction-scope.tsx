'use client';

import type { ComponentProps, FocusEvent as ReactFocusEvent, ReactElement, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

import { TabsTrigger } from 'fumadocs-ui/components/ui/tabs';

type QuickInstallInteractionScopeProps = {
  children: ReactNode;
};

type QuickInstallTabTriggerProps = ComponentProps<typeof TabsTrigger>;

export function QuickInstallTabTrigger({
  onBlur,
  onFocus,
  style,
  ...props
}: QuickInstallTabTriggerProps): ReactElement {
  const [focusBorderColor, setFocusBorderColor] = useState<string | null>(null);

  const handleFocus = (event: ReactFocusEvent<HTMLButtonElement>) => {
    setFocusBorderColor(
      event.currentTarget.matches(':focus-visible')
        ? getComputedStyle(event.currentTarget).getPropertyValue('--site-focus').trim()
        : null,
    );
    onFocus?.(event);
  };

  const handleBlur = (event: ReactFocusEvent<HTMLButtonElement>) => {
    setFocusBorderColor(null);
    onBlur?.(event);
  };

  return (
    <TabsTrigger
      {...props}
      onBlur={handleBlur}
      onFocus={handleFocus}
      style={focusBorderColor ? { ...style, boxShadow: `inset 0 0 0 1px ${focusBorderColor}` } : style}
    />
  );
}

export function QuickInstallInteractionScope({ children }: QuickInstallInteractionScopeProps): ReactElement {
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const isCopyButton = (element: HTMLElement) =>
      element.matches('button[aria-label="Copy Text"], button[aria-label="Copied Text"]');

    const applyCodeBlockAdjustments = () => {
      scope.querySelectorAll<HTMLElement>('[role="region"]').forEach((region) => {
        region.tabIndex = -1;
      });

      scope.querySelectorAll<HTMLElement>('[role="tabpanel"]').forEach((panel) => {
        panel.tabIndex = -1;
      });
    };

    const handleFocusIn = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;

      requestAnimationFrame(() => {
        if (!scope.contains(target) || !target.matches(':focus-visible') || !isCopyButton(target)) return;

        const focusColor = getComputedStyle(scope).getPropertyValue('--site-focus').trim();
        target.style.outline = `2px solid ${focusColor}`;
        target.style.outlineOffset = '2px';
        target.style.boxShadow = 'none';
      });
    };

    const handleFocusOut = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;

      if (isCopyButton(target)) {
        target.style.outline = '';
        target.style.outlineOffset = '';
        target.style.boxShadow = '';
      }
    };

    applyCodeBlockAdjustments();

    scope.addEventListener('focusin', handleFocusIn);
    scope.addEventListener('focusout', handleFocusOut);

    const observer = new MutationObserver(() => {
      applyCodeBlockAdjustments();
    });

    observer.observe(scope, {
      childList: true,
      subtree: true,
    });

    return () => {
      scope.removeEventListener('focusin', handleFocusIn);
      scope.removeEventListener('focusout', handleFocusOut);
      observer.disconnect();
    };
  }, []);

  return (
    <div data-quick-install-guide="true" ref={scopeRef}>
      {children}
    </div>
  );
}