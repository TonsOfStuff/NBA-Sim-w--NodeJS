import express from 'express';
import { connection, savePlayer } from "../models/db.js";

const router = express.Router();

router.post('/save-player', async (req, res) => {
  try {
    const players = req.body;
    await connection.execute("DELETE FROM players");

    for (const player of players) {
      try {
        await savePlayer(player);
      } catch (err) {
        console.error("Error saving player:", player.name, err);
        throw err; 
      }
    }

    res.status(200).json({ message: 'Players saved successfully' });
  } catch (error) {
    console.error('Failed to save players:', error.stack || error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});


router.get("/load-players", (req, res) => {
  const query = connection.query("SELECT * FROM players");

  res.writeHead(200, {
    "Content-Type": "application/json",
    "Transfer-Encoding": "chunked",
  });

  res.write("[");

  let first = true;

  query
    .stream()
    .on("data", (row) => {
      if (!first) res.write(",");
      res.write(JSON.stringify(row));
      first = false;
    })
    .on("end", () => {
      res.write("]");
      res.end();
    })
    .on("error", (err) => {
      console.error("Stream error:", err);
      res.status(500).end("[]");
    });
});

export default router;
