"use strict";

const RuleTester = require("eslint").RuleTester;
const rule = require("../../../lib/rules/single-colon");
const tester = new RuleTester();

const expectedErrorMessage = "Expected to find a single colon after annotation";

tester.run("single-colon", rule, {
  valid: [
    "  // TODO: asd",
    "// TODO:",
    "// fixme: asd",
    "// xxx: asd",
    "// hack: asd",
    "// toDo: asd",
    `/* toDo: zxc
     */`,
    `/* haCK: zxc
     */`,
    "  // TODO:"
  ],
  invalid: [
    {
      code: "  // TODO",
      output: "  // TODO:",
      errors: [`${expectedErrorMessage}: no colons`]
    },
    {
      code: "  // TODO::",
      output: "  // TODO:",
      errors: [`${expectedErrorMessage}: multiple colons`]
    },
    {
      code: "// TODO asd",
      output: "// TODO: asd",
      errors: [`${expectedErrorMessage}: no colons`]
    },
    {
      code: "// TODO",
      output: "// TODO:",
      errors: [`${expectedErrorMessage}: no colons`]
    },
    {
      code: "// TODO:: asd",
      output: "// TODO: asd",
      errors: [`${expectedErrorMessage}: multiple colons`]
    },
    {
      code: "// TODO::: asd",
      output: "// TODO: asd",
      errors: [`${expectedErrorMessage}: multiple colons`]
    },
    {
      code: "// fixmE::: asd",
      output: "// fixmE: asd",
      errors: [`${expectedErrorMessage}: multiple colons`]
    },
    {
      code: "// XXx::: asd",
      output: "// XXx: asd",
      errors: [`${expectedErrorMessage}: multiple colons`]
    },
    {
      code: `/* fixMe:: zxc
             qwe */`,
      output: `/* fixMe: zxc
             qwe */`,
      errors: [`${expectedErrorMessage}: multiple colons`]
    },
    {
      code: `/*   fixMe:: zxc
             qwe */`,
      output: `/*   fixMe: zxc
             qwe */`,
      errors: [`${expectedErrorMessage}: multiple colons`]
    },
    {
      code: `/*   fixMe zxc
             qwe */`,
      output: `/*   fixMe: zxc
             qwe */`,
      errors: [`${expectedErrorMessage}: no colons`]
    }
  ]
});
