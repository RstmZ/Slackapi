const express = require("express");
const router = express.Router();
const axios = require("axios");
const { WebClient } = require("@slack/web-api");
const { InstallProvider } = require("@slack/oauth");
const dotenv = require("dotenv");
dotenv.config();

const client = new WebClient(process.env.SLACK_TOKEN);

router.get("/code", async (req, res) => {
  res.redirect(
    "https://slack.com/oauth/authorize?client_id=" +
      process.env.CLIENT_ID +
      "&scope=" +
      ["chat:write:bot"]
  );
});

router.get("/connect", async (req, res) => {
  const code = req.query.code;
  console.log(code);
  try {
    const auth = await client.oauth.access({
      code: code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: "https://localhost:3000/auth/connect",
    });

    // Sending Message to slack
    const res = await client.chat.postMessage({
      token: auth.access_token,
      channel: "auth",
      text: "tik tak toe",
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
