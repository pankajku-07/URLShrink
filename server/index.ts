import express from "express";
import cors from "cors";
import { nanoid } from "nanoid"; // for generating short IDs

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON body

// In-memory database (replace with real DB for production)
const urlDB: Record<string, string> = {};

// POST route to shorten URL
app.post("/shorten", (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: "URL not provided" });
  }

  const shortId = nanoid(6); // generate a 6-char short code
  urlDB[shortId] = longUrl;

  res.json({ shortUrl: `${req.protocol}://${req.get("host")}/${shortId}` });
});

// Redirect route
app.get("/:shortId", (req, res) => {
  const { shortId } = req.params;
  const longUrl = urlDB[shortId];

  if (!longUrl) return res.status(404).send("URL not found");

  res.redirect(longUrl);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
