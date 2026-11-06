export type Category = 'sys' | 'ai' | 'plat'
export type Status = 'alpha' | 'progress' | 'spec' | 'research' | 'candidate' | 'prototype'
export interface Project { id: string; name: string; cat: Category; status: Status; tags: string[]; repo: string }
export const REPO_BASE = 'https://github.com/shreyashjagtap157/'
export const PROJECTS: Project[] = [
  { id: 'omni', name: 'Omni', cat: 'sys', status: 'progress', tags: ['Rust', 'Compilers', 'Specifications'], repo: 'Omni---New' },
  { id: 'helios', name: 'Helios', cat: 'ai', status: 'spec', tags: ['Symbolic reasoning', 'Knowledge systems', 'Architecture'], repo: 'Helios' },
  { id: 'nexus', name: 'NexusAgent', cat: 'ai', status: 'alpha', tags: ['Python', 'Multi-agent systems', 'MCP'], repo: 'nexus-agent' },
  { id: 'aether', name: 'AetherOS', cat: 'sys', status: 'spec', tags: ['OS architecture', 'Rust', 'Capabilities'], repo: 'AetherOS' },
  { id: 'mosaic', name: 'Mosaic-µ', cat: 'sys', status: 'candidate', tags: ['C', 'Rust', 'Python', 'Unicode'], repo: 'Mosaic' },
  { id: 'kilo', name: 'Kilo Code fork', cat: 'ai', status: 'progress', tags: ['TypeScript', 'Specialist agents', 'NVIDIA NIM'], repo: 'kilocode' },
  { id: 'dnc', name: 'Dynamic Neural Computation', cat: 'ai', status: 'research', tags: ['Python', 'Execution model', 'Formal methods'], repo: 'Dynamic-Neural-Computing' },
  { id: 'tensor', name: 'Tensor Ring Decomposition', cat: 'ai', status: 'progress', tags: ['Python', 'PyTorch', 'Tensor decomposition'], repo: 'tensor-ring-decomposition' },
  { id: 'uep', name: 'Universal Education Platform', cat: 'plat', status: 'progress', tags: ['Java', 'Spring Boot', 'React', 'PostgreSQL'], repo: 'UEP' },
  { id: 'iot', name: 'Decentralized IoT Network', cat: 'plat', status: 'prototype', tags: ['Python', 'IoT', 'Smart contracts'], repo: 'decentralized-iot-network' },
  { id: 'acts', name: 'ACTSConnect', cat: 'plat', status: 'prototype', tags: ['React', 'Spring Boot', 'Networking'], repo: 'ACTSConnect' },
  { id: 'oah', name: 'OldAgeHome', cat: 'plat', status: 'progress', tags: ['Python', 'Django', 'REST APIs'], repo: 'OldAgeHome' },
  { id: 'milky', name: 'MilkyWay', cat: 'plat', status: 'progress', tags: ['Python', 'Django', 'Services'], repo: 'MilkyWay' },
  { id: 'aios', name: 'AI-OS', cat: 'sys', status: 'prototype', tags: ['Python', 'Agents', 'Multimodal input'], repo: 'ai-os' },
]
export const SKILLS: { key: string; tags: string[] }[] = [
  { key: 'sk1', tags: ['Python', 'Java', 'Rust', 'TypeScript', 'C', 'JavaScript'] },
  { key: 'sk2', tags: ['Django', 'Django REST Framework', 'Spring Boot', 'React', 'PostgreSQL', 'REST API design'] },
  { key: 'sk3', tags: ['LLM and MCP APIs', 'RAG', 'LangChain', 'LlamaIndex', 'PyTorch', 'YOLOv8', 'Multi-agent orchestration'] },
  { key: 'sk4', tags: ['Compilers', 'Language specifications', 'Tokenization', 'IR design', 'Symbolic reasoning', 'Systems architecture'] },
  { key: 'sk5', tags: ['Git', 'GitHub', 'Ansible', 'Automated testing', 'CI/CD'] },
]
