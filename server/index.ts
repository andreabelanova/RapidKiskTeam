// server/index.ts

import express from "express";
import path from "path";
import routes from "./routes";

const app = express();

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount your API routes under /api
app.use("/api", routes);

// In production, serve the built React app
if (process.env.NODE_ENV === "production") {
  // __dirname is the directory of this compiled file (dist/server)
  const publicPath = path.join(__dirname, "public");
  app.use(express.static(publicPath));

  // For any route not matching /api, send back index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
  });
}

// Use the port provided by the host (Railway, Vercel, etc.), otherwise 5000
const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`[express] serving on port ${PORT}`);
});
