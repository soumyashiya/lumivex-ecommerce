// Returns local image paths as-is; builds an Unsplash URL only for bare IDs.
export const img = (src: string, w = 1600) =>
  src.startsWith('/') || src.startsWith('http')
    ? src
    : `https://images.unsplash.com/photo-${src}?q=80&w=${w}&auto=format&fit=crop`;

export const IMAGES = {
  hero: '/images/hero-seo-new.webp',
  collage1: '/images/inhouse-image1-seo.webp',
  collage2: '/images/inhouse-image2-seo.webp',
  collage3: '/images/inhouse-img3-seo.webp',
  collage4: '/images/inhouse-img4-seo.webp',
  aboutPortrait: '/images/about-seo.webp',
  aboutSecondary: '/images/inhouse-image2-seo.webp',
  whyus: '/images/whyus11-seo.webp',
  contact: '/images/hero-seo-new.webp',
  texture: '/images/inhouse-img3-seo.webp',
};

/**
 * Hero carousel. Slide one is the footage; the rest are stills. Each slide
 * carries its own headline (one entry per line), so the two-line rhythm of
 * the reference hero survives at every width.
 *
 * Copy stays within the research-supply frame — what is measured, documented
 * and shipped. No claim about what a compound does.
 */
export type HeroSlide = {
  kind: 'video' | 'image';
  /** Video source, or the still shown for an image slide. */
  src: string;
  /** Headline, one array entry per rendered line. */
  title: string[];
  body: string;
  /** Seconds held before advancing. */
  hold: number;
  /**
   * Focal points for the still, as `object-position`. Desktop is pushed left
   * so the products clear the copy column; a phone crops most of the width
   * away, so it needs its own, centred on the product.
   */
  position?: string;
  positionMobile?: string;
  /**
   * Shade behind the copy. The product stills are bright and busy on the
   * left, so white type needs more cover there than it does over the footage.
   */
  scrim?: 'light' | 'heavy';
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    kind: 'video',
    src: '/videos/hero-update-h264.mp4',
    title: ['Every batch tested.', 'Every result published.'],
    body: 'Research-grade peptides for UK and EU laboratories, independently assayed and shipped cold with the certificate for your batch.',
    hold: 8,
  },
  {
    kind: 'image',
    src: '/images/hero-new2.png',
    title: ['CJC-1295 and MOTS-C.', 'Assayed before listing.'],
    body: 'Reference compounds in sealed pre-filled devices, each batch measured for purity and concentration by an independent laboratory.',
    hold: 8,
    position: '0% 60%',
    positionMobile: '46% 42%',
    scrim: 'heavy',
  },
  {
    kind: 'image',
    src: '/images/her3.png',
    title: ['Six research lines.', 'One verified source.'],
    body: 'Synthesised in-house and released against a batch record, so the kit on your bench matches the paperwork on file.',
    hold: 8,
    position: '12% 55%',
    positionMobile: '52% 45%',
    scrim: 'heavy',
  },
];

/**
 * Single source of truth for the research-only disclaimer. Rendered on every
 * product page and in the checkout flow — never edit in one place only.
 */
export const RESEARCH_DISCLAIMER =
  'FOR RESEARCH PURPOSES ONLY. Not intended for human or veterinary use. Not intended to diagnose, treat, cure, or prevent any disease. Products are supplied strictly for laboratory and analytical research conducted by qualified professionals.';

export const CHECKOUT_ACKNOWLEDGEMENT =
  'By proceeding with this purchase, you acknowledge that these products are intended solely for laboratory research purposes and are not intended for human or veterinary use. These products are not intended to diagnose, treat, cure, or prevent any disease.';

export const ANNOUNCEMENTS = [
  'Third-party tested by Janoshik Analytical',
  'Sealed and cold-stored before dispatch',
  'Research use only — not for human or veterinary use',
  'Free cold-chain shipping across the UK & EU',
];

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '/about' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Standards', href: '#testimonials' },
  { label: 'Contact', href: '/contact' },
];

/**
 * Primary navigation. Mirrors AG1's three-group mega menu (Shop / Science /
 * Explore): each group opens a panel with a small mono eyebrow and a column
 * of links, each with a thumbnail, a title and a one-line description.
 * `contain` marks product cut-outs (shown whole on the stone well) rather
 * than photographs (cropped to fill).
 */
export type MenuItem = {
  label: string;
  href: string;
  description: string;
  image: string;
  contain?: boolean;
  badge?: string;
};
export type MenuGroup = {
  label: string;
  eyebrow: string;
  items: MenuItem[];
};

export const MENU: MenuGroup[] = [
  {
    label: 'Shop',
    eyebrow: 'Shop Lumivex',
    items: [
      {
        label: 'All compounds',
        href: '/shop',
        description: 'The full catalogue, every batch verified before listing.',
        image: '/products/products/tiles/retatrutide-40.webp',
        contain: true,
      },
      {
        label: 'Metabolic research',
        href: '/shop?category=metabolic',
        description: 'GLP-1, GIP and triple-agonist reference material.',
        image: '/products/products/tiles/tirzepatide.webp',
        contain: true,
        badge: 'Best seller',
      },
      {
        label: 'Recovery research',
        href: '/shop?category=recovery',
        description: 'Pentadecapeptide and actin-regulating blends.',
        image: '/products/products/tiles/bpc-157-tb-500.webp',
        contain: true,
      },
      {
        label: 'Cellular & longevity',
        href: '/shop?category=longevity',
        description: 'NAD+ and cellular metabolism reference compounds.',
        image: '/products/products/tiles/nad.webp',
        contain: true,
      },
    ],
  },
  {
    label: 'Standards',
    eyebrow: 'How batches are verified',
    items: [
      {
        label: 'How we test',
        href: '/#why-us',
        description: 'The assay process behind every batch number.',
        image: '/images/reviews/analytical.jpg',
      },
      {
        label: 'Certificates of analysis',
        href: '/#why-us',
        description: 'Batch-level purity and concentration reports.',
        image: '/images/reviews/certificates.jpg',
      },
      {
        label: 'Cold-chain handling',
        href: '/shipping-policy',
        description: 'How compounds are stored, sealed and shipped.',
        image: '/images/reviews/cold-chain.jpg',
      },
    ],
  },
  {
    label: 'Explore',
    eyebrow: 'About Lumivex',
    items: [
      {
        label: 'About Lumivex',
        href: '/about',
        description: 'Who we supply and why we document everything.',
        image: '/images/story/make.jpg',
      },
      {
        label: 'Contact',
        href: '/contact',
        description: 'Sourcing questions, order help and batch documents.',
        image: '/images/reviews/support.jpg',
      },
    ],
  },
];

