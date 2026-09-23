export const Brand = {
  primary: '#0B7A4B',
  primaryDark: '#065A37',
  primaryLight: '#12A366',
  accent: '#F5B800',
  accentSoft: '#FFF4CC',
  cardGradient: ['#0B7A4B', '#064E31', '#033D26'] as const,
  silver: '#C0C0C0',
  gold: '#D4AF37',
  platinum: '#8E9EAB',
  bronze: '#CD7F32',
  danger: '#E53935',
  surface: '#F4F7F5',
  surfaceDark: '#121816',
  textMuted: '#5C6B63',
};

export function tierColor(tier: string): string {
  switch (tier) {
    case 'Platinum':
      return Brand.platinum;
    case 'Gold':
      return Brand.gold;
    case 'Silver':
      return Brand.silver;
    default:
      return Brand.bronze;
  }
}

export function formatPoints(value: number): string {
  return new Intl.NumberFormat('id-ID').format(value);
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));
}
