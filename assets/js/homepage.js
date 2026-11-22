
const serviceItems = window.NIAZ_SERVICE_CATALOG.map(function (item) { return { name: item.en, slug: item.slug }; });

const serviceGrid = document.getElementById('serviceGrid');

const serviceDisplayLabels = {
  'brand-registration':'Brand Registration',
  'api-supply':'API',
  'sports-nutrition':'Sports Nutrition',
  'infant-formula':'Infant Formula & Nutrition',
  'cbd-products':'CBD_NON THC',
  'business-development':'BD + R&D',
  'pharmaceutical-products':'FDF / Finished Products',
  'nutraceuticals':'Vitamin & Supplements',
  'pet-food':'Pet Food',
  'medical-devices':'Medical Devices',
  'technology-transfer':'Technology Transfer',
  'private-label':'Private Label Orders',
  'contract-manufacturing':'FCM & CMO',
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

// Persian homepage copy is translated by the shared fa-translation-runtime.js only.

// Service detail views load in the current tab, powered by this single HTML file.
const requestedParams = new URLSearchParams(window.location.search);
const requestedService = requestedParams.get('service');
if (requestedService && serviceItems.some(item => item.slug === requestedService)) {
  const language = requestedParams.get('lang');
  const target = '/' + requestedService + '.html' + (language ? '?lang=' + encodeURIComponent(language) : '');
  window.location.replace(target);
}
