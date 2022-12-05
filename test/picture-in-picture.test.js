import { elementUpdated, expect, fixture, fixtureCleanup, html } from '@open-wc/testing';
import sinon from 'sinon';
import { PictureInPicture } from '../src/picture-in-picture.js';

PictureInPicture.defineCustomElement();

describe('<picture-in-picture>', () => {
  it('passes accessibility test', async () => {
    const el = await fixture(html`<picture-in-picture></picture-in-picture>`);

    await expect(el).to.be.accessible();
  });

  it('default properties', async () => {
    const el = await fixture(html`<picture-in-picture></picture-in-picture>`);
  });

  it('change default properties', async () => {
    const el = await fixture(html`
      <picture-in-picture></picture-in-picture>
    `);
  });

  it('change properties programmatically', async () => {
    const el = await fixture(html`<picture-in-picture></picture-in-picture>`);

    // Change props progammatically here.

    await elementUpdated(el);
  });

  afterEach(() => {
    fixtureCleanup();
  });
});
