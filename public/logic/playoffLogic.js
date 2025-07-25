import { load, save, allTeams, allPlayers, aGame, genPlayer, setYear, year, setDay, freeAgency, setAllStarSimmed, addLeagueHistory } from "./main.js";
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

let news = [];

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

for (let i = 0; i < 8; i++){
    east[i].playOffAppearances += 1;
}
for (let i = 0; i < 8; i++){
    west[i].playOffAppearances += 1;
}

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
        statsPanel.style.display = "none";
        panel.style.display = "grid";
        //panel.children[0].textContent = buttons[i].textContent;
        panel.children[0].children[0].children[0].src = `../images/${series[0].abr}.svg`;
        panel.children[0].children[0].children[1].innerText = series[0].name + " (" + series[0].confSeed + ")";
        panel.children[0].children[1].innerText = buttons[i].innerText[16]
        panel.children[0].children[2].innerText = "vs."
        panel.children[0].children[4].children[0].src = `../images/${series[1].abr}.svg`;
        panel.children[0].children[4].children[1].innerText = series[1].name + " (" + series[1].confSeed + ")";;
        panel.children[0].children[5].innerText = buttons[i].innerText[18]

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
        statsPanel.style.display = "none";
        panel.style.display = "grid";
        panel.children[0].children[0].children[0].src = `../images/${series[0].abr}.svg`;
        panel.children[0].children[0].children[1].innerText = series[0].name + " (" + series[0].confSeed + ")";;
        panel.children[0].children[1].innerText = button.innerText[16];
        panel.children[0].children[2].innerText = "vs."
        panel.children[0].children[4].children[0].src = `../images/${series[1].abr}.svg`;
        panel.children[0].children[4].children[1].innerText = series[1].name + " (" + series[1].confSeed + ")";;
        panel.children[0].children[5].innerText = button.innerText[18];

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
        panel.children[0].children[0].children[0].src = `../images/${team1.abr}.svg`;
        panel.children[0].children[0].children[1].innerText = team1.name + "(" + team1.confSeed + ")";
        panel.children[0].children[1].innerText = team1.playOffWinTemp;
        panel.children[0].children[2].innerText = "vs."
        panel.children[0].children[4].children[0].src = `../images/${team2.abr}.svg`;
        panel.children[0].children[4].children[1].innerText = team2.name + "(" + team2.confSeed + ")";
        panel.children[0].children[5].innerText = team2.playOffWinTemp;

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
                winTeam.finalsAppearances += 1;
                series15.push(winTeam);
            }else{
                buttons[14].innerHTML += " v " + winTeam.abr + "(" + winTeam.confSeed + ")<br> 0:0"
                series15.push(winTeam);
                winTeam.finalsAppearances += 1;
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
            panel.children[0].children[0].children[0].src = `../images/${team1.abr}.svg`;
            panel.children[0].children[0].children[1].innerText = team1.name + "(" + team1.confSeed + ")";
            panel.children[0].children[1].innerText = team1.playOffWinTemp;
            panel.children[0].children[2].innerText = "vs."
            panel.children[0].children[4].children[0].src = `../images/${team2.abr}.svg`;
            panel.children[0].children[4].children[1].innerText = team2.name + "(" + team2.confSeed + ")";
            panel.children[0].children[5].innerText = team2.playOffWinTemp;
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
    panel.style.display = "none";
}

window.closePanel = function(){
    panel.style.display = "none";
    statsPanel.style.display = "none";
    
}

window.offSeason = function(){
    endSeason();
}

