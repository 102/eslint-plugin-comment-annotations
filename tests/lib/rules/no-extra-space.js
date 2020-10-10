const { RuleTester } = require("eslint");
const rule = require("../../../lib/rules/no-extra-space");

const tester = new RuleTester();

const expectedErrorMessage = "Unexpected extra space in comment annotation";

tester.run("no-extra-space", rule, {
  valid: [
    "// TODO",
    "// TODO:",
    "// HACK",
    "// HACK:",
    "// XXX",
    "// XXX:",
    "// FIXME",
    "// FIXME:",
    "/* just todo in a normal comment */",
    "/* just HaCk in a normal comment */",
    "/* just xXx in a normal comment */",
    "/* just fix me in a normal comment */",
    "/* just todo in a normal comment */",
    "// review",
    "/* FIXME */",
    "// just a regular comment"
  ],
  invalid: [
    {
      code: "/* Fix Me: */",
      output: "/* FixMe: */",
      errors: [expectedErrorMessage]
    },
    {
      code: "//  TO Do: fix this",
      output: "//  TODo: fix this",
      errors: [expectedErrorMessage]
    },
    {
      code: "//  fix me  ",
      output: "//  fixme  ",
      errors: [expectedErrorMessage]
    },
    {
      code: "//fix  me",
      output: "//fixme",
      errors: [expectedErrorMessage]
    },
    {
      code: "//to\t  do",
      output: "//todo",
      errors: [expectedErrorMessage]
    }
  ]
});
