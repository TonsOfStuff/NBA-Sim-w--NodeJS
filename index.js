import { connection } from "./models/db.js";
import playerRoutes from "./routes/playerRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import generalRoutes from "./routes/generalRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import compression from "compression";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pub = (file) => path.join(__dirname, "public", file);

const app = express();

app.use(compression());
app.use(express.json({ limit: "50mb" }));
app.use(express.static(pub("")));

app.get("/", (req, res) => res.sendFile(pub("index.html")));
app.get("/stats", (req, res) => res.sendFile(pub("stats.html")));
app.get("/teamStats", (req, res) => res.sendFile(pub("teamStats.html")));
app.get("/playoffs", (req, res) => res.sendFile(pub("playoff.html")));

app.get("/api/stats", async (req, res) => {
    try {
        const [rows] = await connection.query("SELECT * FROM players");
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading data");
    }
});

app.get("/api/teamStats", async (req, res) => {
    try {
        const [rows] = await connection.query("SELECT * FROM teams");
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading data");
    }
});

app.get("/api/leagueHistory", async (req, res) => {
    try {
        const [rows] = await connection.query("SELECT * FROM generals");
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading data");
    }
});

app.use("/api", playerRoutes);
app.use("/api", teamRoutes);
app.use("/api", generalRoutes);
app.use("/api", newsRoutes);

app.listen(process.env.PORT || 3000, "0.0.0.0", () => { console.log("Running"); });