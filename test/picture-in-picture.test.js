import { elementUpdated, expect, fixture, fixtureCleanup, html } from '@open-wc/testing';
import { PictureInPicture } from '../src/picture-in-picture.js';

PictureInPicture.defineCustomElement();

describe('<picture-in-picture>', () => {
  it('passes accessibility test', async () => {
    const el = await fixture(html`<picture-in-picture></picture-in-picture>`);

    await expect(el).to.be.accessible();
  });

  it('default properties', async () => {
    const el = await fixture(html`<picture-in-picture></picture-in-picture>`);

    expect(el.pipButtonTitle).to.be.null;
    expect(el.getAttribute('pip-button-title')).to.be.null;
  });

  it('change default properties', async () => {
    const el = await fixture(html`
      <picture-in-picture pip-button-title="Toggle picture-in-picture"></picture-in-picture>
    `);

    expect(el.pipButtonTitle).to.equal('Toggle picture-in-picture');
    expect(el.getAttribute('pip-button-title')).to.equal('Toggle picture-in-picture');
  });

  it('change properties programmatically', async () => {
    const el = await fixture(html`<picture-in-picture></picture-in-picture>`);

    el.pipButtonTitle = 'Toggle picture-in-picture';

    await elementUpdated(el);

    expect(el.pipButtonTitle).to.equal('Toggle picture-in-picture');
    expect(el.getAttribute('pip-button-title')).to.equal('Toggle picture-in-picture');
  });

  it('change button label slot', async () => {
    const el = await fixture(html`
      <picture-in-picture>
        <span slot="pip-button-label">Toggle picture-in-picture</span>
      </picture-in-picture>
    `);

    expect(el).lightDom.to.equal(`
      <span slot="pip-button-label">Toggle picture-in-picture</span>
    `);
  });

  it('adds/removes button title', async () => {
    const el = await fixture(html`
      <picture-in-picture></picture-in-picture>
    `);

    el.setAttribute('pip-button-title', 'Toggle PIP');

    await elementUpdated(el);

    const pipButton = el.shadowRoot.querySelector('.pip-button');

    expect(pipButton).to.have.attr('title', 'Toggle PIP');

    el.removeAttribute('pip-button-title');

    expect(pipButton).not.to.have.attr('title');
  });

  it('displays pip button if picture-in-picture API is supported, otherwise not', async () => {
    const el = await fixture(html`
      <picture-in-picture>
        <video src="" controls></video>
      </picture-in-picture>
    `);

    const pipButton = el.shadowRoot.querySelector('.pip-button');

    if ('pictureInPictureEnabled' in document) {
      expect(pipButton).not.to.have.attr('hidden');
      expect(pipButton).not.to.have.attr('disabled');
    } else {
      expect(pipButton).to.have.attr('hidden');
      expect(pipButton).to.have.attr('disabled');
    }
  });

  afterEach(() => {
    fixtureCleanup();
  });
});
