"use strict";

const utils = require("../utils");

const colonRegex = /^(:+)/;

module.exports = {
  meta: {
    docs: {
      description: "Enforce single colon after annotation",
      category: "Stylistic Issues",
      recommended: true
    },
    fixable: "code"
  },

  create: function(context) {
    const sourceCode = context.getSourceCode();

    function checkCommentForSingleColonAfterAnnotation(node) {
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
      const stringAfterAnnotation = node.value.slice(
        spaces.length + annotation.length
      );

      const colonMatch = colonRegex.exec(stringAfterAnnotation);

      // no colons were found
      if (!colonMatch) {
        const start = node.range[0];
        const end = node.range[0] + 2 + spaces.length + annotation.length;

        context.report({
          node,
          message:
            "Expected to find a single colon after annotation: no colons",
          fix(fixer) {
            return fixer.insertTextAfterRange([start, end], ":");
          }
        });

        return;
      }

      const colons = colonMatch[1];

      // exactly one colon was found, everything is correct
      if (colons.length === 1) {
        return;
      }

      // more than one colons were found, replace all of them with a single one
      const start = node.range[0] + 2 + spaces.length + annotation.length;
      const end =
        node.range[0] + 2 + spaces.length + annotation.length + colons.length;

      context.report({
        node,
        message:
          "Expected to find a single colon after annotation: multiple colons",
        fix(fixer) {
          return fixer.replaceTextRange([start, end], ":");
        }
      });
    }

    return {
      Program() {
        const comments = sourceCode.getAllComments();

        comments
          .filter(token => token.type !== "Shebang")
          .forEach(checkCommentForSingleColonAfterAnnotation);
      }
    };
  }
};