/** Four-up reassurance strip directly below the hero. */
export const TRUST_POINTS = [
  {
    title: 'Verified sourcing',
    text: 'Direct supply from our own synthesis facility. No intermediate resellers in the chain.',
  },
  {
    title: 'Assayed purity',
    text: 'Every batch independently tested by Janoshik Analytical before it is listed.',
  },
  {
    title: 'Sealed cold packaging',
    text: 'Cold-stored, tamper-sealed and accurately labelled before it leaves the shelf.',
  },
  {
    title: 'A researcher on support',
    text: 'Replies from someone who knows the catalogue, usually within the working day.',
  },
];

/** Catalogue lines, used by the "Shop by line" rail and shop page filters. */
export const PRODUCT_LINES = [
  {
    label: 'Metabolic',
    slug: 'metabolic',
    image: '/images/shop/retatrutide-40.webp',
    count: 3,
  },
  {
    label: 'Recovery',
    slug: 'recovery',
    image: '/images/shop/bpc-157-tb-500.webp',
    count: 1,
  },
  {
    label: 'Skin & hair',
    slug: 'aesthetic',
    image: '/images/shop/skin-and-hair.webp',
    count: 1,
  },
  {
    label: 'Growth factor',
    slug: 'growth',
    image: '/images/shop/tesamorelin.webp',
    count: 2,
  },
  {
    label: 'Longevity',
    slug: 'longevity',
    image: '/images/shop/nad.webp',
    count: 2,
  },
  {
    label: 'Blends',
    slug: 'blend',
    image: '/images/shop/bpc-157-tb-500.webp',
    count: 2,
  },
];

/** Maps each product to a catalogue line, for shop filtering. */
export const PRODUCT_LINE_MAP: Record<string, string[]> = {
  'tirzepatide-40mg': ['metabolic'],
  'retatrutide-20mg': ['metabolic'],
  'retatrutide-40mg': ['metabolic'],
  'glow-70mg': ['aesthetic', 'blend'],
  'bpc-157-tb-500-40mg': ['recovery', 'blend'],
  'nad-plus-1000mg': ['longevity'],
  'cjc-1295-10mg': ['growth'],
  'tesamorelin-20mg': ['growth'],
  'mots-c-40mg': ['longevity'],
};

/**
 * Recurring supply programme. Discount and shipping terms are presentational
 * only — order totals are always calculated by the checkout API.
 */
export const PROGRAMME = {
  name: 'Standing Order',
  discountPercent: 15,
  deliveries: 3,
  perks: [
    {
      title: '15% off every delivery',
      text: 'Enrol any compound for three monthly deliveries and save on each one.',
    },
    {
      title: 'Cold-chain included',
      text: 'Insulated shipping on every order containing a standing-order line, no minimum.',
    },
    {
      title: 'Priority batch allocation',
      text: 'Allocated from each verified batch 48 hours before it is listed publicly.',
    },
    {
      title: 'Certificates on dispatch',
      text: 'The batch-specific certificate of analysis is emailed the moment your order ships.',
    },
  ],
};

/** Tabbed evidence section — AG1's "15 years of research" pattern. */
export const STANDARDS_TABS = [
  {
    label: 'Purity',
    statement:
      'Every batch is assayed by an independent laboratory before a single unit is listed for sale.',
    meta: 'ASSAYED BY HPLC-UV AGAINST A CERTIFIED REFERENCE STANDARD. LOWEST RECORDED BATCH PURITY ACROSS THE CATALOGUE: 99.21%.',
    image: '/images/inhouse-img3-seo.webp',
  },
  {
    label: 'Concentration',
    statement:
      'Stated content is measured, not calculated — the certificate reports what the device actually holds.',
    meta: 'FILL VOLUME AND COMPOUND CONCENTRATION ARE REPORTED PER BATCH IN MG/ML, WITH TOTAL CONTENT DERIVED FROM THE MEASURED FILL.',
    image: '/images/inhouse-img4-seo.webp',
  },
  {
    label: 'Cold chain',
    statement:
      'Compounds are held at 2–8°C from fill through dispatch, in validated insulated packaging.',
    meta: 'TEMPERATURE-CONTROLLED STORAGE WITH LOGGED HANDOVER AT EVERY TRANSFER. INSULATED SHIPPERS RATED FOR 48 HOURS IN TRANSIT.',
    image: '/images/inhouse-image2-seo.webp',
  },
  {
    label: 'Traceability',
    statement:
      'Each unit carries a batch number that resolves to its own published certificate.',
    meta: 'TAMPER-EVIDENT LABELLING AND SECURE PROCUREMENT LOGS. BATCH NUMBERS ARE VERIFIABLE DIRECTLY WITH THE ISSUING LABORATORY.',
    image: '/images/inhouse-image1-seo.webp',
  },
];

/** Checklist accordion — "Documented, batch by batch". */
export const QUALITY_CHECKS = [
  {
    title: 'Independently assayed, never self-reported',
    text: 'Purity and concentration are measured by Janoshik Analytical, a laboratory with no commercial interest in the result. We publish the report as issued.',
  },
  {
    title: 'Certificate matched to your batch number',
    text: 'The certificate you receive corresponds to the exact batch in your consignment — not a representative sample from an earlier run.',
  },
  {
    title: 'Fill volume measured, not estimated',
    text: 'Stated content is derived from the measured fill of the sealed device, so the figure on the label is the figure in the pen.',
  },
  {
    title: 'Validated cold-chain packaging',
    text: 'Insulated shippers are qualified for 48 hours in transit at ambient temperatures, with cold-chain integrity checked on dispatch.',
  },
  {
    title: 'Documented chain of custody',
    text: 'Synthesis, fill, assay and release are logged against the batch record, so procurement teams can reconstruct the full history.',
  },
];

/** Independent voices — rendered in the expert rail. */
export const EXPERTS = [
  {
    name: 'Dr. Tomas Heller',
    role: 'Analytical Chemist, Rotterdam',
    image: '/images/reviews/analytical.jpg',
    quote:
      'Fill volumes match the stated figures within our own measurement tolerance. For method development that consistency matters more than a headline purity number.',
  },
  {
    name: 'Priya Raman',
    role: 'Procurement Lead, Manchester',
    image: '/images/reviews/goods-in.jpg',
    quote:
      'Batch numbers on the devices match the numbers on the certificates every time. Reconciling a delivery against the paperwork takes minutes rather than an afternoon.',
  },
  {
    name: 'Dr. Jonas Weber',
    role: 'Group Leader, Vienna',
    image: '/images/reviews/storage.jpg',
    quote:
      'Cold packs were still solid on arrival after two days in transit. The insulated packaging is specified properly rather than treated as an afterthought.',
  },
  {
    name: 'Elif Demir',
    role: 'Laboratory Manager, Copenhagen',
    image: '/images/reviews/support.jpg',
    quote:
      'Questions about storage and handling get answered by someone who has read the batch record, not a script. That is unusual at this end of the market.',
  },
];

