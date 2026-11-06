// Per-domain branding for the shared order confirmation email service.
// Add one entry per frontend domain. Every field is required except `replyTo`
// and `supportEmail`, which fall back to `from` when omitted.

// change brand-config.js's from for Vora to the authenticated Gmail account

const BRANDS = {
  'zyrahealthcare.com': {
    name: 'Zyra Healthcare',
    from: 'orders@zyrahealthcare.com',
    fromName: 'Zyra Healthcare',
    logo: '',
    website: 'https://zyrahealthcare.com',
    primaryColor: '#2563eb',
    supportEmail: 'support@zyrahealthcare.com',
  },
  'vyralabs.co': {
    name: 'Vyra Labs',
    from: 'orders@vyralabs.co',
    fromName: 'Vyra Labs',
    logo: '',
    website: 'https://vyralabs.co',
    primaryColor: '#7c3aed',
    supportEmail: 'support@vyralabs.co',
  },
  'luxenlabs.shop': {
    name: 'Luxen',
    from: 'orders@luxenlabs.shop',
    fromName: 'Luxen',
    logo: '',
    website: 'https://luxenlabs.shop',
    primaryColor: '#111827',
    supportEmail: 'support@luxenlabs.shop',
  },
  'noverafitness.com': {
    name: 'Novera',
    from: 'orders@noverafitness.com',
    fromName: 'Novera',
    logo: '',
    website: 'https://noverafitness.com',
    primaryColor: '#0f766e',
    supportEmail: 'support@noverafitness.com',
  },
  'lumivexlabs.co': {
    name: 'Lumivex Labs',
    from: 'orders@lumivexlabs.co',
    fromName: 'Lumivex Labs',
    logo: '',
    website: '',
    primaryColor: '#2563eb',
    supportEmail: 'support@lumivexlabs.co',
  },
  'peptiqlabs.io': {
    name: 'Peptiq',
    from: 'orders@peptiqlabs.io',
    fromName: 'Peptiq',
    logo: '',
    website: 'https://peptiqlabs.io',
    primaryColor: '#be123c',
    supportEmail: 'support@peptiqlabs.io',
  },
  'vorahealthcare.com': {
    name: 'Vora Healthcare',
    from: 'orders@vorahealthcare.com',
    fromName: 'Vora Healthcare',
    logo: '',
    website: 'https://vorahealthcare.com',
    primaryColor: '#0f766e',
    supportEmail: 'support@vorahealthcare.com',
  },
  'jupyterlabs.net': {
    name: 'Jupyter Labs',
    from: 'orders@jupyterlabs.net',
    fromName: 'Jupyter Labs',
    logo: '',
    website: 'https://jupyterlabs.net',
    primaryColor: '#0f766e',
    supportEmail: 'support@jupyterlabs.net',
  },
    'liorahealthcare.com': {
    name: 'Liora healthcare',
    from: 'orders@liorahealthcare.com',
    fromName: 'Liora Healthcare',
    logo: '',
    website: 'https://liorahealthcare.com',
    primaryColor: '#080808',
    supportEmail: 'support@liorahealthcare.com',
  },
  'voralabs.com': {
    name: 'Vora Labs',
    from: 'orders@voralabs.com',
    fromName: 'Vora Labs',
    logo: '',
    website: 'https://voralabs.com',
    primaryColor: '#043460',
    supportEmail: 'research@voralabs.com',
  },
  // Local dev only. Whichever site a developer runs on localhost gets this
  // entry. It must NEVER reuse a real brand's identity (name/from/website):
  // if a production reverse proxy ever fails to forward the true Host header
  // (e.g. missing `proxy_set_header Host $host;`), Next.js sees `Host:
  // localhost` and this entry is what a real customer's order email would be
  // branded with. A previous version of this entry pointed at Novera's real
  // identity, so a misconfigured luxen vhost silently sent luxen customers
  // Novera-branded confirmation emails instead of failing loudly like every
  // other unmatched domain does (see getBrandConfig below).
  'localhost': {
    name: 'Local Dev (unbranded)',
    from: 'orders@localhost.invalid',
    fromName: 'Local Dev (unbranded)',
    logo: '',
    website: '',
    primaryColor: '#0f766e',
    supportEmail: 'orders@localhost.invalid',
  },
};

/**
 * Strips protocol, "www.", port and path from a raw host string so lookups
 * are consistent regardless of how the domain was captured on the frontend
 * (e.g. `request.headers.host` includes the port in local/dev environments).
 */
function normalizeDomain(rawDomain) {
  if (!rawDomain || typeof rawDomain !== 'string') return '';
  return rawDomain
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .split('/')[0]
    .split(':')[0];
}

/**
 * Resolves the brand configuration for a given domain.
 * Throws instead of silently falling back, so a missing/misspelled brand
 * entry surfaces as a loud failure rather than sending mis-branded email.
 */
function getBrandConfig(rawDomain) {
  const domain = normalizeDomain(rawDomain);

  if (!domain) {
    throw new Error('sendOrderConfirmationEmail: "domain" is required.');
  }

  const brand = BRANDS[domain];
  if (!brand) {
    throw new Error(`sendOrderConfirmationEmail: no brand config found for domain "${domain}".`);
  }

  return {
    ...brand,
    domain,
    replyTo: brand.replyTo || brand.from,
    supportEmail: brand.supportEmail || brand.from,
  };
}

export { BRANDS, normalizeDomain, getBrandConfig };
