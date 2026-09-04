(() => {
  'use strict';

  const views = [...document.querySelectorAll('[data-view]')];
  const validViews = new Set(views.map((view) => view.dataset.view));
  const viewer = document.querySelector('#image-viewer');
  const viewerImage = viewer.querySelector('img');
  const closeViewerButton = viewer.querySelector('.viewer-close');
  let lastImageButton = null;
  let keyboardNavigation = false;

  function showView() {
    const requested = window.location.hash.slice(1) || 'home';
    const current = validViews.has(requested) ? requested : 'home';

    views.forEach((view) => {
      const isCurrent = view.dataset.view === current;
      view.hidden = !isCurrent;
      view.classList.toggle('is-active', isCurrent);
    });

    document.title = current === 'home'
      ? 'GrowthLog Lounge Space Guide'
      : `${document.querySelector(`[data-view="${current}"] h2`)?.textContent || '안내'} | GrowthLog Lounge`;

    window.scrollTo({ top: 0, behavior: 'auto' });
    const heading = document.querySelector(`[data-view="${current}"] h1, [data-view="${current}"] h2`);
    if (keyboardNavigation && current !== 'home') {
      heading?.setAttribute('tabindex', '-1');
      heading?.focus({ preventScroll: true });
    }
  }

  async function copyPassword() {
    const password = 'growth1703-2!';
    const feedback = document.querySelector('#copy-feedback');
    const button = document.querySelector('#copy-password');
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(password);
      } else {
        const input = document.createElement('textarea');
        input.value = password;
        input.setAttribute('readonly', '');
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.select();
        const copied = document.execCommand('copy');
        input.remove();
        if (!copied) throw new Error('copy failed');
      }
      feedback.textContent = '비밀번호를 복사했습니다. ✓';
      button.textContent = '복사 완료';
      window.setTimeout(() => { feedback.textContent = ''; button.textContent = '비밀번호 복사'; }, 1800);
    } catch {
      feedback.textContent = '복사하지 못했어요. 비밀번호를 길게 눌러 복사해주세요.';
    }
  }

  function openViewer(button) {
    lastImageButton = button;
    viewerImage.src = button.dataset.image;
    viewerImage.alt = button.dataset.alt;
    viewer.showModal();
    document.body.style.overflow = 'hidden';
  }

  function closeViewer() {
    viewer.close();
    viewerImage.src = '';
    document.body.style.overflow = '';
    if (keyboardNavigation) lastImageButton?.focus();
  }

  function updateChecklist() {
    const checks = [...document.querySelectorAll('#checkout-list input')];
    document.querySelector('#complete-message').classList.toggle('is-complete', checks.every((check) => check.checked));
    try {
      sessionStorage.setItem('growthlog-checkout', JSON.stringify(checks.map((check) => check.checked)));
    } catch {}
  }

  function restoreChecklist() {
    try {
      const saved = JSON.parse(sessionStorage.getItem('growthlog-checkout'));
      if (!Array.isArray(saved)) return;
      document.querySelectorAll('#checkout-list input').forEach((check, index) => { check.checked = Boolean(saved[index]); });
      updateChecklist();
    } catch {}
  }

  document.addEventListener('pointerdown', () => { keyboardNavigation = false; }, true);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Tab' || event.key === 'Enter' || event.key === ' ') keyboardNavigation = true;
  }, true);
  window.addEventListener('hashchange', showView);
  document.querySelector('#copy-password').addEventListener('click', copyPassword);
  document.querySelectorAll('.image-open').forEach((button) => button.addEventListener('click', () => openViewer(button)));
  closeViewerButton.addEventListener('click', closeViewer);
  viewer.addEventListener('click', (event) => { if (event.target === viewer) closeViewer(); });
  viewer.addEventListener('close', () => { document.body.style.overflow = ''; });
  document.querySelectorAll('#checkout-list input').forEach((check) => check.addEventListener('change', updateChecklist));
  restoreChecklist();
  showView();
})();
