export type ProjectDetail = {
  id: string
  arch: string // inline SVG architecture diagram
  description: string
  statusNote: string
  links: { label: string; url: string }[]
}

// Architecture diagrams as inline SVG. Based only on facts from docs/DETAILS.md.
// No metrics or claims are invented.
export const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  omni: {
    id: 'omni',
    arch: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" class="arch-diagram">
      <defs><marker id="arr" markerWidth="8" markerHeight="8" refX="7" refY="3.5" orient="auto"><polygon points="0 0, 8 3.5, 0 7" fill="var(--mut)"/></marker></defs>
      <rect x="30" y="20" width="120" height="60" rx="6" class="stage"/>
      <text x="90" y="45" class="label">spec /</text>
      <text x="90" y="65" class="label">normative</text>
      <path d="M150 50 L170 50" class="arrow"/>
      <rect x="180" y="20" width="120" height="60" rx="6" class="stage"/>
      <text x="240" y="45" class="label">core (Rust)</text>
      <text x="240" y="65" class="label">lex, parse, sema</text>
      <path d="M300 50 L320 50" class="arrow"/>
      <rect x="330" y="20" width="40" height="60" rx="6" class="stage"/>
      <text x="350" y="55" class="label">ir</text>
      <path d="M145 80 L185 120" class="arrow"/>
      <rect x="140" y="120" width="120" height="60" rx="6" class="stage"/>
      <text x="200" y="145" class="label">codegen +</text>
      <text x="200" y="165" class="label">runtime</text>
      <path d="M170 180 L170 220" class="arrow"/>
      <rect x="130" y="220" width="80" height="60" rx="6" class="stage stage-final"/>
      <text x="170" y="245" class="label">self-host</text>
      <text x="170" y="265" class="label">gen three</text>
    </svg>`,
    description: 'Specification-governed programming language and toolchain in Rust, staged toward a self-hosted compiler.',
    statusNote: 'Active — three generations toward self-hosting.',
    links: [
      { label: 'Repository', url: 'https://github.com/shreyashjagtap157/Omni---New' },
    ],
  },
  nexus: {
    id: 'nexus',
    arch: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" class="arch-diagram">
      <defs><marker id="arr" markerWidth="8" markerHeight="8" refX="7" refY="3.5" orient="auto"><polygon points="0 0, 8 3.5, 0 7" fill="var(--mut)"/></marker></defs>
      <circle cx="200" cy="60" r="24" class="node"/>
      <text x="200" y="64" class="label">coordinator</text>
      <circle cx="80" cy="140" r="24" class="node"/>
      <text x="80" y="144" class="label">worker A</text>
      <circle cx="200" cy="140" r="24" class="node"/>
      <text x="200" y="144" class="label">worker B</text>
      <circle cx="320" cy="140" r="24" class="node"/>
      <text x="320" y="144" class="label">worker C</text>
      <path d="M160 80 Q200 110 80 130" class="arrow"/>
      <path d="M240 80 Q200 110 320 130" class="arrow"/>
      <path d="M200 100 Q200 130 200 115" class="arrow"/>
      <rect x="130" y="220" w="140" h="50" rx="6" class="stage"/>
      <text x="200" y="245" class="label">MCP + provider routing</text>
    </svg>`,
    description: 'Local-first multi-agent platform for development, research and automation, with MCP and provider routing.',
    statusNote: 'Alpha — local-first multi-agent platform.',
    links: [
      { label: 'Repository', url: 'https://github.com/shreyashjagtap157/nexus-agent' },
    ],
  },
  uep: {
    id: 'uep',
    arch: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" class="arch-diagram">
      <defs><marker id="arr" markerWidth="8" markerHeight="8" refX="7" refY="3.5" orient="auto"><polygon points="0 0, 8 3.5, 0 7" fill="var(--mut)"/></marker></defs>
      <rect x="20" y="20" width="140" height="70" rx="6" class="stage"/>
      <text x="90" y="50" class="label">React frontend</text>
      <path d="M160 55 L180 55" class="arrow"/>
      <rect x="200" y="20" width="180" height="70" rx="6" class="stage"/>
      <text x="290" y="45" class="label">Spring Boot API</text>
      <text x="290" y="65" class="label">REST endpoints</text>
      <path d="M200 90 L200 130" class="arrow"/>
      <rect x="160" y="130" width="80" height="60" rx="6" class="stage"/>
      <text x="200" y="155" class="label">Java</text>
      <path d="M290 90 L320 90" class="arrow"/>
      <path d="M330 70 L370 70 L370 150" class="arrow"/>
      <rect x="260" y="150" width="120" height="60" rx="6" class="stage"/>
      <text x="320" y="175" class="label">PostgreSQL</text>
    </svg>`,
    description: 'Multi-tenant education and training platform: Java and Spring Boot, React, PostgreSQL, live classrooms and grading.',
    statusNote: 'In progress — multi-tenant education platform.',
    links: [
      { label: 'Repository', url: 'https://github.com/shreyashjagtap157/UEP' },
    ],
  },
}
