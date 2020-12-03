const { Schema, model } = require("mongoose");

const shortUrlSchema = new Schema({
  original_url: { type: String, required: "URL can't be empty", unique: true },
  short_url: { type: Number },
});

shortUrlSchema.path("originalUrl").validate((url) => {
  const validUrlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return validUrlRegex.test(url);
}, "invalid url");

const ShortUrl = model("ShortUrl", shortUrlSchema);

module.exports = ShortUrl;
