const router = require("express").Router();

router.post("/new", (req, res) => {
  res.send("create new shortUrl ID");
});

router.get("/:shortUrl", (req, res) => {
  res.send("get shortUrl from db");
});

module.exports = router;
