const bibToggles = document.querySelectorAll('.pub-bib-toggle');
const searchInput = document.getElementById('paper-search');
const searchEmpty = document.getElementById('search-empty');
const softwareSearchInput = document.getElementById('software-search');
const softwareSearchEmpty = document.getElementById('software-search-empty');

function normalizeSearchText(value) {
  return (value || '').toLowerCase().replace(/\s+/g, ' ').trim();
}

function fuzzyMatch(keyword, haystack) {
  if (!keyword) {
    return true;
  }

  if (haystack.includes(keyword)) {
    return true;
  }

  const compactKeyword = keyword.replace(/\s+/g, '');
  const compactHaystack = haystack.replace(/\s+/g, '');

  if (compactHaystack.includes(compactKeyword)) {
    return true;
  }

  let pointer = 0;
  for (const char of compactHaystack) {
    if (char === compactKeyword[pointer]) {
      pointer += 1;
      if (pointer === compactKeyword.length) {
        return true;
      }
    }
  }

  return false;
}

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
    const keyword = normalizeSearchText(searchInput.value);
    let visibleCount = 0;

    cards.forEach((card) => {
      const haystack = normalizeSearchText(card.dataset.search);
      const isVisible = fuzzyMatch(keyword, haystack);
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

if (softwareSearchInput) {
  const cards = Array.from(document.querySelectorAll('.software-card[data-search]'));

  softwareSearchInput.addEventListener('input', () => {
    const keyword = normalizeSearchText(softwareSearchInput.value);
    let visibleCount = 0;

    cards.forEach((card) => {
      const haystack = normalizeSearchText(card.dataset.search);
      const isVisible = fuzzyMatch(keyword, haystack);
      card.style.display = isVisible ? 'block' : 'none';
      if (isVisible) {
        visibleCount += 1;
      }
    });

    if (softwareSearchEmpty) {
      softwareSearchEmpty.classList.toggle('show', visibleCount === 0);
    }
  });
}