/** Three-step process strip. A genuine sequence, so it carries step numbers. */
/**
 * Bench-to-pen process. Each step names the record it leaves behind, so the
 * homepage section can show what a lab can actually ask to see.
 */
export const PROCESS = {
  eyebrow: 'From bench to sealed pen',
  heading: 'How each pen is prepared',
  intro:
    'Three steps between the lab bench and the sealed pen. Each one leaves a record you can ask to see, so nothing about a batch rests on our word alone.',
};

export const PROCESS_STEPS = [
  {
    title: 'Synthesise',
    text: 'APIs are produced in our own facility under controlled clean-room conditions, with no third-party resellers in the chain.',
    record: 'Batch record',
    image: '/images/process/synthesise.jpg',
  },
  {
    title: 'Verify',
    text: 'Independent purity and concentration testing on every batch before a single unit is allocated to an order.',
    record: 'Janoshik certificate',
    image: '/images/process/verify.jpg',
  },
  {
    title: 'Seal',
    text: 'Cold-stored and tamper-sealed, with accurate labelling and a batch number that resolves to its certificate.',
    record: 'Batch number on the label',
    image: '/images/process/seal.jpg',
  },
];

/**
 * Homepage "Our story" rail. Each chapter is one plain habit the company is
 * built on; hotspots sit over the photograph at x/y percentages and name
 * the thing in frame that the habit depends on.
 */
export const STORY = {
  eyebrow: 'Our story',
  heading: 'Built on getting the basics right.',
  intro:
    'Lumivex supplies laboratories across the UK and EU with research-grade peptides. We built the company around four plain habits: make it ourselves, have someone else check it, document everything, and answer the phone.',
  dragHint: 'Drag to follow the story',
  chapters: [
    {
      title: 'We make it ourselves',
      text: 'Synthesised in-house under controlled clean-room conditions, with no resellers in the chain.',
      image: '/images/story/make.jpg',
      size: 'wide',
      hotspots: [
        { x: 22, y: 42, label: 'Laminar-flow hood' },
        { x: 46, y: 56, label: 'Controlled fill bench' },
        { x: 88, y: 60, label: 'Calibrated instruments' },
      ],
    },
    {
      title: 'Paperwork that matches',
      text: 'Every batch is released with a certificate tied to its own batch number.',
      image: '/images/story/paperwork.jpg',
      size: 'narrow',
      hotspots: [
        { x: 30, y: 55, label: 'Certificate per batch' },
        { x: 66, y: 57, label: 'Batch number on the carton' },
      ],
    },
    {
      title: 'Someone else checks it',
      text: 'Purity and concentration are measured by Janoshik Analytical, an independent laboratory.',
      image: '/images/story/check.jpg',
      size: 'wide',
      hotspots: [
        { x: 32, y: 51, label: 'Purity assay' },
        { x: 59, y: 30, label: 'Chromatogram per batch' },
        { x: 74, y: 52, label: 'Concentration measured' },
      ],
    },
    {
      title: 'Shipped cold, answered by people',
      text: 'Held at 2–8°C, packed in insulated shippers, and questions answered by someone who has read the batch record.',
      image: '/images/story/ship.jpg',
      size: 'wide',
      hotspots: [
        { x: 41, y: 50, label: 'Insulated shippers' },
        { x: 75, y: 42, label: 'Held at 2–8°C' },
      ],
    },
  ],
} as const;

/** Closing call to action above the FAQ. */
export const ORDER_CTA = {
  eyebrow: 'Ready when your lab is',
  heading: 'Order the compound. The paperwork comes with it.',
  body: 'Browse the catalogue, check the batch data on each listing, and place your order with the documentation already in hand.',
  cta: 'Browse the catalogue',
  href: '/shop',
};

export const FAQS = [
  {
    q: 'What does "research use only" actually mean?',
    a: 'Every compound we supply is intended solely for in vitro laboratory research by qualified professionals. It may not be used in clinical trials involving humans, administered to humans or animals, or supplied onward for investigational use. Ordering confirms you accept these terms.',
  },
  {
    q: 'Who carries out the testing?',
    a: 'Janoshik Analytical, an independent laboratory with no commercial interest in the outcome. Each batch is assayed for purity and compound concentration, and the report is published as issued — we do not edit or summarise it.',
  },
  {
    q: 'How do I verify the batch I received?',
    a: 'Each product page lists its batch number and links directly to the certificate on the issuing laboratory’s own domain. Compare the batch number on your device label with the one in the report.',
  },
  {
    q: 'How are orders shipped and stored?',
    a: 'Compounds are held at 2–8°C and dispatched in validated insulated packaging rated for 48 hours in transit. Store refrigerated on arrival and do not freeze.',
  },
  {
    q: 'Which countries do you supply?',
    a: 'We supply laboratories and research organisations across the UK and EU. Orders are shipped from within the UK with full customs documentation where required.',
  },
  {
    q: 'Can I order without an account?',
    a: 'Yes. Checkout works without signing in, though an account lets you track orders, re-order from your history and access certificates for every batch you have received.',
  },
];

export type Product = {
  id: string;
  slug: string;
  name: string;
  tag: string;
  category: string;
  description: string;
  /** Display price, e.g. "$100". */
  price: string;
  /** Numeric price in USD, used for cart maths. */
  priceValue: number;
  /**
   * Listed but not yet purchasable — no price set, and no line for it on the
   * backend. The card and detail page show "Price on enquiry" and point at
   * the contact form instead of the cart.
   */
  enquiryOnly?: boolean;
  /** Assayed purity — set only where a third-party report states one. */
  purity?: string;
  image: string;
  /**
   * Transparent cut-outs used on catalogue cards: the boxed kit, and an
   * optional pen shot that fades in on hover.
   */
  tile?: { src: string; hover?: string };
  /** Optional additional gallery shots shown as thumbnails on the detail page. */
  gallery?: string[];
  /** Long-form copy for the product detail page. */
  longDescription: string;
  /** Key/value research specifications. */
  specs: { label: string; value: string }[];
  /** Short bullet highlights. */
  highlights: string[];
  /** Kit contents and storage blocks shown on the product page. */
  details?: {
    contents?: string;
    storage?: string;
  };
  /** Janoshik third-party test data — enables the certificate modal. */
  janoshik?: {
    fillVolume?: string;
    batchNumber?: string;
    purity?: string;
    compounds?: { name: string; concentration: string; content: string }[];
    /** External verification link (janoshik.com). */
    verifyUrl?: string;
    /** Local certificate images displayed inside the modal. */
    certificateImages?: string[];
  };
};

