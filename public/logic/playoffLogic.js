import { load, allTeams, allPlayers, aGame } from "./main.js";
await load();


const panel = document.getElementById("controlPanel");
const firstRound = document.querySelectorAll("#firstRound");

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


firstRound[0].children[0].children[0].innerHTML = series1[0].abr + "(" + series1[0].confSeed + ")" + " v " + series1[1].abr + "(" + series1[1].confSeed + ")<br>" + series1[0].playOffWinTemp + ":" + series1[1].playOffWinTemp
firstRound[0].children[0].children[3].innerHTML = series2[0].abr + "(" + series2[0].confSeed + ")" + " v " + series2[1].abr + "(" + series2[1].confSeed + ")<br>" + series2[0].playOffWinTemp + ":" + series2[1].playOffWinTemp
firstRound[0].children[0].children[2].innerHTML = series3[0].abr + "(" + series3[0].confSeed + ")" + " v " + series3[1].abr + "(" + series3[1].confSeed + ")<br>" + series3[0].playOffWinTemp + ":" + series3[1].playOffWinTemp
firstRound[0].children[0].children[1].innerHTML = series4[0].abr + "(" + series4[0].confSeed + ")" + " v " + series4[1].abr + "(" + series4[1].confSeed + ")<br>" + series4[0].playOffWinTemp + ":" + series4[1].playOffWinTemp

firstRound[1].children[0].children[0].innerHTML = series5[0].abr + "(" + series5[0].confSeed + ")" + " v " + series5[1].abr + "(" + series5[1].confSeed + ")<br>" + series5[0].playOffWinTemp + ":" + series5[1].playOffWinTemp
firstRound[1].children[0].children[3].innerHTML = series6[0].abr + "(" + series6[0].confSeed + ")" + " v " + series6[1].abr + "(" + series6[1].confSeed + ")<br>" + series6[0].playOffWinTemp + ":" + series6[1].playOffWinTemp
firstRound[1].children[0].children[2].innerHTML = series7[0].abr + "(" + series7[0].confSeed + ")" + " v " + series7[1].abr + "(" + series7[1].confSeed + ")<br>" + series7[0].playOffWinTemp + ":" + series7[1].playOffWinTemp
firstRound[1].children[0].children[1].innerHTML = series8[0].abr + "(" + series8[0].confSeed + ")" + " v " + series8[1].abr + "(" + series8[1].confSeed + ")<br>" + series8[0].playOffWinTemp + ":" + series8[1].playOffWinTemp


const seriesList = [series1, series4, series3, series2, series5, series8, series7, series6]; // order matches click targets
const teamIndexOrder = [0, 1, 2, 3, 0, 1, 2, 3]; // which children[0] index corresponds to each

for (let i = 0; i < 8; i++) {
    const roundIndex = i < 4 ? 0 : 1; // 0 = East, 1 = West
    const teamIndex = teamIndexOrder[i];
    const series = seriesList[i];

    firstRound[roundIndex].children[0].children[teamIndex].addEventListener("click", () => {
        panel.style.display = "grid";
        panel.children[0].textContent = firstRound[roundIndex].children[0].children[teamIndex].textContent;

        // Remove existing listener before adding a new one to avoid stacking
        const simButton = panel.children[1].children[0];
        const newHandler = () => simAPlayOffGame(series[0], series[1]);
        simButton.replaceWith(simButton.cloneNode(true));
        panel.children[1].children[0].addEventListener("click", newHandler);
    });
}




//Panel controls
function simAPlayOffGame(team1, team2){
    if (Math.round(Math.random() * 3) === 1){
        let sub = team1;
        team1 = team2;
        team2 = sub;
    }
    aGame(team1, team2, true);

    firstRound[0].children[0].children[0].innerHTML = series1[0].abr + "(" + series1[0].confSeed + ")" + " v " + series1[1].abr + "(" + series1[1].confSeed + ")<br>" + series1[0].playOffWinTemp + ":" + series1[1].playOffWinTemp
    firstRound[0].children[0].children[3].innerHTML = series2[0].abr + "(" + series2[0].confSeed + ")" + " v " + series2[1].abr + "(" + series2[1].confSeed + ")<br>" + series2[0].playOffWinTemp + ":" + series2[1].playOffWinTemp
    firstRound[0].children[0].children[2].innerHTML = series3[0].abr + "(" + series3[0].confSeed + ")" + " v " + series3[1].abr + "(" + series3[1].confSeed + ")<br>" + series3[0].playOffWinTemp + ":" + series3[1].playOffWinTemp
    firstRound[0].children[0].children[1].innerHTML = series4[0].abr + "(" + series4[0].confSeed + ")" + " v " + series4[1].abr + "(" + series4[1].confSeed + ")<br>" + series4[0].playOffWinTemp + ":" + series4[1].playOffWinTemp

    firstRound[1].children[0].children[0].innerHTML = series5[0].abr + "(" + series5[0].confSeed + ")" + " v " + series5[1].abr + "(" + series5[1].confSeed + ")<br>" + series5[0].playOffWinTemp + ":" + series5[1].playOffWinTemp
    firstRound[1].children[0].children[3].innerHTML = series6[0].abr + "(" + series6[0].confSeed + ")" + " v " + series6[1].abr + "(" + series6[1].confSeed + ")<br>" + series6[0].playOffWinTemp + ":" + series6[1].playOffWinTemp
    firstRound[1].children[0].children[2].innerHTML = series7[0].abr + "(" + series7[0].confSeed + ")" + " v " + series7[1].abr + "(" + series7[1].confSeed + ")<br>" + series7[0].playOffWinTemp + ":" + series7[1].playOffWinTemp
    firstRound[1].children[0].children[1].innerHTML = series8[0].abr + "(" + series8[0].confSeed + ")" + " v " + series8[1].abr + "(" + series8[1].confSeed + ")<br>" + series8[0].playOffWinTemp + ":" + series8[1].playOffWinTemp
}


window.closePanel = function(){
    panel.style.display = "none";
}