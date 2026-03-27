const bibToggles = document.querySelectorAll('.pub-bib-toggle');
const searchInput = document.getElementById('paper-search');
const searchEmpty = document.getElementById('search-empty');

bibToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const card = toggle.closest('.publication-card');
    const panel = card ? card.querySelector('.pub-bib-panel') : null;
    if (!panel) {
      return;
    }

    const isOpen = panel.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.textContent = isOpen ? 'Hide BIB' : 'BIB';
  });
});

if (searchInput) {
  const cards = Array.from(document.querySelectorAll('.publication-card[data-search]'));

  searchInput.addEventListener('input', () => {
    const keyword = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach((card) => {
      const haystack = (card.dataset.search || '').toLowerCase();
      const isVisible = keyword === '' || haystack.includes(keyword);
      card.style.display = isVisible ? 'grid' : 'none';
      if (isVisible) {
        visibleCount += 1;
      }
    });

    if (searchEmpty) {
      searchEmpty.classList.toggle('show', visibleCount === 0);
    }
  });
}
