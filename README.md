# eslint-plugin-comment-annotations

[![npm version](https://img.shields.io/npm/v/eslint-plugin-comment-annotations.svg?style=flat)](https://www.npmjs.com/package/eslint-plugin-comment-annotations)

ESLint rules for JavaScript comment annotations.

# Rules

- `all-caps` enforces comment annotations all-caps style

  ```js
  // These comments will fail
  // todo:
  // todo
  // fixme
  //  fixme

  // These comments will not fail
  // TODO:
  // TODO
  // FIXME
  ```

- `single-colon` enforces comment annotations colon

  ```js
  // These comments will fail
  // todo
  // fixme
  //  fixme

  // These comments will not fail
  // todo:
  // fixme:
  //  fixme:
  ```

- `no-extra-space` disables extra space in comment annotations (TODO and FIXME)

  ```js
  // These comments will fail
  // to do
  // fix  me
  //  fix       me

  // These comments will not fail
  // todo
  // fixme
  //  fixme
  ```
