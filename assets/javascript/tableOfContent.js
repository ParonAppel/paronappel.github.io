(() => {
  const nav = document.getElementById('page-toc');
  if (!nav) return;

  // Same rule as before: skip headings inside accordions
  const headings = [...document.querySelectorAll('.project-content h1, .project-content h2, .project-content h3')]
    .filter(h => h.id && !h.closest('details'));
  if (!headings.length) { nav.remove(); return; }

  // Move it out of .project-content, so fixed positioning is never clipped by it
  document.body.appendChild(nav);

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'toc-toggle';
  toggle.setAttribute('aria-label', 'Contents');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', 'toc-list');
  toggle.innerHTML = '<span></span><span></span><span></span>';

  const title = document.createElement('p');
  title.className = 'toc-title';
  title.textContent = 'Contents';

  const list = document.createElement('ul');
  const level = h => Number(h.tagName[1]);
  const topLevel = Math.min(...headings.map(level));

  list.id = 'toc-list';
  headings.forEach(h => {
    const li = document.createElement('li');
    li.className = level(h) > topLevel ? 'toc-sub' : 'toc-main';
    const a = document.createElement('a');
    a.href = '#' + h.id;
    a.textContent = h.textContent;
    li.appendChild(a);
    list.appendChild(li);
  });

  nav.append(toggle, title, list);

  // Open / close (mobile)
  const setOpen = open => {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };
  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
  list.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('click', e => { if (!nav.contains(e.target)) setOpen(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });

  // Highlight the section you're reading
  const links = new Map([...list.querySelectorAll('a')].map(a => [a.getAttribute('href').slice(1), a]));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(a => a.classList.remove('active'));
        links.get(entry.target.id)?.classList.add('active');
      }
    });
  }, { rootMargin: '-15% 0px -75% 0px' });
  headings.forEach(h => observer.observe(h));
})();