function endSeason(){
    finalsWinner.championships += 1;

    finalsWinner.players.forEach(player => {
        player.calcFinalsMVP();
        player.championships += 1;
    });

    finalsWinner.players.sort((a,b) => b.finalsMVPNum - a.finalsMVPNum);
    finalsWinner.players[0].finalsMVP += 1;

    addLeagueHistory(finalsWinner.abr, "Finals Winner", year);
    addLeagueHistory(finalsWinner.wins, "Finals Winner Wins", year);
    addLeagueHistory(finalsWinner.losses, "Finals Winner Losses", year);
    addLeagueHistory(finalsWinner.players[0].name, "FMVP", year);

    const playOffPanel = document.getElementById("playOffPanel");
    const displayGame = document.getElementById("displayGame");
    while (playOffPanel.firstChild){
        playOffPanel.removeChild(playOffPanel.firstChild);
    }
    while (displayGame.firstChild){
        displayGame.removeChild(displayGame.firstChild);
    }

    const displayFinalsMVP = document.createElement("div");
    displayFinalsMVP.innerText = finalsWinner.players[0].name + "|Min:" + finalsWinner.players[0].avgP4Min + "|Pts:" + finalsWinner.players[0].avgP4Pts + "|Reb:" + Number((finalsWinner.players[0].avgP4OReb + finalsWinner.players[0].avgP4DReb).toFixed(1)) + "|DReb:" + finalsWinner.players[0].avgP4DReb + "|OReb:" + finalsWinner.players[0].avgP4OReb + "|Ast:" + finalsWinner.players[0].avgP4Ast + "|Stl:" + finalsWinner.players[0].avgP4Stl + "|Blk:" + finalsWinner.players[0].avgP4Blk + "|Fls:" + finalsWinner.players[0].avgP4Fls + "|Tov:" + finalsWinner.players[0].avgP4Tov + "|FG%:" + finalsWinner.players[0].fgpP4 + "|3P%:" + finalsWinner.players[0].tppP4 + "|FT%:" + finalsWinner.players[0].ftpP4;
    playOffPanel.appendChild(displayFinalsMVP);
    playOffPanel.style.display = "block";

    //Reset news
    news = [];
    let retired = [];
    allPlayers.forEach(player => {
        if (player.teamName !== "FA" && player.teamName !== "HOF"){
            player.determineHappiness();
        }
        player.resetSeason();
        if (player.teamName !== "HOF"){
            const retirement = player.retire();
            if (retirement === true){
                if (player.hallOfFame()){
                    player.teamName = "HOF";
                    if (player.team !== null){
                        player.team.players.splice(player.team.players.splice(player), 1);
                        player.team.money += player.money;
                    }
                    news.push(player.name + " made the HOF");
                }else{
                    retired.push(player);
                    news.push(player.name + " has retired");
                    if (player.team !== null){
                        player.team.players.splice(player.team.players.indexOf(player), 1);
                        player.team.money += player.money;
                    }
                    if (player.teamName === "FA"){
                        freeAgency.splice(freeAgency.indexOf(player), 1);
                    }
                }
            }
        }
    });
    const leftover = allPlayers.filter(player => !retired.includes(player));
    allPlayers.length = 0;
    allPlayers.push(...leftover);

    allTeams.forEach(team => {
        const releaseNews = team.releasePlayer();
        if (releaseNews !== null){
            releaseNews[0].yearsIntoContract = 0;
            freeAgency.push(releaseNews[0]);
            news.push(releaseNews[1]);
        }
        team.resetSeason();
    });

    const contButton = document.getElementById("contButton");
    contButton.onclick = () => offSeasonUI();
}

