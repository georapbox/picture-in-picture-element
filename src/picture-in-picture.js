const template = document.createElement('template');

const html = String.raw;

template.innerHTML = html`
  <style>
    :host {
      display: inline-flex;
      position: relative;
    }
    :host([hidden]),
    [hidden],
    :host(:empty) {
      display: none;
    }
    .pip-button {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
    }
  </style>

  <slot id="videoSlot"></slot>

  <button type="button" part="pip-button" class="pip-button" hidden disabled>
    <slot name="pip-button-label">Picture-In-Picture</slot>
  </button>
`;

class PictureInPicture extends HTMLElement {
  constructor() {
    super();

    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }

  connectedCallback() {
    const pipButton = this.shadowRoot.querySelector('.pip-button');
    const videoSlot = this.shadowRoot.getElementById('videoSlot');
    const videoElement = this.#getVideoElement();

    if ('pictureInPictureEnabled' in document && videoElement) {
      pipButton.hidden = false;
      pipButton.disabled = false;
    }

    pipButton?.addEventListener('click', this.#togglePictureInPicture);
    videoSlot?.addEventListener('slotchange', this.#onVideoSlotChange);
  }

  disconnectedCallback() {
    const pipButton = this.shadowRoot.querySelector('.pip-button');
    const videoSlot = this.shadowRoot.getElementById('videoSlot');
    const videoElement = this.#getVideoElement();

    pipButton?.removeEventListener('click', this.#togglePictureInPicture);
    videoSlot?.removeEventListener('slotchange', this.#onVideoSlotChange);
    videoElement?.removeEventListener('enterpictureinpicture', this.#onEnterPictureInPicture);
    videoElement?.removeEventListener('leavepictureinpicture', this.#onLeavePictureInPicture);
  }

  #getVideoElement() {
    const videoSlot = this.shadowRoot.getElementById('videoSlot');

    if (!videoSlot) {
      return null;
    }

    return videoSlot.assignedElements({ flatten: true }).find(el => {
      return el.nodeName === 'VIDEO';
    }) || null;
  }

  #onVideoSlotChange = () => {
    console.log('Video slot changed');

    const pipButton = this.shadowRoot.querySelector('.pip-button');
    const videoElement = this.#getVideoElement();

    if (videoElement) {
      pipButton.hidden = false;
      pipButton.disabled = false;
      videoElement.addEventListener('enterpictureinpicture', this.#onEnterPictureInPicture);
      videoElement.addEventListener('leavepictureinpicture', this.#onLeavePictureInPicture);
    } else {
      pipButton.hidden = true;
      pipButton.disabled = true;
    }
  };

  #onEnterPictureInPicture = () => {
    this.dispatchEvent(new CustomEvent('picture-in-picture:enter', {
      bubbles: true,
      composed: true,
      detail: {
        videoElement: this.#getVideoElement(),
        pipButton: this.shadowRoot.querySelector('.pip-button')
      }
    }));
  };

  #onLeavePictureInPicture = () => {
    this.dispatchEvent(new CustomEvent('picture-in-picture:leave', {
      bubbles: true,
      composed: true,
      detail: {
        videoElement: this.#getVideoElement(),
        pipButton: this.shadowRoot.querySelector('.pip-button')
      }
    }));
  };

  #togglePictureInPicture = () => {
    if (!('pictureInPictureEnabled' in document)) {
      return;
    }

    const videoElement = this.#getVideoElement();

    if (document.pictureInPictureElement) {
      document.exitPictureInPicture().catch(error => {
        this.dispatchEvent(new CustomEvent('picture-in-picture:error', {
          bubbles: true,
          composed: true,
          detail: { error }
        }));
      });
    } else if (!document.pictureInPictureElement && document.pictureInPictureEnabled) {
      videoElement?.requestPictureInPicture().then(pipWindow => {
        pipWindow.onresize = evt => {
          const { width, height } = evt.currentTarget;

          this.dispatchEvent(new CustomEvent('picture-in-picture:resize', {
            bubbles: true,
            composed: true,
            detail: { width, height }
          }));
        };
      }).catch(error => {
        this.dispatchEvent(new CustomEvent('picture-in-picture:error', {
          bubbles: true,
          composed: true,
          detail: { error }
        }));
      });
    }
  };

  static defineCustomElement(elementName = 'picture-in-picture') {
    if (typeof window !== 'undefined' && !window.customElements.get(elementName)) {
      window.customElements.define(elementName, PictureInPicture);
    }
  }
}

export { PictureInPicture };