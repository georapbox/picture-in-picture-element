const isLocalhost = window.location.href.includes('127.0.0.1') || window.location.href.includes('localhost');
const componentUrl = isLocalhost ? '../../dist/picture-in-picture.js' : 'https://unpkg.com/@georapbox/picture-in-picture-element';

const escapeHTML = subjectString => {
  if (typeof subjectString !== 'string') {
    return subjectString;
  }

  const htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;' // eslint-disable-line quotes
  };

  const regexUnescapedHtml = /[&<>"'`]/g;
  const regexHasUnescapedHtml = RegExp(regexUnescapedHtml.source);

  return regexHasUnescapedHtml.test(subjectString)
    ? subjectString.replace(regexUnescapedHtml, tag => htmlEscapes[tag] || tag)
    : subjectString;
};

const customizeCheckbox = document.getElementById('customize');
const htmlSrcEl = document.getElementById('html-source');

const sourceTemplate = (slot = '', attrs = '') => escapeHTML(`<picture-in-picture${attrs}>${slot}</picture-in-picture>`);

htmlSrcEl.innerHTML = sourceTemplate('', ' class="custom-styles"');

import(componentUrl).then(res => {
  const { PictureInPicture } = res;

  PictureInPicture.defineCustomElement();

  const wc = document.querySelector('picture-in-picture');

  const renderElement = (isCustomized = true) => {
    let slotTemplate = '';
    const videoContent = '\n  <video src="assets/bigbuckbunny.mp4" controls></video>\n';
    const slotContent = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5v-9zM1.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"/><path d="M8 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-3z"/></svg>`;

    if (isCustomized) {
      slotTemplate = `${videoContent}  <span slot="pip-button-label">\n    ${slotContent}\n  </span>\n`;

      const span = document.createElement('span');
      span.slot = 'pip-button-label';
      span.innerHTML = slotContent;
      wc.setAttribute('pip-button-title', 'Picture-in-Picture');
      wc.appendChild(span);
    } else {
      slotTemplate = videoContent;
      wc.removeAttribute('pip-button-title');
      wc.removeAttribute('class');
      const slotEl = wc.querySelector('span[slot="pip-button-label"]');

      if (slotEl) {
        slotEl.remove();
      }
    }

    wc.classList.toggle('custom-styles', isCustomized);

    htmlSrcEl.innerHTML = sourceTemplate(slotTemplate, isCustomized ? ' class="custom-styles" pip-button-title="Picture-in-Picture"' : '');

    window.hljs.highlightElement(htmlSrcEl);
  };

  document.addEventListener('picture-in-picture:enter', evt => {
    console.log('picture-in-picture:enter ->', evt.detail);
  });

  document.addEventListener('picture-in-picture:leave', evt => {
    console.log('picture-in-picture:leave ->', evt.detail);
  });

  document.addEventListener('picture-in-picture:error', evt => {
    console.log('picture-in-picture:error ->', evt.detail);
  });

  document.addEventListener('picture-in-picture:resize', evt => {
    console.log('picture-in-picture:resize ->', evt.detail);
  });

  customizeCheckbox.addEventListener('change', evt => {
    renderElement(evt.target.checked);
  });

  renderElement(customizeCheckbox.checked);
}).catch(err => {
  console.error(err);
});
