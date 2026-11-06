export type Category = 'sys' | 'ai' | 'plat'
export type Status = 'active' | 'alpha' | 'progress' | 'spec' | 'research' | 'candidate' | 'prototype' | 'earlier' | 'built'
export interface Project { id: string; name: string; cat: Category; status: Status; tags: string[]; repo: string }
export const REPO_BASE = 'https://github.com/shreyashjagtap157/'
export const PROJECTS: Project[] = [
  { id: 'omni', name: 'Omni', cat: 'sys', status: 'active', tags: ['Rust', 'Compilers'], repo: 'Omni---New' },
  { id: 'omni0', name: 'Omni (earlier)', cat: 'sys', status: 'earlier', tags: ['Rust'], repo: 'Omni' },
  { id: 'aether', name: 'AetherOS', cat: 'sys', status: 'spec', tags: ['Specification', 'Rust'], repo: 'AetherOS' },
  { id: 'mosaic', name: 'Mosaic-µ', cat: 'sys', status: 'candidate', tags: ['C', 'Rust', 'Python'], repo: 'Mosaic' },
  { id: 'aios', name: 'AI-OS', cat: 'sys', status: 'prototype', tags: ['Python'], repo: 'ai-os' },
  { id: 'nexus', name: 'NexusAgent', cat: 'ai', status: 'alpha', tags: ['Python', 'Agents'], repo: 'nexus-agent' },
  { id: 'kilo', name: 'Kilo Code swarm', cat: 'ai', status: 'progress', tags: ['TypeScript', 'Agents'], repo: 'kilocode' },
  { id: 'dnc', name: 'Dynamic Neural Computing', cat: 'ai', status: 'research', tags: ['Python'], repo: 'Dynamic-Neural-Computing' },
  { id: 'tensor', name: 'tensor-ring-decomposition', cat: 'ai', status: 'built', tags: ['Python', 'PyTorch'], repo: 'tensor-ring-decomposition' },
  { id: 'uep', name: 'UEP', cat: 'plat', status: 'progress', tags: ['Java', 'Spring Boot', 'React', 'PostgreSQL'], repo: 'UEP' },
  { id: 'acts', name: 'ACTSConnect', cat: 'plat', status: 'built', tags: ['JavaScript'], repo: 'ACTSConnect' },
  { id: 'oah', name: 'OldAgeHome', cat: 'plat', status: 'built', tags: ['Python', 'Django'], repo: 'OldAgeHome' },
  { id: 'milky', name: 'MilkyWay', cat: 'plat', status: 'built', tags: ['Python', 'Django'], repo: 'MilkyWay' },
  { id: 'iot', name: 'decentralized-iot-network', cat: 'plat', status: 'prototype', tags: ['Python', 'IoT'], repo: 'decentralized-iot-network' },
]
export const SKILLS: { key: string; tags: string[] }[] = [
  { key: 'sk1', tags: ['Python', 'Java', 'Rust', 'TypeScript', 'C', 'JavaScript'] },
  { key: 'sk2', tags: ['Django', 'DRF', 'Spring Boot', 'React', 'PostgreSQL', 'REST APIs'] },
  { key: 'sk3', tags: ['LLM and MCP APIs', 'RAG', 'LangChain', 'LlamaIndex', 'PyTorch', 'YOLOv8'] },
  { key: 'sk4', tags: ['Compilers', 'Specifications', 'Tokenization', 'IR design'] },
  { key: 'sk5', tags: ['Git', 'GitHub', 'Ansible', 'Testing and CI'] },
]
