(function () {
  'use strict';

  // Single source of truth for the EN/TR homepage service names and slugs.
  window.NIAZ_SERVICE_CATALOG = Object.freeze([
  {
    "slug": "brand-registration",
    "en": "Brand Registration",
    "tr": "Marka Tescili"
  },
  {
    "slug": "sports-nutrition",
    "en": "Sports Nutrition & Supplements",
    "tr": "Sporcu Beslenmesi ve Takviyeler"
  },
  {
    "slug": "infant-formula",
    "en": "Infant Formula & Nutrition",
    "tr": "Bebek Maması ve Beslenmesi"
  },
  {
    "slug": "cosmoderma",
    "en": "Cosmoderma (Botox & Dermal Fillers)",
    "tr": "Kozmoderma (Botoks ve Dermal Dolgular)"
  },
  {
    "slug": "api-supply",
    "en": "API",
    "tr": "API"
  },
  {
    "slug": "medical-devices",
    "en": "Medical Devices & Healthcare Equipment",
    "tr": "Tıbbi Cihazlar ve Sağlık Ekipmanları"
  },
  {
    "slug": "cbd-products",
    "en": "CBD_NON THC Products & Market Coordination",
    "tr": "CBD_NON THC Ürünleri ve Pazar Koordinasyonu"
  },
  {
    "slug": "import-export",
    "en": "Import & Export Services",
    "tr": "İthalat ve İhracat Hizmetleri"
  },
  {
    "slug": "exclusive-agency",
    "en": "Exclusive Agency & Brand Representation",
    "tr": "Münhasır Temsilcilik ve Marka Temsili"
  },
  {
    "slug": "business-development",
    "en": "Business Development",
    "tr": "İş Geliştirme"
  },
  {
    "slug": "chamber-of-commerce",
    "en": "Private Chamber of Commerce",
    "tr": "Özel Ticaret Odası"
  },
  {
    "slug": "market-entry",
    "en": "Market Entry Strategy & Solutions",
    "tr": "Pazara Giriş Stratejisi ve Çözümleri"
  },
  {
    "slug": "licensing-partnerships",
    "en": "Licensing & Strategic Partnerships",
    "tr": "Lisanslama ve Stratejik İş Ortaklıkları"
  },
  {
    "slug": "pharmaceutical-products",
    "en": "Pharmaceutical Finished Products",
    "tr": "Bitmiş Farmasötik Ürünler"
  },
  {
    "slug": "product-registration",
    "en": "Product Registration & Dossier Coordination",
    "tr": "Ürün Tescili ve Dosya Koordinasyonu"
  },
  {
    "slug": "regulatory-affairs",
    "en": "Regulatory Affairs & Compliance Coordination",
    "tr": "Mevzuat İşleri ve Uyum Koordinasyonu"
  },
  {
    "slug": "contract-manufacturing",
    "en": "Contract Manufacturing (FCM & CMO)",
    "tr": "Fason Üretim (FCM & CMO)"
  },
  {
    "slug": "technology-transfer",
    "en": "Technology Transfer & Local Production",
    "tr": "Teknoloji Transferi ve Yerel Üretim"
  },
  {
    "slug": "international-business-development",
    "en": "International Business Development",
    "tr": "International İş Geliştirme"
  },
  {
    "slug": "supply-chain-solutions",
    "en": "Supply Chain Solutions",
    "tr": "Tedarik Zinciri Çözümleri"
  },
  {
    "slug": "private-label",
    "en": "Private Label & Own-Brand Development",
    "tr": "Özel Marka Geliştirme"
  },
  {
    "slug": "pet-food",
    "en": "Pet Food & Animal Nutrition",
    "tr": "Evcil Hayvan Maması ve Hayvan Beslenmesi"
  },
  {
    "slug": "nutraceuticals",
    "en": "Nutraceuticals & Wellness Products",
    "tr": "Nütrasötikler ve Sağlıklı Yaşam Ürünleri"
  }
].map(function (item) { return Object.freeze(item); }));

  const SERVICE_DISPLAY_ORDER = [
    'brand-registration','api-supply','sports-nutrition','infant-formula','cbd-products',
    'business-development','pharmaceutical-products','nutraceuticals','pet-food','medical-devices',
    'technology-transfer','private-label','contract-manufacturing','cosmoderma','regulatory-affairs',
    'licensing-partnerships','supply-chain-solutions'
  ];
  const VIP_SERVICE_SLUGS = ['chamber-of-commerce','exclusive-agency','market-entry'];
  const SERVICE_ICON_ASSETS = {
    'brand-registration':'brand.png','api-supply':'api.png','sports-nutrition':'sports-nutrition.png',
    'infant-formula':'infant-formula.png','cbd-products':'cbd.png','business-development':'business-development.png',
    'pharmaceutical-products':'pharmaceutical-products.png','nutraceuticals':'nutraceuticals.png','pet-food':'pet-food.png',
    'medical-devices':'medical-devices.png','technology-transfer':'technology-transfer.png','private-label':'private-label.png',
    'contract-manufacturing':'contract-manufacturing.png','cosmoderma':'cosmoderma.png','regulatory-affairs':'regulatory-affairs.png',
    'licensing-partnerships':'licensing-partnerships.png','supply-chain-solutions':'supply-chain-solutions.png',
    'chamber-of-commerce':'chamber-of-commerce.png','exclusive-agency':'exclusive-agency.png','market-entry':'market-entry.png',
    'import-export':'import-export-globe.png'
  };

  function serviceHref(slug, routeMode, staticPrefix, queryPrefix) {
    if (routeMode === 'static') {
      var href = (staticPrefix || '/') + slug + '.html';
      var params = new URLSearchParams(window.location.search);
      var savedLanguage = '';
      try { savedLanguage = localStorage.getItem('niaznet-language') || ''; } catch (error) {}
      if (params.get('lang') === 'fa' || (!params.has('lang') && savedLanguage === 'fa')) href += '?lang=fa';
      return href;
    }
    return (queryPrefix || '/') + 'index.html?service=' + encodeURIComponent(slug);
  }

  window.renderNiazServiceGrid = function (config) {
    config = config || {};
    const items = Array.isArray(config.items) ? config.items : [];
    const labels = config.labels || {};
    const vipLabels = config.vipLabels || {};
    const routeMode = config.routeMode === 'static' ? 'static' : 'query';
    const staticPrefix = config.staticPrefix || '/';
    const queryPrefix = config.queryPrefix || '/';
    const importExportLabel = config.importExportLabel || 'IMPORT / EXPORT';
    const serviceGrid = document.getElementById('serviceGrid');
    if (!serviceGrid) return;

    const iconPath = slug => '/images/service-icons/' + (SERVICE_ICON_ASSETS[slug] || 'brand.png');
    const findItem = slug => items.find(item => item.slug === slug);

    serviceGrid.innerHTML = '';
    const vipList = document.getElementById('vipServiceList');
    if (vipList) {
      vipList.innerHTML = '';
      VIP_SERVICE_SLUGS.forEach(slug => {
        const item = findItem(slug);
        if (!item) return;
        const link = document.createElement('a');
        link.className = 'vip-service-link';
        link.href = serviceHref(slug, routeMode, staticPrefix, queryPrefix);
        link.target = '_self';
        const label = vipLabels[slug] || item.name;
        link.innerHTML = '<img src="' + iconPath(slug) + '" alt="" loading="lazy"><span class="vip-label">' + label + '</span>';
        vipList.appendChild(link);
      });
    }

    const importExportItem = findItem('import-export');
    if (importExportItem) {
      const card = document.createElement('a');
      card.className = 'service-card import-export-card';
      card.dataset.serviceSlug = importExportItem.slug;
      card.href = serviceHref(importExportItem.slug, routeMode, staticPrefix, queryPrefix);
      card.target = '_self';
      card.innerHTML = '<span class="service-icon" aria-hidden="true"><img src="' + iconPath(importExportItem.slug) + '" alt="" loading="lazy"></span><h3>' + importExportLabel + '</h3>';
      serviceGrid.appendChild(card);
    }

    SERVICE_DISPLAY_ORDER.forEach(slug => {
      const item = findItem(slug);
      if (!item) return;
      const card = document.createElement('a');
      card.className = 'service-card' + (slug === 'cbd-products' ? ' cbd-service' : '');
      card.dataset.serviceSlug = slug;
      card.href = serviceHref(slug, routeMode, staticPrefix, queryPrefix);
      card.target = '_self';
      card.innerHTML = '<span class="service-icon" aria-hidden="true"><img src="' + iconPath(slug) + '" alt="" loading="lazy"></span><h3>' + (labels[slug] || item.name) + '</h3>';
      serviceGrid.appendChild(card);
    });
  };
})();
