/**
 * Single source of truth for all portfolio content.
 * Derived from ../about-me.md — edit here, every section reads from this file.
 */

export type LinkKind = 'demo' | 'download' | 'source' | 'social';

export interface ExternalLink {
  label: string;
  href: string;
  kind: LinkKind;
  /** Short qualifier shown in mono type, e.g. "Windows · .exe". */
  note?: string;
}

/**
 * Figures for featured projects. Diagrams are drawn in code from project facts;
 * `image` is only for real project assets (no product screenshots were supplied).
 */
export type Figure =
  | { type: 'flow'; caption: string; steps: { label: string; detail?: string }[]; aside?: string }
  | { type: 'image'; caption: string; src: string; alt: string; label?: string }
  | { type: 'stats'; caption: string; items: { value: string; label: string }[]; footnote?: string }
  | { type: 'list'; caption: string; items: { label: string; detail: string }[] };

export interface Project {
  slug: string;
  no: string;
  title: string;
  /** Italic qualifier in the work index ("Echo — voice tutor"). */
  sub: string;
  /** One-line product descriptor. */
  kind: string;
  discipline: string;
  platform: 'Desktop' | 'Web' | 'Mobile' | 'Service';
  /** Compact stack shown in the index. */
  stack: string;
  summary: string;
  contributions: string[];
  /** Short paragraph on the engineering emphasis. */
  focus?: string;
  technologies: string[];
  context?: string;
  /** Employer for professional work — renders a "Built at <org>" label that sets it apart from independent projects. */
  org?: string;
  /** Release status badge, e.g. "On TestFlight". */
  status?: string;
  /** Shown in the detail view when there is no public link to offer. */
  statusNote?: string;
  links: ExternalLink[];
  featured?: {
    code: string;
    blurb: string;
    role: string;
    outcome: string;
    figures: [Figure, Figure];
  };
}

export interface Profile {
  name: string;
  initials: string;
  location: string;
  /** Header clock label + IANA zone. */
  clockLabel: string;
  timeZone: string;
  roles: string;
  headline: string;
  intro: string;
  /** Optional — enables the mailto link and the copy-email orb in the contact section. */
  email?: string;
  linkedin: string;
  /** Optional — set to add a GitHub link to the contact list. */
  github?: string;
  /** Optional — path or URL to a résumé PDF (e.g. "/resume.pdf" in /public). */
  resumeUrl?: string;
  /** Optional — portrait in /public (e.g. "/portrait.jpg"); a generated panel is shown otherwise. */
  portrait?: { src: string; alt: string };
}

export const profile: Profile = {
  name: 'Beka Natchkebia',
  initials: 'BN',
  location: 'Tbilisi, Georgia',
  clockLabel: 'Tbilisi, GE',
  timeZone: 'Asia/Tbilisi',
  roles: 'Full-Stack Developer · AI Engineer · Real-Time Voice Systems',
  headline: 'Full-stack developer & AI engineer',
  intro:
    'Full-stack developer & AI engineer in Tbilisi. I build web, mobile and desktop apps — with a focus on conversational AI and real-time voice interfaces.',
  email: 'bnachkebia27@gmail.com',
  linkedin: 'https://www.linkedin.com/in/beka-natchkebia/',
};

export const site = {
  title: `${profile.name} — Full-Stack Developer & AI Engineer`,
  description:
    'Full-stack developer and AI engineer in Tbilisi building web, mobile and desktop apps — conversational AI, real-time voice interfaces and AI tools that work with screens and visual workspaces.',
  volume: 'Vol.01',
  year: '2026',
};

export const about = {
  statement: {
    lead: 'I build ',
    em: 'web, mobile and desktop',
    rest: ' applications — with a particular interest in conversational AI, real-time voice interfaces, and AI tools that work with screens and visual workspaces.',
  },
  notes: [
    {
      label: 'Currently',
      text: 'NOC Engineer at eToro — investigating production issues across applications, APIs, databases and cloud services, and supporting incident response.',
    },
    {
      label: 'Building',
      text: 'About three years of hands-on development across personal and collaborative work: AI interview simulation, desktop tutoring, a map-based photo app on TestFlight, social apps and event discovery.',
    },
    {
      label: 'Studying',
      text: 'BSc Information Technology at Business and Technology University, expected 2027. Georgian (native), English (C1).',
    },
  ],
  principles: [
    'Build features across the interface, backend, data layer, AI integrations and deployment.',
    'Practical AI engineering: response latency, context quality, validation, interruptions, API failures and usage limits.',
    'Use AI coding tools and agents throughout development — and understand, review and validate what they produce.',
    'Bring production troubleshooting experience into how I debug and maintain applications.',
  ],
};

