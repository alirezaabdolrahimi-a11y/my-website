
const serviceItems = [
  { name: 'Marka Tescili', icon: 'gem', slug: 'brand-registration', paragraphs: ['Niaz Net Tehran supports brand owners and business partners through the commercial planning and coordination required to introduce a brand into a target market. We help clarify market objectives, identify the appropriate local route, and coordinate discussions with relevant commercial and regulatory stakeholders.', 'From initial assessment to follow-up with partners and documentation teams, our role is to keep the process organized, transparent, and aligned with the brand owner’s goals. Registration requirements and approval timelines depend on the product category and the competent authorities in each market.'] },
  { name: 'Sporcu Beslenmesi ve Takviyeler', icon: 'dumbbell', slug: 'sports-nutrition', paragraphs: ['We help businesses explore representation opportunities with international sports nutrition and supplement brands, while coordinating commercial discussions with brand owners and potential market partners.', 'We also coordinate bulk sourcing opportunities for sports powders, vitamins, wellness supplements, and diet-related food products. Product specifications, quantities, supplier terms, and market requirements are reviewed for each opportunity.'] },
  { name: 'Bebek Maması ve Beslenmesi', icon: 'baby', slug: 'infant-formula', paragraphs: ['Niaz Net Tehran facilitates business development and sourcing discussions for infant formula and baby nutrition products with manufacturers and prospective market partners. We help coordinate product information, commercial terms, supply expectations, and the communication required to assess a potential distribution relationship.', 'Because infant nutrition is a highly regulated category, product eligibility, labeling, registrations, and import conditions must be reviewed for each destination market. We coordinate the relevant stakeholders so commercial planning and regulatory review can progress in a structured way.', 'Specialized Ingredient Sourcing: We facilitate sourcing inquiries with established international suppliers for key infant-formula ingredients, including DHA (Docosahexaenoic Acid), ARA (Arachidonic Acid), other essential fatty acids, and selected vitamins and micronutrients. Upon request, we coordinate supplier discussions and requests for technical specifications, Certificates of Analysis (CoA), stability data, and packaging details. Availability, grade suitability, supplier qualification, and regulatory acceptance are subject to confirmation for each project and destination market.'] },
  { name: 'Kozmoderma (Botoks ve Dermal Dolgular)', icon: 'stethoscope', slug: 'cosmoderma', paragraphs: ['Niaz Net Tehran supports brand registration and market development for aesthetic medicine and cosmoderma products, including botulinum toxin (Botox) and dermal fillers. We coordinate with brand owners and qualified manufacturers to explore product portfolios, target markets, documentation needs, and suitable commercial partners.', 'Our capabilities include coordination for brand registration, sourcing of suitable raw materials, and discussions with qualified partners regarding production-line setup or local manufacturing. Product eligibility, quality requirements, and regulatory approvals must be confirmed for each destination market before commercial activity.'] },
  { name: 'API', icon: 'flask', slug: 'api-supply', paragraphs: ['We support sourcing and ticari koordinasyon for Active Pharmaceutical Ingredients (APIs) and selected pharmaceutical raw materials, connecting buyers with manufacturers and suppliers for evaluation. Coordination may cover product specifications, quality documentation requests, quotations, minimum order quantities, and supply terms.', 'Supplier qualification and technical acceptance remain subject to the buyer’s quality requirements and applicable regulations. We help keep communication and documentation requests organized so the relevant quality, regulatory, procurement, and commercial teams can evaluate the opportunity efficiently.'] },
  { name: 'Tıbbi Cihazlar ve Sağlık Ekipmanları', icon: 'stethoscope', slug: 'medical-devices', paragraphs: ['We support commercial sourcing and market-development discussions for medical devices and healthcare equipment, helping manufacturers and potential distributors assess product fit, target channels, and local partner opportunities.', 'Our coordination can include product portfolio discussions, quotation and supply-term follow-up, and requests for technical and regulatory documentation. Product registration, conformity, and import requirements are assessed according to the destination market and the specific device category.'] },
  { name: 'CBD Ürünleri ve Pazar Koordinasyonu', icon: 'leaf', slug: 'cbd-products', paragraphs: ['Niaz Net Tehran can coordinate preliminary commercial discussions for CBD-related products where the product category and intended market allow such activity. Early-stage work may include clarifying product specifications, identifying potential business counterparts, and mapping the questions that must be resolved before a transaction can proceed.', 'CBD laws and product classifications vary significantly by jurisdiction and product type. No sourcing, import, distribution, or marketing activity should proceed until legality, licensing, product status, and all applicable regulatory requirements have been independently confirmed for the relevant markets.'] },
  { name: 'İthalat ve İhracat Hizmetleri', icon: 'package-check', slug: 'import-export', paragraphs: ['We coordinate import and export opportunities between suppliers, manufacturers, buyers, and distribution partners across international markets. Support may include supplier and buyer communication, quotation collection, commercial-term coordination, document follow-up, and coordination with freight, customs, and logistics parties.', 'Each transaction is assessed according to the product, origin and destination markets, applicable trade rules, and agreed Incoterms. Customs clearance, permits, payment arrangements, shipping, and compliance are handled with the relevant authorized parties; specific requirements and responsibilities are confirmed before execution.'] },
  { name: 'Münhasır Temsilcilik ve Marka Temsili', icon: 'handshake', slug: 'exclusive-agency', paragraphs: ['We help manufacturers and brand owners explore exclusive agency arrangements with suitable local partners. The process can include market and partner assessment, territory and channel discussions, commercial planning, and coordination of the negotiation process.', 'Agency arrangements are structured around clearly defined products, territories, responsibilities, performance expectations, and contract terms. We aim to align the parties on a practical framework for long-term market development while ensuring that final commitments are recorded in an agreed written contract.'] },
  { name: 'İş Geliştirme', icon: 'chart-no-axes-combined', slug: 'business-development', paragraphs: ['Niaz Net Tehran helps companies identify and develop commercial opportunities through structured outreach, partner engagement, market prioritization, and follow-up with relevant stakeholders. We focus on connecting business objectives with practical opportunities for cooperation and revenue growth.', 'Depending on the project, support may include preparing a development roadmap, coordinating meetings, evaluating potential partners, and maintaining a clear pipeline of next steps. Scope, targets, and reporting expectations are agreed with the client before work begins.'] },
  { name: 'Özel Ticaret Odası', icon: 'landmark', slug: 'chamber-of-commerce', paragraphs: ['We facilitate business-to-business engagement and trade-network development with relevant chambers of commerce, industry associations, and institutional stakeholders, where appropriate. This can help companies identify networking opportunities, understand the business environment, and establish contact with potential commercial counterparts.', 'Our role is coordination and relationship support, not a claim of official affiliation or guaranteed access. Any formal membership, endorsement, certification, or institutional service is subject to the relevant organization’s own process and approval.'] },
  { name: 'Pazara Giriş Stratejisi ve Çözümleri', icon: 'map-pinned', slug: 'market-entry', paragraphs: ['We help companies assess how to enter a new market by clarifying target customer segments, routes to market, potential partners, competitive considerations, and commercial priorities. The goal is to translate a broad expansion objective into a practical sequence of decisions and actions.', 'Depending on the project, we can coordinate market information gathering, partner discussions, distribution planning, and regulatory questions with specialist stakeholders. Recommendations are tailored to the product category, the destination market, and the client’s available resources and risk appetite.'] },
  { name: 'Lisanslama ve Stratejik İş Ortaklıkları', icon: 'handshake', slug: 'licensing-partnerships', paragraphs: ['We support the development of licensing and strategic partnership opportunities between rights holders, manufacturers, technology owners, and local commercial partners. This may include coordinating introductory discussions, clarifying the intended scope of cooperation, and organizing commercial and technical information for review.', 'Potential agreements can address territory, permitted use, responsibilities, intellectual property, quality expectations, milestones, and commercial terms. Legal, regulatory, and technical review should be completed by the relevant qualified advisers before any binding agreement is signed.'] },
  { name: 'Bitmiş Farmasötik Ürünler', icon: 'pill', slug: 'pharmaceutical-products', paragraphs: ['We coordinate commercial discussions for pharmaceutical finished products between manufacturers, buyers, and potential distribution partners. Depending on the opportunity, support may include product portfolio review, supplier communication, quotation requests, supply planning, and coordination of required product information.', 'Product availability, marketing authorization, import eligibility, quality requirements, and supply terms must be confirmed for each market and product. Our role is to facilitate communication among commercial, quality, regulatory, and logistics stakeholders rather than replace their formal approvals.'] },
  { name: 'Ürün Tescili ve Dosya Koordinasyonu', icon: 'file-check', slug: 'product-registration', paragraphs: ['We coordinate the collection and follow-up of product registration documents and technical dossiers between manufacturers, brand owners, and local regulatory teams. This can include tracking requested documents, clarifying formats, organizing open questions, and following up on pending items.', 'Required documents, submission formats, translations, legalization, and review timelines depend on the product and the destination authority. Final dossier content and regulatory submissions must be validated by the responsible manufacturer and authorized regulatory professionals.'] },
  { name: 'Mevzuat İşleri ve Uyum Koordinasyonu', icon: 'shield-check', slug: 'regulatory-affairs', paragraphs: ['We help coordinate communication around regulatory requirements for products entering or expanding within target markets. This may include organizing documentation requests, tracking regulatory questions, and aligning manufacturers, local representatives, and regulatory specialists.', 'Mevzuat decisions and approvals remain the responsibility of the competent authorities and appropriately authorized professionals. Our coordination is intended to improve visibility and follow-up, while product-specific requirements are confirmed case by case.'] },
  { name: 'Fason Üretim (CMO)', icon: 'factory', slug: 'contract-manufacturing', paragraphs: ['We facilitate discussions between companies seeking contract manufacturing and manufacturers with potentially suitable capabilities. Coordination may include product and capacity requirements, manufacturing scope, quality documentation requests, timelines, packaging needs, and preliminary commercial terms.', 'Manufacturing suitability, quality agreements, audits, technical transfer, validation, and applicable GMP or other standards must be evaluated by the responsible technical and quality teams. Any manufacturing relationship proceeds only after the parties complete due diligence and agree on contractual responsibilities.'] },
  { name: 'Teknoloji Transferi ve Yerel Üretim', icon: 'workflow', slug: 'technology-transfer', paragraphs: ['We help coordinate technology-transfer opportunities between technology owners, product developers, and prospective local manufacturers. Early discussions can clarify the proposed scope, technical information required, production objectives, and the parties’ roles in evaluating feasibility.', 'A successful transfer may require technical assessment, intellectual-property review, quality planning, training, validation, and regulatory approval. These workstreams are defined with the relevant experts and captured in the final project and contractual documents.'] },
  { name: 'International İş Geliştirme', icon: 'globe', slug: 'international-business-development', paragraphs: ['We help companies build cross-border business relationships and explore opportunities across selected international markets. Our work can include coordinating introductions, supporting partner evaluation, aligning commercial expectations, and following up on opportunities across different markets.', 'International projects often involve different business practices, documentation needs, regulatory conditions, and logistics constraints. We help maintain a coordinated process and clear communication, while transaction-specific obligations are confirmed by the relevant parties and advisers.'] },
  { name: 'Tedarik Zinciri Çözümleri', icon: 'truck', slug: 'supply-chain-solutions', paragraphs: ['We coordinate supply-chain communication among buyers, suppliers, manufacturers, freight providers, and other relevant parties. Depending on the project, this may include order and shipment follow-up, documentation tracking, delivery planning, and escalation of outstanding commercial or operational questions.', 'The exact scope depends on the transaction, product requirements, and the parties’ responsibilities. Shipping, customs, insurance, and handling arrangements are confirmed with the authorized providers and documented before dispatch.'] },
  { name: 'Özel Marka Geliştirme', icon: 'tags', slug: 'private-label', paragraphs: ['We support businesses interested in developing products under their own brand by coordinating discussions with potential manufacturers and suppliers. The process may cover product concept, specifications, packaging options, target pricing, minimum order quantities, and preliminary production timelines.', 'Final feasibility depends on manufacturer capability, product category, intellectual-property and trademark considerations, quality requirements, and destination-market regulations. We help structure the discussions so the client can assess options before committing to development or production.'] },
  { name: 'Evcil Hayvan Maması ve Hayvan Beslenmesi', icon: 'paw', slug: 'pet-food', paragraphs: ['Niaz Net Tehran supports commercial sourcing and market-development discussions for pet food, treats, and animal nutrition products, helping manufacturers connect with importers, distributors, retailers, and other suitable partners in target markets. We can coordinate portfolio introductions, product specifications, quotation requests, packaging and private-label discussions, and supply expectations.', 'Product registration, ingredient rules, labeling, veterinary and feed requirements, and import eligibility vary by destination market. Each opportunity should be reviewed with the responsible manufacturer and qualified local specialists before supply or market launch.'] },
  
  { name: 'Nütrasötikler ve Sağlıklı Yaşam Ürünleri', icon: 'leaf', slug: 'nutraceuticals', paragraphs: ['We support commercial sourcing and market-development discussions for nutraceuticals, wellness products, and related categories, connecting potential buyers with manufacturers and business partners for evaluation.', 'Product classification, permitted claims, labeling, quality documentation, and import eligibility differ by market. Each opportunity should be reviewed against applicable rules and the client’s technical and commercial requirements before any market launch.'] }
];

