/**
 * Every word on the page lives here. Items marked "sample" are placeholders:
 * replace testimonials, case studies and contact details before launch.
 */
import type {IconName} from '@/components/Icon';

export const brand = {
  name: 'EC4YOU',
  email: 'hello@ec4you.com',
  phone: '+971 — placeholder',
  regions: 'UAE, Canada and global clients',
  /** WhatsApp number in international format, digits only (placeholder). */
  whatsapp: '971500000000',
  whatsappText: 'Hi EC4YOU, I’d like to discuss an app project.',
  /** Shown on the legal pages. Fill in before launch. */
  legalName: 'EC4YOU (legal entity name — placeholder)',
  address: 'Registered address — placeholder',
};

export const nav = [
  {label: 'Services', href: '#build'},
  {label: 'Our Work', href: '#work'},
  {label: 'Process', href: '#process'},
  {label: 'Engagement', href: '#engage'},
  {label: 'FAQ', href: '#faq'},
];

export const hero = {
  chips: ['iOS', 'Android', 'Flutter'],
  title: 'We Build Apps That Move Businesses Forward.',
  body: 'From bold startup ideas to enterprise-ready digital products, we design and develop powerful mobile apps that help businesses launch, scale, and lead.',
  positioning: 'Custom mobile apps, AI-powered solutions and digital product engineering',
  primary: 'Start Your App Project',
  secondary: 'Explore Our Work',
  hint: 'Scroll to launch',
  /** Launch-readout stages, keyed by how far the phone has risen (0–1). */
  stages: [
    {at: 0, label: 'Discovery'},
    {at: 0.25, label: 'Design'},
    {at: 0.5, label: 'Build'},
    {at: 0.8, label: 'Testing'},
    {at: 0.999, label: 'Live'},
  ],
};

export const work = {
  eyebrow: 'Our work',
  heading: 'Apps we’ve shipped.',
  body: 'Sample projects shown — replace with real case studies and measured results.',
  link: 'See all projects',
  items: [
    {tag: '2025', title: 'Patient booking app for a clinic group', facts: ['iOS + Android', 'Healthcare', 'Self-serve booking'], tint: ['#FF6633', '#FF9F1C'], icon: 'stethoscope'},
    {tag: '2025', title: 'Broker CRM for a real estate agency', facts: ['Cross-platform', 'Real estate', 'AI lead scoring'], tint: ['#F59E0B', '#EF4444'], icon: 'building'},
    {tag: '2024', title: 'Mobile storefront for a retail brand', facts: ['iOS + Android', 'E-commerce', 'One-tap checkout'], tint: ['#EC4899', '#FF6633'], icon: 'cart'},
    {tag: '2024', title: 'AMC technician app for a facilities firm', facts: ['Android', 'Field service', 'Offline job sheets'], tint: ['#10B981', '#FF9F1C'], icon: 'wrench'},
  ] as {tag: string; title: string; facts: string[]; tint: [string, string]; icon: IconName}[],
};

export const plan = {
  eyebrow: 'Our process',
  heading: ['From First Conversation', 'to App Store Launch.'],
  note: 'Timelines are set after discovery — every project gets its own milestone plan.',
  /** The pack's four steps; each draws its group of phases on the chart. */
  steps: [
    {n: '/01', name: 'Discover', phases: [0], body: 'We map your goals, users, requirements and technical feasibility, so the app solves the right problem.'},
    {n: '/02', name: 'Design', phases: [1], body: 'User journeys, wireframes and interactive prototypes you can click through before we build.'},
    {n: '/03', name: 'Build', phases: [2, 3], body: 'Scalable architecture, mobile apps, backends and APIs, delivered in sprints with demos you can see.'},
    {n: '/04', name: 'Launch & grow', phases: [4, 5, 6], body: 'Testing, app store submission, monitoring and ongoing improvements after release.'},
  ],
  /** Bars in week units (1 = start of W1). Overlaps are intentional. */
  phases: [
    {name: 'R&D', from: 0.7, to: 1.6, title: 'Discovery & strategy', body: 'We map your goals, users, requirements and technical feasibility.'},
    {name: 'UI & UX', from: 1.3, to: 2.8, title: 'UI/UX design', body: 'User journeys, wireframes, interactive prototypes and polished interfaces.'},
    {name: 'Architecture', from: 2.1, to: 3.7, title: 'Architecture & planning', body: 'Scalable architecture, integrations, data models and delivery milestones.'},
    {name: 'Production', from: 2.8, to: 4.3, title: 'App development', body: 'Mobile apps, backend services, APIs and core features, built in sprints.'},
    {name: 'Deployment', from: 3.6, to: 5.1, title: 'Deployment', body: 'Environments, pipelines and app store preparation.'},
    {name: 'Testing & QA', from: 4.4, to: 6.4, title: 'Testing & quality assurance', body: 'Functionality, usability, security, compatibility and performance checks.'},
    {name: 'Handover', from: 5.1, to: 7.4, title: 'Launch & continuous improvement', body: 'Store submission, monitoring, handover and ongoing enhancements.'},
  ],
  legend: ['Active work', 'Reviews & checkpoints', 'Now'],
};

