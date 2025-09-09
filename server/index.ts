import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";

// fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve React build
const publicPath = path.resolve(__dirname, "../dist/public");
app.use(express.static(publicPath));

// API route example
app.get("/api/hello", (_req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

// Catch-all: serve React for client-side routing
app.get("*", (_req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

const port = parseInt(process.env.PORT || "5000", 10);
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
