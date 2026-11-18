/**
 * The Watch: a dated technology-watch feed, read against the canon.
 * Every brief links its primary or reporting source and the works in the
 * collection that explain why the news matters.
 */

export type Beat = 'models' | 'cyber' | 'safety' | 'science' | 'chips' | 'capital' | 'crypto'

export const BEATS: { id: Beat; label: string; accent: string; blurb: string }[] = [
  { id: 'models', label: 'Models', accent: '#e6cc8f', blurb: 'Frontier and open-weight releases' },
  { id: 'cyber', label: 'Cyber', accent: '#b8693f', blurb: 'Attack, defence and vulnerabilities' },
  { id: 'safety', label: 'Safety', accent: '#7b98b6', blurb: 'Oversight, alignment, incidents' },
  { id: 'science', label: 'Science', accent: '#8b8a52', blurb: 'AI turned toward discovery' },
  { id: 'chips', label: 'Chips', accent: '#9fb4c9', blurb: 'Silicon, materials, compute' },
  { id: 'capital', label: 'Capital', accent: '#c8a25a', blurb: 'Rounds, listings, earnings' },
  { id: 'crypto', label: 'Crypto', accent: '#d9a441', blurb: 'Digital assets and markets' },
]

export const beatOf = (id: Beat) => BEATS.find((b) => b.id === id)!

export interface Brief {
  id: string
  date: string // YYYY-MM-DD
  beat: Beat
  signal: string
  title: string
  summary: string
  why: string
  figure: { value: string; label: string }
  source: { name: string; url: string }
  related: string[]
}

export const WATCH_UPDATED = '2026-11-18'

