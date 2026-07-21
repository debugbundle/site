import assert from "node:assert/strict";
import test from "node:test";

import { initializeSiteDogfooding, type DogfoodingWindowTarget } from "./dogfooding.ts";

test("site analytics uses standard first-party capture only when explicitly enabled", () => {
  let initializedWith: unknown = null;
  const sdk = {
    init(config: unknown): void {
      initializedWith = config;
    }
  };
  const target: DogfoodingWindowTarget = {
    setTimeout(): number {
      return 1;
    }
  };

  initializeSiteDogfooding(
    {
      NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_PROJECT_TOKEN: "dbundle_proj_site",
      NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_ANALYTICS_ENABLED: "true"
    },
    target,
    sdk
  );

  assert.deepEqual(initializedWith, {
    projectToken: "dbundle_proj_site",
    endpoint: "https://api.debugbundle.com/v1/events",
    environment: "production",
    service: "debugbundle-site",
    captureConsole: false,
    breadcrumbsOnErrorOnly: false,
    analytics: {
      enabled: true,
      privacyMode: "standard",
      consentRequired: false,
      trackPageViews: true,
      trackRouteChanges: true,
      trackSessions: true,
      trackReferrers: true,
      trackActions: false,
      trackFrictionSignals: true,
      sampleRate: 1
    }
  });
});

test("site analytics stays disabled when its explicit flag is absent", () => {
  let initializedWith: Record<string, unknown> | null = null;
  const sdk = {
    init(config: Record<string, unknown>): void {
      initializedWith = config;
    }
  };

  initializeSiteDogfooding(
    { NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_PROJECT_TOKEN: "dbundle_proj_site" },
    { setTimeout: () => 1 },
    sdk
  );

  assert.equal(initializedWith?.["analytics"], undefined);
});