export const reviews = {
  eyebrow: 'Testimonials',
  heading: 'Built on Trust. Designed for Impact.',
  note: 'Sample testimonials — replace with verified client reviews before launch.',
  items: [
    {tag: 'Healthcare app', role: 'Operations Director', quote: '“Our patients book in seconds now, and the front desk finally has time to breathe.”', tint: ['#FF8A5C', '#FFB547'], stars: 5},
    {tag: 'Real estate app', role: 'Founder, Brokerage', quote: '“Buyers book viewings themselves now. Our brokers spend time closing, not scheduling.”', tint: ['#FBBF24', '#F97316'], stars: 5},
    {tag: 'AI CRM', role: 'Head of Sales', quote: '“The team adopted the CRM in a week because it actually fits how we sell.”', tint: ['#34D399', '#059669'], stars: 4},
    {tag: 'E-commerce app', role: 'Co-founder, Retail', quote: '“Checkout went from five screens to one. Customers noticed straight away.”', tint: ['#F472B6', '#FF8A5C'], stars: 5},
    {tag: 'Education app', role: 'Principal, School Group', quote: '“Parents finally have one place for homework, grades and messages.”', tint: ['#FFB547', '#FF6633'], stars: 5},
  ] as {tag: string; role: string; quote: string; tint: [string, string]; stars: number}[],
};

export const faq = {
  tag: 'FAQs',
  heading: 'Questions before we build?',
  sub: 'We’ve got answers.',
  items: [
    ['How much does it cost to develop a mobile app?', 'Cost depends on scope, platforms, integrations and design complexity. After a short discovery call, we share a transparent estimate broken into milestones, with no obligation.'],
    ['How long does custom app development take?', 'It depends on scope, platforms and integrations. After discovery, we share a milestone plan so you know exactly what to expect, and when.'],
    ['Do you build for both Android and iOS?', 'Yes — native apps for each platform, or one cross-platform app with Flutter or React Native when that suits your goals and budget better.'],
    ['Will I own the source code?', 'Ownership is set out in your contract. Our standard agreements hand over the source code and project assets on final payment.'],
    ['Do you provide maintenance and support?', 'Yes. Post-launch plans cover monitoring, OS updates, bug fixes and new features.'],
  ] as [string, string][],
};

export const contact = {
  eyebrow: 'Start your project',
  heading: ['Your next big app', 'starts here.'],
  body: 'Tell us what you’re building. We’ll help you explore the right approach for your next digital product.',
  codes: [['+971', 'UAE +971'], ['+1', 'Canada +1'], ['+91', 'India +91'], ['+966', 'KSA +966'], ['+44', 'UK +44'], ['+1 US', 'USA +1']],
  services: ['Android App Development', 'iOS App Development', 'Cross-Platform App Development', 'Custom Mobile Application', 'AI-Powered Application', 'CRM / Enterprise Application', 'E-commerce Application', 'Existing App Modernization', 'Other'],
  industries: ['Real Estate', 'Manufacturing', 'Education', 'Healthcare', 'E-commerce / Retail', 'Professional Services', 'Technology / SaaS', 'Logistics', 'Other'],
  submit: 'Let’s Discuss Your App',
  sending: 'Opening your mail app…',
  done: 'Your mail app should be open with your enquiry drafted. If it isn’t, write to',
};

export const footer = {
  columns: [
    {title: 'Navigation', links: [['Home', '#top'], ['Services', '#build'], ['Our Work', '#work'], ['Process', '#process'], ['FAQ', '#faq']]},
    {title: 'Company', links: [['Engagement models', '#engage'], ['Contact Us', '#contact']]},
    {title: 'Legal', links: [['Terms of Service', '/terms'], ['Privacy Policy', '/privacy'], ['Cookie Settings', '#cookie-settings']]},
    {title: 'Follow us', links: [['LinkedIn', '#'], ['Instagram', '#'], ['X', '#']]},
  ],
};

export const trust = {
  label: 'TRUSTED BY TEAMS ACROSS THE UAE, CANADA AND BEYOND',
  /** Replace each with a real client logo (SVG/PNG in /public/logos) once you have permission. */
  logos: ['Client logo', 'Client logo', 'Client logo', 'Client logo', 'Client logo', 'Client logo'],
  note: 'Logo placeholders — replace with client logos before launch.',
  facts: [['smartphone', 'iOS, Android & cross-platform'], ['sparkles', 'AI integrations'], ['mapPin', 'UAE · Canada · Global']] as [IconName, string][],
};

export const sticky = {
  primary: 'Let’s Talk',
  whatsapp: 'WhatsApp',
};

