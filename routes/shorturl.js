const router = require("express").Router();
const bodyParser = require("body-parser");

const ShortUrl = require("../model/shorturl");

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post("/new", [jsonParser, urlencodedParser], async (req, res) => {
  try {
    const { url: newUrl } = req.body;

    console.log("URL >>", url);

    const urls = await ShortUrl.find({}).select("-_id original_url short_url");

    for (let i = 0; i < urls.length; i++) {
      if (urls[i].original_url === newUrl) return res.send(urls[i]);
    }

    const url = new ShortUrl({
      original_url: newUrl,
      short_url: urls[urls.length - 1].short_url + 1,
    });

    await url.save();
    res
      .status(200)
      .json({ original_url: url.original_url, short_url: url.short_url });
  } catch (e) {
    res.status(500).json({ error: "invalid url" });
  }
});

router.get("/:shortUrlId", async (req, res) => {
  try {
    const { shortUrlId } = req.params;

    const result = await ShortUrl.find({ short_url: shortUrlId });

    if (!result.length) return res.status(404).send("Not found");

    res.redirect(`${result[0].original_url}`);
  } catch (e) {
    res.status(404).send(`There was a problem finding you url: ${e}`);
  }
});

module.exports = router;
