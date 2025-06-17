import express from 'express';
import { connection, saveGeneral } from "../models/db.js";

const router = express.Router();

router.post('/saveGeneral', async (req, res) => {
  try {
    const general = req.body;
    await connection.execute("DELETE FROM generals");

    try {
        await saveGeneral(general);
    } catch (err) {
        console.error("Error saving:", err);
        throw err; 
    }
    res.status(200).json({ message: 'Generals saved successfully' });
  } catch (error) {
    console.error('Failed to save:', error.stack || error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

router.get('/loadGeneral', async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT * FROM generals');
    res.json(rows);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;