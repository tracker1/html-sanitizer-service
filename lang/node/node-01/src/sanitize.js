const sanitize = require("sanitize-html");

module.exports = (input) => {
  let txt = sanitize(input);
  txt = txt.replace(/>[\s\r\n]+|[\s\r\n]+</g, (s) => s.trim());
  return txt.trim();
};
