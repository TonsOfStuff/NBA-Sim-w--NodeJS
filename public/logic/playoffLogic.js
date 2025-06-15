import { load, allTeams, allPlayers, aGame } from "./main.js";
await load();


const panel = document.getElementById("controlPanel");
const statsPanel = document.getElementById("statsPanel");
const checkOtherTeam = document.getElementById("checkOtherTeam");
const contButton = document.getElementById("contButton");

const firstRound = document.querySelectorAll("#firstRound");
const secondRound = document.querySelectorAll("#secondRound");
const confFinals = document.querySelectorAll("#confFinals");

const firstRound1Button = firstRound[0].children[0].children[0];
const firstRound2Button = firstRound[0].children[0].children[1];
const firstRound3Button = firstRound[0].children[0].children[2];
const firstRound4Button = firstRound[0].children[0].children[3];
const firstRound5Button = firstRound[1].children[0].children[0];
const firstRound6Button = firstRound[1].children[0].children[1];
const firstRound7Button = firstRound[1].children[0].children[2];
const firstRound8Button = firstRound[1].children[0].children[3];

const secondRound1Button = secondRound[0].children[0].children[0];
const secondRound2Button = secondRound[0].children[0].children[1];
const secondRound3Button = secondRound[1].children[0].children[0];
const secondRound4Button = secondRound[1].children[0].children[1];

const confFinals1Button = confFinals[0].children[0].children[0];
const confFinals2Button = confFinals[1].children[0].children[0];

const finalsButton = document.getElementById("finals");

const buttons = [firstRound1Button, firstRound2Button, firstRound3Button, firstRound4Button, firstRound5Button, firstRound6Button, firstRound7Button, firstRound8Button,
    secondRound1Button, secondRound2Button, secondRound3Button, secondRound4Button, confFinals1Button, confFinals2Button, finalsButton
]

let east = [];
let west = [];

allTeams.forEach(team => {
    if (team.inEast === true || team.inEast === 1){
        east.push(team);
    }else{
        west.push(team);
    }
});

east.sort((a,b) => a.confSeed - b.confSeed)
west.sort((a,b) => a.confSeed - b.confSeed)


const series1 = [east[0], east[7]];
const series2 = [east[1], east[6]];
const series3 = [east[2], east[5]];
const series4 = [east[3], east[4]];

const series5 = [west[0], west[7]];
const series6 = [west[1], west[6]];
const series7 = [west[2], west[5]];
const series8 = [west[3], west[4]];

const series9 = []
const series10 = []
const series11 = []
const series12 = []

const series13 = []
const series14 = []

const series15 = []
let finalsWinner = null;


firstRound1Button.innerHTML = series1[0].abr + "(" + series1[0].confSeed + ")" + " v " + series1[1].abr + "(" + series1[1].confSeed + ")<br>" + series1[0].playOffWinTemp + ":" + series1[1].playOffWinTemp
firstRound4Button.innerHTML = series2[0].abr + "(" + series2[0].confSeed + ")" + " v " + series2[1].abr + "(" + series2[1].confSeed + ")<br>" + series2[0].playOffWinTemp + ":" + series2[1].playOffWinTemp
firstRound3Button.innerHTML = series3[0].abr + "(" + series3[0].confSeed + ")" + " v " + series3[1].abr + "(" + series3[1].confSeed + ")<br>" + series3[0].playOffWinTemp + ":" + series3[1].playOffWinTemp
firstRound2Button.innerHTML = series4[0].abr + "(" + series4[0].confSeed + ")" + " v " + series4[1].abr + "(" + series4[1].confSeed + ")<br>" + series4[0].playOffWinTemp + ":" + series4[1].playOffWinTemp