export const projects: Project[] = [
  {
    slug: 'incident-scope-agent',
    no: '01',
    title: 'Incident Scope Agent',
    sub: 'blast radius',
    kind: 'AI incident investigation agent',
    discipline: 'AI · Production ops',
    platform: 'Service',
    stack: 'Node.js / Claude / MCP',
    summary:
      'An AI agent that determines the blast radius of production incidents — affected services, upstream and downstream dependencies, impacted customer segments and regions. Built and solely owned at eToro; used by internal teams, R&D and Incident Management to scope real P2 production incidents.',
    contributions: [
      'Designed, developed and own the agent end to end, running on Node.js.',
      'Used Claude to orchestrate live investigations through MCP tools, primarily querying Splunk and Coralogix with read-only access.',
      'Accepts an incident ticket, alert text, or a service and time window as investigation input.',
      'Correlates service health, dependencies and impact signals to identify affected services, upstream and downstream dependencies, impacted customer segments or aggregate counts, and affected regions.',
      'Distinguishes supporting evidence from assumptions in every assessment.',
      'Separated AI investigation from a deterministic, AI-free validation and reporting engine.',
      'The engine enforces evidence requirements, redacts personal information and identifiers, and prevents duplicate evidence from counting as independent corroboration.',
      "Keeps the incident's declared priority separate from the agent's suggested severity.",
      'Delivers structured, auditable scope reports to Microsoft Teams.',
    ],
    focus:
      'Giving incident responders an evidence-backed assessment of impact to support severity, escalation and prioritization decisions — reducing manual scoping work and accelerating early incident assessment. The model investigates; a deterministic engine decides what counts as evidence.',
    technologies: ['Node.js', 'JavaScript', 'Claude', 'MCP', 'Splunk', 'Coralogix', 'Microsoft Teams'],
    context:
      'Professional project at eToro — designed, developed and solely owned by me. Used by internal teams, R&D and Incident Management to scope two real P2 production incidents.',
    org: 'eToro',
    status: 'Internal tool',
    statusNote: 'Proprietary — no public source code or live demo.',
    links: [],
    featured: {
      code: 'F01',
      blurb: 'Two real P2 incidents scoped — evidence-backed blast radius, built and owned end to end…',
      role: 'Sole owner — design & development',
      outcome: 'Scoped two real P2 production incidents · used by R&D and Incident Management',
      figures: [
        {
          type: 'flow',
          caption: '(Fig. 02a) Investigation pipeline',
          steps: [
            { label: 'Input', detail: 'Ticket · alert · service + window' },
            { label: 'Investigate', detail: 'Claude · MCP · read-only' },
            { label: 'Validate', detail: 'Deterministic · AI-free' },
            { label: 'Report', detail: 'Microsoft Teams · auditable' },
          ],
          aside: 'Evidence ≠ assumption · PII redacted · no double-counting',
        },
        {
          type: 'list',
          caption: '(Fig. 02b) Scope',
          items: [
            { label: 'Services', detail: 'Affected · upstream · downstream' },
            { label: 'Users', detail: 'Customer segments · counts' },
            { label: 'Regions', detail: 'Affected' },
          ],
        },
      ],
    },
  },
  {
    slug: 'echo',
    no: '02',
    title: 'Echo',
    sub: 'voice tutor',
    kind: 'AI desktop tutor',
    discipline: 'AI · Desktop',
    platform: 'Desktop',
    stack: 'Electron / Claude / Deepgram',
    summary:
      'A desktop AI tutor that explains concepts in context — talking you through them, reading your screen, and drawing on an interactive whiteboard as it speaks.',
    contributions: [
      'Built the Electron, React, TypeScript and Node.js application.',
      'Implemented AI orchestration, conversation state, model routing and tool execution in the Electron main process.',
      'Integrated Claude for reasoning and tool use, and Deepgram for streaming speech recognition and speech synthesis.',
      'Implemented streaming audio playback, speech chunking, interruption handling, and cancellation of pending audio and whiteboard actions.',
      'Designed conversation history to track what the user actually heard when speech is interrupted.',
      'Added screen awareness using screenshots as context.',
      'Integrated an Excalidraw whiteboard with drawings coordinated with spoken explanations.',
      'Used a Vercel backend for authentication, API proxying and usage limits.',
    ],
    focus:
      'Streaming pipelines, asynchronous orchestration, latency, cancellation, multimodal interfaces and conversational state. Voice runs as a streaming speech-to-text → language model → text-to-speech pipeline with interruption handling.',
    technologies: ['Electron', 'React', 'TypeScript', 'Node.js', 'Claude API', 'Deepgram', 'Excalidraw', 'Vercel'],
    links: [
      {
        label: 'Download for Windows',
        href: 'https://github.com/unseenmeli/ECHO/releases/download/InstallersWIN/Echo.Setup.0.1.0.exe',
        kind: 'download',
        note: 'v0.1.0 · .exe',
      },
      {
        label: 'Download for macOS',
        href: 'https://github.com/unseenmeli/ECHO/releases/download/Installers/Echo-0.1.0-arm64.dmg',
        kind: 'download',
        note: 'Apple Silicon · .dmg',
      },
    ],
    featured: {
      code: 'F02',
      blurb: 'Voice, screen awareness and a live whiteboard — explained in context…',
      role: 'Full-stack & AI engineering',
      outcome: 'v0.1.0 installers — Windows & macOS (Apple Silicon)',
      figures: [
        {
          type: 'flow',
          caption: '(Fig. 03a) Voice pipeline',
          steps: [
            { label: 'Speech in', detail: 'Deepgram · streaming STT' },
            { label: 'Reason + tools', detail: 'Claude · screen context' },
            { label: 'Speech out', detail: 'Deepgram · chunked TTS' },
            { label: 'Whiteboard', detail: 'Excalidraw · synced drawing' },
          ],
          aside: 'Interrupt → cancel pending audio + drawing',
        },
        {
          type: 'list',
          caption: '(Fig. 03b) Surfaces',
          items: [
            { label: 'Voice', detail: 'Streaming conversation' },
            { label: 'Screen', detail: 'Screenshots as context' },
            { label: 'Board', detail: 'Drawn explanations' },
          ],
        },
      ],
    },
  },
  {
    slug: 'interviewerai',
    no: '03',
    title: 'InterviewerAI',
    sub: 'interviews',
    kind: 'AI interview simulator',
    discipline: 'AI · Full-stack',
    platform: 'Web',
    stack: 'Next.js / AWS Lambda / Gemini',
    summary:
      'Voice-based interview practice: paste a job description and, optionally, a résumé — get a tailored live interview and a structured assessment at the end.',
    contributions: [
      'Built the interview interface and backend.',
      'Implemented the flow from job description and résumé input to a live interview and final assessment.',
      'Added a curated interview question bank with answer guidance, common mistakes and follow-up questions.',
      'Implemented retrieval of relevant question-bank entries for interview turns.',
      'Used structured model outputs with Zod validation and deterministic interview rules.',
      'Built assessments with scores, competency breakdowns, response critiques and STAR-based suggestions.',
      'Worked on stateless backend execution, interview-state management, duplicate-request prevention and voice responsiveness.',
      'Deployed on AWS; implemented page metadata, canonical URLs, social previews, structured data, robots.txt and a sitemap.',
    ],
    technologies: ['TypeScript', 'Next.js', 'React', 'Node.js', 'Express', 'AWS Amplify', 'Lambda', 'DynamoDB', 'Gemini API', 'Zod'],
    context: 'A personal project also used by colleagues. A production Lighthouse run recorded 100 Performance · 95 Accessibility · 100 Best Practices · 100 SEO.',
    links: [{ label: 'Live demo', href: 'https://main.d7m3rdqgkutlt.amplifyapp.com/', kind: 'demo', note: 'AWS Amplify' }],
    featured: {
      code: 'F03',
      blurb: 'Job description in, tailored interview and structured feedback out…',
      role: 'Full-stack & AI engineering',
      outcome: 'Used by colleagues · Lighthouse 100 / 95 / 100 / 100',
      figures: [
        {
          type: 'flow',
          caption: '(Fig. 04a) Interview flow',
          steps: [
            { label: 'Inputs', detail: 'Job description + résumé' },
            { label: 'Retrieve', detail: 'Question-bank entries' },
            { label: 'Interview', detail: 'Live, voice-based' },
            { label: 'Assess', detail: 'Scores · STAR feedback' },
          ],
          aside: 'Structured outputs · Zod-validated',
        },
        {
          type: 'stats',
          caption: '(Fig. 04b) Lighthouse',
          items: [
            { value: '100', label: 'Performance' },
            { value: '95', label: 'Accessibility' },
            { value: '100', label: 'Best practices' },
            { value: '100', label: 'SEO' },
          ],
          footnote: 'Production run',
        },
      ],
    },
  },
  {
    slug: 'memoire',
    no: '04',
    title: 'Memoire',
    sub: 'map diary',
    kind: 'Map-based photo app',
    discipline: 'Mobile · Full-stack',
    platform: 'Mobile',
    stack: 'React Native / Expo / Supabase',
    summary:
      'A map-based mobile app for dropping pins on places and attaching photos to them — built and shipped through to TestFlight.',
    contributions: [
      'Built the mobile app with React Native, TypeScript and Expo.',
      'Implemented authentication and per-user data isolation with Supabase Auth and PostgreSQL row-level security.',
      'Built map pin creation and deletion.',
      'Implemented signed photo uploads through Cloudinary, with cleanup when an upload fails.',
      'Added real-time data synchronisation with Supabase Realtime.',
      'Wrote a custom query store with caching and cache invalidation.',
      'Implemented coordinated account deletion with cleanup of the associated data.',
      'Set up build and release workflows with EAS and GitHub Actions — TestFlight distribution and App Store submission preparation.',
    ],
    focus:
      'Shipping a real mobile app end to end: authentication and data security, media uploads that clean up after themselves, live sync, and release engineering. The backend runs on Supabase — PostgreSQL, Auth, Realtime and Edge Functions (Deno).',
    technologies: ['React Native', 'TypeScript', 'Expo', 'Supabase', 'Cloudinary', 'PostgreSQL', 'Supabase Auth', 'Realtime', 'Edge Functions', 'EAS', 'GitHub Actions'],
    context: 'A NewEra project.',
    status: 'On TestFlight',
    statusNote: 'Distributed through TestFlight',
    links: [],
    featured: {
      code: 'F04',
      blurb: 'Pins, photos and live sync — shipped through to TestFlight…',
      role: 'Mobile & backend engineering, release',
      outcome: 'On TestFlight · App Store submission in preparation',
      figures: [
        {
          type: 'flow',
          caption: '(Fig. 05a) Pin lifecycle',
          steps: [
            { label: 'Drop a pin', detail: 'Map · location' },
            { label: 'Attach photos', detail: 'Cloudinary · signed upload' },
            { label: 'Persist', detail: 'Postgres · row-level security' },
            { label: 'Sync', detail: 'Supabase Realtime' },
          ],
          aside: 'Failed upload → clean up orphaned media',
        },
        {
          type: 'image',
          caption: '(Fig. 05b) App icon',
          src: '/projects/memoire-icon.png',
          alt: 'Memoire app icon: a white wind turbine on a teal gradient',
          label: 'Memoire — iOS · TestFlight',
        },
      ],
    },
  },
  {
    slug: 'swipe',
    no: '05',
    title: 'Swipe',
    sub: 'events',
    kind: 'Event discovery app',
    discipline: 'Mobile · Hackathon',
    platform: 'Mobile',
    stack: 'React Native / InstantDB / Anthropic',
    summary: 'A mobile app for discovering events in Tbilisi through a swipe-based interface.',
    contributions: [
      'Built collaboratively during a 24-hour hackathon.',
      'Combined event aggregation, AI recommendations and a real-time feed.',
      'Reached the top 15 out of approximately 150 competing teams.',
    ],
    technologies: ['React Native', 'InstantDB', 'Anthropic API'],
    links: [],
  },
  {
    slug: 'yuzu',
    no: '06',
    title: 'Yuzu',
    sub: 'music social',
    kind: 'Social music discovery',
    discipline: 'Mobile',
    platform: 'Mobile',
    stack: 'React Native / Last.fm / InstantDB',
    summary:
      'A mobile music app combining listening activity, friends and recommendations, wrapped in a Y2K-inspired interface.',
    contributions: [
      'Integrated Last.fm authentication and listening data.',
      'Added Spotify search, friend requests and social discovery.',
      'Organised the experience into Home, Friends, Picks and Settings.',
    ],
    technologies: ['React Native', 'Last.fm API', 'InstantDB', 'Spotify search'],
    links: [],
  },
];

