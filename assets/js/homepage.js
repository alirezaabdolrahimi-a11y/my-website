
const serviceItems = [
  { name: 'Brand Registration', icon: 'gem', slug: 'brand-registration', paragraphs: ['Niaz Net Tehran supports brand owners and business partners through the commercial planning and coordination required to introduce a brand into a target market. We help clarify market objectives, identify the appropriate local route, and coordinate discussions with relevant commercial and regulatory stakeholders.', 'From initial assessment to follow-up with partners and documentation teams, our role is to keep the process organized, transparent, and aligned with the brand owner’s goals. Registration requirements and approval timelines depend on the product category and the competent authorities in each market.'] },
  { name: 'Sports Nutrition & Supplements', icon: 'dumbbell', slug: 'sports-nutrition', paragraphs: ['We help businesses explore representation opportunities with international sports nutrition and supplement brands, while coordinating commercial discussions with brand owners and potential market partners.', 'We also coordinate bulk sourcing opportunities for sports powders, vitamins, wellness supplements, and diet-related food products. Product specifications, quantities, supplier terms, and market requirements are reviewed for each opportunity.'] },
  { name: 'Infant Formula & Nutrition', icon: 'baby', slug: 'infant-formula', paragraphs: ['Niaz Net Tehran facilitates business development and sourcing discussions for infant formula and baby nutrition products with manufacturers and prospective market partners. We help coordinate product information, commercial terms, supply expectations, and the communication required to assess a potential distribution relationship.', 'Because infant nutrition is a highly regulated category, product eligibility, labeling, registrations, and import conditions must be reviewed for each destination market. We coordinate the relevant stakeholders so commercial planning and regulatory review can progress in a structured way.', 'Specialized Ingredient Sourcing: We facilitate sourcing inquiries with established international suppliers for key infant-formula ingredients, including DHA (Docosahexaenoic Acid), ARA (Arachidonic Acid), other essential fatty acids, and selected vitamins and micronutrients. Upon request, we coordinate supplier discussions and requests for technical specifications, Certificates of Analysis (CoA), stability data, and packaging details. Availability, grade suitability, supplier qualification, and regulatory acceptance are subject to confirmation for each project and destination market.'] },
  { name: 'Cosmoderma (Botox & Dermal Fillers)', icon: 'stethoscope', slug: 'cosmoderma', paragraphs: ['Niaz Net Tehran supports brand registration and market development for aesthetic medicine and cosmoderma products, including botulinum toxin (Botox) and dermal fillers. We coordinate with brand owners and qualified manufacturers to explore product portfolios, target markets, documentation needs, and suitable commercial partners.', 'Our capabilities include coordination for brand registration, sourcing of suitable raw materials, and discussions with qualified partners regarding production-line setup or local manufacturing. Product eligibility, quality requirements, and regulatory approvals must be confirmed for each destination market before commercial activity.'] },
  { name: 'API', icon: 'flask', slug: 'api-supply', paragraphs: ['We support sourcing and commercial coordination for Active Pharmaceutical Ingredients (APIs) and selected pharmaceutical raw materials, connecting buyers with manufacturers and suppliers for evaluation. Coordination may cover product specifications, quality documentation requests, quotations, minimum order quantities, and supply terms.', 'Supplier qualification and technical acceptance remain subject to the buyer’s quality requirements and applicable regulations. We help keep communication and documentation requests organized so the relevant quality, regulatory, procurement, and commercial teams can evaluate the opportunity efficiently.'] },
  { name: 'Medical Devices & Healthcare Equipment', icon: 'stethoscope', slug: 'medical-devices', paragraphs: ['We support commercial sourcing and market-development discussions for medical devices and healthcare equipment, helping manufacturers and potential distributors assess product fit, target channels, and local partner opportunities.', 'Our coordination can include product portfolio discussions, quotation and supply-term follow-up, and requests for technical and regulatory documentation. Product registration, conformity, and import requirements are assessed according to the destination market and the specific device category.'] },
  { name: 'CBD Products & Market Coordination', icon: 'leaf', slug: 'cbd-products', paragraphs: ['Niaz Net Tehran can coordinate preliminary commercial discussions for CBD-related products where the product category and intended market allow such activity. Early-stage work may include clarifying product specifications, identifying potential business counterparts, and mapping the questions that must be resolved before a transaction can proceed.', 'CBD laws and product classifications vary significantly by jurisdiction and product type. No sourcing, import, distribution, or marketing activity should proceed until legality, licensing, product status, and all applicable regulatory requirements have been independently confirmed for the relevant markets.'] },
  { name: 'Import & Export Services', icon: 'package-check', slug: 'import-export', paragraphs: ['We coordinate import and export opportunities between suppliers, manufacturers, buyers, and distribution partners across international markets. Support may include supplier and buyer communication, quotation collection, commercial-term coordination, document follow-up, and coordination with freight, customs, and logistics parties.', 'Each transaction is assessed according to the product, origin and destination markets, applicable trade rules, and agreed Incoterms. Customs clearance, permits, payment arrangements, shipping, and compliance are handled with the relevant authorized parties; specific requirements and responsibilities are confirmed before execution.'] },
  { name: 'Exclusive Agency & Brand Representation', icon: 'handshake', slug: 'exclusive-agency', paragraphs: ['We help manufacturers and brand owners explore exclusive agency arrangements with suitable local partners. The process can include market and partner assessment, territory and channel discussions, commercial planning, and coordination of the negotiation process.', 'Agency arrangements are structured around clearly defined products, territories, responsibilities, performance expectations, and contract terms. We aim to align the parties on a practical framework for long-term market development while ensuring that final commitments are recorded in an agreed written contract.'] },
  { name: 'Business Development', icon: 'chart-no-axes-combined', slug: 'business-development', paragraphs: ['Niaz Net Tehran helps companies identify and develop commercial opportunities through structured outreach, partner engagement, market prioritization, and follow-up with relevant stakeholders. We focus on connecting business objectives with practical opportunities for cooperation and revenue growth.', 'Depending on the project, support may include preparing a development roadmap, coordinating meetings, evaluating potential partners, and maintaining a clear pipeline of next steps. Scope, targets, and reporting expectations are agreed with the client before work begins.'] },
  { name: 'Private Chamber of Commerce', icon: 'landmark', slug: 'chamber-of-commerce', paragraphs: ['We facilitate business-to-business engagement and trade-network development with relevant chambers of commerce, industry associations, and institutional stakeholders, where appropriate. This can help companies identify networking opportunities, understand the business environment, and establish contact with potential commercial counterparts.', 'Our role is coordination and relationship support, not a claim of official affiliation or guaranteed access. Any formal membership, endorsement, certification, or institutional service is subject to the relevant organization’s own process and approval.'] },
  { name: 'Market Entry Strategy & Solutions', icon: 'map-pinned', slug: 'market-entry', paragraphs: ['We help companies assess how to enter a new market by clarifying target customer segments, routes to market, potential partners, competitive considerations, and commercial priorities. The goal is to translate a broad expansion objective into a practical sequence of decisions and actions.', 'Depending on the project, we can coordinate market information gathering, partner discussions, distribution planning, and regulatory questions with specialist stakeholders. Recommendations are tailored to the product category, the destination market, and the client’s available resources and risk appetite.'] },
  { name: 'Licensing & Strategic Partnerships', icon: 'handshake', slug: 'licensing-partnerships', paragraphs: ['We support the development of licensing and strategic partnership opportunities between rights holders, manufacturers, technology owners, and local commercial partners. This may include coordinating introductory discussions, clarifying the intended scope of cooperation, and organizing commercial and technical information for review.', 'Potential agreements can address territory, permitted use, responsibilities, intellectual property, quality expectations, milestones, and commercial terms. Legal, regulatory, and technical review should be completed by the relevant qualified advisers before any binding agreement is signed.'] },
  { name: 'Pharmaceutical Finished Products', icon: 'pill', slug: 'pharmaceutical-products', paragraphs: ['We coordinate commercial discussions for pharmaceutical finished products between manufacturers, buyers, and potential distribution partners. Depending on the opportunity, support may include product portfolio review, supplier communication, quotation requests, supply planning, and coordination of required product information.', 'Product availability, marketing authorization, import eligibility, quality requirements, and supply terms must be confirmed for each market and product. Our role is to facilitate communication among commercial, quality, regulatory, and logistics stakeholders rather than replace their formal approvals.'] },
  { name: 'Product Registration & Dossier Coordination', icon: 'file-check', slug: 'product-registration', paragraphs: ['We coordinate the collection and follow-up of product registration documents and technical dossiers between manufacturers, brand owners, and local regulatory teams. This can include tracking requested documents, clarifying formats, organizing open questions, and following up on pending items.', 'Required documents, submission formats, translations, legalization, and review timelines depend on the product and the destination authority. Final dossier content and regulatory submissions must be validated by the responsible manufacturer and authorized regulatory professionals.'] },
  { name: 'Regulatory Affairs & Compliance Coordination', icon: 'shield-check', slug: 'regulatory-affairs', paragraphs: ['We help coordinate communication around regulatory requirements for products entering or expanding within target markets. This may include organizing documentation requests, tracking regulatory questions, and aligning manufacturers, local representatives, and regulatory specialists.', 'Regulatory decisions and approvals remain the responsibility of the competent authorities and appropriately authorized professionals. Our coordination is intended to improve visibility and follow-up, while product-specific requirements are confirmed case by case.'] },
  { name: 'Contract Manufacturing (CMO)', icon: 'factory', slug: 'contract-manufacturing', paragraphs: ['We facilitate discussions between companies seeking contract manufacturing and manufacturers with potentially suitable capabilities. Coordination may include product and capacity requirements, manufacturing scope, quality documentation requests, timelines, packaging needs, and preliminary commercial terms.', 'Manufacturing suitability, quality agreements, audits, technical transfer, validation, and applicable GMP or other standards must be evaluated by the responsible technical and quality teams. Any manufacturing relationship proceeds only after the parties complete due diligence and agree on contractual responsibilities.'] },
  { name: 'Technology Transfer & Local Production', icon: 'workflow', slug: 'technology-transfer', paragraphs: ['We help coordinate technology-transfer opportunities between technology owners, product developers, and prospective local manufacturers. Early discussions can clarify the proposed scope, technical information required, production objectives, and the parties’ roles in evaluating feasibility.', 'A successful transfer may require technical assessment, intellectual-property review, quality planning, training, validation, and regulatory approval. These workstreams are defined with the relevant experts and captured in the final project and contractual documents.'] },
  { name: 'International Business Development', icon: 'globe', slug: 'international-business-development', paragraphs: ['We help companies build cross-border business relationships and explore opportunities across selected international markets. Our work can include coordinating introductions, supporting partner evaluation, aligning commercial expectations, and following up on opportunities across different markets.', 'International projects often involve different business practices, documentation needs, regulatory conditions, and logistics constraints. We help maintain a coordinated process and clear communication, while transaction-specific obligations are confirmed by the relevant parties and advisers.'] },
  { name: 'Supply Chain Solutions', icon: 'truck', slug: 'supply-chain-solutions', paragraphs: ['We coordinate supply-chain communication among buyers, suppliers, manufacturers, freight providers, and other relevant parties. Depending on the project, this may include order and shipment follow-up, documentation tracking, delivery planning, and escalation of outstanding commercial or operational questions.', 'The exact scope depends on the transaction, product requirements, and the parties’ responsibilities. Shipping, customs, insurance, and handling arrangements are confirmed with the authorized providers and documented before dispatch.'] },
  { name: 'Private Label & Own-Brand Development', icon: 'tags', slug: 'private-label', paragraphs: ['We support businesses interested in developing products under their own brand by coordinating discussions with potential manufacturers and suppliers. The process may cover product concept, specifications, packaging options, target pricing, minimum order quantities, and preliminary production timelines.', 'Final feasibility depends on manufacturer capability, product category, intellectual-property and trademark considerations, quality requirements, and destination-market regulations. We help structure the discussions so the client can assess options before committing to development or production.'] },
  { name: 'Pet Food & Animal Nutrition', icon: 'paw', slug: 'pet-food', paragraphs: ['Niaz Net Tehran supports commercial sourcing and market-development discussions for pet food, treats, and animal nutrition products, helping manufacturers connect with importers, distributors, retailers, and other suitable partners in target markets. We can coordinate portfolio introductions, product specifications, quotation requests, packaging and private-label discussions, and supply expectations.', 'Product registration, ingredient rules, labeling, veterinary and feed requirements, and import eligibility vary by destination market. Each opportunity should be reviewed with the responsible manufacturer and qualified local specialists before supply or market launch.'] },
  
  { name: 'Nutraceuticals & Wellness Products', icon: 'leaf', slug: 'nutraceuticals', paragraphs: ['We support commercial sourcing and market-development discussions for nutraceuticals, wellness products, and related categories, connecting potential buyers with manufacturers and business partners for evaluation.', 'Product classification, permitted claims, labeling, quality documentation, and import eligibility differ by market. Each opportunity should be reviewed against applicable rules and the client’s technical and commercial requirements before any market launch.'] }
];