function offSeasonUI(){
    

    const playOffPanel = document.getElementById("playOffPanel");
    while (playOffPanel.firstChild){
        playOffPanel.removeChild(playOffPanel.firstChild);
    }
    let rookieClass = genPlayer(60);
    rookieClass.forEach(element => {
        element.calcOvr();
    });
    rookieClass.sort((a,b) => (b.ovr + b.potential) - (a.ovr + a.potential))

    const draftOrder = allTeams.slice().sort((a, b) => b.oldSeed - a.oldSeed);
    const lotteryTeams = draftOrder.slice(0, 14);
    const draftWeights = [14, 10, 9, 8.5, 7, 6, 5.5, 5, 4.5, 4, 3.5, 3, 2.5, 2];
    let weightedTeams = lotteryTeams.map((team, i) => ({
        team: team,
        weight: draftWeights[i]
    }));
    let randomizedDraftOrder = [];

    while (weightedTeams.length > 0) {
        const totalWeight = weightedTeams.reduce((sum, obj) => sum + obj.weight, 0);
        let rand = Math.random() * totalWeight;
        let running = 0;

        for (let i = 0; i < weightedTeams.length; i++) {
            running += weightedTeams[i].weight;
            if (rand < running) {
                randomizedDraftOrder.push(weightedTeams[i].team);
                weightedTeams.splice(i, 1);
                break;
            }
        }
    }
    const remainingTeams = draftOrder.slice(14); 
    const finalDraftOrder = randomizedDraftOrder.concat(remainingTeams);

    const roundsUI = document.createElement("div");
    roundsUI.style.display = "grid";
    roundsUI.style.gridTemplateColumns = "1fr 1fr";
    const round1 = document.createElement("div");
    const round2 = document.createElement("div");
    round1.innerText = "Round 1:"
    round2.innerText = "Round 2:"
    roundsUI.appendChild(round1);
    roundsUI.appendChild(round2);
    let pick = 0;
    for (let i = 0; i<finalDraftOrder.length * 2; i++){
        let fromAnother = false;
        if (pick >= finalDraftOrder.length){
            pick = 0;
        }
        let picker = finalDraftOrder[pick]
        picker.draftPicks = picker.draftPicks.filter(p => {
            if (p.year === year && ((p.round === 1 && i < 29) || (p.round === 2 && i > 29))) {
                const found = allTeams.find(team => team.abr === p.team);
                if (found) {
                    fromAnother = true;
                    picker = found;
                }
                return false;
            }
            return true;
        });

        const draftUI = document.createElement("div");
        draftUI.style.display = "flex";
        const pickNum = document.createElement("div");
        const teamName = document.createElement("div");
        const nameElement = document.createElement("div");
        const statsEl = document.createElement("div");
        pickNum.style.width = "30px";
        teamName.style.width = "100px";
        nameElement.style.width = "200px";
        pickNum.innerText = (i+1) + ") ";
        teamName.innerText = fromAnother ? picker.abr + "(" + finalDraftOrder[pick].abr + ")" : picker.abr;
        nameElement.innerText = rookieClass[i].name;
        statsEl.innerText = "Ovr: " + rookieClass[i].ovr + "  Pot: " + rookieClass[i].potential;

        rookieClass[i].pickNum = (i + 1);
        rookieClass[i].pickTeam = picker.abr;
        
        
        draftUI.appendChild(pickNum);
        draftUI.appendChild(teamName)
        draftUI.appendChild(nameElement)
        draftUI.appendChild(statsEl);
        if (i >= finalDraftOrder.length){
            round2.appendChild(draftUI);
        }else{
            round1.appendChild(draftUI);
        }

        //Actual drafting into team if money and roster space allow
        let offeredMoney = 1000000;
        if (picker.money > offeredMoney && picker.players.length < 15){
            rookieClass[i].signRookieContract(offeredMoney, Math.round(Math.random() * 4) + 1);
            rookieClass[i].team = picker;
            rookieClass[i].teamName = picker.abr;

            picker.players.push(rookieClass[i]);
            picker.money -= offeredMoney;
            allPlayers.push(rookieClass[i])

            if (fromAnother === false){
                news.push(picker.abr + " drafts " + rookieClass[i].name + " at " + (i + 1).toString());
            }else{
                news.push(picker.abr + "(" + finalDraftOrder[pick].abr +")" + " drafts " + rookieClass[i].name + " at " + (i + 1).toString());
            }
        }else{
            rookieClass[i].teamName = "FA";
            allPlayers.push(rookieClass[i]);
            freeAgency.push(rookieClass[i]);

            rookieClass[i].yearsIntoContract = 0;
        }

        pick+=1;
    }
    
    playOffPanel.appendChild(roundsUI);

    allPlayers.forEach(player => {
        if (player.teamName !== "FA" & player.teamName !== "HOF"){
            if (player.yearsIntoContract >= player.contractYears){
                player.yearsIntoContract = 0;
                freeAgency.push(player);

                player.teamName = "FA"
                player.team.players.splice(player.team.players.indexOf(player), 1);
                player.team.money += player.money;
            }
        }
    });

    freeAgency.sort((a,b) => b.freeAgentValue - a.freeAgentValue);
    let signedPlayers = [];
    freeAgency.forEach(player =>{
        let offers = [];
        allTeams.forEach(team => {
            if (team.money > 0 && team.players.length < 15){
                let offer = {};
                offer["team"] = team;
                let offerMoney = Math.round(Math.pow(player.freeAgentValue, 1.8) * 10000 + Math.random() * (Math.pow(player.freeAgentValue, 1.8) * 1000))
                if (offerMoney < 1000000){
                    offerMoney = 1000000
                }
                if (offerMoney > 30000000){
                    offerMoney -= Math.round(Math.random() * 5000000)
                }
                if (offerMoney > team.money){
                    offerMoney = player.money;
                }
                if (offerMoney > team.money){
                    if (player.freeAgentValue > 80){
                        offerMoney = team.money;
                    }else{
                        return;
                    }
                }
                if (offerMoney < 500000){
                    offerMoney = 500000
                    if (offerMoney > team.money){
                        return;
                    }
                }
                offer["money"] = offerMoney;
                offer["years"] = Math.round(Math.random() * 4) + 1;

                offers.push(offer);
            }
        });

        const playerChoose = player.selectContract(offers);
        if (playerChoose !== null && playerChoose.team.players.length < 15){
            if (player.team !== playerChoose.team){
                news.push(player.name + " agrees to a " + playerChoose.years + " year deal for $" + playerChoose.money + " to " + playerChoose.team.abr);
                player.happiness = 10;
            }else{
                news.push(player.name + " re-signs with " + playerChoose.team.abr + " to a " + playerChoose.years + " year $" + playerChoose.money + " deal" );
            }
            

            player.team = playerChoose.team;
            player.teamName = playerChoose.team.abr;
            player.money = playerChoose.money;
            player.contractYears = playerChoose.years;
            player.yearsInFA = 0;

            playerChoose.team.money -= playerChoose.money;
            playerChoose.team.players.push(player);

            signedPlayers.push(player);

            
        }
    });
    for (let i = freeAgency.length - 1; i >= 0; i--) {
        if (signedPlayers.includes(freeAgency[i])) {
            freeAgency.splice(i, 1);
        }
    }
    
    for (let i = 0; i < allTeams.length; i++){
        let possibles = [...allTeams]
        let chosen1 = possibles[Math.floor(Math.random() * possibles.length)];
        possibles.splice(possibles.indexOf(chosen1), 1);
        let chosen2 = possibles[Math.floor(Math.random() * possibles.length)];

        let trades = tradePlayer(chosen1, chosen2);
        if (trades !== null){
            function getTradeAssetName(asset) {
                if (asset.type === "pick") {
                    return `a year ${asset.year + year} ${asset.round === 1 ? "1st" : "2nd"} Round Pick`;
                } else {
                    return asset.name;
                }
            }

            if (trades !== null) {
                const fromTeam1 = trades[0].map(getTradeAssetName).join(", ");
                const fromTeam2 = trades[1].map(getTradeAssetName).join(", ");
                news.push(`${chosen1.abr} traded ${fromTeam1} to ${chosen2.abr} for ${fromTeam2}`);
            }
        }
    }
    
    allTeams.forEach(team => {
        if (team.players.length < 10){
            let signed = [];
            for (let i = 0; i < freeAgency.length; i++){
                freeAgency[i].team = team;
                freeAgency[i].teamName = team.abr;
                freeAgency[i].money = 100000;
                freeAgency[i].contractYears = 1;
                freeAgency[i].yearsInFA = 0;
                
                team.players.push(freeAgency[i]);
                news.push(team.abr + " signed " + freeAgency[i].name + " to a 1 year $1000000 deal");
                signed.push(freeAgency[i]);

                if (team.players.length >= 10){
                    break;
                }
            }
            for (let i = freeAgency.length - 1; i >= 0; i--) {
                if (signed.includes(freeAgency[i])) {
                    freeAgency.splice(i, 1);
                }
            }
        }
        if (team.players.length < 10){
            const adding = genPlayer(10 - team.players.length);
            adding.forEach(player => {
                allPlayers.push(player);
                team.players.push(player);
                if (team.money > 500000){
                    team.money -= 500000;
                }
                

                player.team = team;
                player.teamName = team.abr;
                player.contractYears = Math.round(Math.random() * 3) + 1
                player.money = 500000;
            });
        }
    });


    allTeams.forEach(team => {
        team.releasePlayer();
        team.changeStart(true);
    });

    const contButton = document.getElementById("contButton");
    contButton.onclick = () => goBackHome();
}


