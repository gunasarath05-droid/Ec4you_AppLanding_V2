import type {Metadata} from 'next';
import {brand, thankYou} from '@/content';
import {Icon} from '@/components/Icon';
import {SubPage} from '@/components/SubPage';
import {ThankYouTracker} from '@/components/ThankYouTracker';
import {whatsappUrl} from '@/lib/attribution';

export const metadata: Metadata = {
  title: 'Thank you — EC4YOU',
  // Conversion page: keep it out of search results and away from organic visits.
  robots: {index: false, follow: false},
};

export default function ThankYou() {
  return (
    <SubPage>
      <ThankYouTracker />
      <div className="ty">
        <span className="ty__ok"><Icon name="check" size={28} /></span>
        <p className="eyebrow">{thankYou.eyebrow}</p>
        <h1>{thankYou.heading}</h1>
        <p className="ty__body">{thankYou.body}</p>
        <ol className="ty__steps">
          {thankYou.steps.map(([t, d], i) => (
            <li key={t}><span>{i + 1}</span><div><b>{t}</b><p>{d}</p></div></li>
          ))}
        </ol>
        <div className="ty__acts">
          <a className="btn btn--outline" href={whatsappUrl(brand.whatsapp, brand.whatsappText)} target="_blank" rel="noopener">{thankYou.whatsapp}</a>
          <a className="btn btn--primary" href="/">{thankYou.back}</a>
        </div>
      </div>
    </SubPage>
  );
}