const serviceGrid = document.getElementById('serviceGrid');

const serviceIcons = {
  flask: '<path d="M9 3h6"/><path d="M10 3v7l-5.5 9.2A2 2 0 0 0 6.2 22h11.6a2 2 0 0 0 1.7-2.8L14 10V3"/><path d="M8 15h8"/>',
  pill: '<path d="m10.5 20.5 10-10a5.7 5.7 0 0 0-8-8l-10 10a5.7 5.7 0 0 0 8 8Z"/><path d="m8.5 8.5 7 7"/>',
  'file-check': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="m8 15 3 3 5-6"/>',
  'shield-check': '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
  factory: '<path d="M2 22V8l7 4V8l7 4V4h6v18Z"/><path d="M6 16h.01M10 16h.01M14 16h.01M18 16h.01"/>',
  workflow: '<rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M6 9v3a3 3 0 0 0 3 3h6"/><path d="m12 12 3 3-3 3"/>',
  handshake: '<path d="m11 17 2 2a2 2 0 0 0 3-3"/><path d="m14 14 4 4a2 2 0 0 0 3-3l-6-6"/><path d="m3 11 6-6 5 1 3 3"/><path d="m2 12 5 5a2 2 0 0 0 3-3l-2-2"/><path d="m8 12 4-4 4 1"/>',
  gem: '<path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M2 9h20M10 3 8 9l4 13 4-13-2-6"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20"/>',
  'chart-no-axes-combined': '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-5 5"/>',
  truck: '<path d="M10 17h4V5H2v12h3"/><path d="M14 9h5l3 4v4h-3"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="16.5" cy="17.5" r="2.5"/>',
  'package-check': '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="M3 8v9l9 5 9-5V8"/><path d="M12 13v9"/><path d="m9 16 2 2 4-4"/>',
  tags: '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  dumbbell: '<path d="M3 9v6"/><path d="M6 6v12"/><path d="M18 6v12"/><path d="M21 9v6"/><path d="M6 12h12"/><path d="M3 10H1v4h2"/><path d="M21 10h2v4h-2"/>',
  baby: '<path d="M9 3h6"/><path d="M10 3v4l-2 2v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V9l-2-2V3"/><path d="M8 12h8"/><path d="M10 15h4"/>',
  stethoscope: '<path d="M6 3v5a4 4 0 0 0 8 0V3"/><path d="M6 3H4m10 0h2"/><path d="M10 12v2a6 6 0 0 0 12 0v-2"/><circle cx="22" cy="10" r="2"/>',
  leaf: '<path d="M11 20A8 8 0 0 1 3 12C3 5 12 3 21 3c0 9-2 18-10 18Z"/><path d="M7 17 17 7"/>',
  paw: '<path d="M12 14c-3.5 0-6 2.1-6 4.5S8 22 12 22s6-1.1 6-3.5S15.5 14 12 14Z"/><ellipse cx="5.5" cy="10" rx="2" ry="3"/><ellipse cx="10" cy="6.5" rx="2" ry="3"/><ellipse cx="16" cy="6.5" rx="2" ry="3"/><ellipse cx="20.5" cy="10" rx="2" ry="3"/>',
  landmark: '<path d="M3 21h18M5 18h14M4 10h16M3 7l9-4 9 4M6 10v8m4-8v8m4-8v8m4-8v8"/>',
  'map-pinned': '<path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3Z"/><path d="M9 3v15m6-12v15"/><path d="M15 8a2 2 0 1 0 0.01 0Z"/><path d="M15 10v3"/>'
};

