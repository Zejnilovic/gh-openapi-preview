(() => {
  console.log('[OpenAPI] script injected on', location.href);

  const fnRegex = /\.(ya?ml|json)$/i;
  if (!fnRegex.test(location.pathname)) {
    console.log('[OpenAPI] not a .yaml/.json file');
    return;
  }
  console.log('[OpenAPI] file extension check passed');

  const rawButton = document.querySelector(
    'a#raw-url, a[data-testid="raw-button"]'
  );
  const rawUrl = rawButton
    ? rawButton.href
    : location.href
      .replace('https://github.com/', 'https://raw.githubusercontent.com/')
      .replace('/blob/', '/');
  console.log('[OpenAPI] rawUrl =', rawUrl);
  console.log('[OpenAPI] url =', location.href);
  console.log('[OpenAPI] rawButton', rawButton);

  function showModal() {
    let modal = document.getElementById('openapi-modal');
    if (modal) {
      modal.style.display = 'flex';
      return;
    }

    const css = `
      #openapi-modal {
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex; align-items: center; justify-content: center;
        z-index: 9999;
      }
      #openapi-modal .content {
        background: var(--color-canvas-default, #fff);
        width: 90%; max-width: 1200px; max-height: 90%;
        border-radius: 6px; overflow: auto; position: relative;
        box-shadow: 0 8px 24px rgba(0,0,0,0.2);
      }
      #openapi-modal .close-btn {
        position: absolute; top: 8px; right: 12px;
        font-size: 24px; font-weight: bold;
        background: none; border: none; cursor: pointer;
      }
      #openapi-modal .swagger-container {
        padding: 20px;
      }
    `;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    modal = document.createElement('div');
    modal.id = 'openapi-modal';
    modal.innerHTML = `
      <div class="content">
        <button class="close-btn" aria-label="Close Preview">&times;</button>
        <div class="swagger-container" id="openapi-modal-swagger"></div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.close-btn').addEventListener('click', hideModal);
    modal.addEventListener('click', e => {
      if (e.target === modal) hideModal();
    });

    SwaggerUIBundle({
      url: rawUrl,
      dom_id: '#openapi-modal-swagger',
      presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
      layout: 'StandaloneLayout'
    });
  }

  function hideModal() {
    const modal = document.getElementById('openapi-modal');
    if (modal) modal.style.display = 'none';
  }

  function init() {
    const fileNav = document.querySelector('ul[aria-label="File view"]');
    if (!fileNav) return;
    if (document.getElementById('openapi-btn')) return;

    fetch(rawUrl)
      .then(res => {
        if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);
        return res.text();
      })
      .then(text => {
        const firstLine = text.split('\n', 1)[0].trim();
        const headerRx = /^openapi:\s*\d+\.\d+\.\d+/i;
        if (!headerRx.test(firstLine)) {
          console.log('[OpenAPI] header check failed:', firstLine);
          return;
        }
        console.log('[OpenAPI] header check passed:', firstLine);

        const proto = fileNav.querySelector('li');
        if (!proto) return;
        const li = proto.cloneNode(true);
        const btn = li.querySelector('button');
        const txt = btn.querySelector('div[data-text]');

        txt.dataset.text = 'OpenAPI Preview';
        txt.textContent = 'OpenAPI Preview';
        btn.id = 'openapi-btn';
        btn.removeAttribute('data-hotkey');
        btn.setAttribute('aria-current', 'false');

        btn.addEventListener('click', e => {
          e.preventDefault();
          showModal();
        });

        fileNav.appendChild(li);
        console.log('[OpenAPI] injected preview tab');
      })
      .catch(err => console.warn('[OpenAPI] fetch/raw failed:', err));
  }

  document.addEventListener('pjax:end', init);
  window.addEventListener('DOMContentLoaded', init);
  init();
})();

