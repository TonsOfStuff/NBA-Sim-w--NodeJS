import { load, allTeams, allPlayers, aGame } from "./main.js";
await load();


const panel = document.getElementById("controlPanel");
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

        const newSimButton = simButton.cloneNode(true);
        const newSimSeriesButton = simSeriesButton.cloneNode(true);
        const newSimPlayoffsButton = simPlayoffsButton.cloneNode(true);
        simButton.replaceWith(newSimButton);
        simSeriesButton.replaceWith(newSimSeriesButton);
        simPlayoffsButton.replaceWith(newSimPlayoffsButton);

        const simHandler = () => {simAPlayOffGame(series[0], series[1], buttons[i].textContent); checkDone(series[0], series[1], newSimButton, simHandler, buttons[i])};
        const simSeriesHandler = () => {simSeries(series[0], series[1], buttons[i].textContent); checkDone(series[0], series[1], newSimSeriesButton, simHandler, buttons[i])};
        
        
        newSimButton.addEventListener("click", simHandler);
        newSimSeriesButton.addEventListener("click", simSeriesHandler);
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

        const newSimButton = simButton.cloneNode(true);
        const newSimSeriesButton = simSeriesButton.cloneNode(true);
        const newSimPlayoffsButton = simPlayoffsButton.cloneNode(true);
        simButton.replaceWith(newSimButton);
        simSeriesButton.replaceWith(newSimSeriesButton);
        simPlayoffsButton.replaceWith(newSimPlayoffsButton);

        const simHandler = () => {simAPlayOffGame(series[0], series[1], button.textContent); checkDone(series[0], series[1], newSimButton, simHandler, button)};
        const simSeriesHandler = () => {simSeries(series[0], series[1], button.textContent); checkDone(series[0], series[1], newSimSeriesButton, simHandler, button)};
        
        newSimButton.addEventListener("click", simHandler);
        newSimSeriesButton.addEventListener("click", simSeriesHandler);
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
        
    }else{
        if (!(buttonSeries.innerHTML.includes(":4") || buttonSeries.innerHTML.includes("4:"))){
            buttonSeries.innerHTML = team1.abr + "(" + team1.confSeed + ")" + " v " + team2.abr + "(" + team2.confSeed + ")<br>" + team1.playOffWinTemp + ":" + team2.playOffWinTemp
        }
        
    }

    
}


//Panel controls
function simAPlayOffGame(team1, team2, panel){
    if (panel.includes("4:") || panel.includes(":4")){
        return;
    }
    if (Math.round(Math.random() * 3) === 1){
        let sub = team1;
        team1 = team2;
        team2 = sub;
    }
    aGame(team1, team2, true);
}

function simSeries(team1, team2, panel){
    if (panel.includes("4:") || panel.includes(":4")){
        return;
    }
    while (team1.playOffWinTemp !== 4 && team2.playOffWinTemp !== 4){
        simAPlayOffGame(team1, team2, panel);
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
}