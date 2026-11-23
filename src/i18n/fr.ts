/**
 * French copy (Canadian French). Mirrors ./en.ts.
 * Have a native speaker review it before launch.
 */
import type {Dict} from './en';

export const fr: Dict = {
  meta: {
    title: 'EC4YOU — Des applications qui font avancer les entreprises',
    description: 'Entreprise de développement d’applications basée à Chennai, en Inde. Applications mobiles sur mesure, solutions propulsées par l’IA et ingénierie de produits numériques pour les entreprises au Canada, en Inde, aux Émirats et partout dans le monde.',
    ogTitle: 'EC4YOU — Développement d’applications mobiles sur mesure',
    ogDescription: 'Des idées audacieuses de jeunes pousses aux produits numériques prêts pour l’entreprise.',
    thankYouTitle: 'Merci — EC4YOU',
  },

  common: {
    skip: 'Aller au formulaire de contact',
    home: 'Accueil EC4YOU',
    homeShort: 'Accueil',
    mainNav: 'Navigation principale',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    menu: 'Menu',
    language: 'Langue',
    letsTalk: 'Parlons-en',
    startProject: 'Lancer votre projet d’application',
    whatsapp: 'WhatsApp',
    whatsappAria: 'Écrire sur WhatsApp (ouvre WhatsApp)',
    whatsappText: 'Bonjour EC4YOU, j’aimerais discuter d’un projet d’application.',
    privacy: 'Politique de confidentialité',
    terms: 'Conditions d’utilisation',
    cookies: 'Paramètres des témoins',
    legal: 'Mentions légales',
    rights: 'Tous droits réservés.',
  },

  nav: [
    {label: 'Services', href: '#build'},
    {label: 'Réalisations', href: '#work'},
    {label: 'Processus', href: '#process'},
    {label: 'Collaboration', href: '#engage'},
    {label: 'FAQ', href: '#faq'},
  ],

  hero: {
    titleA: 'Des applications qui',
    titleAccent: 'font avancer',
    titleB: 'les entreprises.',
    body: 'Des idées audacieuses de jeunes pousses aux produits numériques prêts pour l’entreprise, nous concevons et développons des applications mobiles performantes qui aident les entreprises à se lancer, à croître et à se démarquer.',
    primary: 'Lancer votre projet',
    secondary: 'Voir nos réalisations',
    /** Small dark card at the top right of the hero; links to Our work. */
    reel: {label: '/ DERNIER LANCEMENT', title: 'Votre application est en ligne.', meta: 'iOS · Android · Prête pour les magasins', cta: 'Voir nos réalisations'},
  },

  trust: {
    label: 'DES MARQUES EN CROISSANCE NOUS FONT CONFIANCE',
    aria: 'Nos clients',
  },

  problems: {
    eyebrow: 'Le problème',
    /** Huge heading that stays pinned on the left; one line per entry. */
    big: ['Pourquoi', 'les applis', 'bloquent?'],
    heading: 'La plupart des projets d’application bloquent pour les quatre mêmes raisons.',
    intro: 'Notre processus est conçu pour corriger exactement ces problèmes, afin que votre application règle le bon problème dès son lancement et continue de croître ensuite.',
    link: 'Découvrir notre méthode',
    items: [
      {title: 'Les idées se perdent entre les équipes d’affaires et techniques.', body: 'Les exigences changent de mains si souvent que l’application finit par régler le mauvais problème.'},
      {title: 'Les utilisateurs essaient l’application une fois, puis la suppriment.', body: 'Des parcours confus et des écrans lents anéantissent des mois de travail en quelques secondes.'},
      {title: 'Votre application, votre CRM et vos opérations ne communiquent pas.', body: 'Les équipes ressaisissent les mêmes données dans des systèmes séparés.'},
      {title: 'Le lancement devient la ligne d’arrivée — aucun plan pour la suite.', body: 'Ni budget ni équipe pour les mises à jour, le soutien ou la croissance une fois l’application en ligne.'},
    ],
  },

  services: {
    eyebrow: 'Nos services',
    heading: 'Des applications pour chaque secteur',
    intro: 'Des produits numériques conçus sur mesure pour simplifier vos opérations, rejoindre vos clients et ouvrir de nouvelles occasions d’affaires.',
    items: [
      {icon: 'smartphone', title: 'Applications mobiles sur mesure', body: 'Applications natives iOS et Android, ou une seule application multiplateforme avec Flutter ou React Native.'},
      {icon: 'pen', title: 'Design UI/UX et produit', body: 'Parcours fondés sur la recherche, prototypes et interfaces soignées que les gens aiment utiliser.'},
      {icon: 'brain', title: 'Applications et agents IA', body: 'Assistants, recherche intelligente et agents qui prennent en charge les tâches répétitives.'},
      {icon: 'users', title: 'CRM et systèmes d’entreprise', body: 'CRM propulsé par l’IA, gestion des contrats d’entretien et outils internes réunis sur une seule plateforme.'},
      {icon: 'bag', title: 'Commerce en ligne et applications sectorielles', body: 'Applications pour l’immobilier, la santé, l’éducation, la fabrication et le commerce de détail, conçues pour convertir.'},
    ],
  },

  work: {
    eyebrow: 'Nos réalisations',
    heading: 'Des applications que nous avons livrées',
    link: 'Parlez-nous de votre projet',
    note: 'Projets d’exemple — à remplacer par de vraies études de cas et des résultats mesurés avant le lancement.',
    /** Labels for the three facts under each project title. */
    labels: ['Plateforme', 'Secteur', 'Point fort'],
    items: [
      {client: 'GROUPE DE CLINIQUES', tag: '2025', title: 'Application de prise de rendez-vous pour un groupe de cliniques', facts: ['iOS + Android', 'Santé', 'Réservation autonome']},
      {client: 'AGENCE IMMOBILIÈRE', tag: '2025', title: 'CRM pour les courtiers d’une agence immobilière', facts: ['Multiplateforme', 'Immobilier', 'Qualification des prospects par IA']},
    ],
  },

  plan: {
    eyebrow: 'Notre processus',
    heading: ['De la première conversation', 'au lancement sur l’App Store'],
    note: 'Les échéanciers sont établis après la découverte : chaque projet reçoit son propre plan d’étapes.',
    markLabel: 'Logo EC4YOU, {lit} parties sur 20 allumées — étape {step} sur 4',
    steps: [
      {name: 'Découverte', body: 'Nous cernons vos objectifs, vos utilisateurs, vos exigences et la faisabilité technique, pour que l’application règle le bon problème.', chips: ['R et D'], caption: 'Comprendre le problème'},
      {name: 'Conception', body: 'Parcours utilisateurs, maquettes fonctionnelles et prototypes interactifs à essayer avant le développement.', chips: ['UI et UX'], caption: 'Façonner l’expérience'},
      {name: 'Développement', body: 'Architecture évolutive, applications mobiles, serveurs et API, livrés par sprints avec des démos concrètes.', chips: ['Architecture', 'Production'], caption: 'Votre produit prend forme'},
      {name: 'Lancement et croissance', body: 'Tests, soumission aux magasins d’applications, surveillance et améliorations continues après le lancement.', chips: ['Déploiement', 'Tests et AQ', 'Transfert'], caption: 'Terminé — et en croissance'},
    ],
  },

  reviews: {
    eyebrow: 'Témoignages',
    heading: 'Bâti sur la confiance. Conçu pour l’impact.',
    note: 'Témoignages d’exemple — à remplacer par des avis clients vérifiés avant le lancement.',
    stars: '{n} sur 5',
    /** Label for each dot under the carousel. */
    show: 'Afficher le témoignage {n}',
    items: [
      {tag: 'Application santé', role: 'Directrice des opérations', quote: '« Nos patients prennent rendez-vous en quelques secondes, et l’accueil a enfin le temps de souffler. »', tint: ['#FF8A5C', '#FFB547'], stars: 5},
      {tag: 'Application immobilière', role: 'Fondateur, agence de courtage', quote: '« Les acheteurs réservent eux-mêmes leurs visites. Nos courtiers concluent des ventes au lieu de gérer des horaires. »', tint: ['#FBBF24', '#F97316'], stars: 5},
      {tag: 'CRM avec IA', role: 'Directeur des ventes', quote: '« L’équipe a adopté le CRM en une semaine, parce qu’il colle vraiment à notre façon de vendre. »', tint: ['#34D399', '#059669'], stars: 4},
    ],
  },

  compare: {
    eyebrow: 'La différence',
    heading: 'La différence est claire.',
    lead: 'Travailler avec EC4YOU, comparé à une agence typique.',
    group: 'Comparer',
    us: 'EC4YOU',
    them: 'Agence typique',
    rows: [
      ['Le produit d’abord : on part de vos objectifs et de vos utilisateurs', 'Livre la liste de fonctionnalités telle quelle'],
      ['Conception, développement, lancement et soutien dans une seule équipe', 'Vous renvoie d’un fournisseur à l’autre'],
      ['UI/UX centrée sur l’utilisateur, testée avant le développement', 'Le design vu comme de la décoration'],
      ['Une architecture prévue pour grandir avec vous', 'Tout refaire quand l’usage augmente'],
      ['Des étapes et des démos visibles à chaque sprint', 'Silence jusqu’à l’échéance'],
      ['Contrôles qualité et revue de sécurité à chaque sprint', 'Tests bâclés à la fin'],
      ['Soutien et nouvelles fonctionnalités après le lancement', 'Le projet s’arrête à la livraison'],
    ],
  },

  tech: {
    eyebrow: 'Technologies',
    heading: 'Nos technologies',
    body: 'Des outils modernes et éprouvés, choisis pour la performance, la sécurité et l’évolutivité.',
    /** Category names for the stack groups, in the order used in Tech.tsx. */
    groups: ['Applications mobiles', 'Web et interfaces', 'Serveurs et API', 'Bases de données', 'Infonuagique et DevOps', 'IA et apprentissage automatique', 'Design et tests'],
    note: 'Les logos sont des marques de commerce de leurs propriétaires respectifs.',
  },

  engage: {
    eyebrow: 'Comment travailler ensemble',
    heading: 'Choisissez la formule qui vous convient',
    note: 'Chaque collaboration commence par un appel découverte, sans engagement.',
    recommended: 'RECOMMANDÉ',
    plans: [
      {name: 'Projet à portée fixe', tag: 'Pour une application ou un MVP bien défini', price: 'Estimation de projet', points: ['Découverte et plan d’étapes', 'Conception, développement et lancement', 'Soumission aux magasins d’applications', 'Soutien de 30 jours après le lancement'], cta: 'Obtenir une estimation', featured: false},
      {name: 'Équipe produit dédiée', tag: 'Pour les produits en évolution constante', price: 'Mandat mensuel', points: ['Tout ce qu’inclut la portée fixe', 'Designers et développeurs sur votre feuille de route', 'Démos de sprint aux deux semaines', 'Équipe ajustable selon vos besoins'], cta: 'Discutons-en', featured: true},
      {name: 'Soutien et croissance', tag: 'Pour les applications déjà en ligne', price: 'Forfait mensuel', points: ['Surveillance et mises à jour des systèmes', 'Corrections de bogues et de sécurité', 'Petites nouveautés régulières', 'Rapports de performance'], cta: 'Se renseigner sur le soutien', featured: false},
    ],
  },

  faq: {
    eyebrow: 'FAQ',
    heading: 'Des questions avant de commencer?',
    askTitle: 'Vous avez encore une question?',
    askBody: 'Parlez directement à notre équipe — nous vous aiderons à trouver la bonne approche.',
    items: [
      ['Combien coûte le développement d’une application mobile?', 'Le coût dépend de la portée, des plateformes, des intégrations et de la complexité du design. Après un court appel découverte, nous vous remettons une estimation transparente, découpée en étapes, sans engagement.'],
      ['Combien de temps prend le développement d’une application sur mesure?', 'Cela dépend de la portée, des plateformes et des intégrations. Après la découverte, nous vous remettons un plan d’étapes pour que vous sachiez exactement à quoi vous attendre, et quand.'],
      ['Développez-vous pour Android et iOS?', 'Oui — des applications natives pour chaque plateforme, ou une seule application multiplateforme avec Flutter ou React Native lorsque cela convient mieux à vos objectifs et à votre budget.'],
      ['Serai-je propriétaire du code source?', 'La propriété est précisée dans votre contrat. Nos ententes standard prévoient la remise du code source et des actifs du projet au paiement final.'],
      ['Offrez-vous l’entretien et le soutien?', 'Oui. Nos forfaits après lancement couvrent la surveillance, les mises à jour des systèmes, les corrections de bogues et les nouvelles fonctionnalités.'],
      ['Où est située EC4YOU?', 'Notre équipe est à Chennai, en Inde. Nous travaillons avec des clients au Canada, en Inde, aux Émirats et ailleurs, avec des appels planifiés selon votre fuseau horaire.'],
    ],
  },

  contact: {
    kicker: 'LANCEZ VOTRE PROJET',
    heading: 'Votre prochaine grande application commence ici.',
    body: 'Dites-nous ce que vous bâtissez. Nous vous aiderons à trouver la bonne approche pour votre prochain produit numérique.',
    location: 'Chennai, Inde · Au service du Canada, des Émirats et du monde entier',
    formTitle: 'Parlez-nous de votre application',
    nameLabel: 'Nom complet *',
    namePlaceholder: 'Votre nom complet',
    nameError: 'Entrez votre nom',
    phoneLabel: 'Numéro de téléphone *',
    codeLabel: 'Indicatif du pays',
    phonePlaceholder: '514 555 0123',
    phoneError: 'Entrez un numéro valide',
    serviceLabel: 'Que recherchez-vous?',
    servicePlaceholder: 'Choisissez un service',
    industryLabel: 'Secteur',
    industryPlaceholder: 'Choisissez un secteur',
    descLabel: 'Description du projet',
    descPlaceholder: 'Parlez-nous de votre idée d’application, de votre défi d’affaires ou des exigences de votre projet.',
    consent: 'J’accepte d’être contacté au sujet de ma demande et j’accepte la {privacy}.',
    consentError: 'Veuillez accepter pour continuer',
    submit: 'Discutons de votre application',
    sending: 'Envoi en cours…',
    done: 'Votre application de courriel devrait être ouverte avec votre demande prête à envoyer. Sinon, écrivez à',
    failed: 'Désolé — l’envoi a échoué. Écrivez-nous à {email} ou {whatsapp}.',
    failedWa: 'sur WhatsApp',
    codes: [['+1', 'Canada / É.-U. +1'], ['+91', 'Inde +91'], ['+971', 'Émirats +971'], ['+966', 'Arabie saoudite +966'], ['+44', 'Royaume-Uni +44']],
    services: ['Développement d’applications Android', 'Développement d’applications iOS', 'Développement multiplateforme', 'Application mobile sur mesure', 'Application propulsée par l’IA', 'Application CRM / d’entreprise', 'Application de commerce en ligne', 'Modernisation d’une application existante', 'Autre'],
    industries: ['Immobilier', 'Fabrication', 'Éducation', 'Santé', 'Commerce en ligne / détail', 'Services professionnels', 'Technologie / SaaS', 'Logistique', 'Autre'],
  },

  footer: {
    address: 'Chennai, Tamil Nadu, Inde',
    tagline: 'Développement de produits numériques axé sur les applications, pour les entreprises ambitieuses.',
    navTitle: 'Navigation',
    companyTitle: 'Entreprise',
    legalTitle: 'Mentions légales',
    followTitle: 'Suivez-nous',
    contactTitle: 'Contact',
    engagement: 'Formules de collaboration',
    contactUs: 'Nous joindre',
  },

  sticky: {primary: 'Parlons-en'},

  thankYou: {
    eyebrow: 'Demande reçue',
    heading: 'Merci — nous avons bien reçu les détails de votre projet.',
    body: 'Notre équipe examinera votre demande et vous reviendra pour planifier un appel découverte.',
    steps: [
      ['Nous examinons votre demande', 'Objectifs, plateformes, intégrations et portée.'],
      ['Appel découverte', 'Un court appel pour comprendre votre entreprise et vos utilisateurs.'],
      ['Proposition et estimation', 'Un plan sur mesure avec étapes et estimation.'],
    ],
    whatsapp: 'Vous préférez WhatsApp? Écrivez-nous',
    back: 'Retour à l’accueil',
  },

  consent: {
    title: 'Témoins et suivi',
    body: 'Nous utilisons des témoins (cookies) pour mesurer la performance de nos publicités et de notre site. Vous pouvez accepter ou refuser les témoins non essentiels.',
    accept: 'Accepter',
    reject: 'Refuser',
  },
};
