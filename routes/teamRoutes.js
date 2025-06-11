import express from 'express';
import { connection, saveTeams, getTeams } from "../models/db.js";

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

router.get("/loadTeams", async (req, res) => {
    try {
        const [teams] = await getTeams();
        res.status(200).json(teams);
    } catch (error) {
        console.error('Error loading teams:', error);
        res.status(500).json({ error: 'Failed to load teams' });
    }
});


export default router;