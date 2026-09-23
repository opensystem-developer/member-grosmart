export function normalizePhone(input: string): string | null {
  const digits = input.replace(/\D/g, '');
  if (!digits) return null;

  let normalized = digits;
  if (normalized.startsWith('0')) {
    normalized = `62${normalized.slice(1)}`;
  } else if (normalized.startsWith('8')) {
    normalized = `62${normalized}`;
  }

  if (!normalized.startsWith('62')) return null;
  if (normalized.length < 10 || normalized.length > 15) return null;
  return normalized;
}

export function formatPhoneDisplay(normalized: string): string {
  if (!normalized.startsWith('62')) return normalized;
  const local = normalized.slice(2);
  return `+62 ${local.replace(/(\d{3})(?=\d)/g, '$1 ').trim()}`;
}

export function phonesMatch(a: string, b: string): boolean {
  const na = normalizePhone(a);
  const nb = normalizePhone(b);
  return !!na && na === nb;
}
