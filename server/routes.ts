import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertGameProgressSchema } from "@shared/schema";
import { z } from "zod";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve static assets
  app.use('/assets', express.static(path.join(process.cwd(), 'attached_assets')));

  // Get all characters
  app.get("/api/characters", async (req, res) => {
    try {
      const characters = await storage.getCharacters();
      res.json(characters);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch characters" });
    }
  });

  // Get character by ID
  app.get("/api/characters/:id", async (req, res) => {
    try {
      const character = await storage.getCharacter(req.params.id);
      if (!character) {
        return res.status(404).json({ message: "Character not found" });
      }
      res.json(character);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch character" });
    }
  });

  // Get scenario by ID
  app.get("/api/scenarios/:id", async (req, res) => {
    try {
      const scenario = await storage.getScenario(req.params.id);
      if (!scenario) {
        return res.status(404).json({ message: "Scenario not found" });
      }
      res.json(scenario);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch scenario" });
    }
  });

  // Get scenarios for character
  app.get("/api/characters/:id/scenarios", async (req, res) => {
    try {
      const scenarios = await storage.getScenariosByCharacter(req.params.id);
      res.json(scenarios);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch scenarios" });
    }
  });

  // Create game progress
  app.post("/api/game-progress", async (req, res) => {
    try {
      const validatedData = insertGameProgressSchema.parse(req.body);
      const progress = await storage.createGameProgress(validatedData);
      res.json(progress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create game progress" });
    }
  });

  // Update game progress
  app.patch("/api/game-progress/:sessionId", async (req, res) => {
    try {
      const updates = req.body;
      const progress = await storage.updateGameProgress(req.params.sessionId, updates);
      if (!progress) {
        return res.status(404).json({ message: "Game progress not found" });
      }
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to update game progress" });
    }
  });

  // Get game progress
  app.get("/api/game-progress/:sessionId", async (req, res) => {
    try {
      const progress = await storage.getGameProgress(req.params.sessionId);
      if (!progress) {
        return res.status(404).json({ message: "Game progress not found" });
      }
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch game progress" });
    }
  });

  // Get learning materials
  app.get("/api/learning-materials", async (req, res) => {
    try {
      const sessionId = req.query.sessionId as string;
      const materials = await storage.getLearningMaterials(sessionId);
      res.json(materials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch learning materials" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
// Na konci server/routes.ts
export default router;
