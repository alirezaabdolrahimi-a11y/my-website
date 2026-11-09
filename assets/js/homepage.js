
const serviceItems = [
  { name: 'Brand Registration', slug: 'brand-registration' },
  { name: 'Sports Nutrition & Supplements', slug: 'sports-nutrition' },
  { name: 'Infant Formula & Nutrition', slug: 'infant-formula' },
  { name: 'Cosmoderma (Botox & Dermal Fillers)', slug: 'cosmoderma' },
  { name: 'API', slug: 'api-supply' },
  { name: 'Medical Devices & Healthcare Equipment', slug: 'medical-devices' },
  { name: 'CBD Products & Market Coordination', slug: 'cbd-products' },
  { name: 'Import & Export Services', slug: 'import-export' },
  { name: 'Exclusive Agency & Brand Representation', slug: 'exclusive-agency' },
  { name: 'Business Development', slug: 'business-development' },
  { name: 'Private Chamber of Commerce', slug: 'chamber-of-commerce' },
  { name: 'Market Entry Strategy & Solutions', slug: 'market-entry' },
  { name: 'Licensing & Strategic Partnerships', slug: 'licensing-partnerships' },
  { name: 'Pharmaceutical Finished Products', slug: 'pharmaceutical-products' },
  { name: 'Product Registration & Dossier Coordination', slug: 'product-registration' },
  { name: 'Regulatory Affairs & Compliance Coordination', slug: 'regulatory-affairs' },
  { name: 'Contract Manufacturing (CMO)', slug: 'contract-manufacturing' },
  { name: 'Technology Transfer & Local Production', slug: 'technology-transfer' },
  { name: 'International Business Development', slug: 'international-business-development' },
  { name: 'Supply Chain Solutions', slug: 'supply-chain-solutions' },
  { name: 'Private Label & Own-Brand Development', slug: 'private-label' },
  { name: 'Pet Food & Animal Nutrition', slug: 'pet-food' },
  
  { name: 'Nutraceuticals & Wellness Products', slug: 'nutraceuticals' },
];

const serviceGrid = document.getElementById('serviceGrid');

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
window.renderNiazServiceGrid({
  items: serviceItems,
  labels: serviceDisplayLabels,
  vipLabels: {"chamber-of-commerce":"Private Chamber of Commerce","exclusive-agency":"Exclusive Agency","market-entry":"Market Entry"},
  routeMode: 'static',
  staticPrefix: '/',
  importExportLabel: 'IMPORT / EXPORT'
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
if (requestedService && serviceItems.some(item => item.slug === requestedService)) {
  window.location.replace('/' + requestedService + '.html');
}
