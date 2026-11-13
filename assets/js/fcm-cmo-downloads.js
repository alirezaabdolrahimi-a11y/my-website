(function(){
'use strict';
const root=document.querySelector('[data-fcm-downloads]');
if(!root)return;
function cookie(name){const m=document.cookie.match(new RegExp('(?:^|; )'+name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'=([^;]*)'));return m?decodeURIComponent(m[1]):'';}
const pageLang=(document.documentElement.lang||'').toLowerCase().slice(0,2);
const path=location.pathname.toLowerCase();
const query=new URLSearchParams(location.search).get('lang');
let stored='';
try{stored=localStorage.getItem('niaznet-language')||'';}catch(e){}
const saved=cookie('niaznet-language')||cookie('niaznet-manual-language')||stored;
let lang='en';
if(path.startsWith('/tr/'))lang='tr';
else if(['en','fa','tr','es','fr'].includes(query))lang=query;
else if(['fa','tr','es','fr'].includes(pageLang))lang=pageLang;
else if(['fa','tr','es','fr'].includes(saved))lang=saved;
const copy={
en:{heading:'Download technical enquiry forms',intro:'Choose the product category to download the relevant contract manufacturing questionnaire.',titles:['Solid dosage forms','Non-sterile liquids','Sterile liquids (injectables)'],descs:['Tablets and capsules, manufacturing process, equipment, packaging and testing requirements.','Solutions, syrups and drops, raw materials, storage, container and packaging specifications.','Aseptic or terminal sterilization, ampoules and vials, storage, packaging and testing.'],button:'Download form'},
fa:{heading:'دریافت فرم‌های اطلاعات تولید قراردادی',intro:'برای دریافت فرم متناسب با نوع محصول، یکی از گروه‌های زیر را انتخاب کنید.',titles:['اشکال دارویی جامد','مایعات غیر استریل','مایعات استریل (تزریقی)'],descs:['قرص و کپسول، روش تولید، تجهیزات، بسته‌بندی و الزامات آزمایش.','محلول، شربت و قطره، مواد اولیه، شرایط نگهداری و مشخصات بسته‌بندی.','تولید آسپتیک یا استریلیزاسیون نهایی، آمپول و ویال، نگهداری و آزمایشات.'],button:'دانلود فرم'},
tr:{heading:'Sözleşmeli üretim bilgi formlarını indirin',intro:'Ürün kategorinize uygun sözleşmeli üretim anketini indirmek için aşağıdan seçim yapın.',titles:['Katı dozaj formları','Steril olmayan sıvılar','Steril sıvılar (enjektabl)'],descs:['Tablet ve kapsüller, üretim yöntemi, ekipman, ambalaj ve test gereklilikleri.','Çözelti, şurup ve damlalar; hammaddeler, saklama ve ambalaj özellikleri.','Aseptik işlem veya terminal sterilizasyon; ampul, flakon, saklama ve testler.'],button:'Formu indir'},
es:{heading:'Descargar formularios de consulta técnica',intro:'Seleccione la categoría de producto para descargar el cuestionario de fabricación por contrato correspondiente.',titles:['Formas farmacéuticas sólidas','Líquidos no estériles','Líquidos estériles (inyectables)'],descs:['Comprimidos y cápsulas, proceso de fabricación, equipos, envase y controles.','Soluciones, jarabes y gotas; materias primas, almacenamiento y especificaciones de envase.','Proceso aséptico o esterilización terminal; ampollas, viales, almacenamiento y controles.'],button:'Descargar formulario'},
fr:{heading:'Télécharger les questionnaires techniques',intro:'Choisissez la catégorie de produit pour télécharger le questionnaire de fabrication à façon correspondant.',titles:['Formes pharmaceutiques solides','Liquides non stériles','Liquides stériles (injectables)'],descs:['Comprimés et gélules, procédé de fabrication, équipements, conditionnement et contrôles.','Solutions, sirops et gouttes ; matières premières, stockage et spécifications de conditionnement.','Procédé aseptique ou stérilisation terminale ; ampoules, flacons, stockage et contrôles.'],button:'Télécharger le formulaire'}
};
const t=copy[lang]||copy.en;
const heading=root.querySelector('[data-fcm-heading]');
const intro=root.querySelector('[data-fcm-intro]');
if(heading)heading.textContent=t.heading;
if(intro)intro.textContent=t.intro;
root.querySelectorAll('[data-fcm-card]').forEach((card,i)=>{
const title=card.querySelector('[data-fcm-title]');
const desc=card.querySelector('[data-fcm-desc]');
const link=card.querySelector('[data-fcm-link]');
const kind=card.getAttribute('data-fcm-card');
if(title)title.textContent=t.titles[i];
if(desc)desc.textContent=t.descs[i];
if(link){link.href='/downloads/fcm-cmo/'+kind+'-'+lang+'.html';link.setAttribute('download','FCM-CMO-'+kind+'-'+lang.toUpperCase()+'.html');link.querySelector('[data-fcm-button-label]').textContent=t.button;}
});
root.dataset.fcmLanguage=lang;
root.dataset.fcmReady='true';
document.documentElement.dataset.fcmLanguage=lang;
})();
