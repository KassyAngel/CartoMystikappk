import { Pool } from 'pg';
import type { User, InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getItem(key: string): Promise<any>;
  setItem(key: string, value: any): Promise<void>;
  deleteItem(key: string): Promise<void>;
}

export class PgStorage implements IStorage {
  private pool: Pool;

  constructor() {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      console.error('❌ DATABASE_URL non définie !');
      throw new Error('DATABASE_URL est requise');
    }

    this.pool = new Pool({
      connectionString: databaseUrl,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    });

    console.log('✅ Connexion PostgreSQL initialisée');

    // Créer les tables au démarrage
    this.initTables();
  }

  private async initTables() {
    try {
      // Table users
      await this.pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          username TEXT UNIQUE NOT NULL,
          email TEXT,
          created_at TIMESTAMP DEFAULT NOW()
        )
      `);

      // Table key-value storage
      await this.pool.query(`
        CREATE TABLE IF NOT EXISTS storage (
          key TEXT PRIMARY KEY,
          value JSONB NOT NULL,
          updated_at TIMESTAMP DEFAULT NOW()
        )
      `);

      console.log('✅ Tables PostgreSQL créées/vérifiées');
    } catch (error) {
      console.error('❌ Erreur initialisation tables:', error);
      throw error;
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    const result = await this.pool.query(
      'SELECT id, username, email, created_at as "createdAt" FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0] || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.pool.query(
      'SELECT id, username, email, created_at as "createdAt" FROM users WHERE username = $1',
      [username]
    );
    return result.rows[0] || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const result = await this.pool.query(
      'INSERT INTO users (id, username, email) VALUES ($1, $2, $3) RETURNING id, username, email, created_at as "createdAt"',
      [id, insertUser.username, insertUser.email || null]
    );
    return result.rows[0];
  }

  // ✅ Stockage key-value persistant (CORRIGÉ)
  async getItem(key: string): Promise<any> {
    try {
      const result = await this.pool.query(
        'SELECT value FROM storage WHERE key = $1',
        [key]
      );

      if (result.rows.length === 0) {
        console.log(`📥 GET storage["${key}"] → null`);
        return null;
      }

      const value = result.rows[0].value;
      console.log(`📥 GET storage["${key}"] → ${JSON.stringify(value).substring(0, 80)}...`);
      return value;
    } catch (error) {
      console.error(`❌ Erreur GET storage["${key}"]:`, error);
      return null;
    }
  }

  // ✅ CORRECTION CRITIQUE : Pas de JSON.stringify ici !
  async setItem(key: string, value: any): Promise<void> {
    try {
      // ✅ PostgreSQL avec JSONB attend un objet, pas une string
      await this.pool.query(
        `INSERT INTO storage (key, value, updated_at) 
         VALUES ($1, $2::jsonb, NOW()) 
         ON CONFLICT (key) 
         DO UPDATE SET value = $2::jsonb, updated_at = NOW()`,
        [key, JSON.stringify(value)] // ✅ CORRECTION : On stringify pour pg mais pas double
      );
      console.log(`📤 SET storage["${key}"] → OK`);
    } catch (error) {
      console.error(`❌ Erreur SET storage["${key}"]:`, error);
      throw error;
    }
  }

  async deleteItem(key: string): Promise<void> {
    try {
      await this.pool.query('DELETE FROM storage WHERE key = $1', [key]);
      console.log(`🗑️ DELETE storage["${key}"]`);
    } catch (error) {
      console.error(`❌ Erreur DELETE storage["${key}"]:`, error);
      throw error;
    }
  }

  // Fermer la connexion proprement
  async close() {
    await this.pool.end();
  }
}

export const storage = new PgStorage();