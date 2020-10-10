module.exports = {
  rules: {
    "all-caps": require("./lib/rules/all-caps"),
    "single-colon": require("./lib/rules/single-colon"),
    "no-extra-space": require("./lib/rules/no-extra-space")
  },
  configs: {
    recommended: require("./lib/configs/recommended")
  }
};
