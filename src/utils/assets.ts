const EXTERNAL_ASSET_PATTERN = /^(?:https?:)?\/\/|^(?:data|blob):/i;

export function resolveAssetUrl(value?: string | null): string {
  if (!value || EXTERNAL_ASSET_PATTERN.test(value)) return value || '';

  const base = import.meta.env.BASE_URL || '/';
  const normalizedValue = value.replace(/^\.\//, '').replace(/^\/+/, '');
  const normalizedBase = base.replace(/^\.\//, '').replace(/^\/+/, '');

  if (normalizedBase && normalizedValue.startsWith(normalizedBase)) {
    return base.startsWith('./') ? `./${normalizedValue}` : `/${normalizedValue}`;
  }

  return `${base}${normalizedValue}`;
}