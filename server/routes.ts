import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { createHash } from "crypto";

function hashPassword(password: string): string {
  return createHash("sha256").update(password + "metaracing_salt").digest("hex");
}

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  // --- Auth routes ---
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ error: "Name, email, and password are required" });
      }
      const existing = await storage.getCustomerByEmail(email);
      if (existing) {
        return res.status(409).json({ error: "An account with this email already exists" });
      }
      const passwordHash = hashPassword(password);
      const customer = await storage.createCustomer(name, email, passwordHash);
      return res.status(201).json({
        customer: { id: customer.id, name: customer.name, email: customer.email },
      });
    } catch (err) {
      return res.status(500).json({ error: "Registration failed" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }
      const customer = await storage.getCustomerByEmail(email);
      if (!customer) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      const passwordHash = hashPassword(password);
      if (customer.passwordHash !== passwordHash) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      return res.json({
        customer: { id: customer.id, name: customer.name, email: customer.email },
      });
    } catch (err) {
      return res.status(500).json({ error: "Login failed" });
    }
  });

  // --- Booking routes ---
  app.post("/api/bookings", async (req, res) => {
    try {
      const { name, email, phone, experience, plan, date, guests, message, customerId } = req.body;
      if (!name || !email || !phone || !experience || !plan || !date || !guests) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const booking = await storage.createBooking({
        name, email, phone, experience, plan, date, guests,
        message: message || "",
        customerId,
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

  // --- Customer bookings ---
  app.get("/api/customers/:id/bookings", async (req, res) => {
    try {
      const { id } = req.params;
      const bookings = await storage.getBookingsByCustomer(id);
      return res.json(bookings);
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch customer bookings" });
    }
  });

  return httpServer;
}
