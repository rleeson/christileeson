module.exports = {
	"root": true,
	"extends": [
		"plugin:@typescript-eslint/recommended",
		"eslint:recommended"
	],
	"env": {
		"browser": true,
		"node": true
	},
	"globals": {
		"wp": "writable",
		"__WebpackModuleApi": true
	},
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"parser": {
			"js": "espree",
			"ts": "@typescript-eslint/parser",
			"template": "espree"
		},
		"requireConfigFile": false,
		"sourceType": "module"
	},
	"plugins": [
		"@typescript-eslint"
	],
	"rules": {
		"indent": "off",
		"no-undef": "off",
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": "error",
		"@typescript-eslint/no-this-alias": "off"
	},
}