export const PRODUCTS: Product[] = [
  {
    id: 'tirzepatide-40',
    slug: 'tirzepatide-40mg',
    name: 'Tirzepatide 40mg',
    tag: 'R&D Only',
    category: 'GIP / GLP-1 Research',
    description:
      'A dual GIP and GLP-1 receptor agonist supplied for in vitro metabolic and receptor-signalling research.',
    price: '$100',
    priceValue: 100,
    purity: '99.85%',
    image: '/images/shop/tirzepatide.webp',
    tile: {
      src: '/products/products/tiles/tirzepatide.webp',
      hover: '/products/products/tiles/tirzepatide-hover.webp',
    },
    gallery: [
      '/images/tirzepetide/Artboard2.jpg',
      '/images/tirzepetide/Artboard2copy.jpg',
      '/images/tirzepetide/trizyopen.jpg',
      '/images/tirzepetide/trizyuv.jpg',
    ],
    longDescription:
      'A 40mg Tirzepatide formulation supplied in a pre-filled research device, provided exclusively for controlled laboratory R&D applications. Delivered in sealed format to support compound stability analysis, formulation studies, and delivery mechanism evaluation.',
    specs: [
      { label: 'CAS Number', value: '2023788-19-2' },
      { label: 'Molecular Formula', value: 'C₂₂₅H₃₄₈N₄₈O₆₈' },
      { label: 'Quantity', value: '40mg per research pen' },
      { label: 'Fill Volume', value: '3 mL' },
      { label: 'Batch Number', value: 'TR786PAOS' },
      { label: 'Form', value: 'Pre-filled research pen' },
      { label: 'Storage', value: '2–8°C refrigerated (do not freeze)' },
    ],
    highlights: [
      'Janoshik third-party tested',
      'Certificate of analysis included',
      'Batch-level purity data',
    ],
    details: {
      contents:
        'Each Tirzepatide 40mg Research kit includes:\nPre-filled Research pen (40mg Tirzepatide)\nResearch information sheet',
      storage:
        'Store refrigerated (2–8°C). Do not freeze.\nSupplied in fixed-volume sealed format for laboratory analysis.',
    },
    janoshik: {
      fillVolume: '3 mL',
      batchNumber: 'TR786PAOS',
      purity: '99.85%',
      compounds: [
        {
          name: 'Tirzepatide',
          concentration: '13.35 mg/mL',
          content: '40.05 mg',
        },
      ],
      verifyUrl:
        'https://verify.janoshik.com/tests/147174-ALLUVI_TIRZEPATIDE_40MG_KIT_T5MBWRAYD4HN',
      certificateImages: [
        '/images/tirzepetide/certificate/report.png',
        '/images/tirzepetide/certificate/coa-1.jpg',
        '/images/tirzepetide/certificate/coa-2.jpg',
        '/images/tirzepetide/certificate/coa-3.jpg',
      ],
    },
  },
  {
    id: 'retatrutide-20',
    slug: 'retatrutide-20mg',
    name: 'Retatrutide 20mg',
    tag: 'R&D Only',
    category: 'Triple Agonist Research',
    description:
      'A triple GIP/GLP-1/glucagon receptor agonist for advanced metabolic pathway studies in controlled laboratory settings.',
    price: '$100',
    priceValue: 100,
    purity: '99.21%',
    image: '/images/shop/retatrutide-20.webp',
    tile: {
      src: '/products/products/tiles/retatrutide.webp',
      hover: '/products/products/tiles/retatrutide-hover.webp',
    },
    gallery: [
      '/images/retatwenty/retafront.jpeg',
      '/images/retatwenty/Artboard4copy.jpg',
      '/images/retatwenty/Artboard4copy3.jpg',
      '/images/retatwenty/retatwentyuv.jpg',
    ],
    longDescription:
      'A 20mg Retatrutide formulation supplied in a pre-filled research device, provided exclusively for controlled laboratory R&D applications. Delivered in sealed format to support compound stability analysis, formulation studies, and delivery mechanism evaluation.',
    specs: [
      { label: 'CAS Number', value: '2381089-83-2' },
      { label: 'Molecular Formula', value: 'C₂₂₁H₃₄₂N₄₆O₆₈' },
      { label: 'Quantity', value: '20mg per research pen' },
      { label: 'Fill Volume', value: '2.4 mL' },
      { label: 'Batch Number', value: 'AR1721TRT' },
      { label: 'Form', value: 'Pre-filled research pen' },
      { label: 'Storage', value: '2–8°C refrigerated (do not freeze)' },
    ],
    highlights: [
      'Triple-receptor agonist',
      'Janoshik third-party tested',
      'Batch-level purity data',
    ],
    details: {
      contents:
        'Each Retatrutide 20mg Research kit includes:\nPre-filled Research pen (20mg Retatrutide)\nResearch information sheet',
      storage:
        'Store refrigerated (2–8°C). Do not freeze.\nSupplied in fixed-volume sealed format for laboratory analysis.',
    },
    janoshik: {
      fillVolume: '2.4 mL',
      batchNumber: 'AR1721TRT',
      purity: '99.21%',
      compounds: [
        {
          name: 'Retatrutide',
          concentration: '9.57 mg/mL',
          content: '22.96 mg',
        },
      ],
      verifyUrl:
        'https://verify.janoshik.com/tests/163215-ALLUVI_RETATRUTIDE_20MG_KIT_GBHEFN58JXXZ',
      certificateImages: [
        '/images/retatwenty/certificate/report.png',
        '/images/retatwenty/certificate/coa-1.jpg',
        '/images/retatwenty/certificate/coa-2.jpg',
      ],
    },
  },
  {
    id: 'retatrutide-40',
    slug: 'retatrutide-40mg',
    name: 'Retatrutide 40mg',
    tag: 'R&D Only',
    category: 'Triple Agonist Research',
    description:
      'Higher-concentration triple-receptor agonist formulated for extended in vitro research protocols and comparative assays.',
    price: '$180',
    priceValue: 180,
    purity: '99.269%',
    image: '/images/shop/retatrutide-40.webp',
    tile: {
      src: '/products/products/tiles/retatrutide-40.webp',
      hover: '/products/products/tiles/retatrutide-40-hover.webp',
    },
    gallery: [
      '/images/retafourty/retafrontnew.jpg',
      '/images/retafourty/retpen.jpg',
      '/images/retafourty/retaopen.jpg',
      '/images/retafourty/retauv.jpg',
    ],
    longDescription:
      'A 40mg Retatrutide formulation supplied in a pre-filled research device, provided exclusively for controlled laboratory R&D applications. Delivered in sealed format to support compound stability analysis, formulation studies, and delivery mechanism evaluation.',
    specs: [
      { label: 'CAS Number', value: '2381089-83-2' },
      { label: 'Molecular Formula', value: 'C₂₂₁H₃₄₂N₄₆O₆₈' },
      { label: 'Quantity', value: '40mg per research pen' },
      { label: 'Fill Volume', value: '2.4 mL' },
      { label: 'Batch Number', value: 'AR1739JAT' },
      { label: 'Form', value: 'Pre-filled research pen' },
      { label: 'Storage', value: '2–8°C refrigerated (do not freeze)' },
    ],
    highlights: [
      'Extended-protocol quantity',
      'Janoshik third-party tested',
      'Full traceability',
    ],
    details: {
      contents:
        'Each Retatrutide 40mg Research kit includes:\nPre-filled Research pen (40mg Retatrutide)\nResearch information sheet',
      storage:
        'Store refrigerated (2–8°C). Do not freeze.\nSupplied in fixed-volume sealed format for laboratory analysis.',
    },
    janoshik: {
      fillVolume: '2.4 mL',
      batchNumber: 'AR1739JAT',
      purity: '99.269%',
      compounds: [
        {
          name: 'Retatrutide',
          concentration: '18.22 mg/mL',
          content: '43.72 mg',
        },
      ],
      verifyUrl:
        'https://verify.janoshik.com/tests/163216-ALLUVI_RETATRUTIDE_40MG_KIT_TU3SQLQB9ZDQ',
      certificateImages: [
        '/images/retafourty/certificate/report.png',
        '/images/retafourty/certificate/coa-1.jpg',
        '/images/retafourty/certificate/coa-2.jpg',
      ],
    },
  },
  {
    id: 'glow-70',
    slug: 'glow-70mg',
    name: 'Glow 70mg',
    tag: 'R&D Only',
    category: 'Multi-Compound Research Blend',
    description:
      'A 70mg three-compound reference blend of GHK-Cu, BPC-157 and TB-500 supplied in a sealed pre-filled research device for controlled laboratory R&D applications.',
    price: '$100',
    priceValue: 100,
    image: '/images/shop/glow.webp',
    tile: {
      src: '/products/products/tiles/glow-pro.webp',
      hover: '/products/products/tiles/glow-hover.webp',
    },
    gallery: [
      '/images/glow/glowfrontnew.jpg',
      '/images/glow/glowpen.jpg',
      '/images/glow/glowopen.jpg',
      '/images/glow/glowuv.jpg',
    ],
    longDescription:
      'A 70mg three-compound reference blend supplied in a sealed pre-filled research device, provided exclusively for controlled laboratory R&D applications. Supplied in fixed-volume sealed format to support compound stability analysis, formulation studies, and analytical method development. This material is used solely for in vitro experiments and may not be (1) used in clinical trials involving humans, (2) administered to humans or animals as part of an experiment or investigation, or (3) supplied to another party for human investigational use.',
    specs: [
      { label: 'Composition', value: 'GHK-Cu + BPC-157 + TB-500' },
      { label: 'Total Contents', value: '10mg BPC-157, 10mg TB-500, 50mg GHK-Cu' },
      { label: 'Fill Volume', value: '3.4 mL' },
      { label: 'Batch Number', value: 'GL0621XSA' },
      { label: 'Form', value: 'Pre-filled research pen' },
      { label: 'Storage', value: '2–8°C refrigerated (do not freeze)' },
    ],
    highlights: [
      'Janoshik third-party tested',
      'Verified compound content',
    ],
    details: {
      contents:
        'Each 70mg blend research kit includes:\n2 × Pre-filled Research pens (Each pen contains 5mg BPC-157, 5mg TB-500, 25mg GHK-Cu)\n\nTotal contents: 10mg BPC-157, 10mg TB-500, 50mg GHK-Cu',
      storage:
        'Store refrigerated (2–8°C). Do not freeze.\nSupplied in fixed-volume sealed format for laboratory analysis.',
    },
    janoshik: {
      fillVolume: '3.4 mL',
      batchNumber: 'GL0621XSA',
      compounds: [
        { name: 'GHK-Cu', concentration: '7.59 mg/mL', content: '25.8 mg' },
        { name: 'BPC-157', concentration: '2.39 mg/mL', content: '8.13 mg' },
        { name: 'TB-500', concentration: '1.99 mg/mL', content: '6.76 mg' },
      ],
      verifyUrl:
        'https://verify.janoshik.com/tests/163217-ALLUVI_GLOW_70MG_KIT_DCL3AJSE4JQP',
      certificateImages: [
        '/images/glow/certificate/report.png',
        '/images/glow/certificate/coa-1.jpg',
        '/images/glow/certificate/coa-2.jpg',
      ],
    },
  },
  {
    id: 'bpc-tb-40',
    slug: 'bpc-157-tb-500-40mg',
    name: 'BPC-157 & TB-500 40mg',
    tag: 'R&D Only',
    category: 'Peptide Blend — Research',
    description:
      'A combined pentadecapeptide and actin-regulating peptide reference blend supplied for in vitro cell-signalling and angiogenesis assay work.',
    price: '$130',
    priceValue: 130,
    image: '/images/shop/bpc-157-tb-500.webp',
    tile: { src: '/products/products/tiles/bpc-157-tb-500.webp' },
    gallery: [
      '/images/bpc/bpcfrontnew.jpg',
      '/images/bpc/bpcpen.jpg',
      '/images/bpc/bpcopen.jpg',
      '/images/bpc/uvbpc.jpg',
    ],
    longDescription:
      'A 40mg BPC-157 & TB-500 reference formulation supplied in a sealed pre-filled research device, provided exclusively for controlled laboratory R&D applications. Supplied in fixed-volume sealed format to support compound stability analysis, formulation studies, and analytical method development.',
    specs: [
      { label: 'Composition', value: 'BPC-157 + TB-500' },
      { label: 'Total Contents', value: '20mg BPC-157, 20mg TB-500' },
      { label: 'Fill Volume', value: '3 mL' },
      { label: 'Batch Number', value: 'BP1701FSR' },
      { label: 'Form', value: 'Pre-filled research pen' },
      { label: 'Storage', value: '2–8°C refrigerated (do not freeze)' },
    ],
    highlights: [
      'Dual-peptide reference blend',
      'Janoshik third-party tested',
      'Verified compound content',
    ],
    details: {
      contents:
        'Each BPC-157 & TB-500 40mg Research kit includes:\nPre-filled Research pen (20mg BPC-157, 20mg TB-500)\nResearch information sheet',
      storage:
        'Store refrigerated (2–8°C). Do not freeze.\nSupplied in fixed-volume sealed format for laboratory analysis.',
    },
    janoshik: {
      fillVolume: '3 mL',
      batchNumber: 'BP1701FSR',
      compounds: [
        { name: 'BPC-157', concentration: '7.33 mg/mL', content: '21.99 mg' },
        { name: 'TB-500', concentration: '6.53 mg/mL', content: '19.59 mg' },
      ],
      verifyUrl:
        'https://verify.janoshik.com/tests/163218-ALLUVI_BPC157_TB500_40MG_KIT_EAI125ZEF8TB',
      certificateImages: [
        '/images/bpc/certificate/report.png',
        '/images/bpc/certificate/coa-1.jpg',
        '/images/bpc/certificate/coa-2.jpg',
      ],
    },
  },
  {
    id: 'nad-1000',
    slug: 'nad-plus-1000mg',
    name: 'NAD+ 1,000mg',
    tag: 'R&D Only',
    category: 'Cellular Metabolism Research',
    description:
      'Nicotinamide adenine dinucleotide supplied as a reference material for in vitro cellular metabolism and mitochondrial research.',
    price: '$140',
    priceValue: 140,
    image: '/images/shop/nad.webp',
    tile: {
      src: '/products/products/tiles/nad.webp',
      hover: '/products/products/tiles/nad-hover.webp',
    },
    gallery: [
      '/images/nad/nadfront.jpg',
      '/images/nad/pennad.jpg',
      '/images/nad/opennad.jpg',
      '/images/nad/uvnad.jpg',
    ],
    longDescription:
      'NAD+ (Nicotinamide Adenine Dinucleotide) reference formulation supplied for laboratory analysis and in vitro study only. Provided exclusively for controlled laboratory R&D applications in fixed-volume sealed format.',
    specs: [
      { label: 'CAS Number', value: '53-84-9' },
      { label: 'Molecular Formula', value: 'C₂₁H₂₇N₇O₁₄P₂' },
      { label: 'Total Contents', value: '1,000mg across 2 research pens' },
      { label: 'Form', value: 'Pre-filled research pen' },
      { label: 'Storage', value: '2–8°C refrigerated (do not freeze)' },
    ],
    highlights: [
      'Validated cold-chain handling',
      'Analytical reference material',
      'Secure procurement logs',
    ],
    details: {
      contents:
        'Each NAD+ 1,000mg kit includes:\n2 × Pre-filled NAD+ pens (500mg each)\nResearch information sheet',
      storage: 'Store refrigerated (2–8°C). Do not freeze.',
    },
  },
  /* The three below are listed from their cartons only. No Janoshik report
     has been issued for them yet, so they carry no purity, fill volume or
     batch number, and `enquiryOnly` keeps them out of the cart until a price
     is set against the backend. Remove that flag and add `price` /
     `priceValue` once both exist. */
  {
    id: 'cjc-1295-10',
    slug: 'cjc-1295-10mg',
    name: 'CJC-1295 10mg',
    tag: 'R&D Only',
    category: 'Growth Factor Research',
    description:
      'CJC-1295 without DAC, supplied as a reference peptide for in vitro growth-factor and receptor-signalling research.',
    price: 'Price on enquiry',
    priceValue: 0,
    enquiryOnly: true,
    image: '/images/shop/cjc-1295.webp',
    tile: { src: '/products/products/tiles/cjc-1295.webp' },
    gallery: [
      '/images/shop/cjc-1295.webp',
      '/products/products/detail/cjc-1295-box.webp',
      '/products/products/tiles/cjc-1295.webp',
    ],
    longDescription:
      'CJC-1295 (without DAC) reference peptide supplied for laboratory analysis and in vitro study only. Provided in a fixed-volume sealed pre-filled device for controlled laboratory R&D applications.',
    specs: [
      { label: 'Variant', value: 'Without DAC' },
      { label: 'Total Contents', value: '10mg — 25 doses of 400 mcg' },
      { label: 'Form', value: 'Pre-filled research pen' },
      { label: 'Storage', value: '2–8°C refrigerated (do not freeze)' },
    ],
    highlights: [
      'Validated cold-chain handling',
      'Sealed, tamper-evident device',
      'Secure procurement logs',
    ],
    details: {
      contents:
        'Each CJC-1295 10mg kit includes:\n1 × Pre-filled CJC-1295 research pen (25 doses of 400 mcg)\nResearch information sheet',
      storage: 'Store refrigerated (2–8°C). Do not freeze.',
    },
  },
  {
    id: 'mots-c-40',
    slug: 'mots-c-40mg',
    name: 'MOTS-C 40mg',
    tag: 'R&D Only',
    category: 'Cellular Metabolism Research',
    description:
      'Mitochondrial-derived peptide supplied as a reference material for in vitro cellular metabolism research.',
    price: 'Price on enquiry',
    priceValue: 0,
    enquiryOnly: true,
    image: '/images/shop/mots-c.webp',
    tile: { src: '/products/products/tiles/mots-c.webp' },
    gallery: [
      '/images/shop/mots-c.webp',
      '/products/products/detail/mots-c-box.webp',
      '/products/products/tiles/mots-c.webp',
    ],
    longDescription:
      'MOTS-C reference peptide supplied for laboratory analysis and in vitro study only. Provided in a fixed-volume sealed pre-filled device for controlled laboratory R&D applications.',
    specs: [
      { label: 'Total Contents', value: '40mg — 4 doses of 10mg' },
      { label: 'Form', value: 'Pre-filled research pen' },
      { label: 'Storage', value: '2–8°C refrigerated (do not freeze)' },
    ],
    highlights: [
      'Validated cold-chain handling',
      'Sealed, tamper-evident device',
      'Secure procurement logs',
    ],
    details: {
      contents:
        'Each MOTS-C 40mg kit includes:\n1 × Pre-filled MOTS-C research pen (4 doses of 10mg)\nResearch information sheet',
      storage: 'Store refrigerated (2–8°C). Do not freeze.',
    },
  },
  {
    id: 'tesamorelin-20',
    slug: 'tesamorelin-20mg',
    name: 'Tesamorelin 20mg',
    tag: 'R&D Only',
    category: 'Growth Factor Research',
    description:
      'Growth-hormone-releasing factor analogue supplied as a reference peptide for in vitro endocrine research.',
    price: 'Price on enquiry',
    priceValue: 0,
    enquiryOnly: true,
    image: '/images/shop/tesamorelin.webp',
    tile: { src: '/products/products/tiles/tesamorelin.webp' },
    gallery: [
      '/images/shop/tesamorelin.webp',
      '/products/products/detail/tesamorelin-box.webp',
      '/products/products/tiles/tesamorelin.webp',
    ],
    longDescription:
      'Tesamorelin reference peptide supplied for laboratory analysis and in vitro study only. Provided in a fixed-volume sealed pre-filled device for controlled laboratory R&D applications.',
    specs: [
      { label: 'Total Contents', value: '20mg — 10 doses of 2mg' },
      { label: 'Form', value: 'Pre-filled research pen' },
      { label: 'Storage', value: '2–8°C refrigerated (do not freeze)' },
    ],
    highlights: [
      'Validated cold-chain handling',
      'Sealed, tamper-evident device',
      'Secure procurement logs',
    ],
    details: {
      contents:
        'Each Tesamorelin 20mg kit includes:\n1 × Pre-filled Tesamorelin research pen (10 doses of 2mg)\nResearch information sheet',
      storage: 'Store refrigerated (2–8°C). Do not freeze.',
    },
  },
];

