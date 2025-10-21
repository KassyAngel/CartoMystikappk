import { type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getItem(key: string): Promise<any>;
  setItem(key: string, value: any): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private data: Map<string, any>; // ✅ Stockage générique

  constructor() {
    this.users = new Map();
    this.data = new Map(); // ✅ Initialisation
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const createdAt = new Date().toISOString();

    const user: User = {
      id,
      username: insertUser.username,
      email: insertUser.email ?? null,
      createdAt,
    };

    this.users.set(id, user);
    return user;
  }

  // ✅ Nouvelles méthodes pour le Grimoire
  async getItem(key: string): Promise<any> {
    return this.data.get(key) || null;
  }

  async setItem(key: string, value: any): Promise<void> {
    this.data.set(key, value);
  }
}

export const storage = new MemStorage();