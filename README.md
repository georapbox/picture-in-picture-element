[![npm version](https://img.shields.io/npm/v/@georapbox/picture-in-picture-element.svg)](https://www.npmjs.com/package/@georapbox/picture-in-picture-element)
[![npm license](https://img.shields.io/npm/l/@georapbox/picture-in-picture-element.svg)](https://www.npmjs.com/package/@georapbox/picture-in-picture-element)

[demo]: https://georapbox.github.io/picture-in-picture-element/
[license]: https://georapbox.mit-license.org/@2022
[changelog]: https://github.com/georapbox/picture-in-picture-element/blob/main/CHANGELOG.md

# &lt;picture-in-picture&gt;

A custom element that offers a declarative interface to the [Picture-in-Picture API](https://developer.mozilla.org/docs/Web/API/Picture-in-Picture_API).

[API documentation](#api) &bull; [Demo][demo]

## Install

```sh
$ npm install --save @georapbox/picture-in-picture-element
```

## Usage

### Script

```js
import { PictureInPicture } from './node_modules/@georapbox/picture-in-picture-element/dist/picture-in-picture.js';

// Manually define the element.
PictureInPicture.defineCustomElement();
```

Alternatively, you can import the automatically defined custom element.

```js
import './node_modules/@georapbox/picture-in-picture-element/dist/picture-in-picture-defined.js';
```

### Markup

```html
<picture-in-picture>
  <video src="assets/bigbuckbunny.mp4" controls></video>
</picture-in-picture>
```

### Style

By default, the component is style-free to remain as less opinionated as possible. However, you can style the various elements of the component using the `::part()` CSS pseudo-elements provided for this purpose. Below are demonstrated all available parts for styling.

## API

### Properties

| Name | Reflects | Type | Required | Description |
| ---- | -------- | ---- | -------- |----------- |
| `pipButtonTitle`<br>*`pip-button-title`* | ✓ | String | - | The `title` attribute of the the picture-in-picture button. |

### Slots

| Name | Description |
| ---- | ----------- |
| (default) | Un-named slot for the `HTMLVideoElement`. |
| `pip-button-label` | The content of the picture-in-picture button. |

#### Slots usage examples

```html
<picture-in-picture>
  <video src="assets/bigbuckbunny.mp4" controls></video>

  <span slot="pip-button-label">Enter Picture-In-Picture mode</span>
</picture-in-picture>
```

### CSS Parts

| Name | Description |
| ---- | ----------- |
| `pip-button` | The picture-in-picture button. |

### Events

| Name | Description | Event Detail |
| ---- | ----------- | ------------ |
| `picture-in-picture:enter` | Emitted when the `HTMLVideoElement` enters picture-in-picture mode successfully. | `{ videoElement: HTMLVideoElement, pipButton: HTMLButtonElement }` |
| `picture-in-picture:leave` | Emitted when the `HTMLVideoElement` leaves picture-in-picture mode successfully. | `{ videoElement: HTMLVideoElement, pipButton: HTMLButtonElement }` |
| `picture-in-picture:resize` | Emitted when the floating video window has been resized. | `{ width: Number, height: Number }` |
| `picture-in-picture:error` | Emitted when an error occurs. An error might occur while requesting to enter or leave picture-in-picture mode because the `HTMLVideoElement` has `disablePictureInPicture` attribute. | `{ error: DOMException }` |

## Changelog

For API updates and breaking changes, check the [CHANGELOG][changelog].

## License

[The MIT License (MIT)][license]