/** Look up a single product by its URL slug. */
/**
 * Homepage "most ordered" section: corner flags per card, and the wide
 * feature panel beneath the rail. Assay figures in the panel are read from
 * the product's `janoshik` block, never written here.
 */
export const BESTSELLERS = {
  eyebrow: 'Most ordered',
  heading: 'Ordered most by the labs we supply',
  cta: 'Shop all compounds',
  badges: {
    'retatrutide-40mg': 'New',
    'glow-70mg': 'New',
    'nad-plus-1000mg': 'Limited',
    'tirzepatide-40mg': 'Bestseller',
    'retatrutide-20mg': 'Bestseller',
    'bpc-157-tb-500-40mg': 'Bestseller',
  } as Record<string, string>,
  feature: {
    slug: 'retatrutide-40mg',
    badge: 'New',
    eyebrow: 'Third-party assayed by Janoshik',
    body: 'a triple-agonist reference compound in a 40mg kit. The figures below are taken from the published third-party report for the current batch.',
  },
};

/**
 * Single-product spotlight: the kit sits at the centre with four documented
 * facts around it. `{purity}`, `{batch}` and `{fill}` are filled from the
 * product's `janoshik` block at render time — never typed in here.
 */
export const SPOTLIGHT = {
  slug: 'tirzepatide-40mg',
  eyebrow: 'Tirzepatide 40mg',
  heading: 'Documented from fill to bench',
  /** Transparent cut-out that carries its own ground — see Spotlight/Stage. */
  image: '/images/Documented.png',
  intro:
    'A dual GIP / GLP-1 receptor agonist supplied for in vitro research, with the assay, batch record and storage conditions a lab needs to file it.',
  points: [
    {
      icon: 'assay',
      title: 'Third-party assayed',
      body: 'Purity measured at {purity} by Janoshik on batch {batch}. The full report is published and can be verified with the lab.',
    },
    {
      icon: 'fill',
      title: 'Measured, not calculated',
      body: 'Each device holds {fill}, confirmed in the same report — stated content reflects what the pen actually contains.',
    },
    {
      icon: 'cold',
      title: 'Held at 2–8°C',
      body: 'Kept refrigerated from fill through dispatch and shipped in validated insulated packaging across the UK and EU.',
    },
    {
      icon: 'batch',
      title: 'Traceable by batch',
      body: 'The batch number on the carton resolves to its own certificate, so the kit on your bench matches the paper on file.',
    },
  ] as const,
};

