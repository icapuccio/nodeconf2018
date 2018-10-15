const express = require("express");
const db = require("./db");
const app = express();
const port = 80;

db.connect
  .then(() => {
    app.get("/", (req, res) => {
      db.Logs.findAll().then(logs => {
        res.json(logs);
      });
    });
    app.get("/check", (req, res) => {
      res.send("OK");
    });
    app.listen(port, () =>
      db.Logs.insertOrUpdate({
        author: process.env.AUTHOR,
        container_id: process.env.HOSTNAME
      }).then(() => {
        console.log(`Demo app listening on port ${port}!`);
      })
    );
  })
  .catch(e => {
    console.error("Server Crash with error", e);
  });
