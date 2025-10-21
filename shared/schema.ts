import { sql } from "drizzle-orm";
import { pgTable, text, varchar, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User consultation data
export const consultations = pgTable("consultations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userName: text("user_name").notNull(),
  birthDate: text("birth_date").notNull(),
  gender: text("gender").notNull(),
  zodiacSign: text("zodiac_sign"),
  oracleType: text("oracle_type").notNull(),
  selectedCards: json("selected_cards").$type<OracleCard[]>().notNull(),
  interpretation: text("interpretation").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const insertConsultationSchema = createInsertSchema(consultations).omit({
  id: true,
  createdAt: true,
});

export type InsertConsultation = z.infer<typeof insertConsultationSchema>;
export type Consultation = typeof consultations.$inferSelect;

// Oracle card interface
export interface OracleCard {
  name: string;
  meaning: string;
}

// Oracle data interface
export interface OracleData {
  title: string;
  description: string;
  cards: OracleCard[];
}

// Zodiac sign interface
export interface ZodiacSign {
  name: string;
  symbol: string;
  startDate: { month: number; day: number };
  endDate: { month: number; day: number };
}

// User data for current session
export interface UserSession {
  name: string;
  birthDate: string;
  gender: string;
  zodiacSign?: ZodiacSign;
}

// Oracle types
export type OracleType = 'daily' | 'horoscope' | 'tarot' | 'angels' | 'runes';

// Card position for reading
export type CardPosition = 'past' | 'present' | 'future';
// User table (if you want to store users)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull(),
  email: text("email"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// Types for user creation and selection
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
