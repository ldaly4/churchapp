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
})();