export const getProduct = (slug: string): Product | undefined =>
  PRODUCTS.find((p) => p.slug === slug);

/** Products related to the given one (same category first, then others). */
export const getRelatedProducts = (slug: string, limit = 3): Product[] => {
  const current = getProduct(slug);
  if (!current) return PRODUCTS.slice(0, limit);
  const sameCategory = PRODUCTS.filter(
    (p) => p.slug !== slug && p.category === current.category
  );
  const others = PRODUCTS.filter(
    (p) => p.slug !== slug && p.category !== current.category
  );
  return [...sameCategory, ...others].slice(0, limit);
};

export const WHY_US = [
  {
    no: '01',
    title: 'Built for Peptide R&D',
    text: 'We manufacture the core APIs for our peptide range in-house, controlling quality at every step of synthesis.',
  },
  {
    no: '02',
    title: 'Real-Time Monitoring',
    text: 'Every compound undergoes batch-level monitoring with full transparency into metabolite levels and purity.',
  },
  {
    no: '03',
    title: 'Precision Synthesis',
    text: 'Research compounds are formulated and filled with precision timing and a documented chain of custody.',
  },
  {
    no: '04',
    title: 'Automated Filling',
    text: 'Automated filling lines deliver precise fill-volume accuracy and controlled-environment handling for laboratory materials.',
  },
  {
    no: '05',
    title: 'Secure Chain of Custody',
    text: 'Every unit is traceable with tamper-evident labelling and secure procurement logs designed for R&D compliance.',
  },
  {
    no: '06',
    title: 'Cold-Chain Critical',
    text: 'Validated cold-chain packaging and storage keep compounds stable and compliant for sensitive laboratory work.',
  },
];

