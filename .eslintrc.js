module.exports = {
  root: true,
  env: {
    jest: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:node/recommended', 'prettier'],
  rules: {
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    'no-return-assign': 0,
    'arrow-body-style': 0,
    'node/no-unpublished-require': 0,
    'node/no-missing-require': 0,
  },
  plugins: ['prettier'],
};
