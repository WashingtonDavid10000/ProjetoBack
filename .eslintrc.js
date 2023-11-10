module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    quotes: "off",
    "class-methods-use-this": "off",
    "no-useless-return": "off",
    "consistent-return": "off",
    "timport/no-named-as-default-member": "off",
    "import/no-named-as-default": "off",
  },
};