export const thankYou = {
  eyebrow: 'Enquiry received',
  heading: 'Thanks — we’ve got your project details.',
  body: 'Our team will review your brief and get back to you to arrange a discovery call.',
  steps: [
    ['We review your brief', 'Goals, platforms, integrations and scope.'],
    ['Discovery call', 'A short call to understand your business and users.'],
    ['Proposal & estimate', 'A tailored plan with milestones and an estimate.'],
  ] as [string, string][],
  whatsapp: 'Prefer WhatsApp? Message us',
  back: 'Back to the homepage',
};

export const consent = {
  title: 'Cookies & tracking',
  body: 'We use cookies to measure how our ads and site perform. You can accept or reject non-essential cookies.',
  accept: 'Accept',
  reject: 'Reject',
  more: 'Privacy Policy',
};

export const problems = {
  eyebrow: 'The problem',
  heading: 'Most app projects stall for the same four reasons.',
  items: [
    {title: 'Ideas get lost between business and tech teams.', body: 'Requirements change hands so often that the app ships solving the wrong problem.'},
    {title: 'Users try the app once, then delete it.', body: 'Confusing flows and slow screens undo months of work in a few seconds.'},
    {title: 'Your app, CRM and operations don’t talk to each other.', body: 'Teams re-type the same data across separate systems.'},
    {title: 'Launch day becomes the finish line — no plan after release.', body: 'No budget or team for updates, support or growth once the app is live.'},
  ],
  intro: 'Our process is built to fix exactly these — so your app ships solving the right problem, and keeps growing after launch.',
  close: 'Our process is built to fix exactly these.',
  link: 'See how we work',
};

export const compare = {
  eyebrow: 'The difference',
  heading: 'The difference is clear.',
  us: 'EC4YOU',
  them: 'Other agencies',
  rows: [
    ['Product-first: starts from your business goals and users', 'Builds the feature list as given'],
    ['Design, build, launch and support in one team', 'Hands you between separate vendors'],
    ['User-centred UI/UX, tested before we build', 'Design treated as decoration'],
    ['Architecture planned to grow with you', 'Rebuild when usage grows'],
    ['Milestones and demos you can see every sprint', 'Quiet until the deadline'],
    ['Quality checks and security review every sprint', 'Testing squeezed in at the end'],
    ['Support and new features after launch', 'Project ends at delivery'],
  ] as [string, string][],
};

export const engage = {
  eyebrow: 'How we work together',
  heading: 'Pick the engagement that fits.',
  note: 'Every engagement starts with a discovery call — no obligation.',
  plans: [
    {name: 'Fixed-scope project', tag: 'For a defined app or MVP', price: 'Project estimate', points: ['Discovery and milestone plan', 'Design, build and launch', 'App store submission', '30-day post-launch support'], cta: 'Get an estimate'},
    {name: 'Dedicated product team', tag: 'For products that keep evolving', price: 'Monthly engagement', points: ['Everything in fixed-scope', 'Designers + engineers on your roadmap', 'Sprint demos every two weeks', 'Scale up or down as needed'], cta: 'Talk to us', featured: true},
    {name: 'Support & growth', tag: 'For apps already live', price: 'Monthly plan', points: ['Monitoring and OS updates', 'Bug fixes and security patches', 'Small feature releases', 'Performance reports'], cta: 'Ask about support'},
  ],
};

export const techTiles = {
  eyebrow: 'Technologies',
  heading: 'Tech stack we use',
  body: 'Modern, proven tools chosen for performance, security and scale.',
  items: [['Flutter', 'smartphone'], ['React Native', 'atom'], ['Node.js', 'server'], ['Firebase', 'flame'], ['AWS', 'cloud']] as [string, IconName][],
  note: 'Confirm the five technologies and swap in official logos before launch.',
};

export const services = {
  eyebrow: 'Our services',
  heading: 'Apps for every industry',
  intro: 'Purpose-built digital products that simplify operations, connect customers, and unlock new business opportunities.',
  main: {title: 'Custom Mobile Apps', body: 'Native iOS and Android, or one cross-platform app with Flutter or React Native.', chips: ['iOS', 'Android', 'Flutter', 'React Native']},
  items: [
    {icon: 'pen', title: 'UI/UX & Product Design', body: 'Research-led journeys, prototypes and polished interfaces people enjoy using.', short: 'Journeys, prototypes, polished UI'},
    {icon: 'brain', title: 'AI-Powered Apps & Agents', body: 'Assistants, smart search and agents that handle repetitive work.', short: 'Assistants, smart search, agents'},
    {icon: 'users', title: 'CRM & Enterprise Systems', body: 'AI-powered CRM, AMC management and internal tools in one connected platform.', short: 'AI CRM, AMC, internal tools'},
    {icon: 'bag', title: 'E-commerce & Industry Apps', body: 'Real estate, healthcare, education, manufacturing and retail apps built to convert.', short: 'Real estate, health, retail and more'},
  ] as {icon: IconName; title: string; body: string; short: string}[],
};
