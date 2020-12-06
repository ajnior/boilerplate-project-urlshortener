const { Schema, model } = require("mongoose");

const shortUrlSchema = new Schema({
  original_url: {
    type: String,
    required: "URL can't be empty",
    validate: {
      validator: function (v) {
        const validUrlRegex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
        return validUrlRegex.test(v);
      },
      message: (props) => "invalid url",
    },
    unique: true,
  },
  short_url: { type: Number },
});

const ShortUrl = model("ShortUrl", shortUrlSchema);

module.exports = ShortUrl;
