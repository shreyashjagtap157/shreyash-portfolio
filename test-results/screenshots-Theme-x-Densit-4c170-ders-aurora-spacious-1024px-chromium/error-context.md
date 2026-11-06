# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: screenshots.spec.ts >> Theme x Density screenshots >> renders aurora / spacious @ 1024px
- Location: tests\screenshots.spec.ts:11:9

# Error details

```
Error: expect(page).toHaveScreenshot(expected) failed

  12830 pixels (ratio 0.01 of all image pixels) are different.

  Snapshot: theme-aurora-density-spacious-w1024.png

Call log:
  - Expect "toHaveScreenshot(theme-aurora-density-spacious-w1024.png)" with timeout 5000ms
    - verifying given screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - 12830 pixels (ratio 0.01 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - captured a stable screenshot
  - 12830 pixels (ratio 0.01 of all image pixels) are different.

```

# Page snapshot

```yaml
- generic [ref=f1e2]:
  - link "Skip to content" [ref=f1e3] [cursor=pointer]:
    - /url: "#main"
  - banner [ref=f1e4]:
    - link "Shreyash Satish Jagtap, home" [ref=f1e5] [cursor=pointer]:
      - /url: "#top"
      - img "SJ monogram" [ref=f1e6]:
        - generic [ref=f1e9]: SJ
      - generic [ref=f1e10]: Shreyash Satish Jagtap
    - generic [ref=f1e11]:
      - paragraph [ref=f1e12]:
        - generic [ref=f1e13]: Pune, Maharashtra, India
        - link "ssjagtap2016@gmail.com" [ref=f1e14] [cursor=pointer]:
          - /url: mailto:ssjagtap2016@gmail.com
        - link "+91 80876 79022" [ref=f1e15] [cursor=pointer]:
          - /url: tel:+918087679022
      - paragraph [ref=f1e16]:
        - link "Shreyash Jagtap | LinkedIn" [ref=f1e17] [cursor=pointer]:
          - /url: https://www.linkedin.com/in/shreyash-jagtap-48a359356/
        - link "shreyashjagtap157 (warrite)" [ref=f1e18] [cursor=pointer]:
          - /url: https://github.com/shreyashjagtap157
        - link "Résumé (PDF)" [ref=f1e19] [cursor=pointer]:
          - /url: Shreyash_Satish_Jagtap_Resume.pdf
  - generic [ref=f1e21]:
    - navigation "Primary" [ref=f1e22]:
      - link "Projects" [ref=f1e23] [cursor=pointer]:
        - /url: "#work"
      - link "Case study" [ref=f1e24] [cursor=pointer]:
        - /url: "#case"
      - link "Skills" [ref=f1e25] [cursor=pointer]:
        - /url: "#skills"
      - link "Experience" [ref=f1e26] [cursor=pointer]:
        - /url: "#exp"
      - link "Contact" [ref=f1e27] [cursor=pointer]:
        - /url: "#contact"
    - generic [ref=f1e28]:
      - 'button "Theme: Aurora" [ref=f1e30] [cursor=pointer]':
        - generic [ref=f1e31]: "Theme:"
        - generic [ref=f1e32]: Aurora
      - 'button "Language: English" [ref=f1e36] [cursor=pointer]':
        - generic [ref=f1e37]: "Language:"
        - generic [ref=f1e38]: English
      - 'button "Density: Spacious" [ref=f1e42] [cursor=pointer]':
        - generic [ref=f1e43]: "Density:"
        - generic [ref=f1e44]: Spacious
  - main [ref=f1e47]:
    - generic [ref=f1e48]:
      - generic [ref=f1e49]:
        - heading "Engineering intelligent systems. Building new possibilities." [level=1] [ref=f1e50]
        - paragraph [ref=f1e51]: Engineer, developer and innovator. I design programming languages, AI-agent platforms and developer tools, and carry them from specification to working software.
        - paragraph [ref=f1e52]:
          - link "Explore projects" [ref=f1e53] [cursor=pointer]:
            - /url: "#work"
          - link "Get in touch" [ref=f1e54] [cursor=pointer]:
            - /url: "#contact"
      - generic [ref=f1e56]:
        - paragraph [ref=f1e57]:
          - text: Omni
          - generic [ref=f1e58]: Rust
        - paragraph [ref=f1e59]:
          - text: NexusAgent
          - generic [ref=f1e60]: Python
        - paragraph [ref=f1e61]:
          - text: UEP
          - generic [ref=f1e62]: Java
    - generic [ref=f1e63]:
      - heading "Selected work" [level=2] [ref=f1e64]
      - paragraph [ref=f1e65]: Fourteen projects built from scratch, each labelled with what is built and what is still in progress.
      - group "Filter projects" [ref=f1e66]:
        - button "All" [pressed] [ref=f1e67] [cursor=pointer]
        - button "Languages and systems" [ref=f1e68] [cursor=pointer]
        - button "AI and agents" [ref=f1e69] [cursor=pointer]
        - button "Platforms and web" [ref=f1e70] [cursor=pointer]
      - generic [ref=f1e71]:
        - button "Omni Active Specification-governed programming language and toolchain in Rust, staged toward a self-hosted compiler. Rust Compilers Repository →" [ref=f1e72] [cursor=pointer]:
          - generic [ref=f1e73]:
            - heading "Omni" [level=3] [ref=f1e74]
            - generic [ref=f1e75]: Active
          - paragraph [ref=f1e76]: Specification-governed programming language and toolchain in Rust, staged toward a self-hosted compiler.
          - paragraph [ref=f1e77]:
            - generic [ref=f1e78]: Rust
            - generic [ref=f1e79]: Compilers
          - link "Repository →" [ref=f1e80]:
            - /url: https://github.com/shreyashjagtap157/Omni---New
        - button "Omni (earlier) Earlier version Earlier Rust implementation of Omni, kept as the predecessor of the current edition. Rust Repository →" [ref=f1e81] [cursor=pointer]:
          - generic [ref=f1e82]:
            - heading "Omni (earlier)" [level=3] [ref=f1e83]
            - generic [ref=f1e84]: Earlier version
          - paragraph [ref=f1e85]: Earlier Rust implementation of Omni, kept as the predecessor of the current edition.
          - paragraph [ref=f1e86]:
            - generic [ref=f1e87]: Rust
          - link "Repository →" [ref=f1e88]:
            - /url: https://github.com/shreyashjagtap157/Omni
        - 'button "AetherOS Specification Capability-based operating system architecture: 41 normative RFCs, with an executable reference model. Specification Rust Repository →" [ref=f1e89] [cursor=pointer]':
          - generic [ref=f1e90]:
            - heading "AetherOS" [level=3] [ref=f1e91]
            - generic [ref=f1e92]: Specification
          - paragraph [ref=f1e93]: "Capability-based operating system architecture: 41 normative RFCs, with an executable reference model."
          - paragraph [ref=f1e94]:
            - generic [ref=f1e95]: Specification
            - generic [ref=f1e96]: Rust
          - link "Repository →" [ref=f1e97]:
            - /url: https://github.com/shreyashjagtap157/AetherOS
        - button "Mosaic-µ Candidate Byte-exact universal tokenizer in C with Unicode support, language packs and a Python binding. C Rust Python Repository →" [ref=f1e98] [cursor=pointer]:
          - generic [ref=f1e99]:
            - heading "Mosaic-µ" [level=3] [ref=f1e100]
            - generic [ref=f1e101]: Candidate
          - paragraph [ref=f1e102]: Byte-exact universal tokenizer in C with Unicode support, language packs and a Python binding.
          - paragraph [ref=f1e103]:
            - generic [ref=f1e104]: C
            - generic [ref=f1e105]: Rust
            - generic [ref=f1e106]: Python
          - link "Repository →" [ref=f1e107]:
            - /url: https://github.com/shreyashjagtap157/Mosaic
        - button "AI-OS Prototype Prototype AI-native operating system with a built-in agent, command registry and plugin sandboxes. Python Repository →" [ref=f1e108] [cursor=pointer]:
          - generic [ref=f1e109]:
            - heading "AI-OS" [level=3] [ref=f1e110]
            - generic [ref=f1e111]: Prototype
          - paragraph [ref=f1e112]: Prototype AI-native operating system with a built-in agent, command registry and plugin sandboxes.
          - paragraph [ref=f1e113]:
            - generic [ref=f1e114]: Python
          - link "Repository →" [ref=f1e115]:
            - /url: https://github.com/shreyashjagtap157/ai-os
        - button "NexusAgent Alpha Local-first multi-agent platform for development, research and automation, with MCP and provider routing. Python Agents Repository →" [ref=f1e116] [cursor=pointer]:
          - generic [ref=f1e117]:
            - heading "NexusAgent" [level=3] [ref=f1e118]
            - generic [ref=f1e119]: Alpha
          - paragraph [ref=f1e120]: Local-first multi-agent platform for development, research and automation, with MCP and provider routing.
          - paragraph [ref=f1e121]:
            - generic [ref=f1e122]: Python
            - generic [ref=f1e123]: Agents
          - link "Repository →" [ref=f1e124]:
            - /url: https://github.com/shreyashjagtap157/nexus-agent
        - button "Kilo Code swarm In progress Fork of an open-source coding agent, extended with coordinator and worker roles and validation gates. TypeScript Agents Repository →" [ref=f1e125] [cursor=pointer]:
          - generic [ref=f1e126]:
            - heading "Kilo Code swarm" [level=3] [ref=f1e127]
            - generic [ref=f1e128]: In progress
          - paragraph [ref=f1e129]: Fork of an open-source coding agent, extended with coordinator and worker roles and validation gates.
          - paragraph [ref=f1e130]:
            - generic [ref=f1e131]: TypeScript
            - generic [ref=f1e132]: Agents
          - link "Repository →" [ref=f1e133]:
            - /url: https://github.com/shreyashjagtap157/kilocode
        - button "Dynamic Neural Computing Research Formal specification and Python runtime for dynamic neural computation graphs. Python Repository →" [ref=f1e134] [cursor=pointer]:
          - generic [ref=f1e135]:
            - heading "Dynamic Neural Computing" [level=3] [ref=f1e136]
            - generic [ref=f1e137]: Research
          - paragraph [ref=f1e138]: Formal specification and Python runtime for dynamic neural computation graphs.
          - paragraph [ref=f1e139]:
            - generic [ref=f1e140]: Python
          - link "Repository →" [ref=f1e141]:
            - /url: https://github.com/shreyashjagtap157/Dynamic-Neural-Computing
        - 'button "tensor-ring-decomposition Built PyTorch library for tensor ring decomposition: ALS, SVD and quantization-aware training. Python PyTorch Repository →" [ref=f1e142] [cursor=pointer]':
          - generic [ref=f1e143]:
            - heading "tensor-ring-decomposition" [level=3] [ref=f1e144]
            - generic [ref=f1e145]: Built
          - paragraph [ref=f1e146]: "PyTorch library for tensor ring decomposition: ALS, SVD and quantization-aware training."
          - paragraph [ref=f1e147]:
            - generic [ref=f1e148]: Python
            - generic [ref=f1e149]: PyTorch
          - link "Repository →" [ref=f1e150]:
            - /url: https://github.com/shreyashjagtap157/tensor-ring-decomposition
        - 'button "UEP In progress Multi-tenant education and training platform: Java and Spring Boot, React, PostgreSQL, live classrooms and grading. Java Spring Boot React PostgreSQL Repository →" [ref=f1e151] [cursor=pointer]':
          - generic [ref=f1e152]:
            - heading "UEP" [level=3] [ref=f1e153]
            - generic [ref=f1e154]: In progress
          - paragraph [ref=f1e155]: "Multi-tenant education and training platform: Java and Spring Boot, React, PostgreSQL, live classrooms and grading."
          - paragraph [ref=f1e156]:
            - generic [ref=f1e157]: Java
            - generic [ref=f1e158]: Spring Boot
            - generic [ref=f1e159]: React
            - generic [ref=f1e160]: PostgreSQL
          - link "Repository →" [ref=f1e161]:
            - /url: https://github.com/shreyashjagtap157/UEP
        - button "ACTSConnect Built Social and alumni networking platform connecting students and alumni, with separate frontend and backend. JavaScript Repository →" [ref=f1e162] [cursor=pointer]:
          - generic [ref=f1e163]:
            - heading "ACTSConnect" [level=3] [ref=f1e164]
            - generic [ref=f1e165]: Built
          - paragraph [ref=f1e166]: Social and alumni networking platform connecting students and alumni, with separate frontend and backend.
          - paragraph [ref=f1e167]:
            - generic [ref=f1e168]: JavaScript
          - link "Repository →" [ref=f1e169]:
            - /url: https://github.com/shreyashjagtap157/ACTSConnect
        - button "OldAgeHome Built Django REST backend with 30+ API endpoints for an old-age-home application. Python Django Repository →" [ref=f1e170] [cursor=pointer]:
          - generic [ref=f1e171]:
            - heading "OldAgeHome" [level=3] [ref=f1e172]
            - generic [ref=f1e173]: Built
          - paragraph [ref=f1e174]: Django REST backend with 30+ API endpoints for an old-age-home application.
          - paragraph [ref=f1e175]:
            - generic [ref=f1e176]: Python
            - generic [ref=f1e177]: Django
          - link "Repository →" [ref=f1e178]:
            - /url: https://github.com/shreyashjagtap157/OldAgeHome
        - button "MilkyWay Built Django web app for managing milk delivery services and home solutions. Python Django Repository →" [ref=f1e179] [cursor=pointer]:
          - generic [ref=f1e180]:
            - heading "MilkyWay" [level=3] [ref=f1e181]
            - generic [ref=f1e182]: Built
          - paragraph [ref=f1e183]: Django web app for managing milk delivery services and home solutions.
          - paragraph [ref=f1e184]:
            - generic [ref=f1e185]: Python
            - generic [ref=f1e186]: Django
          - link "Repository →" [ref=f1e187]:
            - /url: https://github.com/shreyashjagtap157/MilkyWay
        - button "decentralized-iot-network Prototype Decentralized IoT network in which devices earn cryptocurrency rewards. Python IoT Repository →" [ref=f1e188] [cursor=pointer]:
          - generic [ref=f1e189]:
            - heading "decentralized-iot-network" [level=3] [ref=f1e190]
            - generic [ref=f1e191]: Prototype
          - paragraph [ref=f1e192]: Decentralized IoT network in which devices earn cryptocurrency rewards.
          - paragraph [ref=f1e193]:
            - generic [ref=f1e194]: Python
            - generic [ref=f1e195]: IoT
          - link "Repository →" [ref=f1e196]:
            - /url: https://github.com/shreyashjagtap157/decentralized-iot-network
    - generic [ref=f1e197]:
      - 'heading "Case study: Omni" [level=2] [ref=f1e198]'
      - paragraph [ref=f1e199]: Every compiler stage has an explicit interface and a stated status.
      - generic [ref=f1e200]:
        - list [ref=f1e201]:
          - listitem [ref=f1e202]:
            - text: Source
            - generic [ref=f1e203]: input
          - listitem [ref=f1e204]:
            - text: Lexer
            - generic [ref=f1e205]: tokens
          - listitem [ref=f1e206]:
            - text: Parser
            - generic [ref=f1e207]: syntax tree
          - listitem [ref=f1e208]:
            - text: Semantic analysis
            - generic [ref=f1e209]: types, rules
          - listitem [ref=f1e210]:
            - text: IR and verification
            - generic [ref=f1e211]: contracts
          - listitem [ref=f1e212]:
            - text: Codegen and runtime
            - generic [ref=f1e213]: output
        - list [ref=f1e214]:
          - listitem [ref=f1e215]: A normative specification decides semantics. Where it is silent or contradictory, the implementation does not invent behavior.
          - listitem [ref=f1e216]: "Generation one: a minimal Rust core. Two: a complete Rust platform. Three: an independently qualified, self-hosted Omni compiler."
          - listitem [ref=f1e217]: "Challenge: keeping grammar, semantics, code and tests consistent as the language grows."
    - generic [ref=f1e218]:
      - heading "Technical focus" [level=2] [ref=f1e219]
      - paragraph [ref=f1e220]: Grouped by what the work demonstrates.
      - generic [ref=f1e221]:
        - generic [ref=f1e222]:
          - heading "Languages" [level=3] [ref=f1e223]
          - paragraph [ref=f1e224]:
            - generic [ref=f1e225]: Python
            - generic [ref=f1e226]: Java
            - generic [ref=f1e227]: Rust
            - generic [ref=f1e228]: TypeScript
            - generic [ref=f1e229]: C
            - generic [ref=f1e230]: JavaScript
        - generic [ref=f1e231]:
          - heading "Backend and web" [level=3] [ref=f1e232]
          - paragraph [ref=f1e233]:
            - generic [ref=f1e234]: Django
            - generic [ref=f1e235]: DRF
            - generic [ref=f1e236]: Spring Boot
            - generic [ref=f1e237]: React
            - generic [ref=f1e238]: PostgreSQL
            - generic [ref=f1e239]: REST APIs
        - generic [ref=f1e240]:
          - heading "AI and agents" [level=3] [ref=f1e241]
          - paragraph [ref=f1e242]:
            - generic [ref=f1e243]: LLM and MCP APIs
            - generic [ref=f1e244]: RAG
            - generic [ref=f1e245]: LangChain
            - generic [ref=f1e246]: LlamaIndex
            - generic [ref=f1e247]: PyTorch
            - generic [ref=f1e248]: YOLOv8
        - generic [ref=f1e249]:
          - heading "Language and systems engineering" [level=3] [ref=f1e250]
          - paragraph [ref=f1e251]:
            - generic [ref=f1e252]: Compilers
            - generic [ref=f1e253]: Specifications
            - generic [ref=f1e254]: Tokenization
            - generic [ref=f1e255]: IR design
        - generic [ref=f1e256]:
          - heading "Tooling" [level=3] [ref=f1e257]
          - paragraph [ref=f1e258]:
            - generic [ref=f1e259]: Git
            - generic [ref=f1e260]: GitHub
            - generic [ref=f1e261]: Ansible
            - generic [ref=f1e262]: Testing and CI
    - generic [ref=f1e263]:
      - heading "Experience and education" [level=2] [ref=f1e264]
      - generic [ref=f1e265]:
        - generic [ref=f1e266]:
          - generic [ref=f1e267]: 17 Jun 2026 to present
          - generic [ref=f1e268]:
            - text: Java Full Stack Developer with Generative AI (Intern), Puneri Pattern Pvt. Ltd.
            - paragraph [ref=f1e269]: Java full-stack development with Generative AI training and projects. Pune.
        - generic [ref=f1e270]:
          - generic [ref=f1e271]: Dec 2024 to Mar 2026
          - generic [ref=f1e272]:
            - text: Django Backend Developer (Intern), Chordz Technologies
            - paragraph [ref=f1e273]: REST APIs with Django REST Framework; 70+ endpoints across projects, including 30+ for OldAgeHome.
        - generic [ref=f1e274]:
          - generic [ref=f1e275]: 2018 to 2022
          - generic [ref=f1e276]:
            - text: B.E. Computer Science, Pune Institute of Computer Technology
            - paragraph [ref=f1e277]: CGPA 8.73.
        - generic [ref=f1e278]:
          - generic [ref=f1e279]: Certifications
          - generic [ref=f1e280]:
            - text: Anthropic Academy
            - paragraph [ref=f1e281]: Claude 101; Building with the Claude API; Claude Code in Action; Introduction to MCP.
    - generic [ref=f1e282]:
      - heading "Let’s build something precise." [level=2] [ref=f1e283]
      - paragraph [ref=f1e284]: Open to conversations about systems, languages and agent platforms.
      - paragraph [ref=f1e285]:
        - link "Shreyash Jagtap | LinkedIn" [ref=f1e286] [cursor=pointer]:
          - /url: https://www.linkedin.com/in/shreyash-jagtap-48a359356/
        - link "shreyashjagtap157 (warrite)" [ref=f1e287] [cursor=pointer]:
          - /url: https://github.com/shreyashjagtap157
        - link "ssjagtap2016@gmail.com" [ref=f1e288] [cursor=pointer]:
          - /url: mailto:ssjagtap2016@gmail.com
        - link "+91 80876 79022" [ref=f1e289] [cursor=pointer]:
          - /url: tel:+918087679022
        - link "Download résumé" [ref=f1e290] [cursor=pointer]:
          - /url: Shreyash_Satish_Jagtap_Resume.pdf
  - contentinfo [ref=f1e291]:
    - generic [ref=f1e292]: © 2026 Shreyash Satish Jagtap
    - generic [ref=f1e293]: Static site. No trackers, no cookies.
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test'
  2   | 
  3   | const THEMES = ['void', 'orbital', 'blueprint', 'aurora'] as const
  4   | const DENSITIES = ['compact', 'comfortable', 'spacious'] as const
  5   | const WIDTHS = [360, 768, 1024, 1440] as const
  6   | 
  7   | test.describe('Theme x Density screenshots', () => {
  8   |   for (const theme of THEMES) {
  9   |     for (const density of DENSITIES) {
  10  |       for (const width of WIDTHS) {
  11  |         test(`renders ${theme} / ${density} @ ${width}px`, async ({ page }) => {
  12  |           await page.setViewportSize({ width, height: 900 })
  13  |           await page.goto('/')
  14  |           // Apply theme + density before hydration paints
  15  |           await page.evaluate(({ t, d }) => {
  16  |             localStorage.setItem('theme', t)
  17  |             localStorage.setItem('density', d)
  18  |             document.documentElement.dataset.theme = t
  19  |             document.documentElement.dataset.density = d
  20  |           }, { t: theme, d: density })
  21  |           await page.reload()
  22  |           await page.waitForLoadState('networkidle')
> 23  |           await expect(page).toHaveScreenshot(`theme-${theme}-density-${density}-w${width}.png`, {
      |                              ^ Error: expect(page).toHaveScreenshot(expected) failed
  24  |             fullPage: true,
  25  |             maxDiffPixels: 2000,
  26  |           })
  27  |         })
  28  |       }
  29  |     }
  30  |   }
  31  | })
  32  | 
  33  | test.describe('Dropdown accessibility', () => {
  34  |   test('keyboard navigation: arrows, Home, End, Enter, Escape', async ({ page }) => {
  35  |     await page.setViewportSize({ width: 1024, height: 900 })
  36  |     await page.goto('/')
  37  | 
  38  |     const themeBtn = page.getByRole('button', { name: /Theme:/ }).first()
  39  |     await themeBtn.click()
  40  |     await expect(page.getByRole('listbox')).toBeVisible()
  41  | 
  42  |     // ArrowDown moves focus
  43  |     await page.keyboard.press('ArrowDown')
  44  |     await page.keyboard.press('ArrowDown')
  45  |     // Enter selects
  46  |     await page.keyboard.press('Enter')
  47  |     await expect(page.getByRole('listbox')).toBeHidden()
  48  | 
  49  |     // Reopen and test Escape closes
  50  |     await themeBtn.click()
  51  |     await expect(page.getByRole('listbox')).toBeVisible()
  52  |     await page.keyboard.press('Escape')
  53  |     await expect(page.getByRole('listbox')).toBeHidden()
  54  | 
  55  |     // Reopen and test Home/End
  56  |     await themeBtn.click()
  57  |     await page.keyboard.press('End')
  58  |     await page.keyboard.press('Home')
  59  |     await page.keyboard.press('Enter')
  60  |     await expect(page.getByRole('listbox')).toBeHidden()
  61  |   })
  62  | 
  63  |   test('click-outside closes dropdown', async ({ page }) => {
  64  |     await page.setViewportSize({ width: 1024, height: 900 })
  65  |     await page.goto('/')
  66  |     const themeBtn = page.getByRole('button', { name: /Theme:/ }).first()
  67  |     await themeBtn.click()
  68  |     await expect(page.getByRole('listbox')).toBeVisible()
  69  |     await page.click('body', { position: { x: 10, y: 10 } })
  70  |     await expect(page.getByRole('listbox')).toBeHidden()
  71  |   })
  72  | 
  73  |   test('language dropdown is searchable and shows built-in vs mt hint', async ({ page }) => {
  74  |     await page.setViewportSize({ width: 1024, height: 900 })
  75  |     await page.goto('/')
  76  |     const langBtn = page.getByRole('button', { name: /Language:/ }).first()
  77  |     await langBtn.click()
  78  |     await expect(page.getByRole('listbox')).toBeVisible()
  79  |     const search = page.getByPlaceholder(/Search languages/i)
  80  |     await expect(search).toBeVisible()
  81  |     await search.fill('ar')
  82  |     await page.waitForTimeout(200)
  83  |     const options = page.getByRole('option')
  84  |     await expect(await options.count()).toBeGreaterThan(0)
  85  |   })
  86  | 
  87  |   test('RTL layout: switching to Arabic sets dir=rtl', async ({ page }) => {
  88  |     await page.setViewportSize({ width: 360, height: 900 })
  89  |     await page.goto('/')
  90  |     const langBtn = page.getByRole('button', { name: /Language:/ }).first()
  91  |     await langBtn.click()
  92  |     await page.getByPlaceholder(/Search languages/i).fill('ar')
  93  |     await page.waitForTimeout(200)
  94  |     const arOption = page.getByRole('option').first()
  95  |     await arOption.click()
  96  |     await page.waitForTimeout(300)
  97  |     expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
  98  |     const body = page.locator('body')
  99  |     const box = await body.boundingBox()
  100 |     expect(box).not.toBeNull()
  101 |   })
  102 | })
  103 | 
  104 | test.describe('No horizontal overflow', () => {
  105 |   test('at all widths', async ({ page }) => {
  106 |     for (const width of WIDTHS) {
  107 |       await page.setViewportSize({ width, height: 900 })
  108 |       await page.goto('/')
  109 |       await page.waitForLoadState('networkidle')
  110 |       const body = page.locator('body')
  111 |       const box = await body.boundingBox()
  112 |       expect(box).not.toBeNull()
  113 |       expect(box!.width).toBeLessThanOrEqual(width)
  114 |     }
  115 |   })
  116 | })
  117 | 
```