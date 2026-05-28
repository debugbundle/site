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

  if (!mounted) {
    return (
      <div
        aria-label="Theme toggle"
        className="inline-flex items-center gap-0.5 rounded-full border border-[var(--site-border)] bg-[var(--site-surface)] p-0.5"
        role="group"
      >
        {themeOptions.map((option) => (
          <span
            key={option.value}
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--site-text-muted)]"
          >
            <option.icon className="h-3.5 w-3.5" strokeWidth={1.9} />
          </span>
        ))}
      </div>
    );
  }

  const activeTheme = (theme as ThemeMode | undefined) ?? 'system';
  const resolvedLabel = `Current theme: ${resolvedTheme ?? activeTheme}`;

  return (
    <div
      aria-label={resolvedLabel}
      className="inline-flex items-center gap-0.5 rounded-full border border-[var(--site-border)] bg-[var(--site-surface)] p-0.5"
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
            className={`flex h-8 w-8 items-center justify-center rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--site-focus)] ${
              isActive
                ? ''
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
            <Icon className="h-3.5 w-3.5" strokeWidth={1.9} />
          </button>
        );
      })}
    </div>
  );
}