export const STATS = [
  { value: '6', suffix: '', label: 'Research formulations catalogued' },
  { value: '100', suffix: '%', label: 'Batches supplied with a COA' },
  { value: '99.2', suffix: '%+', label: 'Lowest assayed batch purity' },
];

/**
 * Supplier feedback. Compliance rule: comments may reference documentation,
 * packaging, presentation and service only — never outcomes, effects or use.
 */
export const TESTIMONIALS = [
  {
    quote:
      'Every consignment arrives with its batch documentation and a matching third-party certificate. The paperwork is the most complete we have received from a UK supplier.',
    author: 'Dr. Helena Voss',
    role: 'Principal Investigator, Zürich',
    image: '/images/reviews/documentation.jpg',
  },
  {
    quote:
      'Sealed packaging, intact cold-chain, accurate order contents and traceable batch numbers throughout. Procurement and record-keeping are straightforward as a result.',
    author: 'Marcus Lindgren',
    role: 'Laboratory Director, Stockholm',
    image: '/images/reviews/cold-chain.jpg',
  },
  {
    quote:
      'Certificates are published per batch and verifiable against the issuing laboratory. Presentation and labelling are consistent across every order we have placed.',
    author: 'Dr. Amara Okafor',
    role: 'Research Lead, London',
    image: '/images/reviews/certificates.jpg',
  },
];

