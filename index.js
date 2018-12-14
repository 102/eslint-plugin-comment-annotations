module.exports = {
  rules: {
    "all-caps": require("./lib/rules/all-caps"),
    "single-colon": require("./lib/rules/single-colon")
  },
  configs: {
    recommended: require("./lib/configs/recommended")
  }
};
