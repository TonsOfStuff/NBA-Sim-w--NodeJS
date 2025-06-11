import express from 'express';
import { connection, savePlayer, getPlayers } from "../models/db.js";

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


router.get('/load-players', async (req, res) => {
  try {
    const [players] = await getPlayers();
    res.status(200).json(players);
  } catch (error) {
    console.error('Error loading players:', error);
    res.status(500).json({ error: 'Failed to load players' });
  }
});


export default router;
