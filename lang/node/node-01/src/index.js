const express = require("express");
const bodyParser = require("body-parser");
const fclone = require("fclone");
const sanitize = require("./sanitize");
const app = express();
const port = process.env.APP_PORT || 8003;

const bodyOptions = {
  inflate: true,
  limit: 10000,
  defaultCharset: "utf-8",
  type: ["text/plain", "text/html", "text/*", "*"],
};
app.use(bodyParser.text(bodyOptions));

app.get("/", (req, res) => {
  res.send({ status: 200, msg: "Online", code: "ONLINE" });
});

app.post("/", (req, res) => {
  try {
    res.send({
      status: 200,
      result: sanitize(req.body || ""),
    });
  } catch (error) {
    console.log({
      level: "ERROR",
      dtm: new Date(),
      error: fclone(error),
      req: {
        method: req.method,
        url: req.url.toString(),
        client: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
      },
    });
    res.status(500).send({
      status: 500,
      code: "SERVER_ERROR",
      msg: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
