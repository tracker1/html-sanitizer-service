import {
  clone,
  skipValue,
} from "https://raw.githubusercontent.com/tracker1/deno-lib/cf2753f0e06079636244be4e74d244937160c724/utils/clone.ts";

import {
  Application,
  Middleware,
} from "https://deno.land/x/oak@v10.1.0/mod.ts";

import {
  parse as yamlParse,
  stringify as yamlStringify,
} from "https://deno.land/std@0.119.0/encoding/yaml.ts";

export { Application, clone, skipValue };
export type { Middleware };

export const yaml = {
  parse: yamlParse,
  stringify: yamlStringify,
};
