import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Needed for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

// In-memory database for URL mappings
const urlDatabase: Record<string, string> = {};

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "../dist/public")));

// API to shorten URL
app.post("/api/shorten", (req, res) => {
  const { longUrl } = req.body;
  if (!longUrl) return res.status(400).json({ error: "No URL provided" });

  const shortId = Math.random().toString(36).substring(2, 8);
  urlDatabase[shortId] = longUrl;

  res.json({ shortUrl: `${req.protocol}://${req.get("host")}/${shortId}` });
});

// Redirect short URLs
app.get("/:shortId", (req, res) => {
  const longUrl = urlDatabase[req.params.shortId];
  if (!longUrl) return res.status(404).send("URL not found");
  res.redirect(longUrl);
});

// Serve front-end
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/public/index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
