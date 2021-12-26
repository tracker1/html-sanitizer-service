// deno test --quiet --unstable --allow-run --allow-env --allow-read --allow-write sanitize.ts

// import { createRequire } from "https://deno.land/std/node/module.ts";
// const require = createRequire(import.meta.url);
// const SanitizeHtml = require("sanitize-html@2.6.1");
// console.log(Object.keys(SanitizeHtml));

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import * as Ammonia from "https://deno.land/x/ammonia@0.3.1/mod.ts";
await Ammonia.init();

/*
Default tags allowed:
  a, abbr, acronym, area, article, aside, b, bdi,
  bdo, blockquote, br, caption, center, cite, code,
  col, colgroup, data, dd, del, details, dfn, div,
  dl, dt, em, figcaption, figure, footer, h1, h2,
  h3, h4, h5, h6, header, hgroup, hr, i, img,
  ins, kbd, kbd, li, map, mark, nav, ol, p, pre,
  q, rp, rt, rtc, ruby, s, samp, small, span,
  strike, strong, sub, summary, sup, table, tbody,
  td, th, thead, time, tr, tt, u, ul, var, wbr
*/

// Custom options
const builder = new Ammonia.AmmoniaBuilder();
builder.tags.add("span");
builder.allowedClasses.set(
  "p",
  new Set<string>(["red", "blue", "green", "yellow", "bold", "italics"]),
);
builder.allowedClasses.set(
  "span",
  new Set<string>(["red", "blue", "green", "yellow", "bold", "italics"]),
);
builder.allowedClasses.set(
  "a",
  new Set<string>(["red", "blue", "green", "yellow", "bold", "italics"]),
);

// console.log(Array.from(builder.allowedClasses.entries()));

const addAllowedAttribute = (tag: string, attribute: string) => {
  const attrs = builder.tagAttributes.get(tag) || new Set<string>();
  attrs.add(attribute);
  builder.tagAttributes.set(tag, attrs);
};
addAllowedAttribute("p", "style");

const cleaner = builder.build();

export const sanitize = (input: string) => {
  let txt = cleaner.clean(input);
  txt = txt.replace(/>[\s\r\n]+|[\s\r\n]+</g, (s) => s.trim());
  return txt.trim();
};

Deno.test("Execute clean", () => {
  const expected = `Stuff in head<h1>h1</h1><p>paragraph</p>`;
  const input = `
    <html>
      <head>
        Stuff in head
      </head>
      <body>
        <script>alert(123);</script>
        <h1>h1</h1>
        <p style="color:red;background-color:eval('white');">
          paragraph
        </p>
        <script>alert('FAIL!!!')</script>
      </body>
    </html>
  `;

  const output = sanitize(input);
  // console.log(">>>", output);

  assertEquals(output, expected, "Sanitizes input as expected.");
});
