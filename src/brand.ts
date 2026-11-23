/**
 * Facts that are the same in every language: contact details, social links
 * and client logos. Taken from the main site, www.ec4you.in.
 * Words on the page live in src/i18n/<locale>.ts.
 */

export const brand = {
  name: 'EC4YOU',
  email: 'info@ec4you.in',
  /** Display form; `tel` is the dialable form. */
  phone: '+91 70109 42474',
  tel: '+917010942474',
  /** WhatsApp number in international format, digits only. Same line as the phone. */
  whatsapp: '917010942474',
  city: 'Chennai',
  /** Shown on the legal pages. Replace with the registered entity name and full address before launch. */
  legalName: 'EC4YOU Digital Marketing',
  address: 'Chennai, Tamil Nadu, India',
  /** Google Maps search for the listing embedded on www.ec4you.in. */
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=EC4you%20Digital%20marketing%20Chennai',
  social: [
    {name: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/company/ec4you-digital-marketing/'},
    {name: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/ec4you_digital/'},
    {name: 'Facebook', icon: 'facebook', href: 'https://www.facebook.com/profile.php?id=61583296400117'},
    {name: 'X', icon: 'x', href: 'https://x.com/ec4you43786'},
  ] as const,
};

/**
 * Client logos from www.ec4you.in, trimmed and resized into /public/clients.
 * [file, name, width, height] — dimensions are the WebP's, for layout without shift.
 */
export const clients: [string, string, number, number][] = [
  ['client-01', 'TexValley', 360, 73],
  ['client-04', 'Blackboxes', 360, 88],
  ['client-02', 'MV Associates', 264, 120],
  ['client-05', 'EcoKlien', 269, 120],
  ['client-06', 'GOGOCamping', 360, 77],
  ['client-07', 'Thidal Build Foundations', 120, 120],
  ['client-08', 'KT Decolor', 300, 101],
  ['client-17', 'Relux Electric', 270, 120],
  ['client-09', 'Netaji Vidhyalayam', 120, 120],
  ['client-10', 'Abikiran Adds', 227, 120],
  ['client-20', 'SGV Associates', 360, 84],
  ['client-11', 'EC4RAS', 91, 120],
  ['client-12', 'RT Eco', 235, 120],
  ['client-13', 'Unison', 96, 120],
  ['client-14', 'Babee World', 300, 44],
  ['client-18', 'RT Pure', 268, 120],
  ['client-15', 'G2', 249, 120],
  ['client-16', 'Promise', 94, 120],
  ['client-19', 'Sakyaa', 300, 91],
  ['client-03', 'Arun', 120, 120],
  ['client-21', 'SVJ', 172, 120],
  ['client-22', 'The Detailing Mafia', 300, 93],
  ['client-23', 'Upscalenet', 202, 120],
  ['client-24', 'SK Residency', 142, 120],
  ['client-25', 'Vishaka Constructions', 297, 34],
  ['client-26', 'Kanna Land Promoters', 241, 78],
  ['client-27', 'FlowKlien', 300, 116],
];
