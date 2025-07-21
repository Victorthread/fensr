import express from "express";
import { createRateLimiter } from "./limiter";

const app = express();
const port = 3000;

// Apply rate limiter globally
app.use(createRateLimiter());

app.get("/", (_req, res) => {
  res.send("Rate limited route");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
