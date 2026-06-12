export const NON_INDEXABLE_ROBOTS_TAG = 'noindex, nofollow, noarchive';

export const machineReadableArtifactPaths = [
  '/llms.txt',
  '/openapi.json',
  '/schemas/*',
  '/examples/*',
  '/reference-data.json',
  '/search-index.json',
] as const;

export type ResponseHeadersManifest = {
  version: 1;
  rules: Array<{
    path: string;
    headers: Record<string, string>;
  }>;
};

export function buildResponseHeadersManifest(): ResponseHeadersManifest {
  return {
    version: 1,
    rules: machineReadableArtifactPaths.map((path) => ({
      path,
      headers: {
        'X-Robots-Tag': NON_INDEXABLE_ROBOTS_TAG,
      },
    })),
  };
}
