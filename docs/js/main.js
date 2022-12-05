const isLocalhost = window.location.href.includes('127.0.0.1') || window.location.href.includes('localhost');
const componentUrl = isLocalhost ? '../../dist/picture-in-picture.js' : 'https://unpkg.com/@georapbox/picture-in-picture-element';

import(componentUrl).then(res => {
  const { PictureInPicture } = res;

  // const $console = document.getElementById('console');

  PictureInPicture.defineCustomElement();

  document.getElementById('create').addEventListener('click', () => {
    const pip = document.createElement('picture-in-picture');

    const v = document.createElement('video');
    v.src = 'assets/bigbuckbunny.mp4';
    v.controls = true;
    // v.disablePictureInPicture = true;

    pip.appendChild(v);

    document.getElementById('view').appendChild(pip);
  });

  document.addEventListener('picture-in-picture:enter', evt => {
    console.log('pip enter', evt.detail);

    evt.detail.pipButton.textContent = 'Exit Picture-In-Picture';
  });

  document.addEventListener('picture-in-picture:leave', evt => {
    console.log('pip leave', evt.detail);

    evt.detail.pipButton.textContent = 'Enter Picture-In-Picture';
  });

  document.addEventListener('picture-in-picture:error', evt => {
    console.error('pip error', evt.detail.error);
  });
}).catch(err => {
  console.error(err);
});