firstRound5Button.innerHTML = series5[0].abr + "(" + series5[0].confSeed + ")" + " v " + series5[1].abr + "(" + series5[1].confSeed + ")<br>" + series5[0].playOffWinTemp + ":" + series5[1].playOffWinTemp
firstRound8Button.innerHTML = series6[0].abr + "(" + series6[0].confSeed + ")" + " v " + series6[1].abr + "(" + series6[1].confSeed + ")<br>" + series6[0].playOffWinTemp + ":" + series6[1].playOffWinTemp
firstRound7Button.innerHTML = series7[0].abr + "(" + series7[0].confSeed + ")" + " v " + series7[1].abr + "(" + series7[1].confSeed + ")<br>" + series7[0].playOffWinTemp + ":" + series7[1].playOffWinTemp
firstRound6Button.innerHTML = series8[0].abr + "(" + series8[0].confSeed + ")" + " v " + series8[1].abr + "(" + series8[1].confSeed + ")<br>" + series8[0].playOffWinTemp + ":" + series8[1].playOffWinTemp


const seriesList = [series1, series4, series3, series2, series5, series8, series7, series6];
for (let i = 0; i < 8; i++) {
    const series = seriesList[i];
    buttons[i].addEventListener("click", () => {
        panel.style.display = "grid";
        panel.children[0].textContent = buttons[i].textContent;

        const simButton = panel.children[1].children[0];
        const simSeriesButton = panel.children[1].children[1];
        const simPlayoffsButton = panel.children[1].children[2];
        const viewStats = panel.children[1].children[3];

        const newSimButton = simButton.cloneNode(true);
        const newSimSeriesButton = simSeriesButton.cloneNode(true);
        const newSimPlayoffsButton = simPlayoffsButton.cloneNode(true);
        const newViewStats = viewStats.cloneNode(true);
        simButton.replaceWith(newSimButton);
        simSeriesButton.replaceWith(newSimSeriesButton);
        simPlayoffsButton.replaceWith(newSimPlayoffsButton);
        viewStats.replaceWith(newViewStats);

        const simHandler = () => {simAPlayOffGame(series[0], series[1], buttons[i].textContent, 1); checkDone(series[0], series[1], newSimButton, simHandler, buttons[i])};
        const simSeriesHandler = () => {simSeries(series[0], series[1], buttons[i].textContent, 1); checkDone(series[0], series[1], newSimSeriesButton, simHandler, buttons[i])};
        const viewStatsHandler = () => {openStatsMenu(series[0], series[1], 1)}
        
        newSimButton.addEventListener("click", simHandler);
        newSimSeriesButton.addEventListener("click", simSeriesHandler);
        newViewStats.addEventListener("click", viewStatsHandler);
        const simPlayoffsHandler = () => {simPlayoffs(); };
        newSimPlayoffsButton.addEventListener("click", simPlayoffsHandler)
    });
}

function addButtonFunc(series, button){
    button.addEventListener("click", () => {
        panel.style.display = "grid";
        panel.children[0].textContent = button.textContent;

        const simButton = panel.children[1].children[0];
        const simSeriesButton = panel.children[1].children[1];
        const simPlayoffsButton = panel.children[1].children[2];
        const viewStats = panel.children[1].children[3];

        const newSimButton = simButton.cloneNode(true);
        const newSimSeriesButton = simSeriesButton.cloneNode(true);
        const newSimPlayoffsButton = simPlayoffsButton.cloneNode(true);
        const newViewStats = viewStats.cloneNode(true);
        simButton.replaceWith(newSimButton);
        simSeriesButton.replaceWith(newSimSeriesButton);
        simPlayoffsButton.replaceWith(newSimPlayoffsButton);
        viewStats.replaceWith(newViewStats);

        let seriesNum = 1
        if (series === series9 || series === series10 || series === series11 || series === 12){
            seriesNum = 2
        }else if(series === series13 || series === series14){
            seriesNum = 3
        }else{
            seriesNum = 4
        }

        const simHandler = () => {simAPlayOffGame(series[0], series[1], button.textContent, seriesNum); checkDone(series[0], series[1], newSimButton, simHandler, button)};
        const simSeriesHandler = () => {simSeries(series[0], series[1], button.textContent, seriesNum); checkDone(series[0], series[1], newSimSeriesButton, simHandler, button)};
        const viewStatsHandler = () => {openStatsMenu(series[0], series[1], seriesNum)}

        newSimButton.addEventListener("click", simHandler);
        newSimSeriesButton.addEventListener("click", simSeriesHandler);
        newViewStats.addEventListener("click", viewStatsHandler);
        const simPlayoffsHandler = () => {simPlayoffs(); };
        newSimPlayoffsButton.addEventListener("click", simPlayoffsHandler)
    });
}

