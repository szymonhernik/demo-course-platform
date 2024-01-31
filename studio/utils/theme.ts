import {buildLegacyTheme} from 'sanity'

export const tailwindSlate = {
  50: '#f8fafc',
  100: '#f1f5f9',
  200: '#e2e8f0',
  300: '#cbd5e1',
  400: '#94a3b8',
  500: '#64748b',
  600: '#475569',
  700: '#334155',
  800: '#1e293b',
  900: '#0f172a',
  950: '#020617',
}

export const tailwindCyan = {
  950: '#0d0e0b',
  900: '#1a1c16',
  800: '#272922',
  700: '#34372d',
  600: '#414538',
  500: '#4e5343',
  400: '#5b614e',
  300: '#686e5a',
  200: '#757c65',
  100: '#828a70',
  50: '#ffffff',
}

export const theme = buildLegacyTheme({
  '--black': tailwindCyan[950],
  '--white': '#fff',
  '--brand-primary': tailwindCyan[900],
  '--focus-color': tailwindCyan[900],
  '--component-text-color': tailwindCyan[900],
  // buttons
  '--default-button-color': tailwindCyan[200],
})
