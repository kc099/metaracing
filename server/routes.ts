import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/bookings", async (req, res) => {
    try {
      const { name, email, phone, experience, plan, date, guests, message } = req.body;

      if (!name || !email || !phone || !experience || !plan || !date || !guests) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const booking = await storage.createBooking({
        name,
        email,
        phone,
        experience,
        plan,
        date,
        guests,
        message: message || "",
      });

      return res.status(201).json(booking);
    } catch (err) {
      return res.status(500).json({ error: "Failed to create booking" });
    }
  });

  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getBookings();
      return res.json(bookings);
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });

  return httpServer;
}