function checkDone(team1, team2, simButton, newHandler, buttonSeries){
    if (team1.playOffWinTemp === 4 || team2.playOffWinTemp === 4){
        buttonSeries.innerHTML = team1.abr + "(" + team1.confSeed + ")" + " v " + team2.abr + "(" + team2.confSeed + ")<br>" + team1.playOffWinTemp + ":" + team2.playOffWinTemp
        let winTeam = null;
        if (team1.playOffWinTemp === 4){
            winTeam = team1;
            team1.playOffWinTemp = 0;
        }else if (team2.playOffWinTemp === 4){
            winTeam = team2;
            team2.playOffWinTemp = 0;
        }
        simButton.removeEventListener("click", newHandler)

        if (buttonSeries === buttons[0] || buttonSeries === buttons[1]){
            if (!buttons[8].textContent.includes("(")){
                buttons[8].innerHTML = winTeam.abr + "(" + winTeam.confSeed + ")"
                series9.push(winTeam);
            }else{
                buttons[8].innerHTML += " v " + winTeam.abr + "(" + winTeam.confSeed + ")<br> 0:0"
                series9.push(winTeam);
                addButtonFunc(series9, buttons[8]);
            }
        }
        else if (buttonSeries === buttons[2] || buttonSeries === buttons[3]){
            if (!buttons[9].textContent.includes("(")){
                buttons[9].innerHTML = winTeam.abr + "(" + winTeam.confSeed + ")"
                series10.push(winTeam);
            }else{
                buttons[9].innerHTML += " v " + winTeam.abr + "(" + winTeam.confSeed + ")<br> 0:0"
                series10.push(winTeam);
                addButtonFunc(series10, buttons[9]);
            }
        }
        else if (buttonSeries === buttons[4] || buttonSeries === buttons[5]){
            if (!buttons[10].textContent.includes("(")){
                buttons[10].innerHTML = winTeam.abr + "(" + winTeam.confSeed + ")"
                series11.push(winTeam);
            }else{
                buttons[10].innerHTML += " v " + winTeam.abr + "(" + winTeam.confSeed + ")<br> 0:0"
                series11.push(winTeam);
                addButtonFunc(series11, buttons[10]);
            }
        }
        else if (buttonSeries === buttons[6] || buttonSeries === buttons[7]){
            if (!buttons[11].textContent.includes("(")){
                buttons[11].innerHTML = winTeam.abr + "(" + winTeam.confSeed + ")"
                series12.push(winTeam);
            }else{
                buttons[11].innerHTML += " v " + winTeam.abr + "(" + winTeam.confSeed + ")<br> 0:0"
                series12.push(winTeam);
                addButtonFunc(series12, buttons[11]);
            }
        }
        else if (buttonSeries === buttons[8] || buttonSeries === buttons[9]){
            if (!buttons[12].textContent.includes("(")){
                buttons[12].innerHTML = winTeam.abr + "(" + winTeam.confSeed + ")"
                series13.push(winTeam);
            }else{
                buttons[12].innerHTML += " v " + winTeam.abr + "(" + winTeam.confSeed + ")<br> 0:0"
                series13.push(winTeam);
                addButtonFunc(series13, buttons[12]);
            }
        }
        else if (buttonSeries === buttons[10] || buttonSeries === buttons[11]){
            if (!buttons[13].textContent.includes("(")){
                buttons[13].innerHTML = winTeam.abr + "(" + winTeam.confSeed + ")"
                series14.push(winTeam);
            }else{
                buttons[13].innerHTML += " v " + winTeam.abr + "(" + winTeam.confSeed + ")<br> 0:0"
                series14.push(winTeam);
                addButtonFunc(series14, buttons[13]);
            }
        }
        else if (buttonSeries === buttons[12] || buttonSeries === buttons[13]){
            if (!buttons[14].textContent.includes("(")){
                buttons[14].innerHTML = winTeam.abr + "(" + winTeam.confSeed + ")"
                series15.push(winTeam);
            }else{
                buttons[14].innerHTML += " v " + winTeam.abr + "(" + winTeam.confSeed + ")<br> 0:0"
                series15.push(winTeam);
                addButtonFunc(series15, buttons[14]);
            }
        }
        else{
            finalsWinner = winTeam;
            contButton.style.display = "block";
        }
        
    }else{
        if (!(buttonSeries.innerHTML.includes(":4") || buttonSeries.innerHTML.includes("4:"))){
            buttonSeries.innerHTML = team1.abr + "(" + team1.confSeed + ")" + " v " + team2.abr + "(" + team2.confSeed + ")<br>" + team1.playOffWinTemp + ":" + team2.playOffWinTemp
        }
        
    }

    
}


