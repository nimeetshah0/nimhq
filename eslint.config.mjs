import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  // Turn off stylistic rules that fight Prettier; must come after the rule sets above.
  prettier,
  {
    files: ["**/*.{ts,tsx,mjs,js}"],
    rules: {
      // Type assertions (`x as T`) hide real type errors at the seams they paper over;
      // prefer narrowing, generics (querySelectorAll<T>, closest<T>) or honest types.
      // Kept as a warning so a genuinely unavoidable assertion can be justified in place.
      "@typescript-eslint/consistent-type-assertions": [
        "warn",
        { assertionStyle: "never" },
      ],
      // Underscore-prefixed arguments (e.g. a no-op render hook) are deliberately unused.
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // Every control statement gets braces; Prettier keeps the opening brace on the same
      // line as the statement and the closing brace on its own line.
      curly: ["error", "all"],
      // A blank line before return separates the result from how it was computed.
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);
