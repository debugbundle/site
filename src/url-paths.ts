function ensureTrailingSlash(path: string): string {
  if (path === '' || path === '/') {
    return '/';
  }

  if (path.split('/').pop()?.includes('.')) {
    return path;
  }

  return path.endsWith('/') ? path : `${path}/`;
}

export function canonicalSitePath(path: string): string {
  return ensureTrailingSlash(path);
}