//Panel controls
let checkerTeam = null;
function openStatsMenu(team1, team2, series){
    panel.style.display = "none";
    statsPanel.style.display = "block";

    checkOtherTeam.onclick = () => openStatsMenu(team1, team2, series);

    while (statsPanel.children[1].children[1].firstChild){
        statsPanel.children[1].children[1].removeChild(statsPanel.children[1].children[1].firstChild);
    }
    if (checkerTeam === team2){
        statsPanel.children[0].innerText = team1.name;
        if (series === 1) team1.players.sort((a,b) => b.avgP1Pts - a.avgP1Pts)
        if (series === 2) team1.players.sort((a,b) => b.avgP2Pts - a.avgP2Pts)
        if (series === 3) team1.players.sort((a,b) => b.avgP3Pts - a.avgP3Pts)
        if (series === 4) team1.players.sort((a,b) => b.avgP4Pts - a.avgP4Pts)
        team1.players.forEach(player => {
            const row = document.createElement("tr");
            
            const name = document.createElement("td");
            const avgMin = document.createElement("td");
            const avgPts = document.createElement('td');
            const avgReb = document.createElement('td');
            const avgDReb = document.createElement('td');
            const avgOReb = document.createElement('td');
            const avgAst = document.createElement("td");
            const avgBlk = document.createElement('td');
            const avgStl = document.createElement('td');
            const avgFls = document.createElement('td');
            const avgTov = document.createElement('td');
            const fgp = document.createElement('td');
            const tpp = document.createElement('td');
            const ftp = document.createElement('td');

            name.innerText = player.name;
            if (series === 1){
                avgMin.innerText = player.avgP1Min;
                avgPts.innerText = player.avgP1Pts;
                avgReb.innerText = Number((player.avgP1OReb + player.avgP1DReb).toFixed(1));
                avgDReb.innerText = player.avgP1DReb;
                avgOReb.innerText = player.avgP1OReb;
                avgAst.innerText = player.avgP1Ast;
                avgStl.innerText = player.avgP1Stl;
                avgBlk.innerText = player.avgP1Blk;
                avgFls.innerText = player.avgP1Fls;
                avgTov.innerText = player.avgP1Tov;
                fgp.innerText = player.fgpP1;
                tpp.innerText = player.tppP1;
                ftp.innerText = player.ftpP1;
            }else if (series === 2){
                avgMin.innerText = player.avgP2Min;
                avgPts.innerText = player.avgP2Pts;
                avgReb.innerText = Number((player.avgP2OReb + player.avgP2DReb).toFixed(1));
                avgDReb.innerText = player.avgP2DReb;
                avgOReb.innerText = player.avgP2OReb;
                avgAst.innerText = player.avgP2Ast;
                avgStl.innerText = player.avgP2Stl;
                avgBlk.innerText = player.avgP2Blk;
                avgFls.innerText = player.avgP2Fls;
                avgTov.innerText = player.avgP2Tov;
                fgp.innerText = player.fgpP2;
                tpp.innerText = player.tppP2;
                ftp.innerText = player.ftpP2;
            }else if (series === 3){
                avgMin.innerText = player.avgP3Min;
                avgPts.innerText = player.avgP3Pts;
                avgReb.innerText = Number((player.avgP3OReb + player.avgP3DReb).toFixed(1));
                avgDReb.innerText = player.avgP3DReb;
                avgOReb.innerText = player.avgP3OReb;
                avgAst.innerText = player.avgP3Ast;
                avgStl.innerText = player.avgP3Stl;
                avgBlk.innerText = player.avgP3Blk;
                avgFls.innerText = player.avgP3Fls;
                avgTov.innerText = player.avgP3Tov;
                fgp.innerText = player.fgpP3;
                tpp.innerText = player.tppP3;
                ftp.innerText = player.ftpP3;
            }else if (series === 4){
                avgMin.innerText = player.avgP4Min;
                avgPts.innerText = player.avgP4Pts;
                avgReb.innerText = Number((player.avgP4OReb + player.avgP4DReb).toFixed(1));
                avgDReb.innerText = player.avgP4DReb;
                avgOReb.innerText = player.avgP4OReb;
                avgAst.innerText = player.avgP4Ast;
                avgStl.innerText = player.avgP4Stl;
                avgBlk.innerText = player.avgP4Blk;
                avgFls.innerText = player.avgP4Fls;
                avgTov.innerText = player.avgP4Tov;
                fgp.innerText = player.fgpP4;
                tpp.innerText = player.tppP4;
                ftp.innerText = player.ftpP4;
            }
            

            row.appendChild(name);
            row.appendChild(avgMin);
            row.appendChild(avgPts);
            row.appendChild(avgReb);
            row.appendChild(avgDReb);
            row.appendChild(avgOReb);
            row.appendChild(avgAst);
            row.appendChild(avgStl);
            row.appendChild(avgBlk);
            row.appendChild(avgFls);
            row.appendChild(avgTov);
            row.appendChild(fgp);
            row.appendChild(tpp);
            row.appendChild(ftp);
            

            statsPanel.children[1].children[1].appendChild(row);
        });
        checkerTeam = team1;
    }else{
        statsPanel.children[0].innerText = team2.name;
        if (series === 1) team2.players.sort((a,b) => b.avgP1Pts - a.avgP1Pts)
        if (series === 2) team2.players.sort((a,b) => b.avgP2Pts - a.avgP2Pts)
        if (series === 3) team2.players.sort((a,b) => b.avgP3Pts - a.avgP3Pts)
        if (series === 4) team2.players.sort((a,b) => b.avgP4Pts - a.avgP4Pts)
        team2.players.forEach(player => {
            const row = document.createElement("tr");
            const name = document.createElement("td");
            const avgMin = document.createElement("td");
            const avgPts = document.createElement('td');
            const avgReb = document.createElement('td');
            const avgDReb = document.createElement('td');
            const avgOReb = document.createElement('td');
            const avgAst = document.createElement("td");
            const avgBlk = document.createElement('td');
            const avgStl = document.createElement('td');
            const avgFls = document.createElement('td');
            const avgTov = document.createElement('td');
            const fgp = document.createElement('td');
            const tpp = document.createElement('td');
            const ftp = document.createElement('td');

            name.innerText = player.name;
            if (series === 1){
                avgMin.innerText = player.avgP1Min;
                avgPts.innerText = player.avgP1Pts;
                avgReb.innerText = Number((player.avgP1OReb + player.avgP1DReb).toFixed(1));
                avgDReb.innerText = player.avgP1DReb;
                avgOReb.innerText = player.avgP1OReb;
                avgAst.innerText = player.avgP1Ast;
                avgStl.innerText = player.avgP1Stl;
                avgBlk.innerText = player.avgP1Blk;
                avgFls.innerText = player.avgP1Fls;
                avgTov.innerText = player.avgP1Tov;
                fgp.innerText = player.fgpP1;
                tpp.innerText = player.tppP1;
                ftp.innerText = player.ftpP1;
            }else if (series === 2){
                avgMin.innerText = player.avgP2Min;
                avgPts.innerText = player.avgP2Pts;
                avgReb.innerText = Number((player.avgP2OReb + player.avgP2DReb).toFixed(1));
                avgDReb.innerText = player.avgP2DReb;
                avgOReb.innerText = player.avgP2OReb;
                avgAst.innerText = player.avgP2Ast;
                avgStl.innerText = player.avgP2Stl;
                avgBlk.innerText = player.avgP2Blk;
                avgFls.innerText = player.avgP2Fls;
                avgTov.innerText = player.avgP2Tov;
                fgp.innerText = player.fgpP2;
                tpp.innerText = player.tppP2;
                ftp.innerText = player.ftpP2;
            }else if (series === 3){
                avgMin.innerText = player.avgP3Min;
                avgPts.innerText = player.avgP3Pts;
                avgReb.innerText = Number((player.avgP3OReb + player.avgP3DReb).toFixed(1));
                avgDReb.innerText = player.avgP3DReb;
                avgOReb.innerText = player.avgP3OReb;
                avgAst.innerText = player.avgP3Ast;
                avgStl.innerText = player.avgP3Stl;
                avgBlk.innerText = player.avgP3Blk;
                avgFls.innerText = player.avgP3Fls;
                avgTov.innerText = player.avgP3Tov;
                fgp.innerText = player.fgpP3;
                tpp.innerText = player.tppP3;
                ftp.innerText = player.ftpP3;
            }else if (series === 4){
                avgMin.innerText = player.avgP4Min;
                avgPts.innerText = player.avgP4Pts;
                avgReb.innerText = Number((player.avgP4OReb + player.avgP4DReb).toFixed(1));
                avgDReb.innerText = player.avgP4DReb;
                avgOReb.innerText = player.avgP4OReb;
                avgAst.innerText = player.avgP4Ast;
                avgStl.innerText = player.avgP4Stl;
                avgBlk.innerText = player.avgP4Blk;
                avgFls.innerText = player.avgP4Fls;
                avgTov.innerText = player.avgP4Tov;
                fgp.innerText = player.fgpP4;
                tpp.innerText = player.tppP4;
                ftp.innerText = player.ftpP4;
            }
            

            row.appendChild(name);
            row.appendChild(avgMin);
            row.appendChild(avgPts);
            row.appendChild(avgReb);
            row.appendChild(avgDReb);
            row.appendChild(avgOReb);
            row.appendChild(avgAst);
            row.appendChild(avgStl);
            row.appendChild(avgBlk);
            row.appendChild(avgFls);
            row.appendChild(avgTov);
            row.appendChild(fgp);
            row.appendChild(tpp);
            row.appendChild(ftp);
            

            statsPanel.children[1].children[1].appendChild(row);
        });
        checkerTeam = team2;
    }
    
}


function simAPlayOffGame(team1, team2, panel, series){
    if (panel.includes("4:") || panel.includes(":4")){
        return;
    }
    if (Math.round(Math.random() * 3) === 1){
        let sub = team1;
        team1 = team2;
        team2 = sub;
    }
    aGame(team1, team2, true, series);
}

function simSeries(team1, team2, panel, series){
    if (panel.includes("4:") || panel.includes(":4")){
        return;
    }
    while (team1.playOffWinTemp !== 4 && team2.playOffWinTemp !== 4){
        simAPlayOffGame(team1, team2, panel, series);
    }
}

function simPlayoffs(){
    for (let i = 0; i < 14; i++){
        buttons[i].click();
        panel.children[1].children[1].click()
    }
    
}

window.closePanel = function(){
    panel.style.display = "none";
    statsPanel.style.display = "none";
    
}

window.offSeason = function(){
    endSeason();
}

function endSeason(){
    finalsWinner.players.forEach(player => {
        player.calcFinalsMVP();
    });

    finalsWinner.players.sort((a,b) => b.finalsMVPNum - a.finalsMVPNum);
    finalsWinner.players[0].finalsMVP += 1;

    console.log(finalsWinner.players[0].name);
}