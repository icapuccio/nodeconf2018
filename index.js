const express = require("express");
const db = require("./db");
const app = express();
const port = 80;

db.connect
  .then(() => {
    app.get("/:user/*", (req, res) => {
      const author = process.env.AUTHOR;
      db.Logs.findAll().then(logs => {
        res.json({ author, logs });
      });
    });
    app.get("/check", (req, res) => {
      res.send("OK");
    });
    app.listen(port, () => {
      console.log(`Demo app listening on port ${port}!`);
      db.Logs.insertOrUpdate({
        author: process.env.AUTHOR,
        container_id: process.env.HOSTNAME
      });
    });
  })
  .catch(e => {
    console.error("Server Crash with error", e);
  });
