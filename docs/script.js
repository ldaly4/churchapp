(() => {
  const reset = document.getElementById('reset-demo');
  const demo = document.getElementById('parish-demo');
  if (reset && demo) {
    reset.hidden = false;
    reset.addEventListener('click', () => {
      demo.src = demo.getAttribute('src');
      demo.focus();
    });
  }
  const button = document.getElementById('copy-email');
  const status = document.getElementById('copy-status');
  if (!button || !status || !navigator.clipboard || !window.isSecureContext) return;
  button.hidden = false;
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('hello@neri.ie');
      status.textContent = 'Email address copied.';
    } catch {
      status.textContent = 'Copy hello@neri.ie, or use the email link to get in touch.';
    }
  });
})();
