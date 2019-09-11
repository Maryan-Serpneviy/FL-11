module.exports = {
  
  "parserOptions": {
    "ecmaVersion": 2018
  },
  "rules": {
    "import/prefer-default-export": "off",
    "comma-dangle": "off",
    "function-paren-newline": "off",
    "no-unused-expressions": "off",
    "no-unused-vars": ["error", { "varsIgnorePattern": "^_.*" }],
    "no-underscore-dangle": "off",
    "quotes": "off",
    "global-require": "off",
    "linebreak-style": "off",
    "no-extra-boolean-cast": "off",
    "max-len": ["error", {"code":  140}]
  }
}