(function(){
'use strict';
const params=new URLSearchParams(location.search);
if(params.get('lang')!=='fa')return;
const common={
'Home':'خانه','About Us':'درباره ما','Services':'خدمات','Partners':'شرکای تجاری','Projects':'پروژه‌ها','News':'اخبار','Contact':'تماس با ما','GET IN TOUCH':'با ما در تماس باشید',
'NIAZ NET · OUR SERVICES':'نیازنت · خدمات ما','← BACK TO ALL SERVICES':'← بازگشت به همه خدمات','CONTACT OUR TEAM →':'← تماس با تیم ما',
'Home / Our Services /':'خانه / خدمات ما /','How we approach this service':'رویکرد ما در این خدمت','Information to include in an enquiry':'اطلاعات موردنیاز برای ثبت درخواست',
'Discuss this service':'درباره این خدمت گفت‌وگو کنید','DISCUSS THIS SERVICE →':'درباره این خدمت گفت‌وگو کنید ←',
'Related services':'خدمات مرتبط','Quick Links':'دسترسی سریع','International Markets':'بازارهای بین‌المللی','Global Partners':'شرکای جهانی','News & Events':'اخبار و رویدادها',
'Our Services':'خدمات ما','Brand Registration':'ثبت برند','Import & Export':'واردات و صادرات','Exclusive Agency':'نمایندگی انحصاری','API Supply':'تأمین مواد اولیه دارویی','Technology Transfer':'انتقال فناوری','All Services':'همه خدمات',
'Subscribe to Our Newsletter':'عضویت در خبرنامه','Get the latest updates and industry insights.':'آخرین اخبار و تحلیل‌های تخصصی را دریافت کنید.','SUBSCRIBE':'عضویت',
'© Niaz Net Tehran. All Rights Reserved.':'© نیازنت تهران. تمامی حقوق محفوظ است.','Privacy Policy':'سیاست حفظ حریم خصوصی','Terms of Use':'شرایط استفاده','Sitemap':'نقشه سایت',
'Niaz Net Tehran is an international trading and distribution company providing end-to-end solutions in pharmaceuticals, healthcare, nutrition and related industries worldwide.':'نیازنت تهران یک شرکت فعال در تجارت و توزیع بین‌المللی است که راهکارهای جامع در حوزه دارو، سلامت، تغذیه و صنایع مرتبط در بازارهای جهانی ارائه می‌دهد.',
'Send us the product or project details, target market and the type of support required.':'جزئیات محصول یا پروژه، بازار هدف و نوع پشتیبانی موردنیاز را برای ما ارسال کنید.',
'Our team can review the initial scope and identify the information needed for a useful commercial discussion.':'تیم ما می‌تواند دامنه اولیه درخواست را بررسی کرده و اطلاعات لازم برای آغاز یک گفت‌وگوی تجاری مؤثر را مشخص کند.',
'Regulatory approvals, import eligibility, quality acceptance, licensing and transaction feasibility must be confirmed for each product and destination market by the responsible parties and qualified professionals.':'مجوزهای قانونی، امکان واردات، تأیید کیفیت، الزامات صدور مجوز و امکان‌پذیری معامله باید برای هر محصول و بازار مقصد، توسط طرف‌های مسئول و متخصصان واجد صلاحیت بررسی و تأیید شوند.',
'NIAZ NET coordinates commercial communication; it does not replace regulatory authorities, legal advisers or independent quality assessment.':'نیازنت هماهنگی ارتباطات تجاری را بر عهده می‌گیرد و جایگزین مراجع قانونی، مشاوران حقوقی یا ارزیابی مستقل کیفیت نیست.',
'Strategic Distribution & Trade':'توزیع راهبردی و تجارت بین‌الملل','TEHRAN':'تهران'
};
const pages={
'api-supply.html':{
'Pharmaceutical API Sourcing & Pharmaceutical Raw Materials':'تأمین مواد اولیه دارویی و مواد اولیه فعال دارویی',
'Coordinate sourcing enquiries for active pharmaceutical ingredients (APIs), product specifications, quality-document requests, quotations and supplier discussions.':'درخواست‌های تأمین مواد مؤثره دارویی (API)، مشخصات محصول، اسناد کیفی، استعلام قیمت و مذاکرات با تأمین‌کنندگان را هماهنگ می‌کنیم.',
'API: commercial coordination':'مواد مؤثره دارویی (API): هماهنگی تجاری',
'We support sourcing and commercial coordination for Active Pharmaceutical Ingredients (APIs) and selected pharmaceutical raw materials, connecting buyers with manufacturers and suppliers for evaluation.':'در زمینه تأمین و هماهنگی تجاری مواد مؤثره دارویی (API) و برخی مواد اولیه دارویی فعالیت می‌کنیم و خریداران را برای ارزیابی به تولیدکنندگان و تأمین‌کنندگان مرتبط می‌سازیم.',
'Coordination may cover product specifications, quality documentation requests, quotations, minimum order quantities, and supply terms.':'این هماهنگی می‌تواند شامل مشخصات محصول، درخواست اسناد کیفیت، استعلام قیمت، حداقل مقدار سفارش و شرایط تأمین باشد.',
'Supplier qualification and technical acceptance remain subject to the buyer’s quality requirements and applicable regulations.':'تأیید صلاحیت تأمین‌کننده و پذیرش فنی محصول تابع الزامات کیفی خریدار و مقررات مربوطه است.',
'We help keep communication and documentation requests organized so the relevant quality, regulatory, procurement, and commercial teams can evaluate the opportunity efficiently.':'ما ارتباطات و درخواست اسناد را سامان‌دهی می‌کنیم تا تیم‌های کیفیت، امور مقرراتی، تدارکات و بازرگانی بتوانند فرصت موردنظر را به‌صورت مؤثر ارزیابی کنند.',
'For API enquiries we organize the initial product and supplier questions so procurement, quality and regulatory teams can review the opportunity.':'در درخواست‌های مربوط به API، پرسش‌های اولیه درباره محصول و تأمین‌کننده را سازمان‌دهی می‌کنیم تا تیم‌های تدارکات، کیفیت و امور مقرراتی فرصت را بررسی کنند.',
'Technical acceptance remains with the buyer and its qualified quality function.':'مسئولیت پذیرش فنی بر عهده خریدار و واحد کیفیت واجد صلاحیت اوست.',
'API name, grade, specification, CAS number or other available identifiers.':'نام ماده مؤثره، گرید، مشخصات، شماره CAS یا سایر شناسه‌های موجود.',
'Destination market, required quantity, forecast and target delivery window.':'بازار مقصد، مقدار موردنیاز، پیش‌بینی تقاضا و بازه زمانی تحویل موردنظر.',
'Requested documents such as specification, CoA, GMP information or other dossier items, as applicable and available.':'اسناد درخواستی از جمله مشخصات فنی، گواهی آنالیز (CoA)، اطلاعات GMP یا سایر مدارک پرونده، در صورت کاربرد و موجود بودن.'
},
'brand-registration.html':{
'Brand Registration for International Markets':'ثبت برند در بازارهای بین‌المللی',
'Coordinate brand registration and market-entry planning for pharmaceutical, healthcare, nutrition, cosmetics and other regulated product brands, subject to local rules.':'هماهنگی ثبت برند و برنامه‌ریزی ورود به بازار برای برندهای دارویی، سلامت، تغذیه، آرایشی و سایر محصولات تحت نظارت، مطابق مقررات محلی.',
'Brand Registration: commercial coordination':'ثبت برند: هماهنگی تجاری',
'Niaz Net Tehran supports brand owners and business partners through the commercial planning and coordination required to introduce a brand into a target market.':'نیازنت تهران از صاحبان برند و شرکای تجاری در برنامه‌ریزی و هماهنگی‌های تجاری لازم برای معرفی برند در بازار هدف پشتیبانی می‌کند.',
'We help clarify market objectives, identify the appropriate local route, and coordinate discussions with relevant commercial and regulatory stakeholders.':'به شفاف‌سازی اهداف بازار، شناسایی مسیر مناسب در کشور مقصد و هماهنگی گفت‌وگو با ذی‌نفعان تجاری و مقرراتی مرتبط کمک می‌کنیم.',
'From initial assessment to follow-up with partners and documentation teams, our role is to keep the process organized, transparent, and aligned with the brand owner’s goals.':'از ارزیابی اولیه تا پیگیری با شرکا و تیم‌های اسناد، نقش ما سامان‌دهی شفاف فرایند و هم‌راستا نگه‌داشتن آن با اهداف صاحب برند است.',
'Registration requirements and approval timelines depend on the product category and the competent authorities in each market.':'الزامات ثبت و زمان‌بندی صدور مجوز به گروه محصول و مراجع ذی‌صلاح هر بازار بستگی دارد.',
'We clarify the product category, brand ownership, target markets and the intended route to market.':'گروه محصول، مالکیت برند، بازارهای هدف و مسیر موردنظر برای ورود به بازار را مشخص می‌کنیم.',
'Where needed, we help organize discussions among brand owners, potential representatives and qualified local regulatory specialists.':'در صورت نیاز، گفت‌وگو میان صاحبان برند، نمایندگان بالقوه و متخصصان مقرراتی محلی واجد صلاحیت را هماهنگ می‌کنیم.',
'Brand name, owner and product category.':'نام برند، مالک آن و گروه محصول.',
'Target country, preferred commercial channel and desired launch scope.':'کشور هدف، کانال تجاری ترجیحی و دامنه موردنظر برای عرضه.',
'Available product dossier, current registrations and brand or distribution authorization documents.':'پرونده موجود محصول، ثبت‌های فعلی و اسناد مجوز برند یا توزیع.'
},
'exclusive-agency.html':{
'Exclusive Agency & Brand Representation':'نمایندگی انحصاری و نمایندگی برند',
'Explore exclusive agency, authorized representation and distribution opportunities between brand owners, manufacturers and prospective market partners.':'فرصت‌های نمایندگی انحصاری، نمایندگی مجاز و توزیع میان صاحبان برند، تولیدکنندگان و شرکای بالقوه بازار را بررسی کنید.',
'Exclusive Agency & Brand Representation: commercial coordination':'نمایندگی انحصاری و نمایندگی برند: هماهنگی تجاری',
'We help manufacturers and brand owners explore exclusive agency arrangements with suitable local partners.':'به تولیدکنندگان و صاحبان برند کمک می‌کنیم امکان ایجاد نمایندگی انحصاری با شرکای محلی مناسب را بررسی کنند.',
'The process can include market and partner assessment, territory and channel discussions, commercial planning, and coordination of the negotiation process.':'این فرایند می‌تواند شامل ارزیابی بازار و شریک، مذاکره درباره قلمرو و کانال‌های فروش، برنامه‌ریزی تجاری و هماهنگی مذاکرات باشد.',
'Agency arrangements are structured around clearly defined products, territories, responsibilities, performance expectations, and contract terms.':'ساختار نمایندگی بر اساس محصولات، قلمرو فعالیت، مسئولیت‌ها، انتظارات عملکردی و مفاد قراردادیِ مشخص تنظیم می‌شود.',
'We aim to align the parties on a practical framework for long-term market development while ensuring that final commitments are recorded in an agreed written contract.':'هدف ما ایجاد چارچوبی عملی و مورد توافق طرفین برای توسعه بلندمدت بازار و ثبت تعهدات نهایی در قراردادی مکتوب است.',
'We help brand owners and prospective representatives outline a potential agency relationship before detailed negotiations.':'پیش از ورود به مذاکرات تفصیلی، به صاحبان برند و نمایندگان بالقوه کمک می‌کنیم چارچوب همکاری نمایندگی را ترسیم کنند.',
'Exclusivity, territory, targets and obligations depend on due diligence and agreement between the parties.':'انحصار، قلمرو، اهداف و تعهدات به بررسی‌های کارشناسی و توافق طرفین بستگی دارد.',
'Brand owner, product portfolio and current market presence.':'صاحب برند، سبد محصولات و وضعیت فعلی حضور در بازار.',
'Proposed territory, channels, customer segments and commercial objectives.':'قلمرو پیشنهادی، کانال‌ها، گروه‌های مشتریان و اهداف تجاری.',
'Company profile, existing distribution capabilities and any draft agency terms.':'معرفی شرکت، توانمندی‌های فعلی توزیع و هرگونه پیش‌نویس شرایط نمایندگی.'
},
'contract-manufacturing.html':{
'Contract Manufacturing & Production Coordination':'تولید قراردادی و هماهنگی تولید',
'Explore contract manufacturing opportunities, manufacturer capability discussions, product specifications, preliminary production terms and quality requirements.':'فرصت‌های تولید قراردادی، گفت‌وگو درباره توانمندی تولیدکنندگان، مشخصات محصول، شرایط اولیه تولید و الزامات کیفیت را بررسی کنید.',
'Contract Manufacturing (CMO): commercial coordination':'تولید قراردادی (CMO): هماهنگی تجاری',
'We facilitate discussions between companies seeking contract manufacturing and manufacturers with potentially suitable capabilities.':'گفت‌وگو میان شرکت‌های متقاضی تولید قراردادی و تولیدکنندگان دارای توانمندی‌های بالقوه متناسب را تسهیل می‌کنیم.',
'Coordination may include product and capacity requirements, manufacturing scope, quality documentation requests, timelines, packaging needs, and preliminary commercial terms.':'هماهنگی می‌تواند شامل الزامات محصول و ظرفیت، دامنه تولید، درخواست اسناد کیفیت، زمان‌بندی، نیازهای بسته‌بندی و شرایط اولیه تجاری باشد.',
'Manufacturing suitability, quality agreements, audits, technical transfer, validation, and applicable GMP or other standards must be evaluated by the responsible technical and quality teams.':'تناسب تولیدکننده، توافق‌نامه‌های کیفیت، ممیزی‌ها، انتقال فنی، اعتبارسنجی و انطباق با GMP یا سایر استانداردها باید توسط تیم‌های فنی و کیفیت مسئول ارزیابی شوند.',
'Any manufacturing relationship proceeds only after the parties complete due diligence and agree on contractual responsibilities.':'همکاری تولیدی تنها پس از تکمیل بررسی‌های کارشناسی و توافق طرفین درباره مسئولیت‌های قراردادی آغاز می‌شود.',
'We organize preliminary discussions with potential manufacturers around product requirements, capability, quality expectations and commercial scope.':'گفت‌وگوهای اولیه با تولیدکنندگان بالقوه را حول الزامات محصول، توانمندی‌ها، انتظارات کیفی و دامنه تجاری سازمان‌دهی می‌کنیم.',
'Feasibility depends on manufacturer qualification, capacity, specifications and market rules.':'امکان‌پذیری پروژه به صلاحیت تولیدکننده، ظرفیت، مشخصات فنی و مقررات بازار بستگی دارد.',
'Product concept, formula or technical specification and packaging requirements.':'مفهوم محصول، فرمولاسیون یا مشخصات فنی و الزامات بسته‌بندی.',
'Estimated volumes, launch schedule, target cost and minimum-order expectations.':'حجم برآوردی، برنامه عرضه، هزینه هدف و انتظارات مربوط به حداقل سفارش.',
'Required quality systems, certificates, testing and destination-market obligations.':'سیستم‌های کیفیت، گواهی‌ها، آزمون‌ها و تعهدات موردنیاز در بازار مقصد.'
},
'import-export.html':{
'Import & Export Services':'خدمات واردات و صادرات',
'Coordinate international import and export opportunities, supplier and buyer communication, quotations, trade documents and logistics follow-up for eligible products.':'فرصت‌های واردات و صادرات بین‌المللی، ارتباط با تأمین‌کنندگان و خریداران، استعلام قیمت، اسناد تجاری و پیگیری لجستیک محصولات مجاز را هماهنگ می‌کنیم.',
'Import & Export Services: commercial coordination':'خدمات واردات و صادرات: هماهنگی تجاری',
'We coordinate import and export opportunities between suppliers, manufacturers, buyers, and distribution partners across international markets.':'فرصت‌های واردات و صادرات میان تأمین‌کنندگان، تولیدکنندگان، خریداران و شرکای توزیع در بازارهای بین‌المللی را هماهنگ می‌کنیم.',
'Support may include supplier and buyer communication, quotation collection, commercial-term coordination, document follow-up, and coordination with freight, customs, and logistics parties.':'این پشتیبانی می‌تواند شامل ارتباط با تأمین‌کننده و خریدار، دریافت استعلام قیمت، هماهنگی شرایط تجاری، پیگیری اسناد و هماهنگی با طرف‌های حمل‌ونقل، گمرک و لجستیک باشد.',
'Explore African Market Opportunities':'فرصت‌های بازار آفریقا را بررسی کنید',
'Dedicated market pages for commercial enquiries involving selected African markets.':'صفحات اختصاصی بازار برای درخواست‌های تجاری مرتبط با برخی بازارهای منتخب آفریقا.',
'Each opportunity is assessed individually against product classification, local importer requirements and applicable trade rules.':'هر فرصت به‌صورت جداگانه و بر اساس طبقه‌بندی محصول، الزامات واردکننده محلی و مقررات تجاری مربوط ارزیابی می‌شود.',
'South Africa Market':'بازار آفریقای جنوبی','Pharmaceutical products, APIs, medical devices, healthcare distribution and commercial partnerships.':'محصولات دارویی، مواد مؤثره دارویی، تجهیزات پزشکی، توزیع محصولات سلامت و مشارکت‌های تجاری.',
'Kenya Market':'بازار کنیا','Medicines, health products, medical devices, nutrition and importer or distributor enquiries.':'داروها، محصولات سلامت، تجهیزات پزشکی، محصولات تغذیه‌ای و درخواست‌های واردکنندگان یا توزیع‌کنندگان.',
'Côte d’Ivoire Market':'بازار ساحل عاج','Marché pharmaceutique, principes actifs, dispositifs médicaux et partenariats commerciaux.':'بازار دارویی، مواد مؤثره، تجهیزات پزشکی و مشارکت‌های تجاری.',
'Each transaction is assessed according to the product, origin and destination markets, applicable trade rules, and agreed Incoterms.':'هر معامله بر اساس نوع محصول، بازار مبدأ و مقصد، مقررات تجاری مربوط و اینکوترمز مورد توافق ارزیابی می‌شود.',
'Customs clearance, permits, payment arrangements, shipping, and compliance are handled with the relevant authorized parties; specific requirements and responsibilities are confirmed before execution.':'ترخیص گمرکی، مجوزها، ترتیبات پرداخت، حمل‌ونقل و انطباق با مقررات با همکاری طرف‌های مجاز مربوط انجام می‌شود؛ الزامات و مسئولیت‌های مشخص پیش از اجرا تأیید خواهند شد.',
'We organize the commercial hand-offs among buyers, suppliers and logistics parties, with the product, origin, destination and agreed responsibilities identified early.':'هماهنگی‌های تجاری میان خریداران، تأمین‌کنندگان و طرف‌های لجستیکی را انجام می‌دهیم و از ابتدا محصول، مبدأ، مقصد و مسئولیت‌های مورد توافق را مشخص می‌کنیم.',
'Customs, permits and shipping arrangements must be confirmed for each transaction.':'ترتیبات گمرکی، مجوزها و حمل‌ونقل باید برای هر معامله به‌طور جداگانه تأیید شوند.',
'Product description, origin and destination country; HS code if already known.':'شرح محصول، کشور مبدأ و مقصد؛ و در صورت اطلاع، کد تعرفه گمرکی (HS).',
'Buyer/supplier roles, indicative volume, timing and agreed Incoterms if available.':'نقش خریدار و تأمین‌کننده، حجم تقریبی، زمان‌بندی و در صورت موجود بودن اینکوترمز مورد توافق.',
'Required certificates, permits, shipping documents and payment or delivery terms to be reviewed by the relevant parties.':'گواهی‌ها، مجوزها، اسناد حمل و شرایط پرداخت یا تحویل که باید توسط طرف‌های مربوط بررسی شوند.'
},
'infant-formula.html':{
'Infant Formula & Baby Nutrition':'شیرخشک و تغذیه نوزاد',
'Coordinate commercial enquiries for infant formula and baby nutrition products, manufacturer information, supply terms and destination-market regulatory review.':'درخواست‌های تجاری مربوط به شیرخشک و محصولات تغذیه نوزاد، اطلاعات تولیدکننده، شرایط تأمین و بررسی مقررات بازار مقصد را هماهنگ می‌کنیم.',
'Infant Formula & Baby Milk: commercial coordination':'شیرخشک و تغذیه نوزاد: هماهنگی تجاری',
'Niaz Net Tehran facilitates business development and sourcing discussions for infant formula and baby nutrition products with manufacturers and prospective market partners.':'نیازنت تهران گفت‌وگوهای توسعه کسب‌وکار و تأمین شیرخشک و محصولات تغذیه نوزاد را با تولیدکنندگان و شرکای بالقوه بازار تسهیل می‌کند.',
'We help coordinate product information, commercial terms, supply expectations, and the communication required to assess a potential distribution relationship.':'به هماهنگی اطلاعات محصول، شرایط تجاری، انتظارات تأمین و ارتباطات لازم برای ارزیابی همکاری احتمالی در زمینه توزیع کمک می‌کنیم.',
'Because infant nutrition is a highly regulated category, product eligibility, labeling, registrations, and import conditions must be reviewed for each destination market.':'از آنجا که تغذیه نوزاد از گروه‌های دارای مقررات سخت‌گیرانه است، مجاز بودن محصول، برچسب‌گذاری، ثبت‌ها و شرایط واردات باید در هر بازار مقصد بررسی شوند.',
'We coordinate the relevant stakeholders so commercial planning and regulatory review can progress in a structured way.':'ذی‌نفعان مرتبط را هماهنگ می‌کنیم تا برنامه‌ریزی تجاری و بررسی مقرراتی به‌صورت ساختارمند پیش برود.',
'We treat infant nutrition enquiries as product- and market-specific because age stage, formulation, labelling and import rules can differ substantially.':'درخواست‌های تغذیه نوزاد را متناسب با هر محصول و بازار بررسی می‌کنیم؛ زیرا مرحله سنی، فرمولاسیون، برچسب‌گذاری و مقررات واردات ممکن است تفاوت زیادی داشته باشند.',
'Commercial discussions should progress alongside an appropriate regulatory review.':'گفت‌وگوهای تجاری باید هم‌زمان با بررسی مقرراتی متناسب پیش بروند.',
'Product stage and type, pack size and available product information.':'مرحله سنی و نوع محصول، اندازه بسته‌بندی و اطلاعات موجود محصول.',
'Destination market and planned distribution channel.':'بازار مقصد و کانال توزیع برنامه‌ریزی‌شده.',
'Current quality and regulatory documents, label information and remaining-shelf-life expectations.':'اسناد فعلی کیفیت و مقرراتی، اطلاعات برچسب و حداقل ماندگاری مورد انتظار.'
},
'sports-nutrition.html':{
'Sports Nutrition & Supplement Sourcing':'تغذیه ورزشی و تأمین مکمل',
'Explore international sports nutrition and supplement sourcing, brand representation, bulk product enquiries and distribution opportunities with NIAZ NET.':'فرصت‌های بین‌المللی تأمین محصولات تغذیه ورزشی و مکمل، نمایندگی برند، سفارش عمده و توزیع را با نیازنت بررسی کنید.',
'Sports Nutrition & Supplements: commercial coordination':'تغذیه ورزشی و مکمل‌ها: هماهنگی تجاری',
'We help businesses explore representation opportunities with international sports nutrition and supplement brands, while coordinating commercial discussions with brand owners and potential market partners.':'به کسب‌وکارها کمک می‌کنیم فرصت‌های نمایندگی برندهای بین‌المللی تغذیه ورزشی و مکمل را بررسی کنند و مذاکرات تجاری با صاحبان برند و شرکای بالقوه بازار را هماهنگ می‌کنیم.',
'We also coordinate bulk sourcing opportunities for sports powders, vitamins, wellness supplements, and diet-related food products.':'همچنین فرصت‌های تأمین عمده پودرهای ورزشی، ویتامین‌ها، مکمل‌های سلامت و محصولات غذایی مرتبط با رژیم را هماهنگ می‌کنیم.',
'Product specifications, quantities, supplier terms, and market requirements are reviewed for each opportunity.':'مشخصات محصول، مقدار، شرایط تأمین‌کننده و الزامات بازار برای هر فرصت به‌صورت جداگانه بررسی می‌شوند.',
'We first distinguish whether the enquiry concerns established branded products, bulk nutrition ingredients or an own-brand project.':'ابتدا مشخص می‌کنیم درخواست مربوط به محصولات برندشده موجود، مواد اولیه تغذیه‌ای به‌صورت عمده یا پروژه تولید با برند اختصاصی است.',
'This helps frame a realistic supplier conversation around product format, demand, channel and market requirements.':'این کار به شکل‌گیری گفت‌وگویی واقع‌بینانه با تأمین‌کننده درباره شکل محصول، تقاضا، کانال فروش و الزامات بازار کمک می‌کند.',
'Product format, ingredients or portfolio and any relevant specifications.':'شکل محصول، ترکیبات یا سبد محصولات و مشخصات مرتبط.',
'Target market, distribution channel and estimated demand or order size.':'بازار هدف، کانال توزیع و میزان تقاضا یا حجم سفارش برآوردی.',
'Whether the request is for branded goods, bulk materials or private-label production.':'اینکه درخواست مربوط به کالای برندشده، مواد اولیه عمده یا تولید با برند اختصاصی است.'
},
'technology-transfer.html':{
'Technology Transfer & Local Production':'انتقال فناوری و تولید داخلی',
'Coordinate technology-transfer and local-production discussions, including technical information requests, manufacturing partners and preliminary project scope.':'گفت‌وگوهای انتقال فناوری و تولید داخلی، از جمله درخواست اطلاعات فنی، شناسایی شرکای تولیدی و تعیین دامنه اولیه پروژه را هماهنگ می‌کنیم.',
'Technology Transfer & Local Production: commercial coordination':'انتقال فناوری و تولید داخلی: هماهنگی تجاری',
'We help coordinate technology-transfer opportunities between technology owners, product developers, and prospective local manufacturers.':'فرصت‌های انتقال فناوری میان صاحبان فناوری، توسعه‌دهندگان محصول و تولیدکنندگان داخلی بالقوه را هماهنگ می‌کنیم.',
'Early discussions can clarify the proposed scope, technical information required, production objectives, and the parties’ roles in evaluating feasibility.':'گفت‌وگوهای اولیه می‌توانند دامنه پیشنهادی، اطلاعات فنی موردنیاز، اهداف تولید و نقش طرف‌ها در ارزیابی امکان‌پذیری را روشن کنند.',
'A successful transfer may require technical assessment, intellectual-property review, quality planning, training, validation, and regulatory approval.':'انتقال موفق فناوری ممکن است به ارزیابی فنی، بررسی حقوق مالکیت فکری، برنامه‌ریزی کیفیت، آموزش، اعتبارسنجی و اخذ مجوزهای مقرراتی نیاز داشته باشد.',
'These workstreams are defined with the relevant experts and captured in the final project and contractual documents.':'این حوزه‌های کاری با همکاری متخصصان مربوط تعریف و در اسناد نهایی پروژه و قرارداد ثبت می‌شوند.',
'We clarify the technology or process to be transferred, the expected local-production outcome and the capabilities a receiving site may need.':'فناوری یا فرایند قابل انتقال، نتیجه مورد انتظار از تولید داخلی و توانمندی‌های موردنیاز محل دریافت‌کننده را مشخص می‌کنیم.',
'Technical feasibility, IP rights and regulatory approvals require separate confirmation.':'امکان‌پذیری فنی، حقوق مالکیت فکری و مجوزهای مقرراتی باید جداگانه تأیید شوند.',
'Product/process scope, current manufacturing stage and available technical package.':'دامنه محصول یا فرایند، مرحله فعلی تولید و بسته اطلاعات فنی موجود.',
'Target country/site, desired capacity, equipment and workforce assumptions.':'کشور یا محل هدف، ظرفیت موردنظر و برآوردهای مربوط به تجهیزات و نیروی انسانی.',
'IP/licensing position, quality requirements, milestones and counterpart responsibilities.':'وضعیت مالکیت فکری و مجوزها، الزامات کیفیت، نقاط عطف و مسئولیت‌های طرف مقابل.'
},
'market-entry.html':{
'Market Entry Strategy & Solutions':'راهبرد و راهکارهای ورود به بازار',
'Assess market-entry routes, channel and partner options, commercial positioning and local requirements for brands considering new international markets.':'مسیرهای ورود به بازار، گزینه‌های کانال فروش و شرکا، جایگاه‌یابی تجاری و الزامات محلی را برای برندهای متقاضی ورود به بازارهای بین‌المللی ارزیابی می‌کنیم.',
'Market Entry Strategy & Solutions: commercial coordination':'راهبرد ورود به بازار: هماهنگی تجاری',
'We help companies assess how to enter a new market by clarifying target customer segments, routes to market, potential partners, competitive considerations, and commercial priorities.':'به شرکت‌ها کمک می‌کنیم با تعیین گروه‌های مشتریان هدف، مسیرهای ورود به بازار، شرکای بالقوه، ملاحظات رقابتی و اولویت‌های تجاری، روش ورود به بازار جدید را ارزیابی کنند.',
'The goal is to translate a broad expansion objective into a practical sequence of decisions and actions.':'هدف، تبدیل یک هدف کلی توسعه بازار به مجموعه‌ای عملی از تصمیم‌ها و اقدامات مرحله‌بندی‌شده است.',
'Depending on the project, we can coordinate market information gathering, partner discussions, distribution planning, and regulatory questions with specialist stakeholders.':'متناسب با پروژه، گردآوری اطلاعات بازار، گفت‌وگو با شرکا، برنامه‌ریزی توزیع و بررسی پرسش‌های مقرراتی با ذی‌نفعان متخصص را هماهنگ می‌کنیم.',
'Recommendations are tailored to the product category, the destination market, and the client’s available resources and risk appetite.':'پیشنهادها متناسب با گروه محصول، بازار مقصد، منابع در دسترس و میزان ریسک‌پذیری مشتری ارائه می‌شوند.',
'We help outline a market-entry route by considering target customers, channel options, potential partners and the questions that need local confirmation.':'با درنظرگرفتن مشتریان هدف، گزینه‌های کانال فروش، شرکای بالقوه و موارد نیازمند تأیید محلی، به ترسیم مسیر ورود به بازار کمک می‌کنیم.',
'Any market assessment should be supported by product-specific research and advice from qualified local specialists where required.':'هر ارزیابی بازار باید در صورت لزوم با پژوهش اختصاصی محصول و مشاوره متخصصان محلی واجد صلاحیت پشتیبانی شود.',
'Product or service, current market position and target country.':'محصول یا خدمت، جایگاه فعلی در بازار و کشور هدف.',
'Target customer group, preferred sales/distribution channel and commercial goals.':'گروه مشتریان هدف، کانال ترجیحی فروش یا توزیع و اهداف تجاری.',
'Known regulatory barriers, launch timing and available market or competitor information.':'موانع مقرراتی شناخته‌شده، زمان‌بندی عرضه و اطلاعات موجود درباره بازار یا رقبا.'
},
'pharmaceutical-products.html':{
'Pharmaceutical Finished Products':'محصولات نهایی دارویی',
'Coordinate business enquiries for finished pharmaceutical products, product portfolios, supplier information, distribution discussions and market-specific requirements.':'درخواست‌های تجاری مربوط به محصولات نهایی دارویی، سبد محصولات، اطلاعات تأمین‌کنندگان، مذاکرات توزیع و الزامات اختصاصی هر بازار را هماهنگ می‌کنیم.',
'Pharmaceutical Finished Products: commercial coordination':'محصولات نهایی دارویی: هماهنگی تجاری',
'We coordinate commercial discussions for pharmaceutical finished products between manufacturers, buyers, and potential distribution partners.':'گفت‌وگوهای تجاری مربوط به محصولات نهایی دارویی میان تولیدکنندگان، خریداران و شرکای بالقوه توزیع را هماهنگ می‌کنیم.',
'Depending on the opportunity, support may include product portfolio review, supplier communication, quotation requests, supply planning, and coordination of required product information.':'متناسب با فرصت، پشتیبانی می‌تواند شامل بررسی سبد محصولات، ارتباط با تأمین‌کننده، درخواست استعلام قیمت، برنامه‌ریزی تأمین و هماهنگی اطلاعات موردنیاز محصول باشد.',
'Product availability, marketing authorization, import eligibility, quality requirements, and supply terms must be confirmed for each market and product.':'موجودی محصول، مجوز عرضه، امکان واردات، الزامات کیفیت و شرایط تأمین باید برای هر محصول و بازار تأیید شوند.',
'Our role is to facilitate communication among commercial, quality, regulatory, and logistics stakeholders rather than replace their formal approvals.':'نقش ما تسهیل ارتباط میان ذی‌نفعان بازرگانی، کیفیت، امور مقرراتی و لجستیک است و جایگزین تأییدیه‌های رسمی آنان نمی‌شود.',
'We organize business enquiries around the product portfolio, source, target market and distribution model.':'درخواست‌های تجاری را بر اساس سبد محصول، منبع تأمین، بازار هدف و مدل توزیع سازمان‌دهی می‌کنیم.',
'Product eligibility, product registration and the right to import or distribute must be checked in the destination market.':'مجاز بودن محصول، ثبت آن و حق واردات یا توزیع باید در بازار مقصد بررسی شوند.',
'Product name, dosage form, strength and available product list.':'نام محصول، شکل دارویی، دوز یا قدرت دارو و فهرست محصولات موجود.',
'Destination market, buyer/distributor profile and expected demand.':'بازار مقصد، مشخصات خریدار یا توزیع‌کننده و تقاضای مورد انتظار.',
'Current GMP, CoA, registration, shelf-life and other product documents as applicable and available.':'اسناد موجود و مرتبط محصول از جمله GMP، گواهی آنالیز (CoA)، مدارک ثبت و مدت ماندگاری.'
}
};

Object.assign(pages,{
'become-our-partner.html':{
'PARTNERSHIPS & COLLABORATION':'مشارکت‌ها و همکاری‌ها','Become Our Partner':'به جمع شرکای ما بپیوندید',
'We welcome discussions with manufacturers, brand owners, technology providers, distributors and qualified commercial partners seeking to develop opportunities in target markets.':'از گفت‌وگو با تولیدکنندگان، صاحبان برند، ارائه‌دهندگان فناوری، توزیع‌کنندگان و شرکای تجاری واجد صلاحیت که به‌دنبال توسعه فرصت‌ها در بازارهای هدف هستند استقبال می‌کنیم.',
'START A PARTNERSHIP DISCUSSION →':'آغاز گفت‌وگو درباره همکاری ←','CONTACT DETAILS':'اطلاعات تماس','Who We Work With':'با چه مجموعه‌هایی همکاری می‌کنیم',
'Manufacturers & Brand Owners':'تولیدکنندگان و صاحبان برند','Explore market representation, sourcing, licensing and distribution opportunities.':'فرصت‌های نمایندگی در بازار، تأمین، صدور مجوز و توزیع را بررسی کنید.',
'Commercial & Distribution Partners':'شرکای تجاری و توزیع','Coordinate market access, partner discussions and cross-border trade opportunities.':'دسترسی به بازار، گفت‌وگو با شرکا و فرصت‌های تجارت فرامرزی را هماهنگ می‌کنیم.',
'Technology & Production Partners':'شرکای فناوری و تولید','Discuss contract manufacturing, private label and technology transfer opportunities.':'درباره فرصت‌های تولید قراردادی، برند اختصاصی و انتقال فناوری گفت‌وگو کنید.',
'Start a Conversation':'گفت‌وگو را آغاز کنید','Send us a short introduction including your company, product or service, target market and preferred type of cooperation.':'معرفی کوتاهی شامل اطلاعات شرکت، محصول یا خدمت، بازار هدف و نوع همکاری موردنظر برای ما ارسال کنید.',
'Our team can then review the opportunity and follow up.':'سپس تیم ما فرصت را بررسی کرده و پیگیری خواهد کرد.','EMAIL YOUR PARTNERSHIP ENQUIRY →':'ارسال درخواست همکاری از طریق ایمیل ←'
},
'business-development.html':{
'International Business Development':'توسعه کسب‌وکار بین‌المللی','Structure international business-development opportunities through partner identification, commercial introductions, market planning and follow-up across target markets.':'فرصت‌های توسعه کسب‌وکار بین‌المللی را از طریق شناسایی شرکا، معرفی‌های تجاری، برنامه‌ریزی بازار و پیگیری در بازارهای هدف ساختارمند می‌کنیم.',
'Business Development: commercial coordination':'توسعه کسب‌وکار: هماهنگی تجاری',
'Niaz Net Tehran helps companies identify and develop commercial opportunities through structured outreach, partner engagement, market prioritization, and follow-up with relevant stakeholders.':'نیازنت تهران به شرکت‌ها کمک می‌کند از طریق ارتباط‌گیری هدفمند، تعامل با شرکا، اولویت‌بندی بازارها و پیگیری با ذی‌نفعان مرتبط، فرصت‌های تجاری را شناسایی و توسعه دهند.',
'We focus on connecting business objectives with practical opportunities for cooperation and revenue growth.':'تمرکز ما بر پیوند دادن اهداف کسب‌وکار با فرصت‌های عملی همکاری و رشد درآمد است.',
'Depending on the project, support may include preparing a development roadmap, coordinating meetings, evaluating potential partners, and maintaining a clear pipeline of next steps.':'بسته به پروژه، پشتیبانی می‌تواند شامل تهیه نقشه راه توسعه، هماهنگی جلسات، ارزیابی شرکای بالقوه و پیگیری شفاف مراحل بعدی باشد.',
'Scope, targets, and reporting expectations are agreed with the client before work begins.':'دامنه کار، اهداف و انتظارات گزارش‌دهی پیش از آغاز همکاری با مشتری توافق می‌شوند.',
'We start with the commercial objective and the type of counterpart needed, then organize relevant partner outreach and follow-up.':'کار را با تعیین هدف تجاری و نوع طرف همکاری موردنیاز آغاز می‌کنیم و سپس ارتباط‌گیری و پیگیری با شرکای مرتبط را سازمان‌دهی می‌کنیم.',
'The scope is tailored to the product, market and project stage.':'دامنه خدمات متناسب با محصول، بازار و مرحله پروژه تعیین می‌شود.',
'Company and product profile with the objective of the project.':'معرفی شرکت و محصول به همراه هدف پروژه.',
'Target geography and the type of manufacturer, buyer, distributor or investor sought.':'جغرافیای هدف و نوع تولیدکننده، خریدار، توزیع‌کننده یا سرمایه‌گذار موردنظر.',
'Expected milestones, timeline and practical criteria for a suitable opportunity.':'نقاط عطف مورد انتظار، زمان‌بندی و معیارهای عملی برای فرصت مناسب.'
},
'cbd-products.html':{
'CBD Product Market Coordination':'هماهنگی تجاری محصولات CBD','Coordinate preliminary commercial enquiries for CBD-related products only where lawful, with product classification, licensing and destination-market requirements reviewed first.':'درخواست‌های تجاری اولیه درباره محصولات مرتبط با CBD را صرفاً در موارد مجاز قانونی و پس از بررسی طبقه‌بندی محصول، مجوزها و الزامات بازار مقصد هماهنگ می‌کنیم.',
'CBD Products & Market Coordination':'محصولات CBD و هماهنگی بازار','CBD Products & Market Coordination: commercial coordination':'محصولات CBD: هماهنگی تجاری',
'Niaz Net Tehran can coordinate preliminary commercial discussions for CBD-related products where the product category and intended market allow such activity.':'نیازنت تهران می‌تواند در مواردی که گروه محصول و بازار مقصد اجازه می‌دهند، گفت‌وگوهای تجاری اولیه درباره محصولات مرتبط با CBD را هماهنگ کند.',
'Early-stage work may include clarifying product specifications, identifying potential business counterparts, and mapping the questions that must be resolved before a transaction can proceed.':'اقدامات اولیه می‌تواند شامل شفاف‌سازی مشخصات محصول، شناسایی طرف‌های تجاری بالقوه و تعیین پرسش‌هایی باشد که پیش از انجام معامله باید پاسخ داده شوند.',
'CBD laws and product classifications vary significantly by jurisdiction and product type.':'قوانین مربوط به CBD و طبقه‌بندی محصولات آن بر اساس حوزه قضایی و نوع محصول تفاوت قابل‌توجهی دارند.',
'No sourcing, import, distribution, or marketing activity should proceed until legality, licensing, product status, and all applicable regulatory requirements have been independently confirmed for the relevant markets.':'تا زمانی که قانونی بودن فعالیت، مجوزها، وضعیت محصول و تمامی الزامات مقرراتی قابل‌اعمال به‌طور مستقل برای بازارهای مربوط تأیید نشده‌اند، هیچ‌گونه تأمین، واردات، توزیع یا بازاریابی نباید انجام شود.',
'Before any transaction is explored, the product composition and legal status must be checked for the specific destination market.':'پیش از بررسی هر معامله، ترکیب محصول و وضعیت قانونی آن باید برای بازار مقصد مشخص بررسی شود.',
'The service is limited to preliminary coordination where the activity is lawful.':'این خدمت صرفاً به هماهنگی اولیه در مواردی که فعالیت قانونی است محدود می‌شود.',
'Product type, composition and cannabinoid information, where relevant.':'نوع محصول، ترکیبات و اطلاعات کانابینوئیدی در صورت ارتباط.',
'Origin and destination markets and the applicable license or product status.':'بازارهای مبدأ و مقصد و وضعیت مجوز یا محصول مربوط.',
'Manufacturer information, available documentation and proposed commercial route.':'اطلاعات تولیدکننده، اسناد موجود و مسیر تجاری پیشنهادی.'
},
'chamber-of-commerce.html':{
'Private Chamber of Commerce & Trade Networks':'شبکه‌های اتاق بازرگانی خصوصی و تجارت',
'Coordinate business introductions, trade-delegation communication and cross-border commercial opportunities with relevant chambers and business networks.':'معرفی‌های تجاری، ارتباطات هیئت‌های بازرگانی و فرصت‌های تجاری فرامرزی را با اتاق‌ها و شبکه‌های تجاری مرتبط هماهنگ می‌کنیم.',
'Private Chamber of Commerce: commercial coordination':'اتاق بازرگانی خصوصی: هماهنگی تجاری',
'We facilitate business-to-business engagement and trade-network development with relevant chambers of commerce, industry associations, and institutional stakeholders, where appropriate.':'در صورت تناسب، تعاملات بنگاه‌به‌بنگاه و توسعه شبکه‌های تجاری را با اتاق‌های بازرگانی، انجمن‌های صنعتی و ذی‌نفعان نهادی مرتبط تسهیل می‌کنیم.',
'This can help companies identify networking opportunities, understand the business environment, and establish contact with potential commercial counterparts.':'این همکاری می‌تواند به شرکت‌ها در شناسایی فرصت‌های شبکه‌سازی، شناخت محیط کسب‌وکار و برقراری ارتباط با طرف‌های تجاری بالقوه کمک کند.',
'Our role is coordination and relationship support, not a claim of official affiliation or guaranteed access.':'نقش ما هماهنگی و پشتیبانی از روابط تجاری است و به‌معنای وابستگی رسمی یا تضمین دسترسی نیست.',
'Any formal membership, endorsement, certification, or institutional service is subject to the relevant organization’s own process and approval.':'هرگونه عضویت رسمی، تأیید، گواهی یا خدمت نهادی تابع فرایندها و تأییدیه‌های خود سازمان مربوط است.',
'We clarify the purpose of the proposed trade or business-networking activity and the participants who need to be involved.':'هدف فعالیت تجاری یا شبکه‌سازی پیشنهادی و شرکت‌کنندگان موردنیاز را مشخص می‌کنیم.',
'Introductions and institutional coordination depend on interest and availability of the relevant organizations.':'معرفی‌ها و هماهنگی‌های نهادی به علاقه‌مندی و امکان همکاری سازمان‌های مربوط بستگی دارد.',
'Country, sector and objective of the proposed introduction or delegation.':'کشور، بخش اقتصادی و هدف معرفی یا هیئت پیشنهادی.',
'Company profile and the type of counterpart or institution sought.':'معرفی شرکت و نوع طرف همکاری یا نهاد موردنظر.',
'Preferred date range, participant list and intended outcomes, if applicable.':'بازه زمانی ترجیحی، فهرست شرکت‌کنندگان و نتایج مورد انتظار، در صورت وجود.'
},
'cosmoderma.html':{
'Cosmoderma & Aesthetic Medicine':'کازمودرما و پزشکی زیبایی','Explore commercial coordination for aesthetic medicine, botulinum toxin products, dermal fillers and cosmoderma manufacturing or market-development opportunities.':'فرصت‌های هماهنگی تجاری در حوزه پزشکی زیبایی، محصولات سم بوتولینوم، فیلرهای پوستی و تولید یا توسعه بازار محصولات کازمودرما را بررسی کنید.',
'Cosmoderma (Botox & Dermal Fillers): commercial coordination':'کازمودرما (بوتاکس و فیلرهای پوستی): هماهنگی تجاری',
'Niaz Net Tehran supports brand registration and market development for aesthetic medicine and cosmoderma products, including botulinum toxin (Botox) and dermal fillers.':'نیازنت تهران از ثبت برند و توسعه بازار محصولات پزشکی زیبایی و کازمودرما، از جمله سم بوتولینوم (بوتاکس) و فیلرهای پوستی پشتیبانی می‌کند.',
'We coordinate with brand owners and qualified manufacturers to explore product portfolios, target markets, documentation needs, and suitable commercial partners.':'با صاحبان برند و تولیدکنندگان واجد صلاحیت برای بررسی سبد محصولات، بازارهای هدف، نیازهای مستندات و شرکای تجاری مناسب هماهنگی می‌کنیم.',
'Our capabilities include coordination for brand registration, sourcing of suitable raw materials, and discussions with qualified partners regarding production-line setup or local manufacturing.':'توانمندی‌های ما شامل هماهنگی ثبت برند، تأمین مواد اولیه مناسب و گفت‌وگو با شرکای واجد صلاحیت درباره راه‌اندازی خط تولید یا تولید داخلی است.',
'Product eligibility, quality requirements, and regulatory approvals must be confirmed for each destination market before commercial activity.':'پیش از هر فعالیت تجاری، مجاز بودن محصول، الزامات کیفیت و مجوزهای مقرراتی باید برای هر بازار مقصد تأیید شوند.',
'We clarify whether the project concerns an existing product range, manufacturer sourcing, brand representation or a production-line opportunity.':'مشخص می‌کنیم پروژه مربوط به سبد محصولات موجود، تأمین تولیدکننده، نمایندگی برند یا فرصت راه‌اندازی خط تولید است.',
'Product classification and local registration need to be confirmed before commercial activity.':'طبقه‌بندی محصول و ثبت محلی آن باید پیش از فعالیت تجاری تأیید شوند.',
'Product type and intended use, such as botulinum toxin, dermal filler or skincare.':'نوع محصول و کاربرد موردنظر، مانند سم بوتولینوم، فیلر پوستی یا محصولات مراقبت از پوست.',
'Manufacturer and product regulatory status, where known.':'وضعیت مقرراتی تولیدکننده و محصول، در صورت اطلاع.',
'Target country, expected commercial model and available technical documentation.':'کشور هدف، مدل تجاری مورد انتظار و مستندات فنی موجود.'
}
});

const file=location.pathname.split('/').pop();
const dict=Object.assign({},common,pages[file]||{});
function norm(s){return s.replace(/\s+/g,' ').trim();}
function translate(){
document.documentElement.lang='fa';
document.body.dataset.contentLang='fa';
document.body.style.direction='ltr';
const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
for(const node of nodes){
 const p=node.parentElement;if(!p||/^(SCRIPT|STYLE|SVG|NOSCRIPT|CODE|PRE)$/i.test(p.tagName)||p.closest('svg,script,style,noscript'))continue;
 const raw=norm(node.nodeValue);if(!raw)continue;
 if(dict[raw]){node.nodeValue=node.nodeValue.replace(raw,dict[raw]);p.setAttribute('dir','rtl');p.style.textAlign='right';p.style.unicodeBidi='plaintext';}
}
for(const el of document.querySelectorAll('input[placeholder],textarea[placeholder]'))if(dict[norm(el.placeholder)]){el.placeholder=dict[norm(el.placeholder)];el.dir='rtl';}
for(const el of document.querySelectorAll('[aria-label]'))if(dict[norm(el.getAttribute('aria-label'))])el.setAttribute('aria-label',dict[norm(el.getAttribute('aria-label'))]);
const titleMap={
'api-supply.html':'تأمین مواد اولیه دارویی و API | نیازنت',
'brand-registration.html':'ثبت برند در بازارهای بین‌المللی | نیازنت',
'exclusive-agency.html':'نمایندگی انحصاری و نمایندگی برند | نیازنت',
'contract-manufacturing.html':'تولید قراردادی و هماهنگی تولید | نیازنت',
'import-export.html':'خدمات واردات و صادرات بین‌المللی | نیازنت',
'infant-formula.html':'شیرخشک و محصولات تغذیه نوزاد | نیازنت',
'sports-nutrition.html':'تغذیه ورزشی و تأمین مکمل | نیازنت',
'technology-transfer.html':'انتقال فناوری و تولید داخلی | نیازنت',
'market-entry.html':'راهبرد ورود به بازارهای بین‌المللی | نیازنت',
'pharmaceutical-products.html':'تجارت محصولات نهایی دارویی | نیازنت'
};
if(titleMap[file])document.title=titleMap[file];
const meta=document.querySelector('meta[name="description"]');if(meta&&dict[norm(meta.content)])meta.content=dict[norm(meta.content)];
}
const style=document.createElement('style');
style.textContent='body[data-content-lang="fa"]{direction:ltr!important}body[data-content-lang="fa"] :is(h1,h2,h3,h4,p,li,blockquote,.eyebrow,.breadcrumb,.service-copy,.section-copy){text-align:right;direction:rtl;unicode-bidi:plaintext}body[data-content-lang="fa"] .nav,body[data-content-lang="fa"] .nav-links,body[data-content-lang="fa"] .hero-inner,body[data-content-lang="fa"] .hero-actions,body[data-content-lang="fa"] .services-grid,body[data-content-lang="fa"] .footer-grid{direction:ltr!important}body[data-content-lang="fa"] .nav-links>a,body[data-content-lang="fa"] .nav-item>button,body[data-content-lang="fa"] .btn,body[data-content-lang="fa"] .nav-cta{direction:rtl}';
document.head.appendChild(style);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',translate,{once:true});else translate();
const observer=new MutationObserver(()=>translate());observer.observe(document.body,{childList:true,subtree:true});
})();