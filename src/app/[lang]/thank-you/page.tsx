import type {Metadata} from 'next';
import {brand} from '@/brand';
import {Icon} from '@/components/Icon';
import {SubPage} from '@/components/SubPage';
import {ThankYouTracker} from '@/components/ThankYouTracker';
import {getDict, href, type Locale} from '@/i18n';
import {whatsappUrl} from '@/lib/attribution';

type Props = {params: Promise<{lang: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const t = getDict((await params).lang as Locale);
  return {
    title: t.meta.thankYouTitle,
    // Conversion page: keep it out of search results and away from organic visits.
    robots: {index: false, follow: false},
  };
}

export default async function ThankYou({params}: Props) {
  const lang = (await params).lang as Locale;
  const t = getDict(lang);
  const ty = t.thankYou;
  return (
    <SubPage>
      <ThankYouTracker />
      <div className="ty">
        <span className="ty__ok"><Icon name="check" size={28} /></span>
        <p className="eyebrow">{ty.eyebrow}</p>
        <h1>{ty.heading}</h1>
        <p className="ty__body">{ty.body}</p>
        <ol className="ty__steps">
          {ty.steps.map(([title, d], i) => (
            <li key={title}><span>{i + 1}</span><div><b>{title}</b><p>{d}</p></div></li>
          ))}
        </ol>
        <div className="ty__acts">
          <a className="btn btn--outline" href={whatsappUrl(brand.whatsapp, t.common.whatsappText)} target="_blank" rel="noopener">{ty.whatsapp}</a>
          <a className="btn btn--primary" href={href(lang)}>{ty.back}</a>
        </div>
      </div>
    </SubPage>
  );
}
