const { RuleTester } = require("eslint");
const rule = require("../../../lib/rules/all-caps");

const tester = new RuleTester();

const expectedErrorMessage = "Unexpected lowercase in comment annotation";

tester.run("all-caps", rule, {
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
    "// fix me",
    "// review",
    "/* FIXME */",
    "// just a regular comment"
  ],
  invalid: [
    {
      code: "/* FixMe: */",
      output: "/* FIXME: */",
      errors: [expectedErrorMessage]
    },
    {
      code: "//  TODo: fix this",
      output: "//  TODO: fix this",
      errors: [expectedErrorMessage]
    },
    {
      code: "//  fixme  ",
      output: "//  FIXME  ",
      errors: [expectedErrorMessage]
    },
    {
      code: "//  fixme  ",
      output: "//  FIXME  ",
      errors: [expectedErrorMessage]
    },
    {
      code: "//  fixme  ",
      output: "//  FIXME  ",
      errors: [expectedErrorMessage]
    },
    {
      code: "//  xxX  ",
      output: "//  XXX  ",
      errors: [expectedErrorMessage]
    },
    {
      code: "//fixme",
      output: "//FIXME",
      errors: [expectedErrorMessage]
    }
  ]
});
