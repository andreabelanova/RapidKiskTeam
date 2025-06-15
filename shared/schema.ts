import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const characters = pgTable("characters", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  traits: text("traits").array().notNull(),
  imageUrl: text("image_url").notNull(),
  colorTheme: text("color_theme").notNull(),
});

export const scenarios = pgTable("scenarios", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  characterId: text("character_id"),
  decisions: jsonb("decisions").notNull(),
  nextScenarios: jsonb("next_scenarios"),
  learningObjectives: text("learning_objectives").array(),
});

export const gameProgress = pgTable("game_progress", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  selectedCharacter: text("selected_character"),
  currentScenario: text("current_scenario"),
  completedScenarios: text("completed_scenarios").array().default([]),
  decisions: jsonb("decisions").default({}),
});

export const insertCharacterSchema = createInsertSchema(characters);
export const insertScenarioSchema = createInsertSchema(scenarios);
export const insertGameProgressSchema = createInsertSchema(gameProgress).omit({ id: true });

export type Character = typeof characters.$inferSelect;
export type Scenario = typeof scenarios.$inferSelect;
export type GameProgress = typeof gameProgress.$inferSelect;
export type InsertCharacter = z.infer<typeof insertCharacterSchema>;
export type InsertScenario = z.infer<typeof insertScenarioSchema>;
export type InsertGameProgress = z.infer<typeof insertGameProgressSchema>;

export interface Decision {
  id: string;
  letter: string;
  title: string;
  description: string;
  nextScenario?: string;
}

export interface LearningMaterial {
  id: string;
  title: string;
  type: 'concept' | 'resource' | 'progress' | 'download';
  icon: string;
  content: string | any;
  color: string;
}
