import express from "express";
import { createRateLimiter } from "./limiter";

const app = express();

// Convert PORT to a number, or default to 3000
const PORT = parseInt(process.env.PORT || "3000", 10);

// Apply rate limiter globally
app.use(createRateLimiter());

// Sample routes
app.get("/", (req, res) => {
  res.send("Welcome! You're within the rate limit.");
});

app.get("/limited", (req, res) => {
  res.send("This route is also rate-limited.");
});

// ✅ Listen on 0.0.0.0 so Render detects the open port
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
