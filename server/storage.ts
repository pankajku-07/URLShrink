import { type Url, type InsertUrl } from "@shared/schema";
import { randomBytes } from "crypto";

export interface IStorage {
  getUrl(id: string): Promise<Url | undefined>;
  getUrlByShortCode(shortCode: string): Promise<Url | undefined>;
  getUrlByOriginal(originalUrl: string): Promise<Url | undefined>;
  createUrl(url: InsertUrl): Promise<Url>;
}

export class MemStorage implements IStorage {
  private urls: Map<string, Url>;
  private shortCodes: Map<string, Url>;
  private originalUrls: Map<string, Url>;

  constructor() {
    this.urls = new Map();
    this.shortCodes = new Map();
    this.originalUrls = new Map();
  }

  private generateShortCode(): string {
    // Generate a 6-character short code
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    const bytes = randomBytes(6);
    for (let i = 0; i < 6; i++) {
      result += chars[bytes[i] % chars.length];
    }
    return result;
  }

  async getUrl(id: string): Promise<Url | undefined> {
    return this.urls.get(id);
  }

  async getUrlByShortCode(shortCode: string): Promise<Url | undefined> {
    return this.shortCodes.get(shortCode);
  }

  async getUrlByOriginal(originalUrl: string): Promise<Url | undefined> {
    return this.originalUrls.get(originalUrl);
  }

  async createUrl(insertUrl: InsertUrl): Promise<Url> {
    // Check if URL already exists
    const existing = await this.getUrlByOriginal(insertUrl.originalUrl);
    if (existing) {
      return existing;
    }

    // Generate unique short code
    let shortCode: string;
    do {
      shortCode = this.generateShortCode();
    } while (this.shortCodes.has(shortCode));

    const id = randomBytes(16).toString('hex');
    const url: Url = {
      id,
      originalUrl: insertUrl.originalUrl,
      shortCode,
    };

    this.urls.set(id, url);
    this.shortCodes.set(shortCode, url);
    this.originalUrls.set(insertUrl.originalUrl, url);

    return url;
  }
}

export const storage = new MemStorage();
