import express from 'express';
import { connection, saveNews } from "../models/db.js";

const router = express.Router();

router.post('/saveNews', async (req, res) => {
  try {
    const news = req.body;
    await connection.execute("DELETE FROM news");

    for (const txt of news){
        try {
            await saveNews(txt);
        } catch (err) {
            console.error("Error saving:", err);
            throw err; 
        }
    }
    res.status(200).json({ message: 'News saved successfully' });
  } catch (error) {
    console.error('Failed to save:', error.stack || error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

router.get('/loadNews', async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT * FROM news');
    res.json(rows);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;