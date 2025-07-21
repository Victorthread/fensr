import express from "express";
import { createRateLimiter } from "./limiter";

const app = express();
const PORT = process.env.PORT || 3000;

// Apply rate limiter globally
app.use(createRateLimiter());

// Sample routes
app.get("/", (req, res) => {
  res.send("Welcome! You're within the rate limit.");
});

app.get("/limited", (req, res) => {
  res.send("This route is also rate-limited.");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
