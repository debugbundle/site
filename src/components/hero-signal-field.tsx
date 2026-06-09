import type { ReactElement } from 'react';

export function HeroSignalField(): ReactElement {
  return (
    <div aria-hidden="true" className="hero-signal-field">
      <div className="hero-signal-field__grid" />
    </div>
  );
}