serviceGrid.innerHTML = '';

const serviceDisplayOrder = [
  'brand-registration','api-supply','sports-nutrition','infant-formula','cbd-products',
  'business-development','pharmaceutical-products','nutraceuticals','pet-food','medical-devices',
  'technology-transfer','private-label','contract-manufacturing','cosmoderma','regulatory-affairs',
  'licensing-partnerships','supply-chain-solutions'
];
const vipServiceSlugs = ['chamber-of-commerce','exclusive-agency','market-entry'];
const serviceDisplayLabels = {
  'brand-registration':'Brand Registration',
  'api-supply':'API',
  'sports-nutrition':'Sport Nutrition',
  'infant-formula':'Infant Formula & Nutrition',
  'cbd-products':'CBD',
  'business-development':'BD + R&D',
  'pharmaceutical-products':'FDF / Finished Products',
  'nutraceuticals':'Vitamin & Supplements',
  'pet-food':'Pet Food',
  'medical-devices':'Medical Devices',
  'technology-transfer':'Technology Transfer',
  'private-label':'Private Label Orders',
  'contract-manufacturing':'CMO',
  'cosmoderma':'Cosmoderma',
  'regulatory-affairs':'Regulatory',
  'licensing-partnerships':'Licensing Strategy',
  'supply-chain-solutions':'Supply Chain'
};
const serviceIconAssets = {
  'brand-registration':'brand.png','api-supply':'api.png','sports-nutrition':'sports-nutrition.png',
  'infant-formula':'infant-formula.png','cbd-products':'cbd.png','business-development':'business-development.png',
  'pharmaceutical-products':'pharmaceutical-products.png','nutraceuticals':'nutraceuticals.png','pet-food':'pet-food.png',
  'medical-devices':'medical-devices.png','technology-transfer':'technology-transfer.png','private-label':'private-label.png',
  'contract-manufacturing':'contract-manufacturing.png','cosmoderma':'cosmoderma.png','regulatory-affairs':'regulatory-affairs.png',
  'licensing-partnerships':'licensing-partnerships.png','supply-chain-solutions':'supply-chain-solutions.png',
  'chamber-of-commerce':'chamber-of-commerce.png','exclusive-agency':'exclusive-agency.png','market-entry':'market-entry.png',
  'import-export':'import-export-globe.png'
};
const iconPath = slug => `images/service-icons/${serviceIconAssets[slug] || 'brand.png'}`;
const vipList = document.getElementById('vipServiceList');
vipServiceSlugs.forEach(slug=>{
  const item=serviceItems.find(x=>x.slug===slug);
  if(!item)return;
  const a=document.createElement('a');
  a.className='vip-service-link';a.href=`index.html?service=${encodeURIComponent(item.slug)}`;a.target='_self';
  const vipLabel = slug==='chamber-of-commerce' ? 'Private Chamber of Commerce' : slug==='exclusive-agency' ? 'Exclusive Agency' : slug==='market-entry' ? 'Market Entry' : item.name;
  a.innerHTML=`<img src="${iconPath(slug)}" alt="" loading="lazy"><span class="vip-label">${vipLabel}</span>`;
  vipList.appendChild(a);
});

/* Import / Export is presented as the full-width lead card; its original service URL is retained. */
const importExportItem = serviceItems.find(item=>item.slug==='import-export');
if(importExportItem){
  const card=document.createElement('a');
  card.className='service-card import-export-card';
  card.dataset.serviceSlug=importExportItem.slug;
  card.href=`index.html?service=${encodeURIComponent(importExportItem.slug)}`;
  card.target='_self';
  card.innerHTML=`
    <span class="service-icon" aria-hidden="true"><img src="${iconPath(importExportItem.slug)}" alt="" loading="lazy"></span>
    <h3>IMPORT / EXPORT</h3>
  `;
  serviceGrid.appendChild(card);
}
serviceDisplayOrder.forEach(slug=>{
  const item=serviceItems.find(x=>x.slug===slug);
  if(!item)return;
  const {icon} = item;
  const card=document.createElement('a');
  card.className='service-card'+(slug==='cbd-products'?' cbd-service':'');
  card.dataset.serviceSlug=slug;
  card.href=`index.html?service=${encodeURIComponent(slug)}`;
  card.target='_self';
  card.innerHTML=`
    <span class="service-icon" aria-hidden="true"><img src="${iconPath(slug)}" alt="" loading="lazy"></span>
    <h3>${serviceDisplayLabels[slug] || item.name}</h3>
  `;
  serviceGrid.appendChild(card);
});

