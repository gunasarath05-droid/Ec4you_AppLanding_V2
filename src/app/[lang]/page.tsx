import {Motion} from '@/components/Motion';
import {ScrollEngine} from '@/components/ScrollEngine';
import {ScrollProgress} from '@/components/ScrollProgress';
import {StickyCta} from '@/components/StickyCta';
import {Approach} from '@/components/site/Approach';
import {Contact} from '@/components/site/Contact';
import {Difference} from '@/components/site/Difference';
import {Engagement} from '@/components/site/Engagement';
import {Faq} from '@/components/site/Faq';
import {Hero} from '@/components/site/Hero';
import {Nav} from '@/components/site/Nav';
import {Problems} from '@/components/site/Problems';
import {Services} from '@/components/site/Services';
import {Tech} from '@/components/site/Tech';
import {Testimonials} from '@/components/site/Testimonials';
import {Work} from '@/components/site/Work';
import {getDict, type Locale} from '@/i18n';

export default async function Page({params}: {params: Promise<{lang: string}>}) {
  const t = getDict((await params).lang as Locale);
  return (
    <>
      <ScrollEngine />
      <Motion />
      <ScrollProgress />
      <a className="sr-only" href="#contact">{t.common.skip}</a>
      <Nav />
      <main>
        <Hero />
        <Problems />
        <Services />
        <Work />
        <Approach />
        <Testimonials />
        <Difference />
        <Tech />
        <Engagement />
        <Faq />
        <Contact />
      </main>
      <StickyCta />
    </>
  );
}
