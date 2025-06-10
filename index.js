import { readFile } from "fs/promises";
import { connection } from "./models/db.js";
import playerRoutes from "./routes/playerRoutes.js";

import express from "express";
const app = express();

app.use(express.json({limit: '2mb'}));
app.use(express.static('public'));

app.get("/", async (req, res) => {

    res.send( await readFile('./public/index.html', "utf8") );

})


app.use('/api', playerRoutes);


//Make app available
app.listen(process.env.PORT || 3000, () => {console.log("Running")})