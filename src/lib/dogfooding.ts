import { createDebugBundleBrowserSdk, type DebugBundleBrowserInitConfig, type DebugBundleBrowserSdk } from "@debugbundle/sdk-browser";

const defaultHostedApiBaseUrl = "https://api.debugbundle.com";

export interface SiteDogfoodingEnv {
  NEXT_PUBLIC_DEBUGBUNDLE_API_URL?: string;
  NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_ENABLED?: string;
  NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_PROJECT_TOKEN?: string;
  NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_ENDPOINT?: string;
  NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_SERVICE?: string;
  NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_ENVIRONMENT?: string;
  NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_EXPOSE_TRIGGERS?: string;
  NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_CAPTURE_CONSOLE?: string;
}

export interface SiteDogfoodingConfig {
  enabled: true;
  projectToken: string;
  endpoint: string;
  environment: string;
  service: string;
  exposeTriggers: boolean;
  captureConsole: boolean;
}

export interface DogfoodingWindowTarget {
  setTimeout(handler: () => void, timeout?: number): unknown;
  __DEBUGBUNDLE_DOGFOOD__?: {
    triggerFrontendException(message?: string): void;
  };
}

type SiteDogfoodingSdk = Pick<DebugBundleBrowserSdk, "init"> &
  Partial<Pick<DebugBundleBrowserSdk, "captureException" | "flush">>;

const browserDogfoodingSdk = createDebugBundleBrowserSdk();

function parseBooleanFlag(value: string | undefined, variableName: string): boolean | null {
  if (value === undefined) {
    return null;
  }

  const normalized = value.trim().toLowerCase();
  if (normalized === "true") {
    return true;
  }
  if (normalized === "false") {
    return false;
  }

  throw new Error(`site_dogfooding_invalid_boolean: ${variableName}`);
}

function normalizeText(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed === undefined || trimmed.length === 0 ? null : trimmed;
}

function isAbsoluteHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function resolveSiteDogfoodingEndpoint(env: SiteDogfoodingEnv): string {
  const explicitEndpoint = normalizeText(env.NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_ENDPOINT);
  if (explicitEndpoint !== null) {
    return new URL(explicitEndpoint).toString();
  }

  return new URL(
    "/v1/events",
    normalizeText(env.NEXT_PUBLIC_DEBUGBUNDLE_API_URL) ?? defaultHostedApiBaseUrl
  ).toString();
}

export function resolveSiteDogfoodingConfig(env: SiteDogfoodingEnv): SiteDogfoodingConfig | null {
  const enabledFlag = parseBooleanFlag(
    env.NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_ENABLED,
    "NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_ENABLED"
  );
  if (enabledFlag === false) {
    return null;
  }

  const endpoint = resolveSiteDogfoodingEndpoint(env);
  const projectToken = normalizeText(env.NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_PROJECT_TOKEN);
  if (!isAbsoluteHttpUrl(endpoint)) {
    throw new Error("site_dogfooding_endpoint_must_be_absolute");
  }

  if (projectToken === null) {
    return null;
  }

  return {
    enabled: true,
    projectToken,
    endpoint,
    environment: normalizeText(env.NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_ENVIRONMENT) ?? "production",
    service: normalizeText(env.NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_SERVICE) ?? "debugbundle-site",
    exposeTriggers:
      parseBooleanFlag(
        env.NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_EXPOSE_TRIGGERS,
        "NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_EXPOSE_TRIGGERS"
      ) ?? false,
    captureConsole:
      parseBooleanFlag(
        env.NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_CAPTURE_CONSOLE,
        "NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_CAPTURE_CONSOLE"
      ) ?? false
  };
}

export function initializeSiteDogfooding(
  env: SiteDogfoodingEnv,
  target: DogfoodingWindowTarget = window,
  sdk: SiteDogfoodingSdk = browserDogfoodingSdk,
  warn: (message: string) => void = console.warn
): SiteDogfoodingConfig | null {
  try {
    const config = resolveSiteDogfoodingConfig(env);
    if (config === null) {
      delete target.__DEBUGBUNDLE_DOGFOOD__;
      return null;
    }

    sdk.init({
      projectToken: config.projectToken,
      endpoint: config.endpoint,
      environment: config.environment,
      service: config.service,
      captureConsole: config.captureConsole,
      breadcrumbsOnErrorOnly: false
    } satisfies DebugBundleBrowserInitConfig);

    if (config.exposeTriggers) {
      target.__DEBUGBUNDLE_DOGFOOD__ = {
        triggerFrontendException(message = "debugbundle_dogfood_site_frontend_exception"): void {
          const error = new Error(message);

          if (typeof sdk.captureException === "function") {
            sdk.captureException(error);
            void sdk.flush?.();
            return;
          }

          target.setTimeout(() => {
            throw error;
          }, 0);
        }
      };
    } else {
      delete target.__DEBUGBUNDLE_DOGFOOD__;
    }

    return config;
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown_dogfooding_error";
    delete target.__DEBUGBUNDLE_DOGFOOD__;
    warn(`site_dogfooding_disabled: ${message}`);
    return null;
  }
}