const serviceGrid = document.getElementById('serviceGrid');

const serviceDisplayLabels = {
  'brand-registration':'Marka Tescili',
  'api-supply':'API',
  'sports-nutrition':'Sporcu Beslenmesi',
  'infant-formula':'Bebek Maması ve Beslenmesi',
  'cbd-products':'CBD',
  'business-development':'İş Geliştirme + Ar-Ge',
  'pharmaceutical-products':'Bitmiş Farmasötik Ürünler',
  'nutraceuticals':'Vitaminler ve Takviyeler',
  'pet-food':'Evcil Hayvan Maması',
  'medical-devices':'Tıbbi Cihazlar',
  'technology-transfer':'Teknoloji Transferi',
  'private-label':'Özel Marka Siparişleri',
  'contract-manufacturing':'CMO',
  'cosmoderma':'Kozmoderma',
  'regulatory-affairs':'Mevzuat',
  'licensing-partnerships':'Lisanslama Stratejisi',
  'supply-chain-solutions':'Tedarik Zinciri'
};
window.renderNiazServiceGrid({
  items: serviceItems,
  labels: serviceDisplayLabels,
  vipLabels: {"chamber-of-commerce":"Özel Ticaret Odası","exclusive-agency":"Münhasır Temsilcilik","market-entry":"Pazara Giriş"},
  routeMode: 'static',
  staticPrefix: '/tr/',
  importExportLabel: 'İTHALAT / İHRACAT'
});

