document.addEventListener('DOMContentLoaded', async () => {
  // Se você deixou o JSON em /public/, use:
  const jsonPath = 'public/privacy_translations.json';
  // Se estiver na raiz, troque para: const jsonPath = 'privacy_translations.json';

  let data;
  try {
    const res = await fetch(jsonPath);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    data = await res.json();
  } catch (err) {
    console.error('Erro carregando traduções:', err);
    return;
  }

  const lang = navigator.language.split('-')[0];
  const tr   = data[lang] || data['en'];

  // título e data
  document.getElementById('mainTitle').textContent      = tr.title;
  document.getElementById('lastUpdated').innerHTML      = `<strong>${tr.lastUpdated}</strong>`;

  // seção 1
  document.getElementById('sec1Heading').textContent    = tr.sections[0].heading;
  document.getElementById('sec1Content').textContent    = tr.sections[0].content;

  // seção 2
  document.getElementById('sec2Heading').textContent    = tr.sections[1].heading;
  const s2sub1 = tr.sections[1].subsections[0];
  document.getElementById('sec2Sub1Heading').textContent = s2sub1.subheading;
  const ul21 = document.getElementById('sec2Sub1List');
  s2sub1.items.forEach(it => {
    const li = document.createElement('li');
    li.textContent = it;
    ul21.appendChild(li);
  });
  const s2sub2 = tr.sections[1].subsections[1];
  document.getElementById('sec2Sub2Heading').textContent = s2sub2.subheading;
  const ul22 = document.getElementById('sec2Sub2List');
  s2sub2.items.forEach(it => {
    const li = document.createElement('li');
    li.textContent = it;
    ul22.appendChild(li);
  });

  // seção 3
  document.getElementById('sec3Heading').textContent    = tr.sections[2].heading;
  const ul3 = document.getElementById('sec3List');
  tr.sections[2].items.forEach(it => {
    const li = document.createElement('li'); li.textContent = it; ul3.appendChild(li);
  });

  // seção 4
  document.getElementById('sec4Heading').textContent    = tr.sections[3].heading;
  const ul4 = document.getElementById('sec4List');
  tr.sections[3].items.forEach(it => {
    const li = document.createElement('li'); li.textContent = it; ul4.appendChild(li);
  });

  // seção 5
  document.getElementById('sec5Heading').textContent    = tr.sections[4].heading;
  document.getElementById('sec5Content').textContent    = tr.sections[4].content;

  // seção 6
  document.getElementById('sec6Heading').textContent    = tr.sections[5].heading;
  const ul6 = document.getElementById('sec6List');
  tr.sections[5].items.forEach(it => {
    const li = document.createElement('li'); li.textContent = it; ul6.appendChild(li);
  });

  // seção 7
  document.getElementById('sec7Heading').textContent    = tr.sections[6].heading;
  document.getElementById('sec7Content').textContent    = tr.sections[6].content;

  // seção 8
  document.getElementById('sec8Heading').textContent    = tr.sections[7].heading;
  document.getElementById('sec8Content').textContent    = tr.sections[7].content;

  // seção 9
  document.getElementById('sec9Heading').textContent    = tr.sections[8].heading;
  document.getElementById('sec9Content').textContent    = tr.sections[8].content;

  // seção 10
  document.getElementById('sec10Heading').textContent   = tr.sections[9].heading;
  document.getElementById('sec10Content').innerHTML     = tr.sections[9].content.includes('@')
    ? `<a href="mailto:${tr.sections[9].content.split(': ')[1]}">${tr.sections[9].content}</a>`
    : tr.sections[9].content;
});
