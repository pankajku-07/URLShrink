import express, { Request, Response } from "express";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Example API route
app.get("/api/hello", (_req: Request, res: Response) => {
  res.json({ message: "Hello from API!" });
});

// Serve built client in production
if (process.env.NODE_ENV === "production") {
  const clientPath = path.resolve("dist/public");
  app.use(express.static(clientPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
  });
}

const port = parseInt(process.env.PORT || "5000", 10);
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
