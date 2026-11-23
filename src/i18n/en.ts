/**
 * English copy — the source every other language mirrors (src/i18n/ar.ts,
 * src/i18n/fr.ts are typed against this shape, so a missing key fails the build).
 * Items marked "sample" are placeholders: replace testimonials and case studies before launch.
 * `{name}` placeholders are filled with fmt() from ./config.
 */
import type {IconName} from '@/components/Icon';
import {INDUSTRIES, SERVICES} from './options';

export const en = {
  meta: {
    title: 'EC4YOU — We Build Apps That Move Businesses Forward',
    description: 'Chennai-based app development company. Custom mobile apps, AI-powered solutions and digital product engineering for businesses in India, the UAE, Canada and worldwide.',
    ogTitle: 'EC4YOU — Custom Mobile App Development',
    ogDescription: 'From bold startup ideas to enterprise-ready digital products.',
    thankYouTitle: 'Thank you — EC4YOU',
  },

  common: {
    skip: 'Skip to contact form',
    home: 'EC4YOU home',
    homeShort: 'Home',
    mainNav: 'Main',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    menu: 'Menu',
    language: 'Language',
    letsTalk: 'Let’s Talk',
    startProject: 'Start Your App Project',
    whatsapp: 'WhatsApp',
    whatsappAria: 'Chat on WhatsApp (opens WhatsApp)',
    whatsappText: 'Hi EC4YOU, I’d like to discuss an app project.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    cookies: 'Cookie Settings',
    legal: 'Legal',
    rights: 'All rights reserved.',
  },

  nav: [
    {label: 'Services', href: '#build'},
    {label: 'Our Work', href: '#work'},
    {label: 'Process', href: '#process'},
    {label: 'Engagement', href: '#engage'},
    {label: 'FAQ', href: '#faq'},
  ],

  hero: {
    titleA: 'We Build Apps That',
    titleAccent: 'Move Businesses',
    titleB: 'Forward.',
    body: 'From bold startup ideas to enterprise-ready digital products, we design and develop powerful mobile apps that help businesses launch, scale, and lead.',
    primary: 'Start Your App Project',
    secondary: 'Explore Our Work',
    /** Small dark card at the top right of the hero; links to Our work. */
    reel: {label: '/ LATEST LAUNCH', title: 'Your app is live.', meta: 'iOS · Android · Store-ready', cta: 'See our work'},
  },

  trust: {
    label: 'TRUSTED BY GROWING BRANDS',
    aria: 'Our clients',
  },

  problems: {
    eyebrow: 'The problem',
    /** Huge heading that stays pinned on the left; one line per entry. */
    big: ['Why', 'apps', 'stall?'],
    heading: 'Most app projects stall for the same four reasons.',
    intro: 'Our process is built to fix exactly these — so your app ships solving the right problem, and keeps growing after launch.',
    link: 'See how we work',
    items: [
      {title: 'Ideas get lost between business and tech teams.', body: 'Requirements change hands so often that the app ships solving the wrong problem.'},
      {title: 'Users try the app once, then delete it.', body: 'Confusing flows and slow screens undo months of work in a few seconds.'},
      {title: 'Your app, CRM and operations don’t talk to each other.', body: 'Teams re-type the same data across separate systems.'},
      {title: 'Launch day becomes the finish line — no plan after release.', body: 'No budget or team for updates, support or growth once the app is live.'},
    ],
  },

  services: {
    eyebrow: 'Our services',
    heading: 'Apps for every industry',
    intro: 'Purpose-built digital products that simplify operations, connect customers, and unlock new business opportunities.',
    items: [
      {icon: 'smartphone', title: 'Custom Mobile Apps', body: 'Native iOS and Android, or one cross-platform app with Flutter or React Native.'},
      {icon: 'pen', title: 'UI/UX & Product Design', body: 'Research-led journeys, prototypes and polished interfaces people enjoy using.'},
      {icon: 'brain', title: 'AI-Powered Apps & Agents', body: 'Assistants, smart search and agents that handle repetitive work.'},
      {icon: 'users', title: 'CRM & Enterprise Systems', body: 'AI-powered CRM, AMC management and internal tools in one connected platform.'},
      {icon: 'bag', title: 'E-commerce & Industry Apps', body: 'Real estate, healthcare, education, manufacturing and retail apps built to convert.'},
    ] as {icon: IconName; title: string; body: string}[],
  },

  work: {
    eyebrow: 'Our work',
    heading: 'Apps we’ve shipped',
    link: 'Discuss your project',
    note: 'Sample projects — replace with real case studies and measured results before launch.',
    /** Labels for the three facts under each project title. */
    labels: ['Platform', 'Industry', 'Highlight'],
    items: [
      {client: 'CLINIC GROUP', tag: '2025', title: 'Patient booking app for a clinic group', facts: ['iOS + Android', 'Healthcare', 'Self-serve booking']},
      {client: 'REAL ESTATE AGENCY', tag: '2025', title: 'Broker CRM for a real estate agency', facts: ['Cross-platform', 'Real estate', 'AI lead scoring']},
    ],
  },

  plan: {
    eyebrow: 'Our process',
    heading: ['From first conversation', 'to App Store launch'],
    note: 'Timelines are set after discovery — every project gets its own milestone plan.',
    markLabel: 'EC4YOU mark, {lit} of 20 parts lit — step {step} of 4',
    steps: [
      {name: 'Discover', body: 'We map your goals, users, requirements and technical feasibility, so the app solves the right problem.', chips: ['R&D'], caption: 'Understanding the problem'},
      {name: 'Design', body: 'User journeys, wireframes and interactive prototypes you can click through before we build.', chips: ['UI & UX'], caption: 'Shaping the experience'},
      {name: 'Build', body: 'Scalable architecture, mobile apps, backends and APIs, delivered in sprints with demos you can see.', chips: ['Architecture', 'Production'], caption: 'Your product takes shape'},
      {name: 'Launch & grow', body: 'Testing, app store submission, monitoring and ongoing improvements after release.', chips: ['Deployment', 'Testing & QA', 'Handover'], caption: 'Complete — and growing'},
    ],
  },

  reviews: {
    eyebrow: 'Testimonials',
    heading: 'Built on trust. Designed for impact.',
    note: 'Sample testimonials — replace with verified client reviews before launch.',
    stars: '{n} out of 5',
    /** Label for each dot under the carousel. */
    show: 'Show testimonial {n}',
    items: [
      {tag: 'Healthcare app', role: 'Operations Director', quote: '“Our patients book in seconds now, and the front desk finally has time to breathe.”', tint: ['#FF8A5C', '#FFB547'], stars: 5},
      {tag: 'Real estate app', role: 'Founder, Brokerage', quote: '“Buyers book viewings themselves now. Our brokers spend time closing, not scheduling.”', tint: ['#FBBF24', '#F97316'], stars: 5},
      {tag: 'AI CRM', role: 'Head of Sales', quote: '“The team adopted the CRM in a week because it actually fits how we sell.”', tint: ['#34D399', '#059669'], stars: 4},
    ] as {tag: string; role: string; quote: string; tint: [string, string]; stars: number}[],
  },

  compare: {
    eyebrow: 'The difference',
    heading: 'The difference is clear.',
    lead: 'What working with EC4YOU feels like, compared with a typical agency.',
    group: 'Compare',
    us: 'EC4YOU',
    them: 'Typical agency',
    rows: [
      ['Product-first: starts from your business goals and users', 'Builds the feature list as given'],
      ['Design, build, launch and support in one team', 'Hands you between separate vendors'],
      ['User-centred UI/UX, tested before we build', 'Design treated as decoration'],
      ['Architecture planned to grow with you', 'Rebuild when usage grows'],
      ['Milestones and demos you can see every sprint', 'Quiet until the deadline'],
      ['Quality checks and security review every sprint', 'Testing squeezed in at the end'],
      ['Support and new features after launch', 'Project ends at delivery'],
    ] as [string, string][],
  },

  tech: {
    eyebrow: 'Technologies',
    heading: 'Tech stack we use',
    body: 'Modern, proven tools chosen for performance, security and scale.',
    /** Category names for the stack groups, in the order used in Tech.tsx. */
    groups: ['Mobile apps', 'Web & frontend', 'Backend & APIs', 'Databases', 'Cloud & DevOps', 'AI & machine learning', 'Design & testing'],
    note: 'Logos are trademarks of their respective owners.',
  },

  engage: {
    eyebrow: 'How we work together',
    heading: 'Pick the engagement that fits',
    note: 'Every engagement starts with a discovery call — no obligation.',
    recommended: 'RECOMMENDED',
    plans: [
      {name: 'Fixed-scope project', tag: 'For a defined app or MVP', price: 'Project estimate', points: ['Discovery and milestone plan', 'Design, build and launch', 'App store submission', '30-day post-launch support'], cta: 'Get an estimate', featured: false},
      {name: 'Dedicated product team', tag: 'For products that keep evolving', price: 'Monthly engagement', points: ['Everything in fixed-scope', 'Designers + engineers on your roadmap', 'Sprint demos every two weeks', 'Scale up or down as needed'], cta: 'Talk to us', featured: true},
      {name: 'Support & growth', tag: 'For apps already live', price: 'Monthly plan', points: ['Monitoring and OS updates', 'Bug fixes and security patches', 'Small feature releases', 'Performance reports'], cta: 'Ask about support', featured: false},
    ],
  },

  faq: {
    eyebrow: 'FAQ',
    heading: 'Questions before we build?',
    askTitle: 'Still have a question?',
    askBody: 'Talk to our team directly — we’ll help you find the right approach.',
    items: [
      ['How much does it cost to develop a mobile app?', 'Cost depends on scope, platforms, integrations and design complexity. After a short discovery call, we share a transparent estimate broken into milestones, with no obligation.'],
      ['How long does custom app development take?', 'It depends on scope, platforms and integrations. After discovery, we share a milestone plan so you know exactly what to expect, and when.'],
      ['Do you build for both Android and iOS?', 'Yes — native apps for each platform, or one cross-platform app with Flutter or React Native when that suits your goals and budget better.'],
      ['Will I own the source code?', 'Ownership is set out in your contract. Our standard agreements hand over the source code and project assets on final payment.'],
      ['Do you provide maintenance and support?', 'Yes. Post-launch plans cover monitoring, OS updates, bug fixes and new features.'],
      ['Where is EC4YOU based?', 'Our team is in Chennai, India. We work with clients across India, the UAE, Canada and beyond, with calls scheduled in your time zone.'],
    ] as [string, string][],
  },

  contact: {
    kicker: 'START YOUR PROJECT',
    heading: 'Your next big app starts here.',
    body: 'Tell us what you’re building. We’ll help you explore the right approach for your next digital product.',
    location: 'Chennai, India · Serving the UAE, Canada & worldwide',
    formTitle: 'Tell us about your app',
    nameLabel: 'Full name *',
    namePlaceholder: 'Your full name',
    nameError: 'Enter your name',
    phoneLabel: 'Phone number *',
    codeLabel: 'Country code',
    phonePlaceholder: '98765 43210',
    phoneError: 'Enter a valid number',
    serviceLabel: 'What are you looking for?',
    servicePlaceholder: 'Select a service',
    industryLabel: 'Industry',
    industryPlaceholder: 'Select industry',
    descLabel: 'Project description',
    descPlaceholder: 'Tell us about your app idea, business challenge, or project requirements.',
    consent: 'I agree to be contacted about my enquiry and accept the {privacy}.',
    consentError: 'Please accept to continue',
    submit: 'Let’s Discuss Your App',
    sending: 'Sending…',
    done: 'Your mail app should be open with your enquiry drafted. If it isn’t, write to',
    failed: 'Sorry — we couldn’t send that. Please email {email} or {whatsapp}.',
    failedWa: 'message us on WhatsApp',
    /** Country-code options; the first is preselected. */
    codes: [['+91', 'India +91'], ['+971', 'UAE +971'], ['+1', 'Canada / USA +1'], ['+966', 'KSA +966'], ['+44', 'UK +44']] as [string, string][],
    /** Labels for the dropdowns; must match the order of SERVICES / INDUSTRIES in ./options. */
    services: SERVICES,
    industries: INDUSTRIES,
  },

  footer: {
    address: 'Chennai, Tamil Nadu, India',
    tagline: 'App-first digital product development for ambitious businesses.',
    navTitle: 'Navigation',
    companyTitle: 'Company',
    legalTitle: 'Legal',
    followTitle: 'Follow us',
    contactTitle: 'Contact',
    engagement: 'Engagement models',
    contactUs: 'Contact Us',
  },

  sticky: {primary: 'Let’s Talk'},

  thankYou: {
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
  },

  consent: {
    title: 'Cookies & tracking',
    body: 'We use cookies to measure how our ads and site perform. You can accept or reject non-essential cookies.',
    accept: 'Accept',
    reject: 'Reject',
  },
};

export type Dict = typeof en;
