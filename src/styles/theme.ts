export const theme = {
  fonts: {
    body: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },

  colors: {
    primary: '#2563eb',
    primaryHover: '#1d4ed8',
    danger: '#dc2626',
    background: '#f8fafc',
    surface: '#ffffff',
    border: '#e2e8f0',
    textPrimary: '#0f172a',
    textSecondary: '#64748b',
  },

  radius: {
    sm: '8px',
    md: '14px',
    lg: '20px',
  },

  shadow: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 16px rgba(0,0,0,0.08)',
  },

  spacing: (n: number) => `${n * 8}px`,
};
