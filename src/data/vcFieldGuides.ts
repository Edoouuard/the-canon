import type { VCFieldGuide } from '../types'

export const vcFieldGuides: Record<string, VCFieldGuide> = {
  'bitcoin-whitepaper': {
    framing: "Pure Bitcoin infrastructure is a narrower lane than crypto broadly: custody, payment rails and Bitcoin-specific scaling, rather than general smart contracts.",
    startups: [
      { name: 'River Financial', detail: 'Bitcoin-only brokerage and mining company built around the store-of-value thesis.' },
      { name: 'Lightning Labs', detail: 'Builds core infrastructure for the Lightning Network, the main payments layer built on Bitcoin.' },
      { name: 'Xapo Bank', detail: 'Bitcoin-based banking aimed at internationally mobile, high net worth clients.' },
    ],
    funds: [
      { name: 'Castle Island Ventures', detail: 'VC fund with a public mandate focused specifically on Bitcoin and public blockchains.' },
      { name: 'NYDIG', detail: 'Institutional Bitcoin investment, custody and lending arm serving banks and asset managers.' },
    ],
  },

  'attention-is-all-you-need': {
    framing: "The direct commercial descendants are the foundation model labs training and selling access to Transformer-based models.",
    startups: [
      { name: 'OpenAI', detail: 'Builds the GPT model family and ChatGPT on top of this exact architecture.' },
      { name: 'Anthropic', detail: 'Builds the Claude model family, with a research focus on interpretability and safety.' },
      { name: 'Mistral AI', detail: 'French lab building competitive open-weight and proprietary Transformer models.' },
    ],
    funds: [
      { name: 'Sequoia Capital', detail: 'One of the most active investors across the foundation model and AI application stack.' },
      { name: 'Thrive Capital', detail: 'Major backer of OpenAI, known for concentrated bets on frontier AI labs.' },
    ],
  },

  'situational-awareness': {
    framing: "The labs and infrastructure players racing toward the trajectory this essay extrapolates.",
    startups: [
      { name: 'OpenAI', detail: 'Frontier lab explicitly pursuing AGI on the timeline this essay discusses.' },
      { name: 'Safe Superintelligence', detail: "Ilya Sutskever's lab, founded specifically around a safety-first path to superintelligence." },
      { name: 'xAI', detail: "Elon Musk's frontier AI lab, built to compete directly at the capability frontier." },
    ],
    funds: [
      { name: 'Founders Fund', detail: 'Backs multiple frontier AI and hard-tech bets aligned with an ambitious AGI timeline.' },
      { name: 'a16z', detail: 'Large, active investor across foundation model labs and AI infrastructure.' },
    ],
  },

  'black-scholes': {
    framing: "This isn't a classic VC-backed sector, options pricing is decades-mature infrastructure, but a newer wave of trading and derivatives infrastructure startups builds directly on it.",
    startups: [
      { name: 'Deribit', detail: 'Major crypto options exchange applying and stress-testing options pricing theory in digital assets.' },
      { name: 'Alpaca', detail: 'API-first brokerage infrastructure for equities and options used by fintech builders.' },
      { name: 'Databento', detail: 'Market data infrastructure built for quants and algorithmic trading desks.' },
    ],
    funds: [
      { name: 'QED Investors', detail: 'Fintech-focused fund with a long track record backing trading and financial infrastructure.' },
      { name: 'Ribbit Capital', detail: 'Fintech-focused fund spanning trading platforms, crypto exchanges and consumer finance.' },
    ],
  },

  'why-software-is-eating-the-world': {
    framing: "The thesis is broad by design, so the clearest modern examples are software companies eating a single, previously non-software industry.",
    startups: [
      { name: 'Toast', detail: 'Software and payments platform that took over restaurant operations end to end.' },
      { name: 'Ramp', detail: 'Software-first corporate card and finance platform replacing legacy banking workflows.' },
      { name: 'Anysphere (Cursor)', detail: "AI coding tools now eating parts of software development itself, the essay's own industry." },
    ],
    funds: [
      { name: 'a16z', detail: "The author's own firm, one of the most active backers of software-native challengers across industries." },
      { name: 'Bessemer Venture Partners', detail: 'Long-running enterprise software investor with deep vertical SaaS experience.' },
    ],
  },

  'tesla-master-plan': {
    framing: "Electric vehicles, batteries and clean energy remain one of the largest capital-intensive venture categories the plan helped legitimize.",
    startups: [
      { name: 'Rivian', detail: 'Electric truck and SUV maker following a similar staged product strategy.' },
      { name: 'Redwood Materials', detail: "Battery recycling company founded by Tesla's former CTO JB Straubel." },
      { name: 'Lucid Motors', detail: 'Premium electric vehicle maker competing directly in the high-end EV segment Tesla opened.' },
    ],
    funds: [
      { name: 'Breakthrough Energy Ventures', detail: "Bill Gates-founded climate fund backing capital-intensive clean energy and transport bets." },
      { name: 'DCVC', detail: 'Deep tech fund with a long history backing hard, capital-intensive climate and energy startups.' },
    ],
  },

  'ethereum-whitepaper': {
    framing: "Ethereum's own ecosystem of scaling and tooling companies is now one of the largest sub-sectors of crypto venture investing.",
    startups: [
      { name: 'Offchain Labs', detail: 'Builds Arbitrum, one of the largest Ethereum layer 2 scaling networks.' },
      { name: 'OP Labs', detail: 'Builds Optimism, another leading Ethereum layer 2, with its own shared sequencing stack.' },
      { name: 'Consensys', detail: 'Builds MetaMask and a broad suite of Ethereum developer tooling.' },
    ],
    funds: [
      { name: 'Paradigm', detail: 'Crypto-native fund deeply invested across the Ethereum scaling and DeFi stack.' },
      { name: 'Electric Capital', detail: 'Crypto fund known for deep technical due diligence and open-source ecosystem data.' },
    ],
  },

  'internet-tidal-wave': {
    framing: "The modern equivalent is the race to own the client, or the browser, of the AI era.",
    startups: [
      { name: 'Perplexity', detail: 'AI-native answer engine positioning itself as a new default entry point to information.' },
      { name: 'The Browser Company', detail: 'Builds Arc, a browser rethought around AI-assisted workflows.' },
      { name: 'OpenAI', detail: 'Increasingly positions ChatGPT itself as a platform and client, not just a chatbot.' },
    ],
    funds: [
      { name: 'a16z', detail: 'Active investor across the new wave of AI-native browsers and search products.' },
      { name: 'Thrive Capital', detail: 'Backs several of the largest bets on AI as the next dominant client layer.' },
    ],
  },

  pagerank: {
    framing: "Search itself is being rebuilt around AI answer engines rather than pure link ranking.",
    startups: [
      { name: 'Perplexity', detail: 'AI-native search and answer engine directly challenging keyword and link-based search.' },
      { name: 'Exa', detail: 'Search infrastructure built specifically for AI agents rather than human browsing.' },
      { name: 'You.com', detail: 'AI search product blending traditional results with generated answers.' },
    ],
    funds: [
      { name: 'IVP', detail: 'Growth investor backing several AI-native search and consumer AI companies.' },
      { name: 'NEA', detail: 'Large, generalist fund with a long history in search and information infrastructure.' },
    ],
  },

  'rip-good-times': {
    framing: "This is a VC doctrine memo, not a sector on its own, so the relevant players are the firm behind it and the companies famous for actually living out its advice.",
    startups: [
      { name: 'Airbnb', detail: "Widely cited as a company that survived the 2008 downturn by embracing exactly this kind of discipline." },
      { name: 'Dropbox', detail: 'Grew through the same austere, capital-efficient era this memo describes.' },
    ],
    funds: [
      { name: 'Sequoia Capital', detail: 'Author of this memo and its 2022 sequel, Adapting to Endure.' },
      { name: 'Y Combinator', detail: "Known for pushing the same 'default alive' capital discipline into its own founder curriculum." },
    ],
  },

  'superinvestors-graham-doddsville': {
    framing: "This is an investing philosophy, not a startup sector, so the relevant players are the funds and asset managers still running this exact playbook today.",
    startups: [
      { name: 'Berkshire Hathaway', detail: "Buffett's own vehicle, the multi-decade living proof case for this thesis." },
      { name: 'Baupost Group', detail: "Seth Klarman's fund, one of the most cited modern practitioners of disciplined value investing." },
      { name: 'Pzena Investment Management', detail: 'Asset manager built entirely around classic deep-value stock selection.' },
    ],
    funds: [
      { name: 'Oakmark Funds', detail: 'Long-running mutual fund family explicitly run on value investing principles.' },
      { name: 'GMO', detail: "Jeremy Grantham's firm, another modern practitioner of valuation-driven investing." },
    ],
  },

  alexnet: {
    framing: "Modern computer vision startups descend directly from the deep learning approach this paper validated.",
    startups: [
      { name: 'Scale AI', detail: 'Data labeling and evaluation infrastructure that much of modern computer vision training depends on.' },
      { name: 'Waabi', detail: 'Autonomous driving company built around deep learning-based perception.' },
      { name: 'Physical Intelligence', detail: 'Robotics AI company applying large-scale deep learning to physical control.' },
    ],
    funds: [
      { name: 'Radical Ventures', detail: 'AI-focused fund with deep ties to the academic deep learning community.' },
      { name: 'a16z', detail: 'Active investor across the computer vision and robotics AI stack.' },
    ],
  },

  'the-bitter-lesson': {
    framing: "The labs that most explicitly bet on scale over hand engineering are the clearest embodiment of this essay's argument.",
    startups: [
      { name: 'OpenAI', detail: 'Built its strategy explicitly around scaling general methods rather than hand-crafted approaches.' },
      { name: 'Anthropic', detail: 'Pursues frontier capability primarily through scaled training and reinforcement learning.' },
      { name: 'xAI', detail: 'Prioritizes large-scale compute buildout as its central competitive strategy.' },
    ],
    funds: [
      { name: 'Founders Fund', detail: 'Backs multiple labs pursuing the scale-first strategy this essay argues for.' },
      { name: 'Sequoia Capital', detail: 'Major investor across the largest scale-focused AI labs.' },
    ],
  },

  'gpt-3': {
    framing: "The direct commercial lineage runs straight through the large language model labs and their API businesses.",
    startups: [
      { name: 'OpenAI', detail: 'Built GPT-3 and continues to lead the model family and its commercial API.' },
      { name: 'Anthropic', detail: 'Founded partly by former OpenAI researchers, building a rival scaled model line.' },
      { name: 'Mistral AI', detail: 'Competes with efficient, openly available large language models.' },
    ],
    funds: [
      { name: 'Thrive Capital', detail: 'One of the largest investors in OpenAI itself.' },
      { name: 'Khosla Ventures', detail: 'Early institutional backer of OpenAI, well before the GPT-3 era.' },
    ],
  },

  'www-proposal': {
    framing: "The modern heirs are companies trying to keep the web open, or decentralized, against the pull toward closed platforms.",
    startups: [
      { name: 'Automattic', detail: 'Builds WordPress, one of the largest open publishing platforms on the web.' },
      { name: 'Protocol Labs', detail: 'Builds IPFS and Filecoin, infrastructure for a decentralized web.' },
      { name: 'Mozilla', detail: 'Nonprofit steward of the Firefox browser and open web standards.' },
    ],
    funds: [
      { name: 'True Ventures', detail: 'Early institutional backer of Automattic and the open publishing ecosystem.' },
      { name: 'Union Square Ventures', detail: 'Long-running advocate, in its own investment thesis, for open protocols over closed platforms.' },
    ],
  },

  'scion-subprime-short': {
    framing: "Activist short research remains a small, entrepreneurial corner of finance, closer in spirit to a startup than a traditional fund.",
    startups: [
      { name: 'Muddy Waters Research', detail: 'Independent short research shop carrying the same deep, primary-research model.' },
      { name: 'Grizzly Research', detail: 'Newer activist short research firm following the same public-report playbook.' },
    ],
    funds: [
      { name: 'Marshall Wace', detail: 'Multi-strategy hedge fund known for an active, well-resourced short book.' },
      { name: 'Millennium Management', detail: 'Large multi-strategy fund that trades actively around credit and equity risk.' },
    ],
  },

  'zero-to-one': {
    framing: "The companies most associated with this monopoly-through-unique-technology philosophy trace directly back to the same author and firm.",
    startups: [
      { name: 'SpaceX', detail: 'Built a durable technological monopoly in reusable rockets, the kind of moat this book describes.' },
      { name: 'Palantir', detail: "Cofounded by Thiel, built around proprietary technology rather than head-to-head competition." },
      { name: 'Anduril', detail: 'Defense technology company pursuing a similar category-defining strategy.' },
    ],
    funds: [
      { name: 'Founders Fund', detail: "Thiel's own firm, investing explicitly around this monopoly thesis." },
      { name: 'a16z', detail: 'Frequently cites similar reasoning when backing category-defining technology bets.' },
    ],
  },

  'block-intelligence-native': {
    framing: "The clearest examples are companies already running lean, AI-augmented teams rather than traditional headcount-heavy organizations.",
    startups: [
      { name: 'Midjourney', detail: 'Famous for reaching massive scale and revenue with an unusually small team.' },
      { name: 'Anysphere (Cursor)', detail: 'Builds the AI coding tools that make small, AI-augmented engineering teams more viable.' },
    ],
    funds: [
      { name: 'General Catalyst', detail: 'Actively invests around the thesis that AI tooling changes optimal company headcount.' },
      { name: 'Coatue', detail: 'Growth investor tracking AI-driven productivity gains across its portfolio.' },
    ],
  },

  'deepseek-r1': {
    framing: "The reasoning-model race now spans both Western scale-first labs and more compute-efficient Chinese labs.",
    startups: [
      { name: 'DeepSeek', detail: 'Built R1 and continues to release competitive, compute-efficient reasoning models.' },
      { name: '01.AI', detail: 'Another Chinese lab pursuing efficient, competitive large language models.' },
      { name: 'Mistral AI', detail: "Europe's answer to the same efficiency-focused positioning." },
    ],
    funds: [
      { name: 'High-Flyer Capital Management', detail: "The Chinese quantitative hedge fund that founded and funds DeepSeek." },
      { name: 'a16z', detail: 'Backs several of the Western labs racing to match this efficiency bar.' },
    ],
  },

  'meeker-ai-trends': {
    framing: "The report tracks the AI infrastructure buildout, so the sector is compute, power and cloud capacity for training and inference.",
    startups: [
      { name: 'CoreWeave', detail: 'GPU cloud infrastructure company built specifically to serve AI training and inference demand.' },
      { name: 'Together AI', detail: 'AI infrastructure and inference platform serving open and custom models at scale.' },
      { name: 'Crusoe Energy', detail: 'Builds power infrastructure specifically for AI data centers.' },
    ],
    funds: [
      { name: 'BOND', detail: "Mary Meeker's own growth fund, publisher of this report." },
      { name: 'Sequoia Capital', detail: 'Active investor across the AI infrastructure buildout this report tracks.' },
    ],
  },

  'machines-of-loving-grace': {
    framing: "AI applied directly to scientific and medical progress, the essay's central example, is its own fast-growing venture category.",
    startups: [
      { name: 'Anthropic', detail: "The essay author's own company, positioned explicitly around this vision of safe, beneficial AI." },
      { name: 'Isomorphic Labs', detail: "DeepMind's drug discovery spinout applying AI directly to the essay's medical thesis." },
      { name: 'Xaira Therapeutics', detail: 'AI-native drug discovery startup founded with exactly this compressed-progress premise.' },
    ],
    funds: [
      { name: 'ARCH Venture Partners', detail: 'Major biotech investor backing multiple AI-native drug discovery companies.' },
      { name: 'Google Ventures', detail: 'Backs Isomorphic Labs and other AI-for-science bets.' },
    ],
  },

  'why-ai-will-save-the-world': {
    framing: "The companies this essay implicitly defends are the consumer and enterprise AI applications built on top of frontier models.",
    startups: [
      { name: 'Character.AI', detail: 'Consumer AI company built around exactly the augmentation thesis this essay defends.' },
      { name: 'World Labs', detail: "Fei-Fei Li's startup applying frontier AI to spatial intelligence." },
      { name: 'OpenAI', detail: 'The frontier lab whose products this essay uses as its central example of AI benefit.' },
    ],
    funds: [
      { name: 'a16z', detail: "The author's own firm, one of the most vocal investors against restrictive AI regulation." },
    ],
  },

  'adani-report': {
    framing: "Cross-border activist short research is a small, high-conviction niche closer to independent research shops than funded startups.",
    startups: [
      { name: 'Hindenburg Research', detail: 'The firm behind this report, active until its 2025 wind-down.' },
      { name: 'Viceroy Research', detail: 'Independent short research firm covering similar emerging-market corporate governance stories.' },
    ],
    funds: [
      { name: 'Marshall Wace', detail: 'Multi-strategy fund known for allocating capital around high-conviction short research.' },
    ],
  },

  'techno-optimist-manifesto': {
    framing: "The companies most associated with this pro-building, pro-ambition worldview span defense, aerospace and frontier AI.",
    startups: [
      { name: 'SpaceX', detail: 'Frequently cited as the clearest embodiment of ambitious, technology-first building.' },
      { name: 'Anduril', detail: 'Defense technology company built around the same unapologetic, fast-moving ethos.' },
      { name: 'Palantir', detail: 'Another company closely associated with this techno-optimist, building-first worldview.' },
    ],
    funds: [
      { name: 'a16z', detail: "The author's own firm and publisher of the manifesto." },
      { name: 'Founders Fund', detail: 'Shares a closely aligned pro-ambition, hard-technology investment thesis.' },
    ],
  },

  'adapting-to-endure': {
    framing: "The companies most cited as proof of this discipline are the ones that reached durable profitability through the 2022 to 2024 tightening.",
    startups: [
      { name: 'Klaviyo', detail: 'Reached profitability and a successful IPO while maintaining strict capital discipline.' },
      { name: 'Notion', detail: 'Grew efficiently through the same tightened funding period this deck anticipates.' },
    ],
    funds: [
      { name: 'Sequoia Capital', detail: 'Author of this deck and its 2008 predecessor, RIP Good Times.' },
    ],
  },

  chinchilla: {
    framing: "The labs that most directly adopted this training recipe are the ones now dominating efficient, well-trained model releases.",
    startups: [
      { name: 'Mistral AI', detail: 'Known for training relatively compact models efficiently, in the spirit of this paper.' },
      { name: 'Cohere', detail: 'Focuses on efficient, enterprise-oriented language models rather than raw scale alone.' },
    ],
    funds: [
      { name: 'a16z', detail: 'Backs multiple labs applying compute-optimal training principles.' },
      { name: 'General Catalyst', detail: 'Active investor across efficient, enterprise-focused AI labs.' },
    ],
  },

  'sea-change': {
    framing: "This is a credit-cycle memo, not a startup sector, so the relevant players are the credit-focused investment firms adapting to the new regime.",
    startups: [
      { name: 'Oaktree Capital', detail: "The author's own firm, built entirely around credit and distressed investing." },
      { name: 'Apollo Global Management', detail: 'Major credit-focused alternative asset manager positioned for a higher-rate regime.' },
    ],
    funds: [
      { name: 'Oaktree Capital', detail: 'Manages tens of billions in credit strategies directly informed by this thesis.' },
      { name: 'PIMCO', detail: 'One of the largest fixed income managers repositioning portfolios around the same regime shift.' },
    ],
  },

  'bretton-woods-iii': {
    framing: "The clearest modern players are commodity-backed monetary alternatives and macro funds trading the de-dollarization thesis directly.",
    startups: [
      { name: 'Monetary Metals', detail: 'Builds gold-based financial products aligned with a commodity-backed monetary thesis.' },
      { name: 'Tether', detail: 'The largest dollar-pegged stablecoin, an ironic counterpoint that still shows how monetary alternatives spread.' },
    ],
    funds: [
      { name: 'Bridgewater Associates', detail: 'Macro fund closely tracking the same reserve currency and monetary order shifts.' },
      { name: 'Brevan Howard', detail: 'Major macro hedge fund positioned around global monetary regime change.' },
    ],
  },

  'what-we-owe-the-future': {
    framing: "The organizations most aligned with this longtermist worldview are AI safety labs and the philanthropic funders behind them.",
    startups: [
      { name: 'Anthropic', detail: 'Frequently cited as an AI lab whose founding mission overlaps with longtermist concerns.' },
      { name: 'Redwood Research', detail: 'AI safety research organization funded substantially by longtermist philanthropy.' },
    ],
    funds: [
      { name: 'Open Philanthropy', detail: 'The largest funder of longtermist and AI safety causes this book argues for.' },
    ],
  },

  'agi-ruin': {
    framing: "The organizations most directly engaged with this essay's concerns are AI safety labs and the evaluators who audit frontier models.",
    startups: [
      { name: 'Redwood Research', detail: 'AI safety research organization working directly on the alignment problems this essay raises.' },
      { name: 'METR', detail: 'Independent organization that evaluates frontier models for dangerous capabilities.' },
    ],
    funds: [
      { name: 'Open Philanthropy', detail: 'Major funder of AI safety research aligned with this essay\'s concerns.' },
      { name: 'Survival and Flourishing Fund', detail: 'Grantmaking body specifically funding existential risk reduction work.' },
    ],
  },

  'waiting-for-the-last-dance': {
    framing: "This is a market-timing memo, not a startup sector, so the relevant players are the firm behind it and peers running similar valuation discipline.",
    startups: [
      { name: 'GMO', detail: "The author's own firm, built around systematic, valuation-driven forecasting." },
    ],
    funds: [
      { name: 'GMO', detail: 'Manages asset allocation strategies directly informed by this bubble framework.' },
      { name: 'Research Affiliates', detail: 'Another valuation-driven asset manager tracking similar bubble signals.' },
    ],
  },

  'most-important-century': {
    framing: "The labs and funders most aligned with this thesis are the same ones pursuing and financing transformative AI directly.",
    startups: [
      { name: 'Anthropic', detail: 'Frontier lab whose stated mission overlaps closely with this essay\'s framing of the stakes.' },
      { name: 'OpenAI', detail: 'Explicitly pursues the transformative AI trajectory this essay describes.' },
    ],
    funds: [
      { name: 'Open Philanthropy', detail: "The author's own organization, a major funder of work premised on this thesis." },
    ],
  },

  'scaling-laws': {
    framing: "The labs planning training runs directly off these curves are the same ones leading the frontier today.",
    startups: [
      { name: 'OpenAI', detail: 'Used these exact scaling relationships to plan the GPT-3 training run months later.' },
      { name: 'Anthropic', detail: 'Continues to plan frontier training runs using scaling law extrapolations.' },
    ],
    funds: [
      { name: 'a16z', detail: 'Backs multiple labs whose roadmaps are shaped by these scaling relationships.' },
      { name: 'Sequoia Capital', detail: 'Major investor across compute-intensive frontier AI labs.' },
    ],
  },

  'moores-law-for-everything': {
    framing: "The clearest embodiment is the author's own lab, plus adjacent projects exploring new models of distributing AI-driven abundance.",
    startups: [
      { name: 'OpenAI', detail: "The essay author's own company, at the center of the AI cost-decline trend it describes." },
      { name: 'World (formerly Worldcoin)', detail: "Sam Altman's identity and distribution project, aimed at a similar universal-access premise." },
    ],
    funds: [
      { name: 'a16z', detail: 'Backs multiple projects exploring AI-driven economic redistribution ideas.' },
      { name: 'Khosla Ventures', detail: 'Early institutional backer of OpenAI itself.' },
    ],
  },

  'changing-world-order': {
    framing: "This is a macro-cycle thesis, not a startup sector, so the relevant players are the macro funds trading the same historical framework.",
    startups: [
      { name: 'Bridgewater Associates', detail: "The author's own firm, the largest hedge fund built around this exact cyclical framework." },
    ],
    funds: [
      { name: 'Bridgewater Associates', detail: 'Manages global macro strategies directly informed by this book\'s cycles.' },
      { name: 'Brevan Howard', detail: 'Another major macro fund tracking the same shifting global order.' },
    ],
  },

  'fraying-reserve-system': {
    framing: "The relevant players are macro funds and monetary-alternative startups positioned around a weakening dollar reserve system.",
    startups: [
      { name: 'Monetary Metals', detail: 'Builds financial products around gold as a monetary alternative to reserve currencies.' },
    ],
    funds: [
      { name: 'Bridgewater Associates', detail: 'Tracks the same reserve currency strain from a global macro perspective.' },
      { name: 'Brevan Howard', detail: 'Macro fund positioned around shifts in global reserve currency dynamics.' },
    ],
  },

  'nikola-report': {
    framing: "Activist short research remains a small, entrepreneurial niche closer to independent research shops than funded startups.",
    startups: [
      { name: 'Hindenburg Research', detail: 'The firm behind this report, active until its 2025 wind-down.' },
      { name: 'Fuzzy Panda Research', detail: 'Independent short research firm following a similar public-report model.' },
    ],
    funds: [
      { name: 'Marshall Wace', detail: 'Multi-strategy fund known for an active, well-resourced short book.' },
    ],
  },

  'scaling-hypothesis': {
    framing: "The labs betting most explicitly on pure scale are the clearest test of this essay's hypothesis.",
    startups: [
      { name: 'OpenAI', detail: 'Continues to bet primarily on scale as the path to more capable models.' },
      { name: 'xAI', detail: 'Built its entire strategy around rapid, large-scale compute buildout.' },
    ],
    funds: [
      { name: 'Founders Fund', detail: 'Backs labs whose strategy is most closely aligned with a pure scaling bet.' },
    ],
  },

  'solo-capitalists': {
    framing: "The clearest examples are portfolio companies known to be backed heavily by individual, solo general partners rather than traditional partnerships.",
    startups: [
      { name: 'Instacart', detail: 'Backed early by solo investor Elad Gil, a frequently cited solo-capitalist success story.' },
      { name: 'Gusto', detail: 'Another company associated with concentrated, individual-investor backing.' },
    ],
    funds: [
      { name: 'Elad Gil', detail: 'One of the most cited solo general partners writing large individual checks.' },
      { name: 'Lachy Groom', detail: 'Solo investor known for concentrated, high-conviction fintech bets.' },
    ],
  },

  'spac-letters': {
    framing: "The SPAC boom this thesis promoted produced a specific, well documented set of companies and sponsor vehicles.",
    startups: [
      { name: 'Virgin Galactic', detail: "Went public via one of Chamath Palihapitiya's own SPACs." },
      { name: 'Opendoor', detail: 'Another prominent company taken public through the SPAC wave this thesis promoted.' },
    ],
    funds: [
      { name: 'Social Capital', detail: "Chamath Palihapitiya's own investment vehicle and SPAC sponsor." },
    ],
  },

  'luckin-coffee-report': {
    framing: "Activist short research remains a small, entrepreneurial niche closer to independent research shops than funded startups.",
    startups: [
      { name: 'Muddy Waters Research', detail: 'The firm that distributed this report, still active in cross-border fraud research.' },
    ],
    funds: [
      { name: 'Marshall Wace', detail: 'Multi-strategy fund known for allocating capital around high-conviction short research.' },
    ],
  },

  'new-science-of-progress': {
    framing: "The organizations most directly built around this essay's call are science-funding experiments rather than typical VC-backed startups.",
    startups: [
      { name: 'Fast Grants', detail: 'Rapid science funding program cofounded by this essay\'s own coauthor, Patrick Collison.' },
      { name: 'Arc Institute', detail: 'Independent biomedical research organization built around accelerating scientific progress.' },
    ],
    funds: [
      { name: 'Emergent Ventures', detail: "Tyler Cowen's own grant program, funding progress-oriented research and founders." },
      { name: 'Astera Institute', detail: 'Funds high-risk, high-reward scientific and technological progress projects.' },
    ],
  },

  'why-decentralization-matters': {
    framing: "The core Ethereum and DeFi ecosystem remains the clearest test of this essay's incentive-alignment thesis.",
    startups: [
      { name: 'Uniswap Labs', detail: 'Builds the leading decentralized exchange protocol aligned around token-based incentives.' },
      { name: 'Coinbase', detail: 'Major on-ramp connecting traditional finance to decentralized protocols.' },
    ],
    funds: [
      { name: 'a16z Crypto', detail: "The author's own firm's crypto arm, one of the largest investors in decentralized protocols." },
      { name: 'Paradigm', detail: 'Crypto-native fund deeply invested in decentralized protocol design.' },
    ],
  },

  'invisible-asymptotes': {
    framing: "The clearest examples are fast-growing consumer companies that later ran into an unexpected growth ceiling.",
    startups: [
      { name: 'Peloton', detail: 'Grew explosively, then hit a hardware-adoption ceiling few had modeled in advance.' },
      { name: 'Bird', detail: 'Scaled scooter sharing rapidly before hitting unit economics and regulatory limits.' },
    ],
    funds: [
      { name: 'ICONIQ Growth', detail: 'Growth investor that tracks exactly these kinds of maturing growth curves closely.' },
      { name: 'Tiger Global', detail: 'Growth fund known for aggressive bets on companies later tested by growth ceilings.' },
    ],
  },

  'uniswap-whitepaper': {
    framing: "Automated market makers are now one of the largest, most competitive categories in all of crypto infrastructure.",
    startups: [
      { name: 'Uniswap Labs', detail: 'Builds and continues to iterate on the protocol this paper introduced.' },
      { name: '1inch', detail: 'Aggregates liquidity across automated market makers like Uniswap to find better prices.' },
      { name: 'Curve Finance', detail: 'A specialized automated market maker optimized for stable-asset trading pairs.' },
    ],
    funds: [
      { name: 'a16z Crypto', detail: 'Major investor in Uniswap Labs and the broader decentralized exchange ecosystem.' },
      { name: 'Paradigm', detail: 'Deeply invested across automated market maker design and DeFi infrastructure.' },
    ],
  },

  'bullish-case-bitcoin': {
    framing: "The clearest modern players are companies built entirely around Bitcoin as a monetary asset rather than a broader crypto platform.",
    startups: [
      { name: 'River Financial', detail: 'Bitcoin-only brokerage built around the store-of-value thesis this essay makes.' },
      { name: 'Swan Bitcoin', detail: 'Bitcoin-focused savings and accumulation platform aimed at long-term holders.' },
    ],
    funds: [
      { name: 'Castle Island Ventures', detail: 'VC fund with a public mandate focused specifically on Bitcoin and public blockchains.' },
    ],
  },

  'big-debt-crises': {
    framing: "This is a macro-cycle framework, not a startup sector, so the relevant player is the firm behind it.",
    startups: [
      { name: 'Bridgewater Associates', detail: "The author's own firm, whose research this book is directly distilled from." },
    ],
    funds: [
      { name: 'Bridgewater Associates', detail: 'Applies this exact debt cycle template across its global macro strategies.' },
    ],
  },

  'software-2-0': {
    framing: "AI coding agents are the clearest, most literal realization of this essay's argument, software increasingly written, not coded by hand.",
    startups: [
      { name: 'Anysphere (Cursor)', detail: 'Builds an AI-native coding environment where much of the code is generated, not typed.' },
      { name: 'Cognition', detail: 'Builds Devin, an AI agent designed to autonomously write and ship software.' },
    ],
    funds: [
      { name: 'a16z', detail: 'Major investor across the new generation of AI-native developer tools.' },
      { name: 'Thrive Capital', detail: 'Backs several companies building on this exact learned-software premise.' },
    ],
  },

  'ark-big-ideas': {
    framing: "The report's own thesis names remain the clearest examples of the disruptive convergence it describes.",
    startups: [
      { name: 'Tesla', detail: "ARK's most prominent long-running holding, cited across nearly every edition of this report." },
      { name: 'Recursion Pharmaceuticals', detail: 'AI-driven drug discovery company representing the genomics and AI convergence ARK tracks.' },
    ],
    funds: [
      { name: 'ARK Invest', detail: "The author's own firm, publishing this report annually and investing directly on its thesis." },
    ],
  },

  'solana-whitepaper': {
    framing: "Solana's own application and infrastructure ecosystem is now one of the most active corners of crypto venture investing.",
    startups: [
      { name: 'Jump Crypto', detail: 'Major backer and infrastructure builder within the Solana ecosystem.' },
      { name: 'Phantom', detail: 'Leading wallet built primarily around the Solana network.' },
      { name: 'Jito Labs', detail: 'Builds MEV and staking infrastructure specific to Solana.' },
    ],
    funds: [
      { name: 'Multicoin Capital', detail: 'Crypto fund closely associated with the Solana ecosystem since its earliest days.' },
      { name: 'Solana Ventures', detail: "The network's own ecosystem fund backing Solana-native startups directly." },
    ],
  },

  blitzscaling: {
    framing: "The companies most cited as textbook blitzscaling examples remain the clearest test cases for this strategy.",
    startups: [
      { name: 'Uber', detail: 'Grew through direct, capital-intensive city-by-city expansion, a classic blitzscaling case.' },
      { name: 'DoorDash', detail: 'Prioritized speed and market share over near-term efficiency in its early growth phase.' },
    ],
    funds: [
      { name: 'Greylock Partners', detail: "Reid Hoffman's own firm, closely associated with this exact growth philosophy." },
    ],
  },

  'the-new-moats': {
    framing: "Companies that turn proprietary data into a compounding product advantage are the clearest realization of this essay's thesis.",
    startups: [
      { name: 'Palantir', detail: 'Builds durable advantage from deep, proprietary data integration with customers.' },
      { name: 'Databricks', detail: 'Positions its platform as the layer where enterprise data and AI models compound together.' },
    ],
    funds: [
      { name: 'Greylock Partners', detail: "The author's own firm, closely associated with this data-moat investment thesis." },
    ],
  },

  'fat-protocols': {
    framing: "The protocols this thesis describes, and the applications built on top of them, remain one of crypto's most actively debated investment questions.",
    startups: [
      { name: 'Uniswap Labs', detail: 'A leading application layer company whose relationship to Ethereum tests this exact thesis.' },
      { name: 'Offchain Labs', detail: 'Builds Arbitrum, a layer 2 that itself sits between protocol and application value capture.' },
    ],
    funds: [
      { name: 'Union Square Ventures', detail: "The author's own firm and publisher of this thesis." },
      { name: 'Placeholder VC', detail: 'Crypto fund built explicitly around protocol-level, thesis-driven investing.' },
    ],
  },

  'aggregation-theory': {
    framing: "The clearest modern aggregators are consumer platforms that own the user relationship across a fragmented supplier base.",
    startups: [
      { name: 'DoorDash', detail: 'Aggregates restaurant supply behind a single, owned consumer relationship.' },
      { name: 'Airbnb', detail: 'Aggregates lodging supply globally behind one platform and one user experience.' },
    ],
    funds: [
      { name: 'General Atlantic', detail: 'Growth investor with deep experience backing consumer aggregators at scale.' },
      { name: 'ICONIQ Growth', detail: 'Backs multiple companies whose strategy fits this exact aggregation model.' },
    ],
  },

  'valeant-report': {
    framing: "Activist short research remains a small, entrepreneurial niche closer to an independent research shop than a funded startup.",
    startups: [
      { name: 'Citron Research', detail: 'The firm behind this report, a long-running activist short research shop.' },
    ],
    funds: [
      { name: 'Pershing Square Capital Management', detail: 'Prominent activist fund known for high-conviction, publicly argued positions.' },
    ],
  },

  resnet: {
    framing: "Modern computer vision and robotics companies still build on the depth this paper unlocked.",
    startups: [
      { name: 'Scale AI', detail: 'Provides the labeled data infrastructure that deep vision models like this one depend on.' },
      { name: 'Waabi', detail: 'Applies deep, ResNet-lineage vision models to autonomous driving perception.' },
    ],
    funds: [
      { name: 'Radical Ventures', detail: 'AI-focused fund with deep ties to the academic deep learning community.' },
    ],
  },

  'competition-is-for-losers': {
    framing: "The companies most associated with this monopoly-through-technology philosophy trace directly back to the same author.",
    startups: [
      { name: 'SpaceX', detail: 'Built a durable technological monopoly rather than competing head to head on price.' },
      { name: 'Palantir', detail: "Cofounded by Thiel, built around proprietary technology rather than commoditized competition." },
    ],
    funds: [
      { name: 'Founders Fund', detail: "Thiel's own firm, investing explicitly around this monopoly thesis." },
    ],
  },

  'mobile-is-eating-the-world': {
    framing: "The clearest modern extension is mobile-first AI apps racing for the same kind of platform dominance mobile itself once had.",
    startups: [
      { name: 'Perplexity', detail: 'Built mobile-first as a new default entry point to information, echoing this thesis a decade later.' },
      { name: 'Character.AI', detail: 'Grew primarily through mobile usage patterns this deck first described.' },
    ],
    funds: [
      { name: 'a16z', detail: "The author's own firm, an active investor across mobile-native and now AI-native consumer apps." },
    ],
  },

  'meditations-on-moloch': {
    framing: "The organizations most directly engaged with escaping the exact coordination trap this essay describes work on AI safety and governance.",
    startups: [
      { name: 'METR', detail: 'Evaluates frontier AI models for dangerous capabilities, direct work against a multipolar trap.' },
      { name: 'Redwood Research', detail: 'AI safety organization working on technical solutions to coordination and alignment failures.' },
    ],
    funds: [
      { name: 'Open Philanthropy', detail: 'Major funder of work aimed at escaping exactly the kind of trap this essay describes.' },
    ],
  },

  superintelligence: {
    framing: "The labs and safety organizations most directly engaged with this book's scenario are still the reference points in the field.",
    startups: [
      { name: 'Anthropic', detail: "Founded partly in direct response to the concerns this book raised." },
      { name: 'Redwood Research', detail: 'Works specifically on technical alignment problems this book helped popularize.' },
    ],
    funds: [
      { name: 'Open Philanthropy', detail: 'Major funder of AI safety research building on this book\'s framework.' },
    ],
  },

  'do-things-that-dont-scale': {
    framing: "The companies most cited as textbook examples of this advice remain Y Combinator's own flagship success stories.",
    startups: [
      { name: 'Airbnb', detail: 'Famous for founders personally photographing host listings in its earliest days.' },
      { name: 'DoorDash', detail: 'Founders personally delivered early orders before any delivery infrastructure existed.' },
    ],
    funds: [
      { name: 'Y Combinator', detail: 'Pushes this exact advice as standard guidance to every new cohort of founders.' },
    ],
  },

  'saas-metrics-2': {
    framing: "The companies most cited as disciplined operators of this exact framework remain the reference cases in SaaS investing.",
    startups: [
      { name: 'HubSpot', detail: "Frequently cited as a textbook example of healthy LTV to CAC and low churn." },
      { name: 'Klaviyo', detail: 'Known for capital-efficient growth grounded in exactly these unit economics.' },
    ],
    funds: [
      { name: 'Matrix Partners', detail: "The author's own firm, closely associated with this SaaS metrics framework." },
    ],
  },

  word2vec: {
    framing: "The idea of learned vector representations now underlies an entire category of AI infrastructure companies.",
    startups: [
      { name: 'Pinecone', detail: 'Builds a vector database purpose-built to store and search embeddings like these.' },
      { name: 'Voyage AI', detail: 'Builds modern embedding models that trace their lineage directly to this paper.' },
    ],
    funds: [
      { name: 'Sequoia Capital', detail: 'Backed Pinecone and other companies built around the embedding infrastructure this paper started.' },
    ],
  },

  'how-to-get-startup-ideas': {
    framing: "The companies most cited as proof of this advice are Y Combinator's own founder-built-what-they-needed success stories.",
    startups: [
      { name: 'Stripe', detail: "Founded by engineers who wanted better payments infrastructure for their own projects." },
      { name: 'Airbnb', detail: "Founded by the hosts' own need to make rent, a classic 'build what you need' origin story." },
    ],
    funds: [
      { name: 'Y Combinator', detail: "The author's own accelerator, built around exactly this idea-generation philosophy." },
    ],
  },

  'tam-note-to-self': {
    framing: "The companies most closely tied to this framework are the marketplaces the author personally helped evaluate and fund.",
    startups: [
      { name: 'Uber', detail: "The author served on Uber's board, a direct real-world application of this TAM framework." },
      { name: 'Airbnb', detail: 'Another marketplace frequently evaluated against these exact ten factors.' },
    ],
    funds: [
      { name: 'Benchmark', detail: "The author's own firm, deeply associated with rigorous marketplace TAM analysis." },
    ],
  },

  'herbalife-short': {
    framing: "This is a single-company activist campaign, so the relevant players are the funds on both sides of the trade.",
    startups: [],
    funds: [
      { name: 'Pershing Square Capital Management', detail: "Bill Ackman's fund, which built and held the short position described here." },
      { name: 'Icahn Enterprises', detail: 'Carl Icahn\'s vehicle, which famously took the opposing long position.' },
    ],
  },

  'opencloud-report': {
    framing: "Open-core infrastructure companies remain one of the most durable categories this report helped define.",
    startups: [
      { name: 'MongoDB', detail: 'Open-core database company that became a defining example of this business model.' },
      { name: 'Elastic', detail: 'Open-core search and analytics company that later clashed with cloud providers over exactly this model.' },
      { name: 'HashiCorp', detail: 'Open-core infrastructure tooling company covering a similar commercialization path.' },
    ],
    funds: [
      { name: 'Battery Ventures', detail: 'Publisher of this report and a long-running investor in open-core infrastructure companies.' },
    ],
  },

  'what-happened-to-the-future': {
    framing: "The hard-technology bets this manifesto called for are now a major, well capitalized venture category.",
    startups: [
      { name: 'SpaceX', detail: 'A defining example of the ambitious hard technology this manifesto argued venture had abandoned.' },
      { name: 'Anduril', detail: 'Defense technology company built in direct response to the critique this essay makes.' },
      { name: 'Varda Space Industries', detail: 'Space manufacturing startup representing exactly the kind of hard tech bet this essay champions.' },
    ],
    funds: [
      { name: 'Founders Fund', detail: 'Publisher of this manifesto and one of the most active hard-tech investors since.' },
    ],
  },

  'sino-forest-report': {
    framing: "Activist short research remains a small, entrepreneurial niche closer to an independent research shop than a funded startup.",
    startups: [
      { name: 'Muddy Waters Research', detail: 'The firm behind this report, still active in cross-border corporate fraud research.' },
    ],
    funds: [
      { name: 'Marshall Wace', detail: 'Multi-strategy fund known for allocating capital around high-conviction short research.' },
    ],
  },

  'lean-startup': {
    framing: "The companies most cited as proof of this methodology remain Silicon Valley's standard MVP case studies.",
    startups: [
      { name: 'Dropbox', detail: 'Famously validated demand with a simple explainer video before building the full product.' },
      { name: 'IMVU', detail: "The author's own company, where this build-measure-learn methodology was first developed." },
    ],
    funds: [
      { name: 'Y Combinator', detail: 'Teaches a close variant of this exact methodology to every new cohort of founders.' },
    ],
  },

  'next-big-thing-toy': {
    framing: "The clearest recent example is exactly what the author's own firm bet on: a chatbot dismissed as a toy that became a category-defining product.",
    startups: [
      { name: 'OpenAI', detail: 'Early chatbot demos were widely dismissed as toys before ChatGPT redefined the category.' },
      { name: 'Coinbase', detail: 'Cryptocurrency was broadly dismissed as a toy before becoming a regulated, mainstream asset class.' },
    ],
    funds: [
      { name: 'a16z', detail: "The author's own firm, known for backing categories still widely dismissed by the mainstream." },
    ],
  },

  'airbnb-pitch-deck': {
    framing: "This is the origin story of one specific company, so the relevant players are the company itself and its earliest institutional backer.",
    startups: [
      { name: 'Airbnb', detail: 'The company this exact deck was used to fund.' },
    ],
    funds: [
      { name: 'Sequoia Capital', detail: "Led Airbnb's Series A after the deck had already been passed on by many other investors." },
    ],
  },

  'reinvesting-when-terrified': {
    framing: "This is a market-timing memo, not a startup sector, so the relevant player is the firm behind it.",
    startups: [],
    funds: [
      { name: 'GMO', detail: "The author's own firm, whose valuation models directly informed this call." },
    ],
  },

  '1000-true-fans': {
    framing: "The clearest modern realization is the direct creator-to-fan payment platforms this essay effectively predicted.",
    startups: [
      { name: 'Patreon', detail: 'Built almost exactly around the direct creator-to-fan payment relationship this essay describes.' },
      { name: 'Substack', detail: 'Applies the same true-fans economics to independent writers and newsletters.' },
    ],
    funds: [
      { name: 'Thrive Capital', detail: 'Backed Substack, a direct commercial realization of this essay\'s thesis.' },
      { name: 'Index Ventures', detail: 'Active investor across the broader creator economy this essay helped inspire.' },
    ],
  },

  'buy-american': {
    framing: "This is a single-author contrarian call, not a startup sector, so the relevant player is the vehicle behind it.",
    startups: [],
    funds: [
      { name: 'Berkshire Hathaway', detail: "Warren Buffett's own vehicle, which he disclosed shifting into equities in this exact op-ed." },
    ],
  },

  'lehman-short-thesis': {
    framing: "This is a single-firm short campaign, so the relevant player is the fund behind it.",
    startups: [],
    funds: [
      { name: 'Greenlight Capital', detail: "David Einhorn's fund, which built and presented this exact short thesis." },
    ],
  },

  'ubercab-pitch-deck': {
    framing: "This is the origin story of one specific company, so the relevant players are the company itself and its earliest backers.",
    startups: [
      { name: 'Uber', detail: 'The company this exact early deck was used to pitch.' },
      { name: 'Lyft', detail: 'The main competitor that emerged directly from the market this deck defined.' },
    ],
    funds: [
      { name: 'Benchmark', detail: "One of Uber's earliest and most closely involved institutional investors." },
      { name: 'First Round Capital', detail: "Participated in Uber's earliest funding rounds." },
    ],
  },

  'race-to-the-bottom': {
    framing: "This is a credit-cycle warning, not a startup sector, so the relevant player is the firm behind it.",
    startups: [],
    funds: [
      { name: 'Oaktree Capital', detail: "The author's own firm, built around exactly the credit discipline this memo argues for." },
    ],
  },

  'youtube-investment-memo': {
    framing: "This is the origin story of one specific investment, so the relevant players are the company and the firm that backed it.",
    startups: [
      { name: 'YouTube', detail: 'The company this memo argued for backing, now owned by Google.' },
      { name: 'TikTok', detail: 'The modern heir to the same user-generated video growth thesis, a generation later.' },
    ],
    funds: [
      { name: 'Sequoia Capital', detail: 'Backed YouTube based on the analysis in this exact memo, ahead of its acquisition by Google.' },
    ],
  },

  'madoff-fraud-report': {
    framing: "The organizations most directly carrying this whistleblowing tradition forward are activist fraud research shops.",
    startups: [
      { name: 'Hindenburg Research', detail: 'Continued the same detailed, evidence-driven fraud detection tradition this report exemplifies.' },
      { name: 'Muddy Waters Research', detail: 'Another firm carrying forward the same rigorous, public fraud research model.' },
    ],
    funds: [
      { name: 'Kynikos Associates', detail: "Jim Chanos's fund, built around exactly this kind of deep fraud-focused research." },
    ],
  },

  'facebook-media-kit': {
    framing: "This is the origin story of one specific company, so the relevant players are the company and its earliest institutional backers.",
    startups: [
      { name: 'Meta', detail: 'What thefacebook eventually became, still built on the same targeted-advertising logic.' },
      { name: 'Snap Inc.', detail: 'A later social platform competing for the same engaged, targetable young audience.' },
    ],
    funds: [
      { name: 'Accel Partners', detail: "Led Facebook's Series A, betting early on exactly this advertiser value proposition." },
      { name: 'Greylock Partners', detail: 'An early institutional investor in Facebook alongside Accel.' },
    ],
  },

  'allied-capital-short': {
    framing: "This is a single-firm short campaign, so the relevant player is the fund behind it.",
    startups: [],
    funds: [
      { name: 'Greenlight Capital', detail: "David Einhorn's fund, which pursued this multi-year public short campaign." },
    ],
  },

  'enron-short-thesis': {
    framing: "This is a single-firm short campaign, so the relevant player is the fund behind it.",
    startups: [],
    funds: [
      { name: 'Kynikos Associates', detail: "Jim Chanos's fund, built around exactly this kind of deep fundamental short research." },
    ],
  },

  'sovereign-individual': {
    framing: "The clearest modern realization is the network state movement: crypto-native projects trying to build new, voluntary forms of jurisdiction.",
    startups: [
      { name: 'Praxis', detail: 'Startup building a new, crypto-native city from the ground up, directly inspired by this book\'s ideas.' },
      { name: 'Próspera', detail: 'A charter city in Honduras operating under its own special economic jurisdiction.' },
    ],
    funds: [
      { name: 'Pronomos Capital', detail: 'Venture fund specifically focused on charter cities and new jurisdiction experiments.' },
      { name: '1confirmation', detail: 'Crypto-native fund whose thesis overlaps closely with this book\'s vision of digitally sovereign individuals.' },
    ],
  },

  'increasing-returns': {
    framing: "The economic logic here underlies nearly every network-effect-driven technology company, making the examples almost too numerous to narrow down.",
    startups: [
      { name: 'Microsoft', detail: 'A classic historical example of increasing returns locking in a dominant software standard.' },
      { name: 'OpenAI', detail: 'A modern test of whether the same increasing-returns dynamics apply to frontier AI models.' },
    ],
    funds: [
      { name: 'a16z', detail: 'Frequently cites this exact increasing-returns logic when evaluating network-effect businesses.' },
    ],
  },

  'meeker-internet-trends': {
    framing: "This is the origin of an ongoing report format, so the relevant player is the firm that carries it forward today.",
    startups: [],
    funds: [
      { name: 'BOND', detail: "Mary Meeker's current firm, which continues publishing this report format today." },
      { name: 'Kleiner Perkins', detail: 'The firm where Meeker published many later editions of this same report.' },
    ],
  },

  'fairchild-founding': {
    framing: "The direct lineage runs from this founding through Intel to the chip startups still raising venture capital today.",
    startups: [
      { name: 'Intel', detail: 'Founded directly by Fairchild alumni Robert Noyce and Gordon Moore.' },
      { name: 'Cerebras Systems', detail: 'Modern chip startup carrying the same Silicon Valley semiconductor lineage forward.' },
      { name: 'Groq', detail: 'Another modern chip company building specialized silicon in the tradition this founding started.' },
    ],
    funds: [
      { name: 'DCVC', detail: 'Deep tech fund with a long history backing hard, capital-intensive semiconductor bets.' },
    ],
  },

  'dec-proposal': {
    framing: "The staged, de-risked hardware financing model this proposal pioneered still shows up in modern chip and computing startups.",
    startups: [
      { name: 'Cerebras Systems', detail: 'Builds specialized computing hardware following a similarly staged, capital-intensive path.' },
      { name: 'SiFive', detail: 'Chip design startup building on open RISC-V architecture, a modern echo of DEC\'s minicomputer bet.' },
    ],
    funds: [
      { name: 'DCVC', detail: 'Deep tech fund with a long history backing hard, capital-intensive hardware bets.' },
    ],
  },

  'shannon-communication-theory': {
    framing: "The direct modern descendants are the chip and interconnect companies pushing against the exact capacity limits this theory defines.",
    startups: [
      { name: 'Groq', detail: 'Builds specialized inference chips designed around efficient, high-bandwidth data movement.' },
      { name: 'Nvidia', detail: 'Its interconnect and networking technology is engineered directly against Shannon-limit constraints.' },
    ],
    funds: [
      { name: 'DCVC', detail: 'Backs multiple hard-tech companies working at the edge of these physical communication limits.' },
    ],
  },

  'pragma-revolut': {
    framing: "Foundation models for banking and financial data are an emerging, still-small category compared to consumer AI.",
    startups: [
      { name: 'Revolut', detail: 'The bank behind this paper, applying the model directly to its own transaction data.' },
      { name: 'Ntropy', detail: 'Builds AI models specifically for understanding bank transaction data, a direct competitor space.' },
      { name: 'Tractable', detail: 'Applies a similar foundation-model approach to insurance claims rather than banking events.' },
    ],
    funds: [
      { name: 'QED Investors', detail: 'Fintech-focused fund with deep experience backing banking and credit infrastructure.' },
      { name: 'NVentures', detail: "NVIDIA's own venture arm, a coauthor of this paper and an active investor in AI infrastructure." },
    ],
  },
  'inkling-open-weights': {
    framing: "Open-weights foundation models create a layer of businesses that customize, host and secure models rather than train them from scratch.",
    startups: [
      { name: 'Thinking Machines Lab', detail: 'The lab behind Inkling, monetizing through its Tinker fine-tuning platform.' },
      { name: 'Together AI', detail: 'Inference and fine-tuning cloud among the first to host Inkling.' },
      { name: 'Fireworks AI', detail: 'Serves open-weights models at production scale for enterprises.' },
    ],
    funds: [
      { name: 'Andreessen Horowitz', detail: 'Led the record seed round in Thinking Machines Lab.' },
      { name: 'NVentures', detail: "NVIDIA's venture arm, a strategic backer of open-model labs and infrastructure." },
    ],
  },
  'automated-alignment-researchers': {
    framing: "AI safety is shifting from a pure research field to tooling: automated evaluation, alignment fine-tuning and agent monitoring.",
    startups: [
      { name: 'Goodfire', detail: 'Interpretability company building tools to understand and edit model internals.' },
      { name: 'Haize Labs', detail: 'Automated red-teaming and evaluation of AI systems.' },
      { name: 'Apollo Research', detail: 'Evaluates models for deception and scheming behaviors.' },
    ],
    funds: [
      { name: 'Menlo Ventures', detail: 'Anthropic investor running a dedicated fund for the Anthropic ecosystem.' },
      { name: 'Open Philanthropy', detail: 'Largest philanthropic funder of AI safety research and evaluation organizations.' },
    ],
  },
  'we-must-pace-the-frontier': {
    framing: "If pacing becomes policy, value shifts toward verification, evaluation and compliance infrastructure, and toward compute governance.",
    startups: [
      { name: 'METR', detail: 'Nonprofit evaluator explicitly named as the kind of embedded third party the essay envisions.' },
      { name: 'Gray Swan', detail: 'AI security and red-teaming platform used by frontier labs.' },
      { name: 'Credo AI', detail: 'AI governance and compliance software for enterprises facing new rules.' },
    ],
    funds: [
      { name: 'Spark Capital', detail: 'Early Anthropic investor with exposure to frontier-lab governance outcomes.' },
      { name: 'Founders Fund', detail: 'Defense and national-security tech investor, relevant to the chip and China dimension.' },
    ],
  },
  'measuring-pace-ai-development': {
    framing: "Measuring AI automation and overseeing fleets of agents are emerging enterprise categories, not just lab internals.",
    startups: [
      { name: 'Epoch AI', detail: 'Research group whose automation-level scale underpins the index.' },
      { name: 'Arize AI', detail: 'Observability for LLM and agent systems in production.' },
      { name: 'Braintrust', detail: 'Evaluation and monitoring platform for AI products.' },
    ],
    funds: [
      { name: 'Greylock', detail: 'Invests in AI infrastructure and enterprise agent tooling.' },
      { name: 'Index Ventures', detail: 'Backer of AI observability and developer-tooling companies.' },
    ],
  },
  'ai-enhance-or-erode-expertise': {
    framing: "Professional-services AI is booming, but the evidence on skill formation favors tools that teach as well as automate.",
    startups: [
      { name: 'Harvey', detail: 'Leading legal AI platform used by large law firms.' },
      { name: 'Solve Intelligence', detail: 'AI assistant built specifically for patent drafting.' },
      { name: 'Legora', detail: 'Collaborative AI workspace for lawyers.' },
    ],
    funds: [
      { name: 'Kleiner Perkins', detail: 'Investor in Harvey and vertical AI for professional services.' },
      { name: 'Benchmark', detail: 'Backer of Legora and application-layer AI companies.' },
    ],
  },
  'state-of-ai-2026': {
    framing: "The report's themes, AI building AI, physical AI, inference and cyber, each map to a distinct investable category.",
    startups: [
      { name: 'Skild AI', detail: 'Robotics foundation model company highlighted in the physical AI section.' },
      { name: 'CoreWeave', detail: 'AI cloud whose gigawatt-scale contracted power illustrates the inference boom.' },
      { name: 'Generate:Biomedicines', detail: 'AI-first drug developer with a program in Phase 3.' },
    ],
    funds: [
      { name: 'Air Street Capital', detail: 'Nathan Benaich’s fund, author of the report and an early-stage AI-first investor.' },
      { name: 'Thrive Capital', detail: 'Major backer of frontier labs and AI-native application companies.' },
    ],
  },
  'breakthroughs-hasten-exhaustion': {
    framing: "If attention collapse slows discovery, contrarian research bets and alternative paradigms become the asymmetric opportunity.",
    startups: [
      { name: 'Liquid AI', detail: 'Building non-Transformer foundation model architectures.' },
      { name: 'Sakana AI', detail: 'Explores nature-inspired and evolutionary approaches to AI.' },
      { name: 'Convergent Research', detail: 'Incubates focused research organizations outside academic incentives.' },
    ],
    funds: [
      { name: 'Lux Capital', detail: 'Deep-tech fund known for contrarian scientific bets.' },
      { name: 'Astera Institute', detail: 'Philanthropic backer of unconventional research programs.' },
    ],
  },
  'mcdonaldization-of-vc': {
    framing: "The essay itself is a map of the venture landscape: scale-led platforms versus conviction-led and emerging managers.",
    startups: [
      { name: 'Cursor', detail: 'Cited as the largest venture-backed acquisition ever, around $60 billion.' },
      { name: 'Isomorphic Labs', detail: 'Example of AI capital flowing into science, with a $2.1 billion raise.' },
      { name: 'Contrary', detail: "Harrison's own firm, positioning as talent- and research-driven." },
    ],
    funds: [
      { name: 'Andreessen Horowitz', detail: 'The archetypal platform firm, over 20 percent of US VC raised in 2026.' },
      { name: 'Founders Fund', detail: 'Named as a conviction-led counterexample to scale-led firms.' },
    ],
  },
  'layman-thinks-about-ai': {
    framing: "Marks's predictability ladder doubles as an investment map, from regulated utilities to near-binary frontier labs.",
    startups: [
      { name: 'Crusoe', detail: 'AI data center and energy developer at the heart of debt-financed buildouts.' },
      { name: 'Lambda', detail: 'GPU cloud of the neocloud kind Marks rates as least predictable infrastructure.' },
      { name: 'Anthropic', detail: 'Frontier lab whose own model graded frontier labs 2 out of 10 on predictability.' },
    ],
    funds: [
      { name: 'Oaktree Capital', detail: "Marks's firm, a leading credit investor weighing AI-related debt." },
      { name: 'Blue Owl Capital', detail: 'Private credit manager heavily involved in data center financing.' },
    ],
  },
  'llm-formal-verification': {
    framing: "AI-powered formal verification is turning a niche academic discipline into an emerging software security market.",
    startups: [
      { name: 'Theorem', detail: 'Co-author of the paper, building AI-driven verification tooling.' },
      { name: 'Galois', detail: 'Long-standing high-assurance software and formal methods firm.' },
      { name: 'Harmonic', detail: 'Builds AI systems that reason with formally verified mathematics in Lean.' },
    ],
    funds: [
      { name: 'Menlo Ventures', detail: 'Anthropic investor with exposure to the security and developer-tool ecosystem around Claude.' },
      { name: 'Sequoia Capital', detail: 'Backer of Harmonic and AI reasoning infrastructure.' },
    ],
  },
  'gtig-ai-threat-tracker-q4-2026': {
    framing: "Machine-speed attacks create demand for agentic defense: automated patching, AI security operations and AI supply chain security.",
    startups: [
      { name: 'Wiz', detail: 'Cloud security platform now part of Google, central to its AI threat defense offering.' },
      { name: 'Dropzone AI', detail: 'Autonomous AI analyst for security operations centers.' },
      { name: 'Socket', detail: 'Software supply chain security for open-source dependencies.' },
    ],
    funds: [
      { name: 'Cyberstarts', detail: 'Israeli seed fund specialized in cybersecurity founders.' },
      { name: 'Team8', detail: 'Venture creation group focused on cyber and AI security.' },
    ],
  },
  'alphaproof-code': {
    framing: "Verified cryptography and high-assurance code are becoming affordable, opening a market well beyond defense and aerospace.",
    startups: [
      { name: 'Signal Foundation', detail: 'Nonprofit behind the protocol verified in this work.' },
      { name: 'Cryspen', detail: 'Builds formally verified cryptographic libraries.' },
      { name: 'Harmonic', detail: 'AI company using Lean for verified reasoning.' },
    ],
    funds: [
      { name: 'GV', detail: "Alphabet's venture arm, investor across AI and security." },
      { name: 'Andreessen Horowitz', detail: 'Active investor in AI infrastructure and developer security.' },
    ],
  },
  'gpt-6-cyber': {
    framing: "AI vulnerability research is industrializing; the opportunity sits in triage, remediation and protecting maintainers from report floods.",
    startups: [
      { name: 'XBOW', detail: 'Autonomous offensive security platform that tops bug bounty leaderboards.' },
      { name: 'RunSybil', detail: 'AI-driven penetration testing.' },
      { name: 'Chainguard', detail: 'Secure, minimal open-source container images and dependencies.' },
    ],
    funds: [
      { name: 'Sequoia Capital', detail: 'Backer of XBOW and AI-native security startups.' },
      { name: 'Thrive Capital', detail: 'Major OpenAI investor.' },
    ],
  },
  'gemini-4-carbon': {
    framing: "Rapid frontier cadence rewards companies building on top of models, from agent platforms to cyber defense, over those betting on one model.",
    startups: [
      { name: 'Cognition', detail: 'Autonomous software engineering agent built on frontier models.' },
      { name: 'Replit', detail: 'AI-native coding platform using multiple frontier models.' },
      { name: 'Wiz', detail: 'Part of Google, positioned to put Carbon-class models into defense workflows.' },
    ],
    funds: [
      { name: 'GV', detail: "Alphabet's venture arm, investor across the Gemini ecosystem." },
      { name: 'CapitalG', detail: "Alphabet's growth fund, backing AI application companies." },
    ],
  },
  'openai-math-release': {
    framing: "AI mathematics creates demand for formal libraries, verification tools and research platforms that make machine output trustworthy.",
    startups: [
      { name: 'Harmonic', detail: 'Builds mathematical superintelligence grounded in Lean proofs.' },
      { name: 'Axiom Math', detail: 'AI mathematician startup focused on formal reasoning.' },
      { name: 'Lean FRO', detail: 'Focused research organization maintaining the Lean ecosystem.' },
    ],
    funds: [
      { name: 'Thrive Capital', detail: 'Major OpenAI backer.' },
      { name: 'Convergent Research', detail: 'Incubator behind the Lean focused research organization.' },
    ],
  },
  'alphagenome-2': {
    framing: "Cell-type-aware genomic models feed AI-first drug discovery, from target identification to patient stratification.",
    startups: [
      { name: 'Isomorphic Labs', detail: 'Alphabet AI drug discovery company spun out of DeepMind.' },
      { name: 'Recursion', detail: 'Industrializes biology with AI and large-scale cell imaging.' },
      { name: 'Xaira Therapeutics', detail: 'Heavily funded AI-first drug developer.' },
    ],
    funds: [
      { name: 'ARCH Venture Partners', detail: 'Leading biotech venture firm, backer of Xaira.' },
      { name: 'Thrive Capital', detail: 'Led Isomorphic Labs funding.' },
    ],
  },
}
