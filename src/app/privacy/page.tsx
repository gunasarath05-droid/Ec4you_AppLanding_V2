import type {Metadata} from 'next';
import {brand} from '@/content';
import {SubPage} from '@/components/SubPage';

export const metadata: Metadata = {title: 'Privacy Policy — EC4YOU'};

// TEMPLATE: written to match what this site actually collects. Have it reviewed
// by a qualified legal professional for your entity and markets before launch,
// then remove the draft notice and set the date.
const UPDATED = '[date]';

export default function Privacy() {
  return (
    <SubPage>
      <article className="legal">
        <p className="draft-note" role="note">Draft template — to be reviewed by a legal professional before publishing.</p>
        <h1>Privacy Policy</h1>
        <p className="legal__meta">Last updated: {UPDATED}</p>

        <h2>Who we are</h2>
        <p>This website is operated by {brand.legalName}, {brand.address} (“EC4YOU”, “we”, “us”). For any privacy question, contact <a href={`mailto:${brand.email}`}>{brand.email}</a>.</p>

        <h2>What we collect</h2>
        <ul>
          <li><b>Details you send us</b> through the enquiry form: your name, phone number, the service and industry you choose, and your project description.</li>
          <li><b>How you found us:</b> campaign tags in the link you followed (such as UTM parameters) and ad click identifiers (such as Google’s gclid or Meta’s fbclid), the page you landed on and the referring site. We store these with your enquiry so we know which campaigns work.</li>
          <li><b>Usage data via cookies and similar technologies</b>, only where you have accepted them (see “Cookies and tracking”).</li>
        </ul>

        <h2>How we use it</h2>
        <ul>
          <li>To respond to your enquiry, arrange a discovery call and prepare a proposal.</li>
          <li>To understand and improve how our website and advertising perform.</li>
          <li>To meet legal, accounting or security obligations.</li>
        </ul>
        <p>We do not sell your personal information.</p>

        <h2>Cookies and tracking</h2>
        <p>With your consent, we use Google Tag Manager and Google Analytics, the Google Ads, Meta (Facebook/Instagram) and LinkedIn conversion tags to measure visits and enquiries from our ads. If you reject non-essential cookies, these advertising and analytics tags do not set cookies. You can change your choice at any time through “Cookie Settings” at the bottom of any page.</p>

        <h2>Who we share it with</h2>
        <p>Service providers who help us run this website and handle enquiries (for example our hosting provider, email or CRM provider), and — only if you accept cookies — the advertising and analytics providers named above. Each acts under its own terms and privacy commitments. We may also disclose information where required by law.</p>

        <h2>International transfers</h2>
        <p>Our providers may process data outside your country. Where that happens, we rely on the safeguards those providers offer.</p>

        <h2>How long we keep it</h2>
        <p>Enquiries are kept for as long as needed to respond and follow up, and for up to [retention period] afterwards unless you ask us to delete them sooner or we must keep them longer by law.</p>

        <h2>Your rights</h2>
        <p>Depending on where you live (for example under the UAE Personal Data Protection Law, Canada’s PIPEDA, or the EU/UK GDPR), you may have the right to access, correct or delete your personal information, to object to or restrict certain uses, and to withdraw consent. To make a request, email <a href={`mailto:${brand.email}`}>{brand.email}</a>. You may also complain to your local data-protection authority.</p>

        <h2>Children</h2>
        <p>This website is intended for businesses and is not directed at children.</p>

        <h2>Changes</h2>
        <p>We may update this policy. The “Last updated” date above shows the latest version.</p>
      </article>
    </SubPage>
  );
}
