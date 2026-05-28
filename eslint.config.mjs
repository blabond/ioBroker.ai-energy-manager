import config from "@iobroker/eslint-config";

export default [
  {
    ignores: [
      "node_modules/**",
      "coverage/**",
      "tmp/**",
      "admin/react/**",
      "admin/custom/**",
      "admin/img/**",
      "admin/ai-energy-manager.png",
    ],
  },
  ...config,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: {
        AbortController: "readonly",
        console: "readonly",
        fetch: "readonly",
        module: "readonly",
        require: "readonly",
        process: "readonly",
        Buffer: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        URL: "readonly",
        URLSearchParams: "readonly",
        systemDictionary: "writable",
      },
    },
    rules: {
      "no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-console": "off",
      "jsdoc/require-jsdoc": "off",
    },
  },
  {
    files: ["test/**/*.js"],
    languageOptions: {
      globals: {
        structuredClone: "readonly",
      },
    },
  },
];
