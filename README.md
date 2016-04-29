[![npm version](https://img.shields.io/npm/v/s10d-touchable.svg?style=flat-square)](https://www.npmjs.org/package/s10d-touchable)
[![Dependency Status](https://david-dm.org/Synchronized-TV/s10d-touchable.svg)](https://david-dm.org/Synchronized-TV/s10d-touchable)

# s10d-touchable

Cross platform Touch component for ReactJS

## Features

 - Use native touchstart/touchend event for taps and fallbacks to [hammer.js](http://hammerjs.github.io/) if not available
 - Fallback to click on non-touch devices
 - Add a `touched` css class when touching element

## Basic Usage

```js
<Touchable onTap={ () => alert('tap') }>Tap me</Touchable>
```

```js
<Touchable onTap={ () => alert('double tap') }>Double tap me</Touchable>
```

## API

| prop            | type    | default | description                                     |
|-----------------|---------|---------|-------------------------------------------------|
| withHighlight   | bool    | true    | enable css class add/remove on touch            |
| highlightDelay  | number  | 100     | time before adding touched class                |
| options         | object  |         | hammer.js options                               |
| onTap           | func    |         | see https://github.com/JedWatson/react-hammerjs |
| onDoubleTap     | func    |         | see https://github.com/JedWatson/react-hammerjs |
| onPan           | func    |         | see https://github.com/JedWatson/react-hammerjs |
| onSwipe         | func    |         | see https://github.com/JedWatson/react-hammerjs |
| onPress         | func    |         | see https://github.com/JedWatson/react-hammerjs |
| onPinch         | func    |         | see https://github.com/JedWatson/react-hammerjs |
| onRotate        | func    |         | see https://github.com/JedWatson/react-hammerjs |
| stopPropagation | boolean | true    | call stopPropagation                            |
| component       | string  | div     | wrap children using that component              |


## License

*s10d-touchable* is available under MIT. See LICENSE for more details.


## Dev

### Common Tasks

Based on https://github.com/survivejs/react-component-boilerplate

* Developing - **npm start** - Runs the development server at *localhost:8080* and use Hot Module Replacement. You can override the default host and port through env (`HOST`, `PORT`).
* Creating a version - **npm version <x.y.z>** - Updates */dist* and *package.json* with the new version and create a version tag to Git.
* Publishing a version - **npm publish** - Pushes a new version to npm and updates the project site.
* Running tests once - **npm test**
* Running tests continuously **npm run test:tdd**
* Linting - **npm run test:lint** - Runs ESLint.
* Building - **npm run gh-pages** - Builds the demo into `./gh-pages` directory.
* Deploying - **npm run deploy-gh-pages** - Deploys the contents of `./gh-pages` to the `gh-pages` branch. GitHub will pick this up automatically. Your site will be available through *<user name>.github.io/<project name>`.
* Generating stats - **npm run stats** - Generates stats that can be passed to [webpack analyse tool](https://webpack.github.io/analyse/). This is useful for investigating what the build consists of.


