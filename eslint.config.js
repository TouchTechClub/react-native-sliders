// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = defineConfig([
  {
    files: [
      "./apps/demo/**/*.ts",
      "./apps/demo/**/*.tsx",
      "./packages/range-slider/**/*.ts",
      "./packages/range-slider/**/*.tsx",
    ],
    extends: [expoConfig, eslintPluginPrettierRecommended],
    ignorePatterns: ["/dist/*"],
    plugins: ["prettier", "import"],
    rules: {
      "prettier/prettier": "warn",
      "sort-imports": [
        "warn",
        { ignoreCase: true, ignoreDeclarationSort: true },
      ],
      "import/order": [
        "warn",
        {
          groups: [
            ["external", "builtin"],
            "internal",
            ["sibling", "parent"],
            "index",
          ],
          pathGroups: [
            {
              pattern: "@(react|react-native)",
              group: "external",
              position: "before",
            },
            {
              pattern: "@/**",
              group: "internal",
            },
          ],
          pathGroupsExcludedImportTypes: ["internal", "react"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
]);