/** Footer columns. Mirrors the reference footer's grouped link structure. */
export const FOOTER_COLUMNS = [
  {
    heading: 'Shop',
    links: [
      { label: 'All compounds', href: '/shop' },
      { label: 'Metabolic', href: '/shop?category=metabolic' },
      { label: 'Recovery', href: '/shop?category=recovery' },
      { label: 'Longevity', href: '/shop?category=longevity' },
      { label: 'Blends', href: '/shop?category=blend' },
    ],
  },
  {
    heading: 'Standards',
    links: [
      { label: 'How we test', href: '/#why-us' },
      { label: 'Quality commitments', href: '/#why-us' },
      { label: 'Cold-chain handling', href: '/shipping-policy' },
      { label: 'Press release', href: '/press-release' },
    ],
  },
  {
    heading: 'Account',
    links: [
      { label: 'Sign in', href: '/login' },
      { label: 'My orders', href: '/account/orders' },
      { label: 'Track an order', href: '/account/track' },
      { label: 'Wallet', href: '/account/wallet' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Questions', href: '/#faq' },
      { label: 'Contact', href: '/contact' },
      { label: 'Shipping policy', href: '/shipping-policy' },
      { label: 'Refund policy', href: '/refund-policy' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy policy', href: '/privacy-policy' },
      { label: 'Terms of service', href: '/terms-of-service' },
    ],
  },
];

/** Kept for any view still importing the previous two-group shape. */
export const FOOTER_LINKS = {
  navigate: [
    { label: 'About Us', href: '/about' },
    { label: 'Shop', href: '/shop' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Press Release', href: '/press-release' },
    { label: 'Refund Policy', href: '/refund-policy' },
    { label: 'Shipping Policy', href: '/shipping-policy' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-service' },
  ],
};

/**
 * /about — "What is Lumivex?", laid out on drinkag1.com/what-is-ag1.
 * Kit figures are not written here: the page reads them from the featured
 * product's Janoshik report (`ABOUT.kit.slug`).
 */
export const ABOUT = {
  title: 'What is Lumivex?',
  intro:
    'Lumivex is a UK and EU supplier of research-grade peptides and reference compounds — made in our own facility, assayed by an independent laboratory, and shipped with the certificate for the batch in the box.',
  documented: {
    heading: ['Less guesswork.', 'More documentation.'],
    body: 'Sourcing a reference compound usually means taking someone’s word for it. Every Lumivex kit arrives with the evidence instead:',
    checks: [
      'Independent assay',
      'Batch number on the pack',
      'Certificate of analysis',
      'Sealed cold packaging',
    ],
    image: '/products/products/Alluvi Tirzepatide Pen with Soft Shadow-13.png',
  },
  kit: {
    heading: 'What’s in a kit?',
    slug: 'tirzepatide-40mg',
    body: 'Every figure below is read from the published Janoshik report for this batch — not from a label.',
  },
  not: {
    heading: 'What Lumivex is not',
    items: [
      {
        title: 'For human or veterinary use',
        text: 'Every compound is supplied for in vitro laboratory research only, and sold only on that basis.',
      },
      {
        title: 'A reseller',
        text: 'We make what we sell in our own synthesis facility. Nothing passes through an intermediate supplier on its way to you.',
      },
      {
        title: 'A medical supplier',
        text: 'We do not supply pharmaceutical products and make no therapeutic or clinical claims about any compound.',
      },
    ],
  },
  compare: {
    heading: 'How does Lumivex compare?',
    columns: ['Reseller listing', 'Unlabelled vial'],
    rows: [
      { label: 'Made in our own facility', marks: [false, false] },
      { label: 'Independent assay before listing', marks: [false, false] },
      { label: 'Certificate tied to the batch number', marks: [false, false] },
      { label: 'Batch number on the pack', marks: [true, false] },
      { label: 'Fixed-volume sealed format', marks: [true, false] },
      { label: 'Cold-chain dispatch', marks: [false, false] },
      { label: 'Support from the catalogue team', marks: [false, false] },
    ],
    note: 'Other suppliers vary. An empty circle means the item is not routinely documented for that kind of listing.',
  },
  start: {
    heading: 'Start with a verified batch',
    eyebrow: 'Every order includes:',
    image: '/images/hero-products.webp',
    included: [
      {
        title: 'Certificate of analysis',
        text: 'The Janoshik report for the batch you receive',
      },
      {
        title: 'Research information sheet',
        text: 'Contents, fill volume and storage for the kit',
      },
      {
        title: 'Cold-chain shipping',
        text: 'Sealed and cold-stored before dispatch across the UK & EU',
      },
    ],
    cta: 'Browse the catalogue',
    href: '/shop',
    ticks: ['Third-party tested', 'Free UK & EU shipping', 'Researcher support'],
  },
};

/** /contact — the one place enquiries come in. */
export const CONTACT = {
  title: 'Contact us',
  intro:
    'For laboratories and institutions sourcing research-grade peptides with full documentation and batch traceability. A researcher who knows the catalogue replies, usually within one working day.',
  email: 'research@lumivex.store',
  details: [
    { label: 'Reply time', value: 'Within one working day' },
    { label: 'Supply region', value: 'United Kingdom and European Union' },
    { label: 'Compliance', value: 'Research use only — not for human or veterinary use' },
  ],
  shortcuts: [
    { label: 'Track an order', href: '/account/track' },
    { label: 'Common questions', href: '/#faq' },
    { label: 'Shipping policy', href: '/shipping-policy' },
    { label: 'Refund policy', href: '/refund-policy' },
  ],
  topics: ['Sourcing a compound', 'An existing order', 'Batch documentation', 'Something else'],
  newsletter: {
    eyebrow: 'The Lumivex batch list',
    heading: 'New batch drops, assay reports and storage notes.',
    body: 'Occasional email when a new lot is verified and listed. No spam.',
  },
};
