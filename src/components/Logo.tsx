export function Logo() {
  return (
    <svg className="logo" viewBox="0 0 64 64" role="img" aria-label="SJ monogram">
      <path d="M32 3l25 14.5v29L32 61 7 46.5v-29z" fill="none" stroke="var(--ac)" strokeWidth="2.5" />
      <path d="M32 11l18 10.5v21L32 53 14 42.5v-21z" fill="var(--card)" stroke="var(--ac2)" strokeWidth="1" />
      <text x="32" y="39" fontSize="18" fontFamily="JetBrains Mono, monospace" fontWeight="700" textAnchor="middle" fill="var(--ac)">SJ</text>
    </svg>
  )
}