const langButton=document.getElementById('langButton');
const bilingualMap=[
  ['Home','خانه'],['About Us','درباره ما'],['Services','خدمات'],['Industries','صنایع'],['Partners','شرکای تجاری'],['Projects','پروژه‌ها'],['News','اخبار'],['Contact','تماس با ما'],['GET IN TOUCH','ارتباط با ما'],
  ['Connecting markets worldwide','اتصال بازارها در سراسر جهان'],['Your Global Business Development ','شریک توسعه کسب‌وکار جهانی شما '],
  ['Partner',''],['Connecting manufacturers, brands, technologies and markets across pharmaceuticals, healthcare, nutrition and related industries.','ایجاد ارتباط میان تولیدکنندگان، برندها، فناوری‌ها و بازارهای دارویی، سلامت و تغذیه.'],
  ['BECOME OUR PARTNER','همکاری با ما'],['Global Partners','شرکای جهانی'],['Business Contact','اطلاعات تماس تجاری'],['What helps us respond faster?','چه اطلاعاتی به پاسخ سریع‌تر کمک می‌کند؟'],['Start a conversation','شروع گفتگو'],['Contact Our Team','تماس با تیم ما'],['Full name *','نام و نام خانوادگی *'],['Company *','شرکت *'],['Job title / Position','عنوان شغلی / سمت'],['Phone / WhatsApp *','تلفن / واتساپ *'],['Business email *','ایمیل کاری *'],['Request type','نوع درخواست'],['Your request and relevant details *','درخواست و جزئیات مرتبط *'],['PREPARE INQUIRY EMAIL →','آماده‌سازی ایمیل درخواست →'],['Import / Export','واردات / صادرات'],['Distribution or exclusive agency','توزیع یا نمایندگی انحصاری'],['Pharmaceuticals / API / healthcare','دارو / ماده مؤثره / سلامت'],['Sports nutrition / supplements','تغذیه ورزشی / مکمل‌ها'],['Pet food / animal nutrition','غذای حیوانات / تغذیه دام'],['Brand development / registration','توسعه / ثبت برند'],['Technology transfer / contract manufacturing','انتقال فناوری / تولید قراردادی'],['Other business inquiry','سایر درخواست‌های تجاری'],['Home','خانه']
];
let currentLang='en';
function applyLanguage(lang){
  currentLang=lang;
  try{document.cookie='niaznet-language='+lang+'; Path=/; Max-Age=31536000; SameSite=Lax; Secure';document.cookie='niaznet-manual-language='+lang+'; Path=/; Max-Age=31536000; SameSite=Lax; Secure'}catch(e){}
  document.documentElement.lang=lang==='fa'?'fa':'en';
  document.documentElement.dir=lang==='fa'?'rtl':'ltr';
  document.body.dir=lang==='fa'?'rtl':'ltr';
  document.body.dataset.contentLang=lang;
  try{localStorage.setItem('niaznet-language',lang)}catch(e){}
  langButton.textContent=lang==='fa'?'فارسی⌄':'EN⌄';
  document.querySelectorAll('.nav-links>a').forEach(a=>{
    const t=a.dataset.enText || a.textContent.trim();
    a.dataset.enText=t;
    const hit=bilingualMap.find(x=>x[0]===t);
    if(hit)a.textContent=lang==='fa'?hit[1]:hit[0];
  });
  document.querySelectorAll('.eyebrow,.hero h1 span,.hero p,.partner-hero-btn,.section-title').forEach(el=>{
    const original=el.dataset.enText || el.textContent.trim();
    el.dataset.enText=original;
    const hit=bilingualMap.find(x=>x[0]===original);
    if(hit)el.textContent=lang==='fa'?hit[1]:hit[0];
  });

  const exactTranslations={
   'About our company':'درباره شرکت ما','Our Services':'خدمات ما','Industries':'صنایع','Partners':'شرکای تجاری','News':'اخبار','Contact':'تماس',
   'Pharmaceuticals & APIs':'داروها و مواد مؤثره دارویی','Healthcare & Medical Devices':'سلامت و تجهیزات پزشکی','Sports Nutrition & Supplements':'تغذیه ورزشی و مکمل‌ها','Infant Nutrition':'تغذیه نوزاد','Pet Food & Animal Nutrition':'غذای حیوانات و تغذیه دام','Import, Export & Ingredients':'واردات، صادرات و مواد اولیه','Brand Development & Agency':'توسعه برند و نمایندگی','Technology Transfer & Manufacturing':'انتقال فناوری و تولید','Have a product or market in mind?':'محصول یا بازار مشخصی در نظر دارید؟',
   'Strategic Distribution & Trade':'توزیع راهبردی و تجارت','Contact Our Team':'تماس با تیم ما','Your request and relevant details *':'درخواست و جزئیات مرتبط *','Business inquiry — Niaz Net Tehran':'درخواست تجاری — نیاز نت تهران',
   'Your Global Business Development Partner':'شریک شما در توسعه کسب‌وکار بین‌المللی','Global Partners':'شرکای تجاری جهانی','Why Choose Niaz Net?':'چرا نیاز نت؟',
   'Global Sourcing':'تأمین جهانی','Access to high quality products from trusted manufacturers worldwide.':'دسترسی به محصولات باکیفیت از تولیدکنندگان معتبر در سراسر جهان.',
   'Exclusive Agency':'نمایندگی انحصاری','Get exclusive rights for brands and products in your target markets.':'دریافت حقوق انحصاری برندها و محصولات در بازارهای هدف شما.',
   'Technology Transfer':'انتقال فناوری','Advanced technologies and know-how for local manufacturing.':'فناوری‌های پیشرفته و دانش فنی برای تولید داخلی.',
   'Brand Development':'توسعه برند','Build, grow and manage powerful brands in new and existing markets.':'ایجاد، توسعه و مدیریت برندهای قدرتمند در بازارهای جدید و موجود.',
   'Regulatory Expertise':'تخصص امور رگولاتوری','Full support in registration, compliance and regulatory affairs.':'پشتیبانی کامل در ثبت، انطباق و امور مقرراتی.',
   'Market Entry':'ورود به بازار','Strategic support to enter and grow in new and emerging markets.':'پشتیبانی راهبردی برای ورود و توسعه در بازارهای جدید و نوظهور.',
   'Private Label':'تولید با برند اختصاصی','Develop your own brand with our end-to-end solutions.':'برند اختصاصی خود را با راهکارهای جامع ما توسعه دهید.',
   'Licensing Partnerships':'همکاری‌های مبتنی بر مجوز','Build long-term partnerships and licensing opportunities for mutual growth.':'ایجاد همکاری‌های بلندمدت و فرصت‌های صدور مجوز برای رشد متقابل.',
   'Our Global Network':'شبکه جهانی ما','Connected markets · Trade coordination · Partner development':'بازارهای به‌هم‌پیوسته · هماهنگی تجاری · توسعه همکاری‌ها',
   'A snapshot of current commercial agreements and contract-manufacturing projects across nutrition, healthcare and industrial sectors.':'مروری بر توافق‌های تجاری و پروژه‌های تولید قراردادی در حوزه‌های تغذیه، سلامت و صنایع.',
   'Sports Nutrition Brands':'برندهای تغذیه ورزشی','Infant Formula Manufacturers':'تولیدکنندگان شیرخشک نوزاد','Infant Formula Production Lines':'خطوط تولید شیرخشک نوزاد',
   'Botulinum Toxin Dermal Fillers':'سم بوتولینوم و فیلرهای پوستی','CBD Products':'محصولات CBD','Vitamin Supplements':'مکمل‌های ویتامینی',
   'Medical Devices':'تجهیزات پزشکی','Dog Food':'غذای حیوانات خانگی','Industrial Production Lines':'خطوط تولید صنعتی',
   'CMO Project — Africa':'پروژه تولید قراردادی — آفریقا','CMO Project — CIS':'پروژه تولید قراردادی — کشورهای مستقل مشترک‌المنافع','CMO Pilot — Africa':'پایلوت تولید قراردادی — آفریقا',
   'News Events':'اخبار و رویدادها','Meet NIAZ NET at upcoming industry events':'در رویدادهای پیش‌روی صنعت با NIAZ NET دیدار کنید',
   'Contact us to discuss market development, sourcing and international cooperation opportunities.':'برای گفت‌وگو درباره توسعه بازار، تأمین و فرصت‌های همکاری بین‌المللی با ما تماس بگیرید.',
   'Let\'s Build Success Together':'بیایید با هم موفقیت بسازیم','We are ready to be your trusted partner in growth.':'ما آماده‌ایم شریک قابل اعتماد شما در مسیر رشد باشیم.',
   'Email':'ایمیل','Tehran Office':'دفتر تهران','Tehran Address':'نشانی تهران','Our Offices':'دفاتر ما','Iran Office':'دفتر ایران','Türkiye Office':'دفتر ترکیه',
   'Quick Links':'دسترسی سریع','Subscribe to Our Newsletter':'عضویت در خبرنامه','Get the latest updates and industry insights.':'از آخرین اخبار و تحلیل‌های تخصصی مطلع شوید.',
   'SUBSCRIBE':'عضویت','Privacy Policy':'سیاست حفظ حریم خصوصی','Terms of Use':'شرایط استفاده','Sitemap':'نقشه سایت','All Services':'همه خدمات'
  };
  document.querySelectorAll('h1,h2,h3,h4,label,button,a,p,li,small,option,span').forEach(el=>{
    if(el.children.length===0){const en=el.dataset.enText || el.textContent.trim();if(exactTranslations[en]){el.dataset.enText=en;el.textContent=lang==='fa'?exactTranslations[en]:en;}}
  });
}
try{const savedLanguage=localStorage.getItem('niaznet-language');const requestedLanguage=new URLSearchParams(location.search).get('lang');if(requestedLanguage==='fa'||savedLanguage==='fa')applyLanguage('fa')}catch(e){}

