const typosRE = /^(\s*)((fix\s+me)|(to\s+do))/i;

module.exports = {
  meta: {
    docs: {
      description: "Disallow use of typos in comments annotations",
      category: "Stylistic Issues",
      recommended: true
    },
    fixable: "code"
  },

  create(context) {
    const sourceCode = context.getSourceCode();

    function checkCommentForAnnotationWithExtraSpace(node) {
      // ignore empty comments
      if (node.value.length === 0) {
        return;
      }

      const match = typosRE.exec(node.value);

      // comment does not contain annotations with extra space
      if (!match) {
        return;
      }

      const spaces = match[1];
      const annotation = match[2];

      const start = node.range[0] + 2 + spaces.length;
      const end = node.range[0] + 2 + spaces.length + annotation.length;

      context.report({
        node,
        message: "Unexpected extra space in comment annotation",
        fix(fixer) {
          return fixer.replaceTextRange(
            [start, end],
            annotation.replace(/\s+/g, "")
          );
        }
      });
    }

    return {
      Program() {
        const comments = sourceCode.getAllComments();

        comments
          .filter(token => token.type !== "Shebang")
          .forEach(checkCommentForAnnotationWithExtraSpace);
      }
    };
  }
};
