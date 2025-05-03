(async () => {
  let data;
  try {
    const res = await fetch('privacy_translations.json');
    data = await res.json();
  } catch (err) {
    console.error('Erro ao carregar traduções:', err);
    return;
  }

  const lang = navigator.language.split('-')[0];
  const tr   = data[lang] || data['en'];

  const container = document.getElementById('privacy-content');
  if (!container) return;

  let html = `
    <h1>${tr.title}</h1>
    <p><em>${tr.lastUpdated}</em></p>
  `;

  tr.sections.forEach(sec => {
    html += `<h2>${sec.heading}</h2>`;
    if (sec.content) html += `<p>${sec.content}</p>`;
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
        html += '</ul>`;
      });
    }
  });

  html += `<h2>${lang === 'pt' ? 'Contato' : 'Contact'}</h2>`;
  html += `<p>${tr.contact}</p>`;

  container.innerHTML = html;
})();