function tradePlayer(team1, team2){
    let team1TradeMenu = null;
    team1.players.sort((a,b) => (b.freeAgentValue - a.freeAgentValue));
    team2.players.sort((a,b) => (b.freeAgentValue - a.freeAgentValue));
    
    //Team 1 chooses 1 player to trade
    for (let i = 0; i < team1.players.length; i++){
        if (i !== 0){
            if (Math.round(Math.random() * 2) === 1){
                team1TradeMenu = team1.players[i];
            }
        }
    }
    if (team1TradeMenu === null){
        return null;
    }
    let team1TotalLength = 1;

    //Team 2 offers their players
    let team2totalLength = 0;
    let team2Trades = [];
    let valSum = 0;
    for (let i = 0; i < team2.players.length; i++){
        let selected = team2.players[Math.floor(Math.random() * team2.players.length)];
        if (Math.round(Math.random() * 3) === 1){
            selected = {year: Math.round(Math.random() * 5) + 1, round: Math.round(Math.random()) + 1, type: "pick", money: 0}
            if (team2Trades.some(item => item.type === "pick" && item.year === selected.year && item.round === selected.round) || team2.draftPicks.some(pick => pick.year === selected.year + year && pick.round === selected.round)) {
                selected = team2.players[Math.floor(Math.random() * team2.players.length)];
            }
        }
        

        if (!team2Trades.includes(selected)){
            team2Trades.push(selected);
            team2totalLength = 0;
            team2Trades.forEach(player => {
                if (player.type === "pick"){
                    if (player.round === 1){
                        valSum += 10 - player.year + 30;
                    }else{
                        valSum += 10 - player.year + 9;
                    }
                }else{
                    valSum += player.freeAgentValue;
                    team2totalLength += 1;
                }
            });
            if (team2totalLength > team2.players.length - 8){
                return null;
            }
            if (valSum > team1TradeMenu.freeAgentValue){
                break;
            }
        }
    }

    //Team 1 now tries to match it
    let team1Trades = [team1TradeMenu];
    let valSumTeam = 0;
    for (let i = 0; i < team1.players.length; i++){
        let selected = team1.players[Math.floor(Math.random() * team1.players.length)];
        if (Math.round(Math.random() * 3) === 1){
            selected = {year: Math.round(Math.random() * 5) + 1, round: Math.round(Math.random()) + 1, type: "pick", money: 0}
            if (team1Trades.some(item => item.type === "pick" && item.year === selected.year && item.round === selected.round) || team1.draftPicks.some(pick => pick.year === selected.year + year && pick.round === selected.round)) {
                selected = team1.players[Math.floor(Math.random() * team1.players.length)];
            }
        }

        if (!team1Trades.includes(selected)){
            team1Trades.push(selected);
            team1TotalLength = 0;
            team1Trades.forEach(player => {
                if (player.type === "pick"){
                    if (player.round === 1){
                        valSumTeam += 10 - player.year + 30;
                    }else{
                        valSumTeam += 10 - player.year + 9;
                    }
                }else{
                    team1TotalLength += 1;
                    valSumTeam += player.freeAgentValue;
                }
            });
            if (team1TotalLength > team1.players.length - 8){
                return null;
            }
            if (Math.abs(valSumTeam - valSum) > 20 || team1TotalLength - team2totalLength + team2.players.length > 15 || team2totalLength - team1TotalLength + team1.players.length > 15){
                return null;
            }
            if (team1Trades.reduce((sum, player) => sum + player.money, 0) - team2Trades.reduce((sum, player) => sum + player.money, 0) > team2.money || team2Trades.reduce((sum, player) => sum + player.money, 0) - team1Trades.reduce((sum, player) => sum + player.money, 0) > team1.money){
                return null;
            }
            if (Math.abs(valSumTeam - valSum) < 20){
                break;
            }
        }
    }

    if (Math.abs(valSumTeam - valSum) > 20){
        return null;
    }
    // Before proceeding with trade
    if (team1.players.length - team1Trades.filter(p => !p.type).length + team2Trades.filter(p => !p.type).length > 15 ||
        team2.players.length - team2Trades.filter(p => !p.type).length + team1Trades.filter(p => !p.type).length > 15) {
        return null;
    }


    //Proceed with trade
    team1Trades.forEach(player => {
        if (player.type === "pick"){
            team1.draftPicks.push({team: team2.abr, year: player.year + year, round: player.round})
            console.log(team2.draftPicks)
        }else{
            player.teamName = team2.abr;
            player.team = team2;

            team2.players.push(player);
            team1.players.splice(team1.players.indexOf(player), 1);

            team2.money -= player.money;
            team1.money += player.money;
        }
    });
    team2Trades.forEach(player => {
        if (player.type === "pick"){
            team2.draftPicks.push({team: team1.abr, year: player.year + year, round: player.round})
            console.log(team1.draftPicks)
        }else{
            player.teamName = team1.abr;
            player.team = team1;

            team1.players.push(player);
            team2.players.splice(team2.players.indexOf(player), 1)

            team1.money -= player.money;
            team2.money += player.money;
        }
    });
    return [team1Trades, team2Trades];
}

async function goBackHome(){
    setYear(1)
    setDay(0);
    setAllStarSimmed(false);
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.textContent = "Saving...";
    loadingScreen.style.display = "flex"; 
    await save(allPlayers, allTeams, news);
    loadingScreen.style.display = "none";

    sessionStorage.setItem("redirect", "finals");
    window.location.href = "/";
}

