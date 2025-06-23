import { readFile } from "fs/promises";
import { connection } from "./models/db.js";
import playerRoutes from "./routes/playerRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import generalRoutes from "./routes/generalRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import compression from 'compression';


import express from "express";
const app = express();

app.use(compression());
app.use(express.json({limit: '10mb'}));
app.use(express.static('public'));

app.get("/", async (req, res) => {
    res.send( await readFile('./public/index.html', "utf8") );
})

app.get("/stats", async (req, res) => {
    res.send ( await readFile ('./public/stats.html', "utf8"));
});

app.get("/teamStats", async (req, res) => {
    res.send ( await readFile ('./public/teamStats.html', "utf8"));
});

app.get("/playoffs", async (req, res) => {
    res.send( await readFile ('./public/playoff.html', "utf8"));
});

app.get("/api/stats", async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT * FROM players');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading data");
    }
});

app.get("/api/teamStats", async (req, res) => {
    try{
        const [rows] = await connection.query("SELECT * FROM teams");
        res.json(rows);
    }catch (err){
        console.error(err);
        res.status(500).send("Error loading data");
    }
});




app.use('/api', playerRoutes);
app.use('/api', teamRoutes);
app.use('/api', generalRoutes);
app.use("/api", newsRoutes);


//Make app available
app.listen(process.env.PORT || 3000, () => {console.log("Running")})