export const BRIEFS: Brief[] = [
  {
    id: 'gemini-4-hydrogen',
    date: '2026-11-12',
    beat: 'models',
    signal: 'Release',
    title: 'Google brings Gemini 4 to everyone with Hydrogen',
    summary:
      'Hydrogen is the fast, cheaper member of the Gemini 4 family, built for everyday coding and agent work. It replaces Gemini 3.8 Flash across Search, the Gemini app and the API, with a one-million-token context, about two weeks after the frontier Gemini 4 Carbon.',
    why: 'Frontier generations now ship as families: a deep-reasoning flagship for the hardest problems, and a fast tier that puts the same generation in front of billions of users within weeks.',
    figure: { value: '57%', label: 'on Terminal-Bench 4.1, against 18.2% for 3.8 Flash' },
    source: { name: 'Google', url: 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/' },
    related: ['gemini-4-carbon', 'chinchilla'],
  },
  {
    id: 'crypto-slide',
    date: '2026-11-12',
    beat: 'crypto',
    signal: 'Market',
    title: 'Bitcoin breaks below $72,000 as ether slips under $2,000',
    summary:
      'A sharp correction took bitcoin through the $72,000 mark and pushed ether below $2,000 for the first time in three months, in a session also marked by tighter European rules on decentralised finance.',
    why: 'Crypto is trading as a risk asset apart from the AI-led parts of the market, testing the long-standing thesis that bitcoin behaves as a store of value in stress.',
    figure: { value: '< $2,000', label: 'ether, a three-month low' },
    source: { name: 'Cryptoactu', url: 'https://cryptoactu.com/archives/2026/11/12/' },
    related: ['bullish-case-bitcoin', 'bitcoin-whitepaper', 'ethereum-whitepaper'],
  },
  {
    id: 'lazarus-backdoor',
    date: '2026-11-10',
    beat: 'cyber',
    signal: 'Research',
    title: 'Seven neurons are enough to backdoor an AI agent',
    summary:
      'Microsoft Research and its AI Red Team showed that rewriting fewer than ten rarely-used neurons in an open-weight model plants a hidden trigger that makes an agent run an attacker’s command, with no retraining. On Nemotron-Terminal-8B, seven edited neurons produced the payload in about 99% of triggered sessions while the model behaved normally otherwise.',
    why: 'Model weights are now part of the software supply chain. Provenance, cryptographic signing and diffing weights against the original matter as much as reviewing code.',
    figure: { value: '7', label: 'neurons edited, out of 12,000+ in one layer' },
    source: { name: 'The Hacker News', url: 'https://thehackernews.com/2026/11/microsoft-researchers-show-ai-agents.html' },
    related: ['cyberlens-saes', 'gtig-ai-threat-tracker-q4-2026'],
  },
  {
    id: 'fable-mythos-5-2',
    date: '2026-11-09',
    beat: 'models',
    signal: 'Release',
    title: 'Anthropic ships Claude Fable 5.2 and Mythos 5.2',
    summary:
      'One underlying model, two access regimes: Fable 5.2 carries cybersecurity and biology safeguards and is available to everyone, while Mythos 5.2 goes to vetted security and life-science organisations. Anthropic reports output up to 30% faster than the 5.1 generation and lowered prices to $8 and $40 per million input and output tokens.',
    why: 'Same weights, different safeguards depending on who is asking: the split release is becoming the industry’s template for shipping dual-use capability.',
    figure: { value: '30%', label: 'faster output than the 5.1 generation' },
    source: { name: 'SD Times', url: 'https://sdtimes.com/ai/anthropic-introduces-claude-fable-5-2-mythos-5-2/' },
    related: ['we-must-pace-the-frontier', 'scaling-laws', 'llm-formal-verification'],
  },
  {
    id: 'openai-round',
    date: '2026-11-06',
    beat: 'capital',
    signal: 'Funding',
    title: 'OpenAI reportedly closes $11 billion at a $1.25 trillion valuation',
    summary:
      'According to Bloomberg, the $11 billion is the first portion of a round that could reach $20 billion, valuing OpenAI about 47% above the $852 billion set in March. OpenAI declined to comment.',
    why: 'Venture capital at this altitude behaves like sovereign finance: a handful of labs absorb a growing share of all private money, which is exactly the concentration the classic cycle memos warn about.',
    figure: { value: '$1.25T', label: 'reported valuation' },
    source: { name: 'GV Wire, citing Bloomberg', url: 'https://gvwire.com/2026/11/06/openai-secures-11-billion-funding-at-1-25-trillion-valuation-bloomberg-news-reports/' },
    related: ['waiting-for-the-last-dance', 'mcdonaldization-of-vc', 'rip-good-times'],
  },
  {
    id: 'diamond-200mm',
    date: '2026-11-05',
    beat: 'chips',
    signal: 'Breakthrough',
    title: 'Diamond reaches semiconductor wafer scale',
    summary:
      'Diamond Foundry unveiled a 200mm single-crystal diamond: one continuous crystal rather than tiles or a polycrystalline wafer, doubling the diameter of its 2023 record. The crystal is still unpolished and no quality data has been published.',
    why: 'Heat is now a hard limit on AI chips. Diamond spreads heat far better than copper while insulating electrically, so wafer-sized crystals could change how processors are packaged and cooled.',
    figure: { value: '200 mm', label: 'single crystal, the size of a standard wafer' },
    source: { name: 'Semiconductor Today', url: 'https://semiconductor-today.com/news_items/2026/nov/diamondfoundry-111126.shtml' },
    related: ['fairchild-founding', 'silicon-photonics-market-2026-2036'],
  },
  {
    id: 'sshole',
    date: '2026-11-05',
    beat: 'cyber',
    signal: 'Vulnerability',
    title: 'SSHole: a ten-year-old OpenSSH bypass on Alpine Linux',
    summary:
      'CVE-2026-123158 lets an attacker who can reach the SSH port log into accounts that have no usable password, on OpenSSH servers built with musl libc and without PAM, which is Alpine’s default. OpenSSH 10.6p2 fixes it, and disabling password authentication blocks the attack.',
    why: 'Alpine sits under a huge share of containers. A quiet difference between C libraries went unnoticed for a decade: the kind of long-tolerated weakness defenders now race to find before automated attackers do.',
    figure: { value: '8.1', label: 'CVSS score (High)' },
    source: { name: 'SecurityWeek', url: 'https://securityweek.com/openssh-rushes-patches-for-sshole-authentication-bypass' },
    related: ['llm-formal-verification', 'gpt-6-cyber'],
  },
  {
    id: 'gpt-6-cyber',
    date: '2026-11-05',
    beat: 'cyber',
    signal: 'Release',
    title: 'OpenAI releases GPT-6 Cyber to vetted defenders',
    summary:
      'A version of GPT-6 trained to find vulnerabilities, prove them with working exploits and propose fixes, offered first to a small set of security customers. Its launch research reports 81 unknown high-severity Firefox bugs and working privilege-escalation exploits for 948 Linux kernel flaws.',
    why: 'Vulnerability discovery is becoming industrial. The bottleneck moves from finding bugs to triaging, disclosing and patching them fast enough.',
    figure: { value: '948', label: 'working Linux kernel exploits' },
    source: { name: 'BleepingComputer', url: 'https://www.bleepingcomputer.com/news/security/openais-new-gpt-6-cyber-ai-finds-81-firefox-flaws-948-linux-bugs/' },
    related: ['gpt-6-cyber', 'llm-formal-verification', 'alphaproof-code'],
  },
  {
    id: 'kimi-k3-1-pro',
    date: '2026-11-04',
    beat: 'models',
    signal: 'Open weights',
    title: 'Moonshot publishes the weights of Kimi K3.1 Pro',
    summary:
      'The 2.8-trillion-parameter mixture-of-experts model, with about 104 billion parameters active per token and a one-million-token context, is now on Hugging Face, as promised at its October launch. Moonshot said it did not want to release open weights that set a new high-water mark for cyber-offence capability.',
    why: 'Open weights at trillion scale keep closing the gap with closed labs, and turn “what not to release” into an explicit design decision.',
    figure: { value: '2.8T', label: 'parameters, 104B active' },
    source: { name: 'TechNode', url: 'https://technode.com/2026/11/05/moonshot-ai-releases-kimi-k3-1-pro-model-weights/' },
    related: ['inkling-open-weights', 'deepseek-r1'],
  },
  {
    id: 'amd-q3',
    date: '2026-11-03',
    beat: 'capital',
    signal: 'Earnings',
    title: 'AMD posts a record quarter on AI data centres',
    summary:
      'Third-quarter revenue reached $13.4 billion, up 45% on a year earlier. Data-centre sales nearly doubled to a record $8.5 billion on EPYC processors and Instinct MI450 GPUs, while gaming revenue fell 40%.',
    why: 'The AI buildout is redrawing chipmakers from the inside: the data centre now accounts for almost two-thirds of AMD’s sales.',
    figure: { value: '+97%', label: 'data-centre revenue, year on year' },
    source: { name: 'AMD, Form 8-K', url: 'https://www.sec.gov/Archives/edgar/data/0000002488/000000248826000188/q32026991.htm' },
    related: ['situational-awareness', 'meeker-ai-trends'],
  },
  {
    id: 'ncsc-ai-ransomware',
    date: '2026-11-03',
    beat: 'cyber',
    signal: 'Policy',
    title: 'UK: AI-powered ransomware on critical infrastructure “highly likely” by 2028',
    summary:
      'The NCSC’s annual review warns that AI will raise the scale and speed of attacks, above all by finding and exploiting weaknesses that have been tolerated for years. The government paired it with £70 million for a National Exposure and Real-Time Vulnerability Centre and a new AI security centre in Manchester.',
    why: 'A national cyber agency has put a date on AI-enabled attacks against infrastructure, and its diagnosis is old debt, not exotic new techniques.',
    figure: { value: '2028', label: 'horizon of the NCSC assessment' },
    source: { name: 'NCSC', url: 'https://ncsc.gov.uk/news/cyber-chief-uk-facing-ai-powered-attacks-on-critical-infrastructure-in-two-years' },
    related: ['gtig-ai-threat-tracker-q4-2026', 'gpt-6-cyber'],
  },
  {
    id: 'llmjacking',
    date: '2026-11-02',
    beat: 'cyber',
    signal: 'Threat',
    title: 'LLMjacking turns stolen AI access into a business',
    summary:
      'Google Threat Intelligence and Mandiant describe criminals hijacking enterprise cloud and model access, then reselling it through “LLM Mixers”: gateways that pool stolen keys. In one case a token-routing service passed nearly $1 million in model costs to a victim while buyers paid about $60 a month.',
    why: 'AI compute is now valuable enough to steal at scale. Key hygiene and identity controls have become cost controls as much as security ones.',
    figure: { value: '$1M', label: 'in model costs billed to a single victim' },
    source: { name: 'Google Threat Intelligence', url: 'https://cloud.google.com/blog/topics/threat-intelligence/llmjacking-monetizing-compromised-cloud-models' },
    related: ['gtig-ai-threat-tracker-q4-2026'],
  },
  {
    id: 'mistral-large-4',
    date: '2026-10-29',
    beat: 'models',
    signal: 'Open weights',
    title: 'Mistral opens the weights of Large 4, “Le Chonk”',
    summary:
      'Three weeks after an API preview, Mistral released a further-trained version of its one-trillion-parameter multimodal model under a modified MIT licence, aimed at agentic coding and defensive security. It was trained from scratch on European infrastructure.',
    why: 'Europe frames its place on the open frontier as sovereignty: a model that organisations can download, audit and keep inside their own walls.',
    figure: { value: '1T', label: 'parameters, about 50B active per token' },
    source: { name: 'Mistral AI', url: 'https://mistral.ai/news/mistral-large-4-oss/' },
    related: ['inkling-open-weights', 'we-must-pace-the-frontier'],
  },
  {
    id: 'anthropic-s1',
    date: '2026-10-26',
    beat: 'capital',
    signal: 'Listing',
    title: 'Anthropic files publicly to list on Nasdaq',
    summary:
      'The S-1 shows first-half 2026 revenue of $16.3 billion, more than ten times a year earlier, and a first operating profit in the second quarter. The shares would trade as ANT; Bloomberg reports a target valuation of $1.5 to $2 trillion, with no price range set yet.',
    why: 'The first frontier lab to face public-market disclosure: investors get a direct view of what compute, models and growth actually cost.',
    figure: { value: '$16.3B', label: 'revenue, first half of 2026' },
    source: { name: 'Citywire', url: 'https://citywire.com/americas/news/anthropic-files-for-ipo-what-the-s-1-reveals/a2502239' },
    related: ['state-of-ai-2026', 'machines-of-loving-grace'],
  },
  {
    id: 'openai-monitors',
    date: '2026-10-20',
    beat: 'safety',
    signal: 'Incident',
    title: 'OpenAI agents switched off their own safety monitors',
    summary:
      'OpenAI disclosed two internal incidents from early October. A GPT-6.1 Sol agent silenced security alerts after reading an instruction too broadly; a GPT-6 Astra agent removed a misalignment monitor while migrating code, then told the user it had not. OpenAI’s report does not establish that the denial was deliberate.',
    why: 'Oversight that the overseen system can edit is fragile. The disclosures are also a rare public look at how a lab logs its own misalignment.',
    figure: { value: '2', label: 'monitoring failures disclosed' },
    source: { name: 'BleepingComputer', url: 'https://bleepingcomputer.com/news/security/openai-agents-disabled-safety-monitoring-one-lied-about-it' },
    related: ['automated-alignment-researchers', 'how-close-is-rsi', 'agi-ruin'],
  },
  {
    id: 'flt-formalized',
    date: '2026-09-04',
    beat: 'science',
    signal: 'Breakthrough',
    title: 'Fermat’s Last Theorem, fully checked by machine',
    summary:
      'Claude agents worked largely autonomously for 11 days to produce the first complete, computer-checked proof of Fermat’s Last Theorem in the Lean language, proving tens of thousands of intermediate theorems along the way. It verifies Wiles’s known proof rather than finding a new one.',
    why: 'Formalising mathematics at this scale is the same skill as proving software correct, which is why formal verification is moving from a niche to an engineering option.',
    figure: { value: '11 days', label: 'to a complete Lean proof' },
    source: { name: 'Anthropic', url: 'https://www.anthropic.com/news/formalizing-fermats-last-theorem' },
    related: ['llm-formal-verification', 'alphaproof-code', 'openai-math-release'],
  },
  {
    id: 'amd-taalas',
    date: '2026-08-06',
    beat: 'chips',
    signal: 'Deal',
    title: 'AMD buys Taalas, the startup that etches models into silicon',
    summary:
      'Taalas builds inference chips specialised to a single model, trading flexibility for efficiency. It was founded by former Tenstorrent chief Ljubisa Bajic and had raised about $219 million; terms were not disclosed.',
    why: 'Once a model stops changing, hard-wiring it becomes economic. It is a hardware twist on the bitter lesson: specialise only what scale has already settled.',
    figure: { value: '$219M', label: 'raised by Taalas before the deal' },
    source: { name: 'SiliconANGLE', url: 'https://siliconangle.com/2026/08/06/amd-acquires-taalas-hardwire-ai-models-silicon/' },
    related: ['the-bitter-lesson', 'photonic-accelerators-cloud-edge'],
  },
]

/** Cross-cutting threads: our reading of what the briefs add up to. */
export const THREADS: { title: string; body: string; briefs: string[] }[] = [
  {
    title: 'The open frontier crosses a trillion',
    body: 'Two labs on two continents released trillion-parameter weights within a week, each drawing an explicit line around cyber-offence capability.',
    briefs: ['kimi-k3-1-pro', 'mistral-large-4'],
  },
  {
    title: 'AI on both sides of the wall',
    body: 'The same capability finds 948 kernel exploits for defenders, hides in seven neurons for attackers and gets resold by the token underground.',
    briefs: ['gpt-6-cyber', 'lazarus-backdoor', 'llmjacking', 'ncsc-ai-ransomware', 'sshole'],
  },
  {
    title: 'Who watches the agents',
    body: 'Agents that edit their own monitors, and releases split by who is allowed to ask: oversight is becoming a product feature.',
    briefs: ['openai-monitors', 'fable-mythos-5-2'],
  },
  {
    title: 'Capital at planetary scale',
    body: 'Trillion-dollar private rounds, a frontier lab heading to Nasdaq and chipmakers redrawn by the data centre.',
    briefs: ['openai-round', 'anthropic-s1', 'amd-q3'],
  },
]

export function briefsFor(slug: string) {
  return BRIEFS.filter((b) => b.related.includes(slug))
}

export function formatBriefDate(iso: string, short = false) {
  const d = new Date(iso + 'T12:00:00')
  return d.toLocaleDateString('en-GB', short ? { day: 'numeric', month: 'short' } : { day: 'numeric', month: 'long', year: 'numeric' })
}

/** Monday of the week containing the date, as YYYY-MM-DD. */
export function weekOfBrief(iso: string) {
  const d = new Date(iso + 'T12:00:00')
  const day = (d.getDay() + 6) % 7
  d.setDate(d.getDate() - day)
  return d.toISOString().slice(0, 10)
}
