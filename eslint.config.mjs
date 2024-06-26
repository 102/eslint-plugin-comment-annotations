import prettierConfig from "eslint-config-prettier";
import eslintPluginConfig from "eslint-plugin-eslint-plugin/configs/recommended";
import prettier from "eslint-plugin-prettier";
import eslintPlugin from "eslint-plugin-eslint-plugin";

export default [
  {
    files: ["**/*.{m,}js"],
    plugins: {
      prettier,
      eslintPlugin,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
  prettierConfig,
  eslintPluginConfig,
];
