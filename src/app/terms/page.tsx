import type {Metadata} from 'next';
import {brand} from '@/content';
import {SubPage} from '@/components/SubPage';

export const metadata: Metadata = {title: 'Terms of Service — EC4YOU'};

// TEMPLATE: have it reviewed by a qualified legal professional before launch.
const UPDATED = '[date]';

export default function Terms() {
  return (
    <SubPage>
      <article className="legal">
        <p className="draft-note" role="note">Draft template — to be reviewed by a legal professional before publishing.</p>
        <h1>Terms of Service</h1>
        <p className="legal__meta">Last updated: {UPDATED}</p>

        <h2>About these terms</h2>
        <p>These terms apply to your use of this website, operated by {brand.legalName}. By using the site you agree to them.</p>

        <h2>Information on this site</h2>
        <p>Content on this site describes our services in general terms. Project scope, timelines, pricing and deliverables are agreed only in a separate written proposal or contract. Product interfaces, sample projects and testimonials marked as samples are illustrative.</p>

        <h2>Enquiries</h2>
        <p>Sending an enquiry does not create a contract or an obligation for either party. We handle your details as described in our <a href="/privacy">Privacy Policy</a>.</p>

        <h2>Intellectual property</h2>
        <p>The EC4YOU name, logo, design and content of this site belong to us or our licensors. You may not copy or reuse them without permission.</p>

        <h2>Links to other sites</h2>
        <p>We are not responsible for the content or practices of websites we link to, including messaging services such as WhatsApp.</p>

        <h2>Liability</h2>
        <p>The site is provided “as is”. To the extent permitted by law, we are not liable for losses arising from its use or from reliance on its general content.</p>

        <h2>Governing law</h2>
        <p>These terms are governed by the laws of [jurisdiction].</p>

        <h2>Contact</h2>
        <p><a href={`mailto:${brand.email}`}>{brand.email}</a></p>
      </article>
    </SubPage>
  );
}
