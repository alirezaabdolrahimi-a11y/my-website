
const serviceItems = [
  { name: 'Marka Tescili', slug: 'brand-registration' },
  { name: 'Sporcu Beslenmesi ve Takviyeler', slug: 'sports-nutrition' },
  { name: 'Bebek Maması ve Beslenmesi', slug: 'infant-formula' },
  { name: 'Kozmoderma (Botoks ve Dermal Dolgular)', slug: 'cosmoderma' },
  { name: 'API', slug: 'api-supply' },
  { name: 'Tıbbi Cihazlar ve Sağlık Ekipmanları', slug: 'medical-devices' },
  { name: 'CBD Ürünleri ve Pazar Koordinasyonu', slug: 'cbd-products' },
  { name: 'İthalat ve İhracat Hizmetleri', slug: 'import-export' },
  { name: 'Münhasır Temsilcilik ve Marka Temsili', slug: 'exclusive-agency' },
  { name: 'İş Geliştirme', slug: 'business-development' },
  { name: 'Özel Ticaret Odası', slug: 'chamber-of-commerce' },
  { name: 'Pazara Giriş Stratejisi ve Çözümleri', slug: 'market-entry' },
  { name: 'Lisanslama ve Stratejik İş Ortaklıkları', slug: 'licensing-partnerships' },
  { name: 'Bitmiş Farmasötik Ürünler', slug: 'pharmaceutical-products' },
  { name: 'Ürün Tescili ve Dosya Koordinasyonu', slug: 'product-registration' },
  { name: 'Mevzuat İşleri ve Uyum Koordinasyonu', slug: 'regulatory-affairs' },
  { name: 'Fason Üretim (FCM & CMO)', slug: 'contract-manufacturing' },
  { name: 'Teknoloji Transferi ve Yerel Üretim', slug: 'technology-transfer' },
  { name: 'International İş Geliştirme', slug: 'international-business-development' },
  { name: 'Tedarik Zinciri Çözümleri', slug: 'supply-chain-solutions' },
  { name: 'Özel Marka Geliştirme', slug: 'private-label' },
  { name: 'Evcil Hayvan Maması ve Hayvan Beslenmesi', slug: 'pet-food' },
  
  { name: 'Nütrasötikler ve Sağlıklı Yaşam Ürünleri', slug: 'nutraceuticals' },
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
  'contract-manufacturing':'FCM & CMO',
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

const requestedService = new URLSearchParams(window.location.search).get('service');
if (requestedService && serviceItems.some(item => item.slug === requestedService)) {
  window.location.replace('/tr/' + requestedService + '.html');
}
