import express, { Request, Response, NextFunction } from "express";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve React build
const publicPath = path.resolve(__dirname, "../dist/public");
app.use(express.static(publicPath));

// Example API route
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
