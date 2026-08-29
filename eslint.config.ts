import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierCheck from "eslint-plugin-prettier/recommended"; //yell at you for not formatting
import prettierConflicts from "eslint-config-prettier"; //disable rules that conflict with prettier
import { globalIgnores } from "eslint/config";
import type { ConfigArray } from "typescript-eslint";

const ciConfig = process.env.CI ? [prettierCheck] : [];

export default [
	globalIgnores(["borger/client/rs/pkg", "target", "release"]),
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			parserOptions: {
				project: ["tsconfig.presentation.json", "borger/tsconfig.json"],
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			"@typescript-eslint/no-explicit-any": "off",

			"no-console": "error",
			eqeqeq: "error",
			"require-await": "error",
			"no-nested-ternary": "error",
			"@typescript-eslint/consistent-type-imports": "error",

			"no-mixed-operators": [
				"error",
				{
					groups: [
						["&", "|", "^", "~", "<<", ">>", ">>>"],
						["==", "!=", "===", "!==", ">", ">=", "<", "<="],
						["&&", "||"],
						["in", "instanceof"],
					],
					allowSamePrecedence: true,
				},
			],
			"prefer-const": [
				"error",
				{
					destructuring: "all",
				},
			],
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
				},
			],
		},
	},
	prettierConflicts,
	...ciConfig,
] satisfies ConfigArray;