export const featuredProjects = projects.filter((p): p is Project & { featured: NonNullable<Project['featured']> } => !!p.featured);

export const capabilities = [
  {
    n: '01',
    tag: '(A)',
    dir: 'Interface → Server',
    title: 'Full-stack Engineering',
    items: ['TypeScript · React · Next.js', 'React Native · Expo · Electron', 'Node · Express · Django', 'Supabase · PostgreSQL · DynamoDB'],
  },
  {
    n: '02',
    tag: '(B)',
    dir: 'Model → Product',
    title: 'AI Systems',
    items: ['Claude API · Gemini API', 'Tool calling · structured outputs · Zod', 'RAG · context · model routing', 'Streaming STT/TTS · interruptions'],
  },
  {
    n: '03',
    tag: '(C)',
    dir: 'Commit → Production',
    title: 'Cloud & Operations',
    items: ['AWS Amplify · Lambda · Vercel', 'Azure AKS · Kubernetes · Functions', 'Splunk · Datadog · Grafana', 'Incident response · KQL · SQL'],
  },
];

export interface ExperienceItem {
  when: string;
  org: string;
  role: string;
  tag: string;
  details?: string[];
}

export const experience: ExperienceItem[] = [
  {
    when: 'Feb 2025 — Now',
    org: 'eToro',
    role: 'NOC Engineer',
    tag: 'Production ops',
    details: [
      'Built and solely own the Incident Scope Agent — an AI incident investigation agent used by R&D and Incident Management to scope two real P2 production incidents.',
      'Investigate complex production issues across applications, APIs, databases and cloud services.',
      'Support incident handling, escalation and on-call operations, using logs, metrics and traces.',
      'Splunk, Datadog, Coralogix, Grafana, Mixpanel, Azure Monitor, KQL and SQL Server.',
      'Investigate Kubernetes workloads in Azure AKS (k9s); build automations with Power Automate and Jira Service Management.',
      'Helped onboard and mentor three NOC engineers.',
    ],
  },
  {
    when: '≈ 3 years',
    org: 'Independent & team projects',
    role: 'Full-stack & AI developer',
    tag: 'Web · Mobile · Desktop',
  },
  {
    when: '2023 — 2027',
    org: 'Business & Technology Univ.',
    role: 'BSc Information Technology',
    tag: 'Expected 2027',
  },
];

