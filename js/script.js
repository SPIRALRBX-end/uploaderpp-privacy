(async () => {
  // carrega o arquivo de traduções
  const url = chrome.runtime.getURL('privacy_translations.json');
  const res = await fetch(url);
  const data = await res.json();

  // determina idioma: 'pt' ou 'en'
  const lang = navigator.language.split('-')[0];
  const tr = data[lang] || data['en'];

  // constrói o HTML
  const container = document.getElementById('privacy-content');
  if (!container) return;

  let html = `
    <h1>${tr.title}</h1>
    <p><em>${tr.lastUpdated}</em></p>
  `;

  tr.sections.forEach(sec => {
    html += `<h2>${sec.heading}</h2>`;
    if (sec.content) {
      html += `<p>${sec.content}</p>`;
    }
    if (sec.items) {
      html += '<ul>';
      sec.items.forEach(item => {
        html += `<li>${item}</li>`;
      });
      html += '</ul>';
    }
    if (sec.subsections) {
      sec.subsections.forEach(sub => {
        html += `<h3>${sub.subheading}</h3><ul>`;
        sub.items.forEach(item => {
          html += `<li>${item}</li>`;
        });
        html += '</ul>';
      });
    }
  });

  html += `<h2>Contact</h2><p>${tr.contact}</p>`;

  container.innerHTML = html;
})();