// Service detail views load in the current tab, powered by this single HTML file.
const requestedService = new URLSearchParams(window.location.search).get('service');
if (requestedService) {
  const selectedService = serviceItems.find(item => item.slug === requestedService);
  if (selectedService) {
    document.title = `${selectedService.name} | NIAZ NET TEHRAN`;
    const main = document.querySelector('main');
    if (requestedService === 'brand-registration') {
      main.innerHTML = `
      <section class="hero brand-registration-page" id="home">
        <div class="container hero-inner">
          <div class="hero-copy">
            <div class="eyebrow">NIAZ NET · INTERNATIONAL BRAND PARTNERSHIPS</div>
            <h1>Find the Right Brand. <span>Unlock New Markets.</span></h1>
            <p>From international brand partnerships to brand registration and market growth, we help turn your business ambitions into practical opportunities.</p>
            <div class="hero-actions service-page-actions">
              <a class="btn" href="index.html#services" aria-label="Back to all services">← BACK TO ALL SERVICES</a>
              <a class="btn btn-outline" href="mailto:info@niaznet.net?subject=Business%20Inquiry">CONTACT OUR TEAM →</a>
            </div>
          </div>
          <div class="hero-showcase" aria-label="Featured services">
            <div class="showcase-image active"><img src="images/00 -Global Products, Global Opportunities.png" alt="Global Products, Global Opportunities" onerror="this.closest('.showcase-image').classList.add('image-missing')"></div>
            <div class="showcase-image"><img src="images/08 -all 2 .png" alt="Global Product Portfolio" onerror="this.closest('.showcase-image').classList.add('image-missing')"></div>
            <div class="showcase-image"><img src="images/10-Global Brand, Ingredients, and Export Solutions.png" alt="Global Brand, Ingredients, and Export Solutions" onerror="this.closest('.showcase-image').classList.add('image-missing')"></div>
            <div class="showcase-image"><img src="images/11-brand-acquisition-registration.png" alt="Brand Acquisition & Registration" onerror="this.closest('.showcase-image').classList.add('image-missing')"></div>
</div>
        </div>
      </section>
      <section class="container section brand-registration-details" style="padding-top:24px;max-width:1120px">
        <div class="panel brand-registration-copy" style="padding:clamp(24px,4vw,46px);font-size:15px;line-height:1.85;color:var(--muted)">
          <h2 class="brand-registration-kicker">YOUR BRAND. YOUR MARKET. YOUR NEXT OPPORTUNITY.</h2>
          <h3 class="brand-registration-subtitle">Build stronger brand partnerships with NIAZ NET</h3>
          <p class="brand-registration-intro">With business reach and coordination across <strong>IRAN, Türkiye and Spain</strong>, NIAZ NET helps companies connect with established international brands, explore commercial agreements and representation opportunities, and pursue brand acquisition and registration for their target markets. We bring the conversations, market goals and next steps together—so your business can move forward with greater clarity and confidence.</p>

          <h3 class="brand-registration-question">Already own a brand?</h3>
          <p>We can help you develop its presence in your target market, identify suitable distributors and commercial partners, strengthen market positioning, and explore new routes to visibility and sustainable growth.</p>

          <h3 class="brand-registration-question">Looking for an international brand for your products?</h3>
          <p>We can help identify brands that fit your product portfolio and business goals, facilitate introductions and commercial discussions, and coordinate the steps toward potential brand representation, acquisition and market registration.</p>

          <p class="brand-registration-disclaimer">Every opportunity is assessed individually; agreements depend on the brand owner’s approval and applicable market requirements.</p>

          <h3 class="brand-registration-categories-title">Brand categories we support</h3>
          <div class="brand-category-grid">
            <div class="brand-category-item"><strong>Pharmaceutical brands</strong><span>Prescription and non-prescription product portfolios, subject to local requirements.</span></div>
            <div class="brand-category-item"><strong>Cosmetics &amp; personal care</strong><span>Beauty, skincare, cosmetic and personal hygiene products.</span></div>
            <div class="brand-category-item"><strong>Sports &amp; performance nutrition</strong><span>Sports brands, sports supplements and protein powders.</span></div>
            <div class="brand-category-item"><strong>Vitamins &amp; dietary supplements</strong><span>Vitamins, minerals and nutritional supplement brands.</span></div>
            <div class="brand-category-item"><strong>Aesthetic medicine &amp; dermatology</strong><span>Botulinum toxin products, dermal fillers, creams and dermatology ranges.</span></div>
            <div class="brand-category-item"><strong>Medical devices &amp; healthcare equipment</strong><span>Medical technologies, devices and healthcare product portfolios.</span></div>
          </div>

          <p class="brand-registration-closing">Whether you are preparing to launch a product, searching for a trusted international brand, or ready to take an existing brand into its next stage of growth, NIAZ NET can help you explore the right connections and map out the next steps.</p>

          <div class="brand-registration-actions">
            <a class="btn" href="mailto:info@niaznet.net?subject=Brand%20Registration%20and%20International%20Brand%20Partnerships">LET’S DISCUSS YOUR BRAND →</a>
            <a class="btn btn-outline" href="index.html#services">← BACK TO ALL SERVICES</a>
          </div>
          <p class="brand-registration-footnote">Brand availability, commercial agreements, product registration and market access are subject to brand-owner decisions and the relevant regulatory authorities in each market.</p>
        </div>
      </section>`;
    } else if (requestedService === 'api-supply') {
      document.title='API & Pharmaceutical Ingredients | NIAZ NET';
      main.innerHTML=`<section class="hero brand-registration-page"><div class="container hero-inner"><div class="hero-copy"><div class="eyebrow">NIAZ NET · API &amp; PHARMACEUTICAL INGREDIENTS</div><h1>Pharmaceutical Ingredients. <span>Qualified Supply Opportunities.</span></h1><p>Search our working portfolio of active pharmaceutical ingredients and selected pharmaceutical intermediates. Filter by material type and identify products for a focused sourcing inquiry.</p>
<div class="hero-actions service-page-actions"><a class="btn" href="index.html#services">← BACK TO ALL SERVICES</a><a class="btn btn-outline" href="mailto:info@niaznet.net?subject=API%20Inquiry">CONTACT OUR TEAM →</a></div></div><div class="hero-showcase" aria-label="API sourcing and pharmaceutical ingredients slideshow"><div class="showcase-image active"><img src="images/14-api-pharmaceutical-ingredients.png" alt="Pharmaceutical ingredient sourcing services"></div><div class="showcase-image"><img src="images/08 -all 2 .png" alt="Pharmaceutical supply coordination services" loading="lazy"></div><div class="showcase-image"><img src="images/00 -Global Products, Global Opportunities.png" alt="International pharmaceutical sourcing coordination" loading="lazy"></div></div></div></section>
      <section class="container section" style="max-width:1180px;padding-top:24px"><div class="panel" style="padding:28px"><div class="eyebrow">PRODUCT PORTFOLIO</div><h2>Search the API &amp; Ingredients Catalogue</h2><p style="color:var(--muted);line-height:1.8">API means Active Pharmaceutical Ingredient. Intermediates are materials or processed forms used during manufacturing. Excipients are non-active formulation ingredients. Confirm final classification, grade and specifications with the supplier.</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;margin:18px 0"><input id="apiSearchInput" type="search" placeholder="Search product name..." style="flex:2;min-width:220px;padding:12px"><select id="apiCategoryFilter" style="flex:1;min-width:160px;padding:12px"><option>All</option><option>API</option><option>Intermediate</option><option>Excipient</option></select><select id="apiSortDirection" style="padding:12px"><option value="asc">A to Z</option><option value="desc">Z to A</option></select></div>
      <p id="apiResultsCount" aria-live="polite">Loading catalogue…</p><div style="overflow-x:auto"><table id="apiCatalogTable" style="width:100%;min-width:480px;border-collapse:collapse;text-align:left"><thead><tr><th data-sort="number">NO. ↕</th><th data-sort="name">PRODUCT / MATERIAL ↕</th><th data-sort="category">CATEGORY ↕</th></tr></thead><tbody id="apiCatalogBody"></tbody></table></div><p id="apiNoResults" style="display:none">No matching materials found.</p>
      <p style="margin-top:22px;color:var(--muted);line-height:1.8">Catalogue classification is indicative and based on the material name and typical pharmaceutical use. Some materials may have a different regulatory role depending on formulation, grade, concentration and intended use. Confirm the current supplier specification, compendial standard and regulatory classification before procurement.</p><div class="sports-nutrition-actions"><a class="btn" href="mailto:info@niaznet.net?subject=API%20Sourcing%20Inquiry">SEND AN API INQUIRY →</a><a class="btn btn-outline" href="index.html#services">← BACK TO ALL SERVICES</a></div></div></section>
      <style>#apiCatalogTable th,#apiCatalogTable td{padding:12px;border-bottom:1px solid var(--border);font-size:13px}#apiCatalogTable th{cursor:pointer;color:var(--text)}#apiCatalogTable td{color:var(--muted)}@media(max-width:650px){#apiSearchInput,#apiCategoryFilter,#apiSortDirection{width:100%;flex:auto}}</style>`;
      (async()=>{const status=document.getElementById('apiResultsCount');try{const r=await fetch('api-catalog.json');if(!r.ok)throw Error('load failed');const baseData=await r.json();
const additions=[
{name:'Croscarmellose Sodium',category:'Excipient',note:'Superdisintegrant used to promote tablet disintegration.'},
{name:'Dibasic Calcium Phosphate Dihydrate',category:'Excipient',note:'Diluent/filler for solid dosage formulations.'},
{name:'HPMC',category:'Excipient',note:'Hypromellose; used as binder, film former and release-controlling polymer. Confirm viscosity grade.'},
{name:'HPMC 15',category:'Excipient',note:'Hypromellose viscosity grade; confirm manufacturer specification.'},
{name:'HPMC 3',category:'Excipient',note:'Hypromellose viscosity grade; confirm manufacturer specification.'},
{name:'HPMC 4000',category:'Excipient',note:'Hypromellose viscosity grade; confirm manufacturer specification.'},
{name:'HPMC 4000M',category:'Excipient',note:'Hypromellose viscosity grade; confirm manufacturer specification.'},
{name:'HPMC 50',category:'Excipient',note:'Hypromellose viscosity grade; confirm manufacturer specification.'},
{name:'HPMC 6',category:'Excipient',note:'Hypromellose viscosity grade; confirm manufacturer specification.'},
{name:'HPMC K100',category:'Excipient',note:'Hypromellose K-series grade; confirm viscosity and substitution specification.'},
{name:'HPMC K100M',category:'Excipient',note:'High-viscosity hypromellose grade, commonly used for controlled release.'},
{name:'Hypromellose Phthalate',category:'Excipient',note:'Enteric-coating polymer.'},
{name:'Iron Oxide Brown',category:'Excipient',note:'Pharmaceutical colorant; confirm applicable compendial grade.'},
{name:'Iron Oxide Red',category:'Excipient',note:'Pharmaceutical colorant; confirm applicable compendial grade.'},
{name:'Iron Oxide Yellow',category:'Excipient',note:'Pharmaceutical colorant; confirm applicable compendial grade.'},
{name:'Magnesium Stearate',category:'Excipient',note:'Lubricant for tablet and capsule manufacture.'},
{name:'MCC',category:'Excipient',note:'Microcrystalline cellulose; filler and binder.'},
{name:'MCC Silicified',category:'Excipient',note:'Silicified microcrystalline cellulose; filler with improved flow and compactability.'},
{name:'MCC 101',category:'Excipient',note:'Microcrystalline cellulose grade; confirm particle size and specification.'},
{name:'MCC 102',category:'Excipient',note:'Microcrystalline cellulose grade; confirm particle size and specification.'},
{name:'Omeprazole Pellet',category:'Intermediate',note:'Pelletized intermediate containing omeprazole; confirm API assay, composition and enteric protection.'},
{name:'Pregelatinized Starch',category:'Excipient',note:'Multifunctional excipient used as binder, filler and disintegrant.'},
{name:'Simethicone',category:'API',note:'Antifoaming active ingredient in relevant medicinal products; confirm intended regulatory role and specification.'},
{name:'Simethicone 100%',category:'API',note:'Simethicone active material; confirm pharmacopeial grade and specification.'},
{name:'Simethicone 30%',category:'Intermediate',note:'Typically a 30% simethicone preparation/emulsion; confirm carrier and active content.'},
{name:'Simethicone Powder 50%',category:'Intermediate',note:'Powdered preparation typically containing 50% simethicone; confirm carrier and active content.'},
{name:'Sodium Starch Glycolate',category:'Excipient',note:'Superdisintegrant.'},
{name:'Sodium Starch Glycolate Type A',category:'Excipient',note:'Type A sodium starch glycolate; confirm compendial specification.'},
{name:'Sodium Starch Glycolate Type B',category:'Excipient',note:'Type B sodium starch glycolate; confirm compendial specification.'},
{name:'Sodium Stearyl Fumarate',category:'Excipient',note:'Tablet lubricant.'},
{name:'Talc',category:'Excipient',note:'Glidant, anti-adherent and processing aid; confirm pharmaceutical grade.'}
];
const known=new Set(baseData.map(x=>String(x.name).trim().toLowerCase()));
const data=baseData.concat(additions.filter(x=>!known.has(x.name.toLowerCase())));
const search=document.getElementById('apiSearchInput'),filter=document.getElementById('apiCategoryFilter'),dir=document.getElementById('apiSortDirection'),body=document.getElementById('apiCatalogBody'),empty=document.getElementById('apiNoResults');let key='name',asc=true;function render(){const q=search.value.toLowerCase().trim(),cat=filter.value;let a=data.map((x,i)=>({...x,n:i+1})).filter(x=>(cat==='All'||x.category===cat)&&(!q||(x.name+' '+x.category).toLowerCase().includes(q)));a.sort((x,y)=>{const z=key==='number'?x.n-y.n:String(x[key]).localeCompare(String(y[key]));return asc?z:-z});body.innerHTML=a.map(x=>'<tr><td>'+x.n+'</td><td>'+x.name+'</td><td>'+x.category+'</td></tr>').join('');status.textContent='Showing '+a.length+' of '+data.length+' materials';empty.style.display=a.length?'none':'block'}search.addEventListener('input',render);filter.addEventListener('change',render);dir.addEventListener('change',()=>{asc=dir.value==='asc';render()});document.querySelectorAll('#apiCatalogTable th[data-sort]').forEach(t=>t.addEventListener('click',()=>{if(key===t.dataset.sort)asc=!asc;else{key=t.dataset.sort;asc=true}dir.value=asc?'asc':'desc';render()}));render()}catch(e){status.textContent='Catalogue could not be loaded. Contact our team.'}})();
    } else if (requestedService === 'sports-nutrition') {
      main.innerHTML = `
      <section class="hero brand-registration-page sports-nutrition-page" id="home">
        <div class="container hero-inner">
          <div class="hero-copy">
            <div class="eyebrow">NIAZ NET · SPORTS NUTRITION &amp; BULK SUPPLY</div>
            <h1>Build Your Sports Portfolio. <span>Unlock New Opportunities.</span></h1>
            <p>From international sports nutrition brand representation to bulk powder sourcing, we help businesses explore commercial opportunities and develop their product portfolios.</p>
            <div class="hero-actions service-page-actions">
              <a class="btn" href="index.html#services" aria-label="Back to all services">← BACK TO ALL SERVICES</a>
              <a class="btn btn-outline" href="mailto:info@niaznet.net?subject=Business%20Inquiry">CONTACT OUR TEAM →</a>
            </div>
          </div>
          <div class="hero-showcase" aria-label="Sports nutrition and supplement slideshow">
            <div class="showcase-image active"><img src="images/00 -Global Products, Global Opportunities.png" alt="Global Products, Global Opportunities" onerror="this.closest('.showcase-image').classList.add('image-missing')"></div>
            <div class="showcase-image"><img src="images/03-sports-nutrition.png" alt="Sports Nutrition" onerror="this.closest('.showcase-image').classList.add('image-missing')"></div>
            <div class="showcase-image"><img src="images/12-international-sports-brands.png" alt="International Sports Brands" onerror="this.closest('.showcase-image').classList.add('image-missing')"></div>
</div>
        </div>
      </section>
      <section class="container section brand-registration-details" style="padding-top:24px;max-width:1120px">
        <div class="panel brand-registration-copy sports-nutrition-copy" style="padding:clamp(24px,4vw,46px);font-size:15px;line-height:1.85;color:var(--muted)">
          <h2 class="brand-registration-kicker">SPORTS NUTRITION. SMART SOURCING. NEW MARKETS.</h2>
          <h3 class="brand-registration-subtitle">Grow your product portfolio with NIAZ NET</h3>
          <p class="brand-registration-intro">With business reach and coordination across <strong>IRAN, Türkiye and Spain</strong>, NIAZ NET helps companies explore international brand opportunities and coordinate product sourcing for sports nutrition, supplements, and health-oriented food products. We bring commercial conversations, sourcing needs, and market objectives together so your business can move forward with greater clarity.</p>

          <div class="sports-service-block">
            <h3>Sports nutrition &amp; supplement brands</h3>
            <p>We help businesses identify suitable international sports nutrition brands, connect with brand owners, and explore representation agreements and commercial partnerships for target markets. Each opportunity is assessed around your product portfolio, business goals, and intended market.</p>
          </div>

          <div class="sports-service-block">
            <h3>Bulk sports powder supply</h3>
            <p>For manufacturers, packers, and supplement distributors, we coordinate bulk sourcing opportunities for sports powders and performance nutrition products. Product type, technical specifications, order quantities, supplier terms, and documentation needs are reviewed according to each business requirement.</p>
          </div>

          <div class="sports-service-block">
            <h3>Vitamins, wellness supplements &amp; diet-related foods</h3>
            <p>We also help businesses explore brand representation and bulk sourcing opportunities for vitamin products, health-oriented supplements, and food products related to diet and healthy living. Potential supply and partnership options are considered according to the product category, supplier capabilities, and target-market requirements.</p>
          </div>

          <p class="sports-nutrition-disclaimer">All brand representation and supply opportunities are subject to the brand owner’s or supplier’s approval, commercial terms, product availability, and applicable regulatory requirements in the destination market.</p>

          <h3 class="brand-registration-categories-title">Sports brand experience &amp; portfolio</h3>
          <p>Selected sports brands and brand-partnership experience can be presented here. The four spaces below are reserved for brand logos and can be updated when the preferred brands are confirmed.</p>
          <div class="sports-brand-grid" aria-label="Reserved spaces for four sports brand logos">
            <div class="sports-brand-placeholder"><span>SPORTS BRAND LOGO 01<br>To be added</span></div>
            <div class="sports-brand-placeholder"><span>SPORTS BRAND LOGO 02<br>To be added</span></div>
            <div class="sports-brand-placeholder"><span>SPORTS BRAND LOGO 03<br>To be added</span></div>
            <div class="sports-brand-placeholder"><span>SPORTS BRAND LOGO 04<br>To be added</span></div>
          </div>

          <p class="brand-registration-closing">Whether you are looking for a sports nutrition brand, planning to source bulk powders, or expanding into vitamins and health-oriented products, NIAZ NET can help you explore suitable partners and coordinate the next steps.</p>

          <div class="sports-nutrition-actions">
            <a class="btn" href="mailto:info@niaznet.net?subject=Sports%20Nutrition%20Brands%20and%20Bulk%20Supply">LET’S DISCUSS YOUR REQUIREMENTS →</a>
            <a class="btn btn-outline" href="index.html#services">← BACK TO ALL SERVICES</a>
          </div>
          <p class="brand-registration-footnote">Brand representation, product supply, market access, and any required registration remain subject to the relevant brand owner, supplier, and regulatory authorities.</p>
        </div>
      </section>`;
    } else if (requestedService === 'infant-formula') {
      main.innerHTML = `
      <section class="hero brand-registration-page infant-formula-page" id="home">
        <div class="container hero-inner">
          <div class="hero-copy">
            <div class="eyebrow">NIAZ NET · INFANT FORMULA &amp; BABY NUTRITION</div>
            <h1>Build Better Beginnings. <span>Source with Confidence.</span></h1>
            <p>From leading international infant-formula brands to complete manufacturing-line solutions and carefully specified ingredients, NIAZ NET helps connect your project with qualified global partners.</p>
            <div class="hero-actions service-page-actions">
              <a class="btn" href="index.html#services" aria-label="Back to all services">← BACK TO ALL SERVICES</a>
              <a class="btn btn-outline" href="mailto:info@niaznet.net?subject=Business%20Inquiry">CONTACT OUR TEAM →</a>
            </div>
          </div>
          <div class="hero-showcase" aria-label="Infant formula and baby nutrition showcase">
            <div class="showcase-image active"><img src="images/04-infant-formula.png" alt="Infant formula and baby nutrition" onerror="this.closest('.showcase-image').classList.add('image-missing')"></div>
            <div class="showcase-image"><img src="images/Infant%2001.png" alt="Infant nutrition product showcase 1" loading="lazy" decoding="async" onerror="this.closest('.showcase-image').classList.add('image-missing')"></div>
            <div class="showcase-image"><img src="images/Infant%2002.png" alt="Infant nutrition product showcase 2" loading="lazy" decoding="async" onerror="this.closest('.showcase-image').classList.add('image-missing')"></div>
            <div class="showcase-image"><img src="images/Infant%2003.png" alt="Infant nutrition product showcase 3" loading="lazy" decoding="async" onerror="this.closest('.showcase-image').classList.add('image-missing')"></div>
          </div>
        </div>
      </section>
      <section class="container section brand-registration-details" style="padding-top:24px;max-width:1120px">
        <div class="panel brand-registration-copy infant-formula-copy" style="padding:clamp(24px,4vw,46px);font-size:15px;line-height:1.85;color:var(--muted)">
          <h2 class="brand-registration-kicker">GLOBAL INFANT NUTRITION. TECHNICAL KNOW-HOW. TRUSTED SOURCING.</h2>
          <h3 class="brand-registration-subtitle">A stronger foundation for your infant-nutrition business</h3>
          <p class="brand-registration-intro">NIAZ NET supports companies developing or expanding in infant nutrition by coordinating access to established international manufacturers, production technology, and specialist ingredients. We bring commercial opportunities and technical requirements together, helping your team assess the right route from brand partnership to manufacturing and supply.</p>

          <div class="infant-service-block">
            <h3>Leading European, American &amp; Canadian infant-formula brands</h3>
            <p>We help identify high-quality, internationally established infant-formula brands and facilitate discussions with European, American, and Canadian brand owners. Where commercially available, our support can include exploring exclusive agency or distribution agreements, defining target territories, and coordinating the steps needed to evaluate a formal representation partnership. All exclusivity and agency arrangements require approval from the brand owner and agreement on territory, regulatory pathway, and commercial terms.</p>
          </div>

          <div class="infant-service-block">
            <h3>Infant-formula production lines — from concept to equipment sourcing</h3>
            <p>We coordinate project planning and sourcing for two principal manufacturing approaches: <strong>dry-blending production</strong>, using qualified powdered ingredients and controlled blending/packing processes; and a <strong>fresh-milk wet process</strong>, where milk is processed, standardized and concentrated before spray drying and downstream blending or packing. The appropriate process depends on the intended product range, capacity, technical specification, utilities, and investment plan.</p>
            <p style="margin-top:10px">We can help prepare a preliminary production-line concept, identify suitable equipment suppliers in qualified manufacturing countries, and coordinate technical and commercial evaluation. Equipment and facility requirements can be assessed against the applicable GMP framework and relevant FDA requirements for the intended market. Certification, registration, and regulatory acceptance are not automatic and must be confirmed for the specific facility, equipment, product, and jurisdiction by the competent authorities.</p>
          </div>

          <div class="infant-service-block">
            <h3>Specialist ingredients &amp; oxidation-sensitive nutrients</h3>
            <p>We help source infant-formula ingredients and supporting materials from advanced international supply markets, subject to supplier qualification, specification, availability, and destination-market requirements. This can include <strong>DHA and ARA oils</strong>, other specified long-chain polyunsaturated fatty acids, and oxidation-sensitive micronutrients such as <strong>vitamins A, D3, E and K, vitamin C (ascorbic acid), beta-carotene and lutein</strong>. Product form, purity, stability data, packaging, storage conditions, and supporting quality documentation can be reviewed against the project specification.</p>
          </div>

          <p class="infant-disclaimer">Infant nutrition is a highly regulated category. Brand representation, ingredient supply, production-line design, certifications, and product-market access are subject to supplier and brand-owner approval, technical qualification, applicable laws, and acceptance by the relevant regulatory authorities.</p>

          <h3 class="brand-registration-categories-title">Selected brands, technology &amp; supply experience</h3>
          <p>Four spaces are reserved for infant-nutrition brands or selected project references. We will add the logos or approved references after you confirm which brands and projects should be displayed.</p>
          <div class="sports-brand-grid infant-brand-grid" aria-label="Reserved spaces for four infant nutrition brands or project references">
            <div class="sports-brand-placeholder"><span>BRAND / PROJECT 01<br>To be added</span></div>
            <div class="sports-brand-placeholder"><span>BRAND / PROJECT 02<br>To be added</span></div>
            <div class="sports-brand-placeholder"><span>BRAND / PROJECT 03<br>To be added</span></div>
            <div class="sports-brand-placeholder"><span>BRAND / PROJECT 04<br>To be added</span></div>
          </div>

          <p class="brand-registration-closing">Whether you are seeking a leading international brand, planning a new infant-formula facility, or sourcing specialist ingredients, NIAZ NET can help you connect the commercial, technical, and supply-chain discussions needed to assess your next step.</p>

          <div class="sports-nutrition-actions">
            <a class="btn" href="mailto:info@niaznet.net?subject=Infant%20Formula%20Brands%2C%20Production%20Lines%20and%20Ingredients">DISCUSS YOUR INFANT-NUTRITION PROJECT →</a>
            <a class="btn btn-outline" href="index.html#services">← BACK TO ALL SERVICES</a>
          </div>
          <p class="brand-registration-footnote">Any brand, ingredient, equipment, or production opportunity is subject to technical evaluation, supplier qualification, commercial agreement, and applicable regulatory requirements.</p>
        </div>
      </section>`;
    } else {
      const serviceSlideshowImages = {
        'cosmoderma': ['06 -Luxury Aesthetic Medicine Production Banner.png', '16 -Cosmoderma Aesthetic Manufacturing Banner.png'],
        'medical-devices': ['08 -all 2 .png', '02-all-global-trade.png', '00 -Global Products, Global Opportunities.png'],
        'cbd-products': ['05 -CBD Isolate_ Pure Pharmaceutical Grade (2).png', '15-CBD Isolate_ Pure Pharmaceutical Grade (1).png'],
        'import-export': ['02-all-global-trade.png', '00 -Global Products, Global Opportunities.png', '10-Global Brand, Ingredients, and Export Solutions.png'],
        'exclusive-agency': ['01-brand-partnerships.png', '11-brand-acquisition-registration.png', '10-Global Brand, Ingredients, and Export Solutions.png'],
        'business-development': ['00 -Global Products, Global Opportunities.png', '02-all-global-trade.png', '10-Global Brand, Ingredients, and Export Solutions.png'],
        'chamber-of-commerce': ['02-all-global-trade.png', '00 -Global Products, Global Opportunities.png', '10-Global Brand, Ingredients, and Export Solutions.png'],
        'market-entry': ['00 -Global Products, Global Opportunities.png', '10-Global Brand, Ingredients, and Export Solutions.png', '02-all-global-trade.png'],
        'licensing-partnerships': ['01-brand-partnerships.png', '10-Global Brand, Ingredients, and Export Solutions.png', '11-brand-acquisition-registration.png'],
        'pharmaceutical-products': ['14-api-pharmaceutical-ingredients.png', '08 -all 2 .png', '10-Global Brand, Ingredients, and Export Solutions.png'],
        'product-registration': ['11-brand-acquisition-registration.png', '01-brand-partnerships.png', '10-Global Brand, Ingredients, and Export Solutions.png'],
        'regulatory-affairs': ['14-api-pharmaceutical-ingredients.png', '11-brand-acquisition-registration.png', '02-all-global-trade.png'],
        'contract-manufacturing': ['06 -Luxury Aesthetic Medicine Production Banner.png', '14-api-pharmaceutical-ingredients.png', '17 -Premium Pet Food Production Showcase-2.png'],
        'technology-transfer': ['06 -Luxury Aesthetic Medicine Production Banner.png', '14-api-pharmaceutical-ingredients.png', '08 -all 2 .png'],
        'international-business-development': ['00 -Global Products, Global Opportunities.png', '02-all-global-trade.png', '10-Global Brand, Ingredients, and Export Solutions.png'],
        'supply-chain-solutions': ['02-all-global-trade.png', '00 -Global Products, Global Opportunities.png', '17 -Premium Pet Food Production Showcase-2.png'],
        'private-label': ['01-brand-partnerships.png', '08 -all 2 .png', '10-Global Brand, Ingredients, and Export Solutions.png'],
        'pet-food': ['07 -Premium Pet Food_ From Nature to Bowl-1.png', '17 -Premium Pet Food Production Showcase-2.png'],
        'nutraceuticals': ['03-sports-nutrition.png', '09-performance-nutrition.png', '14-api-pharmaceutical-ingredients.png']
      };
      const slideImages = serviceSlideshowImages[requestedService] || ['00 -Global Products, Global Opportunities.png', '02-all-global-trade.png', '10-Global Brand, Ingredients, and Export Solutions.png'];
      const slideshowMarkup = `<div class="hero-showcase" aria-label="${selectedService.name} service slideshow">${slideImages.map((image, index) => `<div class="showcase-image${index === 0 ? ' active' : ''}"><img src="images/${image}" alt="${selectedService.name} service visual ${index + 1}" ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} onerror="this.closest('.showcase-image').classList.add('image-missing')"></div>`).join('')}</div>`;
      main.innerHTML = `
      <section class="hero" id="home" style="min-height:300px;padding-top:120px">
        <div class="container hero-inner" style="grid-template-columns:1fr">
          <div class="hero-copy"><div class="eyebrow">NIAZ NET · OUR SERVICES</div><h1>${selectedService.name}</h1><p>${selectedService.paragraphs[0]}</p><div class="hero-actions"><a class="btn" href="index.html#services">← BACK TO ALL SERVICES</a><a class="btn btn-outline" href="mailto:info@niaznet.net?subject=${encodeURIComponent('Inquiry: ' + selectedService.name)}">CONTACT OUR TEAM →</a></div></div>
          ${slideshowMarkup}
        </div>
      </section>
      <section class="container section" style="padding-top:38px;max-width:900px">
        <h2 class="section-title">${selectedService.name}</h2>
        <div class="panel" style="padding:clamp(22px,4vw,42px);font-size:15px;line-height:1.9;color:var(--muted)">
          <p>${selectedService.paragraphs[0]}</p><p>${selectedService.paragraphs[1]}</p>
          ${requestedService === 'import-export' ? `<h3 style="margin:30px 0 14px;color:var(--navy)">Explore African Market Opportunities</h3><p>Dedicated market pages for commercial enquiries in selected African markets.</p><div class="project-grid" aria-label="African market pages"><a class="project-card" href="south-africa-market.html"><span class="project-symbol">🌍</span><h3>South Africa Market</h3><p>Pharmaceutical products, APIs, medical devices and distribution partnerships.</p></a><a class="project-card" href="kenya-market.html"><span class="project-symbol">🌍</span><h3>Kenya Market</h3><p>Medicines, health products, medical devices, nutrition and distribution enquiries.</p></a><a class="project-card" href="cote-divoire-market.html"><span class="project-symbol">🌍</span><h3>Côte d’Ivoire Market</h3><p>Marché pharmaceutique, principes actifs, dispositifs médicaux et partenariats commerciaux.</p></a></div>` : ''}
          <a class="btn" href="mailto:info@niaznet.net?subject=${encodeURIComponent('Inquiry: ' + selectedService.name)}">DISCUSS THIS SERVICE →</a>
        </div>
      </section>`;
    }
    document.querySelectorAll('.site-header a[href="#home"], .site-header a[href="#services"], .site-header a[href="#contact"]').forEach(link => {
      if (link.getAttribute('href') === '#home') link.href = '/';
      if (link.getAttribute('href') === '#services') link.href = '/#services';
      if (link.getAttribute('href') === '#contact') link.href = '/#contact';
    });
  }
}
