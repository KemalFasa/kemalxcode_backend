const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { response } = require("express");

const configuration = new Configuration({
  //   organization: "org-nAJZd17XLbJUcgkbyZ5HYmXx",
  //   //add apiKey Here
  //   apiKey: "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",
  organization: "org-ghoD20CbdFe2coHdYXlVIFEQ",
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cors());

const port = 3080;

app.post("/", async (req, res) => {
  const { message, currentModel, setVolume } = req.body;
  console.log(message, "message");
  console.log(currentModel);
  const response = await openai.createCompletion({
    model: `${currentModel}`,
    prompt: `${message}`,
    max_tokens: 100,
    temperature: setVolume,
  });
  console.log(response.data.choices[0].text);
  res.json({
    message: response.data.choices[0].text,
  });
});
app.get("/models", async (req, res) => {
  console.log("engines");
  const response = await openai.listEngines();
  res.json({
    models: response.data.data,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://
    localhost:${port}`);
});
