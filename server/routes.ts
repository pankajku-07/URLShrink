import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUrlSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Shorten URL endpoint - API routes should come first
  app.post("/api/shorten", async (req, res) => {
    try {
      const validatedData = insertUrlSchema.parse(req.body);
      const url = await storage.createUrl(validatedData);
      
      // Return a much shorter URL - just use a simple domain format
      const shortenedUrl = `link.ly/${url.shortCode}`;
      
      res.json({
        originalUrl: url.originalUrl,
        shortCode: url.shortCode,
        shortenedUrl,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: error.errors[0]?.message || "Invalid URL format" 
        });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Simple test route - specific routes before catch-all
  app.get("/test", (req, res) => {
    res.send("Server is working!");
  });

  // Redirect endpoint - handle short codes (MUST be last)
  app.get("/:shortCode", async (req, res, next) => {
    try {
      const { shortCode } = req.params;
      
      // Skip if this looks like a frontend route or special path
      if (shortCode === 'test' || shortCode === 'src' || shortCode === '@vite' || shortCode === 'node_modules' || shortCode.includes('.')) {
        return next();
      }
      
      // Validate short code format (6 alphanumeric characters)
      if (!/^[a-zA-Z0-9]{6}$/.test(shortCode)) {
        return next(); // Let other routes handle this
      }

      const url = await storage.getUrlByShortCode(shortCode);
      
      if (!url) {
        return res.status(404).json({ message: "Short URL not found" });
      }

      // Permanent redirect to original URL
      res.redirect(301, url.originalUrl);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
