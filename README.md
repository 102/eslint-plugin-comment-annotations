# eslint-plugin-comment-annotations

![npm version](https://img.shields.io/npm/v/eslint-plugin-comment-annotations.svg?style=flat)

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