export const marquee = {
  stack: ['TypeScript', 'React', 'Next.js', 'React Native', 'Expo', 'Node.js', 'Electron', 'Python', 'Supabase', 'Claude API', 'Deepgram', 'AWS', 'Kubernetes'],
  themes: ['voice', 'streaming', 'interfaces', 'latency', 'interruptions', 'context', 'validation', 'observability'],
};

export const contact = {
  lede: 'Interested in full-stack and AI application engineering — conversational interfaces, real-time voice systems, developer tools and reliable cloud applications. Reach me by email or on LinkedIn.',
};

export const themes = ['Paper', 'Concrete', 'Ink'] as const;
export type Theme = (typeof themes)[number];

/** Contact links shown in the footer grid: socials first, then the public project destinations. */
export function contactLinks(): ExternalLink[] {
  const out: ExternalLink[] = [];
  if (profile.email) out.push({ label: profile.email, href: `mailto:${profile.email}`, kind: 'social', note: 'Email' });
  out.push({ label: 'LinkedIn', href: profile.linkedin, kind: 'social' });
  if (profile.github) out.push({ label: 'GitHub', href: profile.github, kind: 'social' });
  if (profile.resumeUrl) out.push({ label: 'Résumé', href: profile.resumeUrl, kind: 'download' });
  for (const p of projects) for (const l of p.links) out.push({ ...l, label: `${p.title} — ${l.label.replace('Download for ', '')}` });
  return out;
}
