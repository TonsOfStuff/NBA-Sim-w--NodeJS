const { readFile } = require("fs").promises;

const express = require('express');
const app = express();


app.use(express.static('public'));


app.get("/", async (req, res) => {

    res.send( await readFile('./public/index.html', "utf8") );

})




//Make app available
app.listen(process.env.PORT || 3000, () => {console.log("Running")})