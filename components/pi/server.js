const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

app.use(cors());
app.use(express.json());

app.post("/analyze-xray", async (req, res) => {
  const { imageBase64, mimeType, prompt } = req.body;

  if (!imageBase64 || !mimeType || !prompt) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                inlineData: {
                  mimeType,
                  data: imageBase64,
                },
              },
              { text: prompt },
            ],
          },
        ],
      }
    );

    const result =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    res.json({ result });
  } catch (error) {
    console.error("API error:", error.message);
    res.status(500).json({ error: "API request failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
