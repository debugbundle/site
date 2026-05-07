'use client';

import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import { LaptopMinimal, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import type { ThemeMode } from '@/site-config';

const themeOptions: Array<{ value: ThemeMode; label: string; icon: typeof Sun }> = [
  { value: 'light', label: 'Light theme', icon: Sun },
  { value: 'dark', label: 'Dark theme', icon: Moon },
  { value: 'system', label: 'System theme', icon: LaptopMinimal },
];

export function ThemeToggle(): ReactElement {
  const { resolvedTheme, setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeTheme = mounted ? ((theme as ThemeMode | undefined) ?? 'system') : 'system';
  const resolvedLabel = mounted ? `Current theme: ${resolvedTheme ?? activeTheme}` : 'Current theme';

  return (
    <div
      aria-label={resolvedLabel}
      className="inline-flex items-center gap-1 rounded-full border border-[var(--site-border)] bg-[var(--site-surface)] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
      role="group"
    >
      {themeOptions.map((option) => {
        const Icon = option.icon;
        const isActive = option.value === activeTheme;

        return (
          <button
            key={option.value}
            aria-label={option.label}
            aria-pressed={isActive}
            className={`flex h-9 w-9 items-center justify-center rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--site-focus)] ${
              isActive
                ? 'shadow-sm'
                : 'text-[var(--site-text-muted)] hover:bg-[var(--site-surface-muted)] hover:text-[var(--site-text)]'
            }`}
            onClick={() => setTheme(option.value)}
            style={
              isActive
                ? { background: 'var(--site-accent)', color: 'var(--site-accent-foreground)' }
                : undefined
            }
            type="button"
          >
            <Icon className="h-4 w-4" strokeWidth={1.9} />
          </button>
        );
      })}
    </div>
  );
}