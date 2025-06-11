import express from 'express';
import { connection, saveTeams } from "../models/db.js";

const router = express.Router();

router.post("/saveTeams", async (req, res) => {
    try {
        const teams = req.body;
        await connection.execute("DELETE FROM teams");

        for (const team of teams) {
            try {
                await saveTeams(team);
            } catch (err) {
                console.error("Error saving team:", team.name, err);
                throw err; 
            }
        }

        res.status(200).json({ message: 'Teams saved successfully' });
    } catch (error) {
        console.error('Failed to save teams:', error.stack || error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

router.get("/loadTeams", (req, res) => {
  const query = connection.query("SELECT * FROM teams");

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