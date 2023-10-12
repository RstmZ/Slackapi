const https = require("https");
const fs = require("fs");
const express = require("express");
const app = express();
const slackRouter = require("./slack.router");
const dotenv = require("dotenv");
dotenv.config();

const options = {
  key: fs.readFileSync("./key.pem"),
  cert: fs.readFileSync("./cert.pem"),
};
const port = process.env.SERVER_PORT;

app.use(express.static("public"));
app.use(express.json());

app.use("/auth", slackRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
const server = https.createServer(options, app);
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
