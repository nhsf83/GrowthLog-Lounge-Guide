(() => {
  const storageKey = 'growthlog-guide-home-checkout-v1';
  const checks = [...document.querySelectorAll('#checkout-list input[type="checkbox"]')];
  const message = document.querySelector('#complete-message');
  const update = () => {
    const state = checks.map((check) => check.checked);
    sessionStorage.setItem(storageKey, JSON.stringify(state));
    const count = state.filter(Boolean).length;
    message.textContent = count === checks.length ? '모두 확인했습니다. 감사합니다 :)' : `${checks.length - count}개 항목이 남았습니다.`;
  };
  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey));
    if (Array.isArray(saved)) checks.forEach((check, index) => { check.checked = Boolean(saved[index]); });
  } catch (_) { sessionStorage.removeItem(storageKey); }
  checks.forEach((check) => check.addEventListener('change', update));
  if (checks.length) update();

  const copyButton = document.querySelector('#copy-password');
  const copyStatus = document.querySelector('#copy-status');
  copyButton?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('growth1703-2!');
      copyStatus.textContent = '비밀번호를 복사했습니다.';
    } catch (_) {
      copyStatus.textContent = '비밀번호를 길게 눌러 복사해주세요.';
    }
  });
})();
