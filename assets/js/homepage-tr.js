
const serviceItems = window.NIAZ_SERVICE_CATALOG.map(function (item) { return { name: item.tr, slug: item.slug }; });

const serviceGrid = document.getElementById('serviceGrid');

const serviceDisplayLabels = {
  'brand-registration':'Marka Tescili',
  'api-supply':'API',
  'sports-nutrition':'Sporcu Beslenmesi',
  'infant-formula':'Bebek Maması ve Beslenmesi',
  'cbd-products':'CBD_NON THC',
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
