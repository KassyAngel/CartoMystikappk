import { type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getItem(key: string, userId?: string): Promise<any>;
  setItem(key: string, value: any, userId?: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private data: Map<string, any>; // Données globales (anciennes)
  private userData: Map<string, Map<string, any>>; // ✅ NOUVEAU : Données par utilisateur

  constructor() {
    this.users = new Map();
    this.data = new Map();
    this.userData = new Map(); // ✅ Initialisation
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

    // ✅ Créer un espace de stockage pour ce nouvel utilisateur
    this.userData.set(id, new Map());

    return user;
  }

  // ✅ MODIFIÉ : Stockage par utilisateur
  async getItem(key: string, userId?: string): Promise<any> {
    if (!userId) {
      // Ancien système (fallback)
      return this.data.get(key) || null;
    }

    // ✅ Nouveau : données isolées par utilisateur
    const userStorage = this.userData.get(userId);
    if (!userStorage) {
      return null;
    }
    return userStorage.get(key) || null;
  }

  async setItem(key: string, value: any, userId?: string): Promise<void> {
    if (!userId) {
      // Ancien système (fallback)
      this.data.set(key, value);
      return;
    }

    // ✅ Nouveau : données isolées par utilisateur
    let userStorage = this.userData.get(userId);
    if (!userStorage) {
      userStorage = new Map();
      this.userData.set(userId, userStorage);
    }
    userStorage.set(key, value);
  }
}

export const storage = new MemStorage();