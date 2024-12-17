import globals from 'globals'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import js from '@eslint/js'
import ts from 'typescript-eslint'
import eslintPluginImport from 'eslint-plugin-import'
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort'

export default ts.config(
	js.configs.recommended,
	...ts.configs.recommended,
	eslintConfigPrettier,
	eslintPluginPrettierRecommended,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				...globals.jest
			}
		}
	},
	{
		plugins: {
			import: eslintPluginImport,
			'simple-import-sort': eslintPluginSimpleImportSort
		},
		rules: {
			'@typescript-eslint/interface-name-prefix': 'off',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-empty-object-type': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					args: 'all',
					argsIgnorePattern: '^_',
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					ignoreRestSiblings: true
				}
			],
			'simple-import-sort/imports': 'error',
			'simple-import-sort/exports': 'error',
			'import/first': 'error',
			'import/newline-after-import': 'error',
			'import/no-duplicates': 'error'
		}
	},
	{
		ignores: ['/dist', '/node_modules', '/build']
	}
)
