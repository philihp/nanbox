import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { languageOptions: { globals: {...globals.browser, ...globals.node} } },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-constant-binary-expression": "off"
    }
  }
];
