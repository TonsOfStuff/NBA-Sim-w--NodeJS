import { freeAgency, save, allTeams, allPlayers, load } from "./main.js";


document.addEventListener("DOMContentLoaded", async () => {
    await load();
    const table = document.getElementById("teamTable").querySelector("tbody");

    let playerData = allPlayers;
    let done = false;

    let selectedTeam = null;
    
    fetch("/api/teamStats").then(res => res.json()).then(data => {
        //console.log(data[0]);
        const columns = [
            "name", "seed", "confSeed", "wins", "losses", "oldSeed", "oldConfSeed", "oldWins", "oldLosses", "ptsAvg", "rebAvg", "astAvg", "stlAvg", "blkAvg", "fg", "tp", "ft", "totalPossesions", "totalOffensiveRating", "totalDefensiveRating",
            "playOffAppearances", "finalsAppearances", "championships", "money"
        ]

        const teamStats = data.map(team => ({
            name: team.name,
            offRat: team.totalOffensiveRating / team.games,
            defRat: team.totalDefensiveRating / team.games
        }));
        const offRankMap = {};
        [...teamStats].sort((a, b) => b.offRat - a.offRat)
            .forEach((team, i) => offRankMap[team.name] = i + 1);

        const defRankMap = {};
        [...teamStats].sort((a, b) => b.defRat - a.defRat)
            .forEach((team, i) => defRankMap[team.name] = i + 1);

        console.log(offRankMap)

        const search = document.getElementById("searchPlayerBar");
        const field = document.getElementById("listItems");

        search.addEventListener("input", () => {
            const value = search.value.toLowerCase();
            let amount = 0;

            // clear all children before repopulating
            field.innerHTML = "";

            for (let i = 0; i < playerData.length; i++) {
                const player = playerData[i];

                 const team = allTeams.find(t => t.abr === player.teamName);
                if (team) {
                    // count how many players are currently on that team
                    const teamCount = playerData.filter(
                        p => p.teamName === team.abr
                    ).length;

                    // skip if that team only has 8 players
                    if (teamCount <= 8) continue;
                }

                if (player.name.toLowerCase().includes(value) && selectedTeam !== player.teamName) {
                    amount++;
                    if (amount > 5) break;

                    const li = document.createElement("li");
                    li.className = "playerContent"
                    li.textContent = `${player.name} ---------- ${player.teamName}`;

                    li.addEventListener("click", () => {
                        addPlayerToRoster(player);
                    });

                    field.appendChild(li);
                }
            }
        });
        function addPlayerToRoster(player) {
            done = false;
            let count = 0
            playerData.forEach(pe => {
                if (pe.teamName === selectedTeam){
                    count += 1
                }
            });
            if (count >= 15){
                return
            }

            // update player team
            player.teamName = selectedTeam;

            // find full team name from abbreviation
            const team = allTeams.find(t => t.abr === selectedTeam);
            if (!team) return;
            const fullName = team.name;
            console.log(fullName)

            // re-trigger the click event on the selected team row
            for (let row of table.children) {
                if (row.childNodes[0].textContent.toLowerCase() === fullName.toLowerCase()) {
                    row.childNodes[0].click();
                    const teamPanel = document.getElementById("playerPanel");
                    teamPanel.children[1].click();
                    break;
                }
            }

            // clear search field after adding
            const value = search.value.toLowerCase();
            let amount = 0;

            // clear all children before repopulating
            field.innerHTML = "";
            for (let i = 0; i < playerData.length; i++) {
                const player = playerData[i];

                if (player.name.toLowerCase().includes(value) && selectedTeam !== player.teamName) {
                    amount++;
                    if (amount > 5) break;

                    const li = document.createElement("li");
                    li.className = "playerContent"
                    li.textContent = `${player.name} ---------- ${player.teamName}`;

                    li.addEventListener("click", () => {
                        addPlayerToRoster(player);
                    });

                    field.appendChild(li);
                }
            }
        }




        data.forEach(player => {
            const row = document.createElement("tr");

            columns.forEach(column => {
                const cell = document.createElement("td");
                if (column === "seed"){
                    if (player["seed"] > player["oldSeed"]){
                        cell.innerHTML = player[column] + " ⬇️";
                    }else if (player["seed"] < player["oldSeed"]){
                        cell.innerHTML = player[column] + " ⬆️";
                    }else{
                        cell.innerHTML = player[column];
                    }
                }else if (column === "confSeed"){
                    if (player["confSeed"] > player["oldConfSeed"]){
                        cell.innerHTML = player[column] + " ⬇️";
                    }else if (player["confSeed"] < player["oldConfSeed"]){
                        cell.innerHTML = player[column] + " ⬆️";
                    }else{
                        cell.innerHTML = player[column];
                    }
                }else if (column === "wins"){
                    if (player["wins"] > player["oldWins"]){
                        cell.innerHTML = player[column] + " ⬆️";
                    }else if (player["wins"] < player["oldWins"]){
                        cell.innerHTML = player[column] + " ⬇️";
                    }else{
                        cell.innerHTML = player[column];
                    }
                }else if (column === "losses"){
                    if (player["losses"] > player["oldLosses"]){
                        cell.innerHTML = player[column] + " ⬆️";
                    }else if (player["losses"] < player["oldLosses"]){
                        cell.innerHTML = player[column] + " ⬇️";
                    }else{
                        cell.innerHTML = player[column];
                    }
                }else if(column === "name"){
                    cell.style.display = "flex";
                    cell.style.justifyContent = "space-between";
                    cell.innerHTML = player[column]
                    const img = document.createElement("img");
                    img.src = `/images/${player.abr}.svg`
                    img.style.width = "15px";
                    cell.appendChild(img);

                    cell.addEventListener("click", ()=>{
                        selectedTeam = player.abr;
                        const panel = document.getElementById("playerPanel");
                        const body = document.getElementById("teamPlayerTBody");

                        const rosterCount = document.getElementById("rosterCount");

                        const editRoster = document.getElementById("editRoster")
                        const saveRoster = document.getElementById("saveRoster")
                        editRoster.style.display = "block"
                        saveRoster.style.display = "none";

                        while (body.firstChild){
                            body.removeChild(body.firstChild);
                        }
                        

                        panel.style.display = "block";

                        const name = document.getElementById("name");
                        const seed = document.getElementById("seed");
                        const wins = document.getElementById("wins");
                        const losses = document.getElementById("losses");
                        const money = document.getElementById("money");

                        name.placeholder = player.name;
                        seed.innerText = player.seed;
                        wins.innerText = player.wins;
                        losses.innerText = player.losses;
                        money.innerText = player.money;

                        playerData.sort((a,b) => b.avgPts - a.avgPts)
                        let playerInTeam = []

                        playerData.forEach(element => {
                            if (element.teamName === player.abr){
                                playerInTeam.push(element)
                                const rowPlayer = document.createElement("tr");
                                const rowName = document.createElement("td");
                                const rowMPG = document.createElement("td");
                                const rowPPG = document.createElement("td");
                                const rowRPG = document.createElement("td");
                                const rowAPG = document.createElement("td");
                                const rowSPG = document.createElement("td");
                                const rowBPG = document.createElement("td");
                                const rowFG = document.createElement("td");
                                const row3P = document.createElement("td");
                                const rowFT = document.createElement("td");

                                rowName.innerText = element.name;
                                rowMPG.innerText = element.avgMin;
                                rowPPG.innerText = element.avgPts;
                                rowRPG.innerText = Number((element.avgOReb + element.avgDReb).toFixed(1));
                                rowAPG.innerText = element.avgAst;
                                rowSPG.innerText = element.avgStl;
                                rowBPG.innerText = element.avgBlk;
                                rowFG.innerText = element.fgp;
                                row3P.innerText = element.tpp;
                                rowFT.innerText = element.ftp;
                                
                                rowPlayer.appendChild(rowName)
                                rowPlayer.appendChild(rowMPG)
                                rowPlayer.appendChild(rowPPG)
                                rowPlayer.appendChild(rowRPG)
                                rowPlayer.appendChild(rowAPG)
                                rowPlayer.appendChild(rowSPG)
                                rowPlayer.appendChild(rowBPG)
                                rowPlayer.appendChild(rowFG)
                                rowPlayer.appendChild(row3P)
                                rowPlayer.appendChild(rowFT)
                                body.appendChild(rowPlayer);
                            }
                        });

                        rosterCount.innerText = playerInTeam.length + "/15"
                    
                        editRoster.onclick = () => {
                            saveRoster.style.display = "block";
                            editRoster.style.display = "none";

                            if (body.children.length > 8){
                                for (let i = 0; i<body.children.length; i++){
                                    const newTD = document.createElement("button");
                                    newTD.style.minWidth = "24px";
                                    newTD.style.minHeight = "24px";
                                    newTD.style.textAlign = "center";
                                    newTD.style.border = "solid black 1px"
                                    newTD.innerText = "-"

                                    newTD.onclick = () => {removePlayerFromRoster(i)}

                                    body.children[i].appendChild(newTD);
                                }
                            }else{
                                done = true;
                            }
                            if (body.children.length < 15){
                                const addPlayerRow = document.createElement("tr")
                                const addPlayerTD = document.createElement("td")
                                addPlayerTD.innerText = "Add Player"

                                addPlayerTD.onclick = () => {
                                    document.getElementById("searchPlayerPanel").style.display = "block"
                                    
                                }
                                

                                addPlayerRow.appendChild(addPlayerTD);
                                body.appendChild(addPlayerRow);
                            }
                        }


                        function removePlayerFromRoster(row){
                            
                            const chosenPlayer = playerInTeam[row];
                            chosenPlayer.teamName = "FA";
                            freeAgency.push(chosenPlayer);
                            playerInTeam.splice(playerInTeam.indexOf(chosenPlayer), 1);
                            body.removeChild(body.children[row]);

                            rosterCount.innerText = playerInTeam.length + "/15"

                            //Reset all of the buttons to correct rows
                            if (body.childNodes.length > 9){
                                for (let i = 0; i<body.childNodes.length; i++){
                                    body.childNodes[i].childNodes[body.childNodes[i].childNodes.length - 1].onclick = () => {removePlayerFromRoster(i)}
                                };
                            }else{
                                for (let i = 0; i<body.children.length; i++){
                                    if (i === 8){
                                        break;
                                    }
                                   
                                    body.childNodes[i].removeChild(body.childNodes[i].children[body.childNodes[i].childNodes.length - 1])
                                };
                                done = true;
                            }
                            saveAndExit(false)
                            editRoster.click();
                        }

                        

                    })


                }else if (column === "totalPossesions" ){
                    cell.innerHTML = Number((player[column] / player["games"]).toFixed(3))
                }else if (column === "totalDefensiveRating"){
                    cell.innerHTML = Number((player[column] / player["games"]).toFixed(3)) + " Rank: " + defRankMap[player["name"]];
                }else if (column === "totalOffensiveRating"){
                    cell.innerHTML = Number((player[column] / player["games"]).toFixed(3)) + " Rank: " + offRankMap[player["name"]];
                }
                else{
                    cell.innerHTML = player[column]
                }
                            
                row.appendChild(cell);
            });
            

            table.appendChild(row);
        });
    })

    window.saveAndExit = async function(saving = true){
        saveRoster.style.display = "none";
        editRoster.style.display = "block";
    
        const body = document.getElementById("teamPlayerTBody");
        if (done === false){
            for (let i = 0; i<body.childNodes.length; i++){
                body.childNodes[i].removeChild(body.childNodes[i].childNodes[body.childNodes[i].childNodes.length - 1])
            }
        }else{
            body.removeChild(body.childNodes[body.childNodes.length - 1])
        }
        for (let i = 0; i<body.childNodes.length; i++){
            if (body.childNodes[i].children.length === 0){
                body.removeChild(body.childNodes[i]);
            }
        }

        if (saving === true){
            const loadingScreen = document.getElementById('loadingScreen');
            loadingScreen.textContent = "Saving...";
            loadingScreen.style.display = "flex"; 

        
            await save(playerData, allTeams)
            loadingScreen.style.display = "none";
        }
    }

    function sortBasedOnClick(columnIndex) {
        const fullTable = document.getElementById("teamTable");
        const tableBody = fullTable.querySelector("tbody");
        const headerCell = fullTable.querySelector(`thead th:nth-child(${columnIndex + 1})`);
        if (!headerCell) return;

        const headerText = headerCell.textContent.toLowerCase();
        const isSeedColumn = headerText.includes("seed");

        let rows = Array.from(tableBody.querySelectorAll("tr"));
        const selector = `td:nth-child(${columnIndex + 1})`;

        if (!rows.length || !rows[0].querySelector(selector)) return;

        const firstVal = rows[0].querySelector(selector).textContent.trim();
        const isNumeric = !isNaN(parseFloat(firstVal));

        rows.sort((a, b) => {
            let valA = a.querySelector(selector).textContent.trim();
            let valB = b.querySelector(selector).textContent.trim();

            if (isNumeric) {
                const numA = parseFloat(valA);
                const numB = parseFloat(valB);
                return isSeedColumn ? numA - numB : numB - numA;
            } else {
                return valA.localeCompare(valB);
            }
        });

        rows.forEach(row => tableBody.appendChild(row));
    }

    attachColumnClickHighlighting()

    function attachColumnClickHighlighting() {
        const allRows = table.parentElement.querySelectorAll("tr");

        allRows.forEach(row => {
            row.querySelectorAll("td").forEach((cell, colIndex) => {
                cell.addEventListener("click", () => {
                    clearColumnHighlights();

                    allRows.forEach(r => {
                        const cells = r.querySelectorAll("td, th");
                        if (cells[colIndex]) {
                            cells[colIndex].classList.add("highlight");
                        }
                    });
                });
            });
        });

        // Also add click listeners for headers
        const headerCells = table.parentElement.querySelectorAll("thead th");
        headerCells.forEach((th, colIndex) => {
            th.addEventListener("click", () => {
                clearColumnHighlights();

                allRows.forEach(r => {
                    const cells = r.querySelectorAll("td, th");
                    if (cells[colIndex]) {
                        cells[colIndex].classList.add("highlight");
                    }
                });
            });
        });
    }

    function clearColumnHighlights() {
        table.parentElement.querySelectorAll("td.highlight, th.highlight").forEach(cell => {
            cell.classList.remove("highlight");
        });
    }

    window.closePlayerStatPanel = function(){
        const panel = document.getElementById("playerPanel");
        const cardInfo = document.getElementById("cardInfo").childNodes[1]

        selectedTeam = null;
        panel.style.display = "none";
    }

    window.closeSearchBar = function(){
        document.getElementById("searchPlayerPanel").style.display = "none";
    }

    document.querySelectorAll("#teamTable thead th").forEach((th, position) => {
        th.addEventListener(`click`, evt => sortBasedOnClick(position));
    });
});