import { pgTable, serial, varchar, numeric, timestamp, integer, text } from "drizzle-orm/pg-core";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  name: varchar("name", { length: 255 }),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const assets = pgTable("assets", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  type: varchar("type", { length: 100 }).notNull(),
  amount: numeric("amount", { precision: 20, scale: 8 }).notNull(),
  avg_pricing: numeric("avg_pricing", { precision: 20, scale: 8 }).notNull(),
  current_pricing: numeric("current_pricing", { precision: 20, scale: 8 }).notNull(),
  unit: varchar("unit", { length: 10 }).notNull(),
  userId: integer("user_id").references(() => users.id),
  purchaseDate: timestamp("purchase_date", { withTimezone: true }).notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
