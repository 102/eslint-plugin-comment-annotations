"use strict";

const utils = require("../utils");

module.exports = {
  meta: {
    docs: {
      description: "Disallow use of non-caps comments annotations",
      category: "Stylistic Issues",
      recommended: true
    },
    fixable: "code"
  },

  create: function(context) {
    const sourceCode = context.getSourceCode();

    function checkCommentForLowercaseAnnotation(node) {
      // ignore empty comments
      if (node.value.length === 0) {
        return;
      }

      const match = utils.annotationsRe.exec(node.value);

      // comment do not contain any annotations
      if (!match) {
        return;
      }

      const spaces = match[1];
      const annotation = match[2];

      if (!utils.annotations.includes(annotation)) {
        const start = node.range[0] + 2 + spaces.length;
        const end = node.range[0] + 2 + spaces.length + annotation.length;

        context.report({
          node,
          message: "Unexpected lowercase in comment annotation",
          fix(fixer) {
            return fixer.replaceTextRange(
              [start, end],
              annotation.toUpperCase()
            );
          }
        });
      }
    }

    return {
      Program() {
        const comments = sourceCode.getAllComments();

        comments
          .filter(token => token.type !== "Shebang")
          .forEach(checkCommentForLowercaseAnnotation);
      }
    };
  }
};
