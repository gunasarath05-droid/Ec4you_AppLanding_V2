'use client';
import {useI18n} from '@/i18n/I18nProvider';
import {useReveals} from '@/hooks/useReveals';

/**
 * The app-development stack, grouped. Order matches `tech.groups` in the
 * dictionaries. Product names stay in English in every language. Logos are the
 * colour SVGs from Devicon (MIT), stored in /public/tech as `<file>.svg`.
 */
const STACK: [string, string][][] = [
  // Mobile apps
  [['Flutter', 'flutter'], ['Dart', 'dart'], ['React Native', 'react-native'], ['Swift (iOS)', 'swift'], ['Kotlin (Android)', 'kotlin'], ['Android', 'android'], ['iOS', 'apple']],
  // Web & frontend
  [['React', 'react'], ['Next.js', 'nextjs'], ['TypeScript', 'typescript'], ['Tailwind CSS', 'tailwind']],
  // Backend & APIs
  [['Node.js', 'nodejs'], ['Express', 'express'], ['NestJS', 'nestjs'], ['Python', 'python'], ['Laravel', 'laravel'], ['GraphQL', 'graphql']],
  // Databases
  [['Firebase', 'firebase'], ['MongoDB', 'mongodb'], ['PostgreSQL', 'postgresql'], ['MySQL', 'mysql'], ['Redis', 'redis']],
  // Cloud & DevOps
  [['AWS', 'aws'], ['Google Cloud', 'gcp'], ['Docker', 'docker'], ['GitHub', 'github']],
  // AI & machine learning
  [['TensorFlow', 'tensorflow'], ['PyTorch', 'pytorch'], ['Python', 'python']],
  // Design & testing
  [['Figma', 'figma'], ['Jest', 'jest'], ['Postman', 'postman']],
];

export function Tech() {
  const ref = useReveals<HTMLElement>();
  const t = useI18n().t.tech;
  return (
    <section id="technology" ref={ref} className="sec sec--alt" aria-labelledby="tech-title">
      <div className="wrap">
        <div className="head" data-reveal>
          <div><span className="eyebrow">{t.eyebrow}</span><h2 className="h2" id="tech-title">{t.heading}</h2></div>
          <p className="lead">{t.body}</p>
        </div>
        <div className="stack">
          {STACK.map((items, g) => (
            <div key={g} className="stack__row" data-reveal style={{transitionDelay: `${g * 50}ms`}}>
              <h3 className="stack__name"><span>{String(g + 1).padStart(2, '0')}</span>{t.groups[g]}</h3>
              <ul className="stack__items">
                {items.map(([name, file]) => (
                  <li key={name} className="stack__item">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/tech/${file}.svg`} alt="" width={30} height={30} loading="lazy" decoding="async" />
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="note">{t.note}</p>
      </div>
    </section>
  );
}
