import { type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getItem(key: string): Promise<any>;
  setItem(key: string, value: any): Promise<void>;
  deleteItem(key: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  public data: Map<string, any>;

  constructor() {
    this.users = new Map();
    this.data = new Map();
    console.log('💾 MemStorage initialisé (Replit - développement)');
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

  async getItem(key: string): Promise<any> {
    const value = this.data.get(key);
    return value || null;
  }

  async setItem(key: string, value: any): Promise<void> {
    this.data.set(key, value);
  }

  async deleteItem(key: string): Promise<void> {
    this.data.delete(key);
  }
}

export const storage = new MemStorage();