try{localStorage.setItem('niaznet-language','tr')}catch(e){}document.documentElement.lang='tr';document.body.dir='ltr';

// Service detail views load in the current tab, powered by this single HTML file.
const requestedService = new URLSearchParams(window.location.search).get('service');
const turkishServicePages = new Set(['brand-registration','api-supply','sports-nutrition','infant-formula','cbd-products','business-development','pharmaceutical-products','nutraceuticals','pet-food','medical-devices','technology-transfer','private-label','contract-manufacturing','cosmoderma','regulatory-affairs','licensing-partnerships','supply-chain-solutions','chamber-of-commerce','exclusive-agency','market-entry','import-export']);
if (requestedService && turkishServicePages.has(requestedService)) {
  window.location.replace(requestedService + '.html');
}
if (false && requestedService) {
  const selectedService = serviceItems.find(item => item.slug === requestedService);
  if (selectedService) {
    document.title = `${selectedService.name} | NIAZ NET TEHRAN`;
    const main = document.querySelector('main');
    if (requestedService === 'brand-registration') {
      main.innerHTML = `
      <section class="hero brand-registration-page" id="home">
        <div class="container hero-inner">
          <div class="hero-copy">
            <div class="eyebrow">NIAZ NET · INTERNATIONAL BRAND İŞ ORTAKLARIHIPS</div>
            <h1>Doğru Markayı Bulun. <span>Yeni Pazarların Kapısını Açın.</span></h1>
            <p>Uluslararası marka ortaklıklarından marka tesciline ve pazar büyümesine kadar, ticari hedeflerinizi somut fırsatlara dönüştürmenize yardımcı oluyoruz.</p>
            <div class="hero-actions service-page-actions">
              <a class="btn" href="index.html#services" aria-label="Tüm hizmetlere dön">← TÜM HİZMETLERE DÖN</a>
              <a class="btn btn-outline" href="mailto:info@niaznet.net?subject=Business%20Inquiry">EKİBİMİZLE İLETİŞİME GEÇİN →</a>
            </div>
          </div>
          <div class="hero-showcase" aria-label="Öne çıkan hizmetler">
            <div class="showcase-image active"><img src="/images/00 -Global Products, Global Opportunities.png" alt="Küresel Ürünler, Küresel Fırsatlar" onerror="this.closest('.showcase-image').classList.add('image-missing')"></div>
            <div class="showcase-image"><img src="/images/08 -all 2 .png" alt="Küresel Ürün Portföyü" onerror="this.closest('.showcase-image').classList.add('image-missing')"></div>
            <div class="showcase-image"><img src="/images/10-Global Brand, Ingredients, and Export Solutions.png" alt="Küresel Markalar, Hammaddeler ve İhracat Çözümleri" onerror="this.closest('.showcase-image').classList.add('image-missing')"></div>
            <div class="showcase-image"><img src="/images/11-brand-acquisition-registration.png" alt="Marka Edinimi ve Tescili" onerror="this.closest('.showcase-image').classList.add('image-missing')"></div>
</div>
        </div>
      </section>
      <section class="container section brand-registration-details" style="padding-top:24px;max-width:1120px">
        <div class="panel brand-registration-copy" style="padding:clamp(24px,4vw,46px);font-size:15px;line-height:1.85;color:var(--muted)">
          <h2 class="brand-registration-kicker">MARKANIZ. PAZARINIZ. SIRADAKİ FIRSATINIZ.</h2>
          <h3 class="brand-registration-subtitle">NIAZ NET ile Daha Güçlü Marka Ortaklıkları Kurun</h3>
          <p class="brand-registration-intro">With business reach and coordination across <strong>IRAN, Türkiye and Spain</strong>, NIAZ NET helps companies connect with established international brands, explore commercial agreements and representation opportunities, and pursue brand acquisition and registration for their target markets. We bring the conversations, market goals and next steps together—so your business can move forward with greater clarity and confidence.</p>

          <h3 class="brand-registration-question">Already own a brand?</h3>
          <p>We can help you develop its presence in your target market, identify suitable distributors and commercial partners, strengthen market positioning, and explore new routes to visibility and sustainable growth.</p>

          <h3 class="brand-registration-question">Looking for an international brand for your products?</h3>
          <p>We can help identify brands that fit your product portfolio and business goals, facilitate introductions and commercial discussions, and coordinate the steps toward potential brand representation, acquisition and market registration.</p>

          <p class="brand-registration-disclaimer">Every opportunity is assessed individually; agreements depend on the brand owner’s approval and applicable market requirements.</p>

          <h3 class="brand-registration-categories-title">Destek Verdiğimiz Marka Kategorileri</h3>
          <div class="brand-category-grid">
            <div class="brand-category-item"><strong>İlaç Markaları</strong><span>Yerel gerekliliklere tabi reçeteli ve reçetesiz ürün portföyleri.</span></div>
            <div class="brand-category-item"><strong>Kozmetik ve Kişisel Bakım</strong><span>Güzellik, cilt bakımı, kozmetik ve kişisel hijyen ürünleri.</span></div>
            <div class="brand-category-item"><strong>Spor ve Performans Beslenmesi</strong><span>Spor markaları, sporcu takviyeleri ve protein tozları.</span></div>
            <div class="brand-category-item"><strong>Vitaminler ve Besin Takviyeleri</strong><span>Vitamin, mineral ve besin takviyesi markaları.</span></div>
            <div class="brand-category-item"><strong>Estetik Tıp ve Dermatoloji</strong><span>Botulinum toksini ürünleri, dermal dolgular, kremler ve dermatoloji ürün grupları.</span></div>
            <div class="brand-category-item"><strong>Tıbbi Cihazlar ve Sağlık Ekipmanları</strong><span>Tıbbi teknolojiler, cihazlar ve sağlık ürün portföyleri.</span></div>
          </div>

          <p class="brand-registration-closing">Whether you are preparing to launch a product, searching for a trusted international brand, or ready to take an existing brand into its next stage of growth, NIAZ NET can help you explore the right connections and map out the next steps.</p>

          <div class="brand-registration-actions">
            <a class="btn" href="mailto:info@niaznet.net?subject=Brand%20Registration%20and%20International%20Brand%20İş Ortaklıkları">MARKANIZI GÖRÜŞELİM →</a>
            <a class="btn btn-outline" href="index.html#services">← TÜM HİZMETLERE DÖN</a>
          </div>
          <p class="brand-registration-footnote">Marka bulunabilirliği, ticari anlaşmalar, ürün tescili ve pazara erişim; marka sahibinin kararlarına ve her pazardaki ilgili düzenleyici kurumların onaylarına tabidir.</p>
        </div>
      </section>`;
    } else if (requestedService === 'api-supply') {
      document.title='API ve Farmasötik Hammaddeler | NIAZ NET';
      main.innerHTML=`<section class="hero brand-registration-page"><div class="container hero-inner"><div class="hero-copy"><div class="eyebrow">NIAZ NET · API &amp; PHARMACEUTICAL INGREDIENTS</div><h1>Pharmaceutical Ingredients. <span>Qualified Supply Opportunities.</span></h1><p>Search our working portfolio of active pharmaceutical ingredients and selected pharmaceutical intermediates. Filter by material type and identify products for a focused sourcing inquiry.</p>
<div class="hero-actions service-page-actions"><a class="btn" href="index.html#services">← TÜM HİZMETLERE DÖN</a><a class="btn btn-outline" href="mailto:info@niaznet.net?subject=API%20Inquiry">EKİBİMİZLE İLETİŞİME GEÇİN →</a></div></div><div class="hero-showcase" aria-label="API sourcing and pharmaceutical ingredients slideshow"><div class="showcase-image active"><img src="/images/14-api-pharmaceutical-ingredients.png" alt="Farmasötik hammadde tedarik hizmetleri"></div><div class="showcase-image"><img src="/images/08 -all 2 .png" alt="Farmasötik tedarik koordinasyon hizmetleri" loading="lazy"></div><div class="showcase-image"><img src="/images/00 -Global Products, Global Opportunities.png" alt="Uluslararası farmasötik tedarik koordinasyonu" loading="lazy"></div></div></div></section>
      <section class="container section" style="max-width:1180px;padding-top:24px"><div class="panel" style="padding:28px"><div class="eyebrow">PRODUCT PORTFOLIO</div><h2>Search the API &amp; Ingredients Catalogue</h2><p style="color:var(--muted);line-height:1.8">API means Active Pharmaceutical Ingredient. Intermediates are materials or processed forms used during manufacturing. Excipients are non-active formulation ingredients. Confirm final classification, grade and specifications with the supplier.</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;margin:18px 0"><input id="apiSearchInput" type="search" placeholder="Ürün adını arayın..." style="flex:2;min-width:220px;padding:12px"><select id="apiCategoryFilter" style="flex:1;min-width:160px;padding:12px"><option>All</option><option>API</option><option>Intermediate</option><option>Excipient</option></select><select id="apiSortDirection" style="padding:12px"><option value="asc">A to Z</option><option value="desc">Z to A</option></select></div>
      <p id="apiResultsCount" aria-live="polite">Loading catalogue…</p><div style="overflow-x:auto"><table id="apiCatalogTable" style="width:100%;min-width:480px;border-collapse:collapse;text-align:left"><thead><tr><th data-sort="number">NO. ↕</th><th data-sort="name">PRODUCT / MATERIAL ↕</th><th data-sort="category">CATEGORY ↕</th></tr></thead><tbody id="apiCatalogBody"></tbody></table></div><p id="apiNoResults" style="display:none">No matching materials found.</p>
      <p style="margin-top:22px;color:var(--muted);line-height:1.8">Catalogue classification is indicative and based on the material name and typical pharmaceutical use. Some materials may have a different regulatory role depending on formulation, grade, concentration and intended use. Confirm the current supplier specification, compendial standard and regulatory classification before procurement.</p><div class="sports-nutrition-actions"><a class="btn" href="mailto:info@niaznet.net?subject=API%20Sourcing%20Inquiry">SEND AN API INQUIRY →</a><a class="btn btn-outline" href="index.html#services">← TÜM HİZMETLERE DÖN</a></div></div></section>
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
const search=document.getElementById('apiSearchInput'),filter=document.getElementById('apiCategoryFilter'),dir=document.getElementById('apiSortDirection'),body=document.getElementById('apiCatalogBody'),empty=document.getElementById('apiNoResults');let key='name',asc=true;function render(){const q=search.value.toLowerCase().trim(),cat=filter.value;let a=data.map((x,i)=>({...x,n:i+1})).filter(x=>(cat==='All'||x.category===cat)&&(!q||(x.name+' '+x.category).toLowerCase().includes(q)));a.sort((x,y)=>{const z=key==='number'?x.n-y.n:String(x[key]).localeCompare(String(y[key]));return asc?z:-z});body.innerHTML=a.map(x=>'<tr><td>'+x.n+'</td><td>'+x.name+'</td><td>'+x.category+'</td></tr>').join('');status.textContent='Showing '+a.length+' of '+data.length+' materials';empty.style.display=a.length?'none':'block'}search.addEventListener('input',render);filter.addEventListener('change',render);dir.addEventListener('change',()=>{asc=dir.value==='asc';render()});document.querySelectorAll('#apiCatalogTable th[data-sort]').forEach(t=>t.addEventListener('click',()=>{if(key===t.dataset.sort)asc=!asc;else{key=t.dataset.sort;asc=true}dir.value=asc?'asc':'desc';render()}));render()}catch(e){status.textContent='Catalogue could not be loaded. İletişim our team.'}})();
    } else if (requestedService === 'sports-nutrition') {
      main.innerHTML = `
      <section class="hero brand-registration-page sports-nutrition-page" id="home">
        <div class="container hero-inner">
          <div class="hero-copy">
            <div class="eyebrow">NIAZ NET · SPORTS NUTRITION &amp; BULK SUPPLY</div>
            <h1>Build Your Sports Portfolio. <span>Unlock New Opportunities.</span></h1>
            <p>From international sports nutrition brand representation to bulk powder sourcing, we help businesses explore commercial opportunities and develop their product portfolios.</p>
            <div class="hero-actions service-page-actions">
              <a class="btn" href="index.html#services" aria-label="Tüm hizmetlere dön">← TÜM HİZMETLERE DÖN</a>
              <a class="btn btn-outline" href="mailto:info@niaznet.net?subject=Business%20Inquiry">EKİBİMİZLE İLETİŞİME GEÇİN →</a>
            </div>
          </div>
          <div class="hero-showcase" aria-label="Sports nutrition and supplement slideshow">
            <div class="showcase-image active"><img src="/images/00 -Global Products, Global Opportunities.png" alt="Küresel Ürünler, Küresel Fırsatlar" onerror="this.closest('.showcase-image').classList.add('image-missing')"></div>
            <div class="showcase-image"><img src="/images/03-sports-nutrition.png" alt="Sporcu Beslenmesi" onerror="this.closest('.showcase-image').classList.add('image-missing')"></div>
            <div class="showcase-image"><img src="/images/12-international-sports-brands.png" alt="Uluslararası Spor Markaları" onerror="this.closest('.showcase-image').classList.add('image-missing')"></div>
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
            <a class="btn btn-outline" href="index.html#services">← TÜM HİZMETLERE DÖN</a>
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
              <a class="btn" href="index.html#services" aria-label="Tüm hizmetlere dön">← TÜM HİZMETLERE DÖN</a>
              <a class="btn btn-outline" href="mailto:info@niaznet.net?subject=Business%20Inquiry">EKİBİMİZLE İLETİŞİME GEÇİN →</a>
            </div>
          </div>
          <div class="hero-showcase" aria-label="Bebek maması ve bebek beslenmesi showcase">
            <div class="showcase-image active"><img src="/images/04-infant-formula.png" alt="Bebek maması ve bebek beslenmesi" onerror="this.closest('.showcase-image').classList.add('image-missing')"></div>
            <div class="showcase-image"><img src="/images/Infant%2001.png" alt="Bebek beslenmesi ürün sunumu 1" loading="lazy" decoding="async" onerror="this.closest('.showcase-image').classList.add('image-missing')"></div>
            <div class="showcase-image"><img src="/images/Infant%2002.png" alt="Bebek beslenmesi ürün sunumu 2" loading="lazy" decoding="async" onerror="this.closest('.showcase-image').classList.add('image-missing')"></div>
            <div class="showcase-image"><img src="/images/Infant%2003.png" alt="Bebek beslenmesi ürün sunumu 3" loading="lazy" decoding="async" onerror="this.closest('.showcase-image').classList.add('image-missing')"></div>
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
            <a class="btn btn-outline" href="index.html#services">← TÜM HİZMETLERE DÖN</a>
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
      const slideshowMarkup = `<div class="hero-showcase" aria-label="${selectedService.name} hizmet slayt gösterisi">${slideImages.map((image, index) => `<div class="showcase-image${index === 0 ? ' active' : ''}"><img src="/images/${image}" alt="${selectedService.name} service visual ${index + 1}" ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} onerror="this.closest('.showcase-image').classList.add('image-missing')"></div>`).join('')}</div>`;
      main.innerHTML = `
      <section class="hero" id="home" style="min-height:300px;padding-top:120px">
        <div class="container hero-inner" style="grid-template-columns:1fr">
          <div class="hero-copy"><div class="eyebrow">NIAZ NET · OUR SERVICES</div><h1>${selectedService.name}</h1><p>${selectedService.paragraphs[0]}</p><div class="hero-actions"><a class="btn" href="index.html#services">← TÜM HİZMETLERE DÖN</a><a class="btn btn-outline" href="mailto:info@niaznet.net?subject=${encodeURIComponent('Inquiry: ' + selectedService.name)}">EKİBİMİZLE İLETİŞİME GEÇİN →</a></div></div>
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
      if (link.getAttribute('href') === '#home') link.href = 'index.html#home';
      if (link.getAttribute('href') === '#services') link.href = 'index.html#services';
      if (link.getAttribute('href') === '#contact') link.href = 'index.html#contact';
    });
  }
}
