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


firstRound[0].children[0].children[0].textContent = series1[0].abr + "(" + series1[0].confSeed + ")" + " v " + series1[1].abr + "(" + series1[1].confSeed + ")"
firstRound[0].children[0].children[3].textContent = series2[0].abr + "(" + series2[0].confSeed + ")" + " v " + series2[1].abr + "(" + series2[1].confSeed + ")"
firstRound[0].children[0].children[2].textContent = series3[0].abr + "(" + series3[0].confSeed + ")" + " v " + series3[1].abr + "(" + series3[1].confSeed + ")"
firstRound[0].children[0].children[1].textContent = series4[0].abr + "(" + series4[0].confSeed + ")" + " v " + series4[1].abr + "(" + series4[1].confSeed + ")"

firstRound[1].children[0].children[0].textContent = series5[0].abr + "(" + series5[0].confSeed + ")" + " v " + series5[1].abr + "(" + series5[1].confSeed + ")"
firstRound[1].children[0].children[3].textContent = series6[0].abr + "(" + series6[0].confSeed + ")" + " v " + series6[1].abr + "(" + series6[1].confSeed + ")"
firstRound[1].children[0].children[2].textContent = series7[0].abr + "(" + series7[0].confSeed + ")" + " v " + series7[1].abr + "(" + series7[1].confSeed + ")"
firstRound[1].children[0].children[1].textContent = series8[0].abr + "(" + series8[0].confSeed + ")" + " v " + series8[1].abr + "(" + series8[1].confSeed + ")"

//East first round
firstRound[0].children[0].children[0].addEventListener("click", () => {
    panel.style.display = "grid";
    panel.children[0].textContent = firstRound[0].children[0].children[0].textContent;
    panel.children[1].children[0].addEventListener("click", () => simAPlayOffGame(series1[0], series1[1]));
})
firstRound[0].children[0].children[3].addEventListener("click", () => {
    panel.style.display = "grid";
    panel.children[0].textContent = firstRound[0].children[0].children[3].textContent;
    panel.children[1].children[0].addEventListener("click", () => simAPlayOffGame(series2[0], series2[1]));
})

firstRound[0].children[0].children[2].addEventListener("click", () => {
    panel.style.display = "grid";
    panel.children[0].textContent = firstRound[0].children[0].children[2].textContent;
    panel.children[1].children[0].addEventListener("click", () => simAPlayOffGame(series3[0], series3[1]));
})

firstRound[0].children[0].children[1].addEventListener("click", () => {
    panel.style.display = "grid";
    panel.children[0].textContent = firstRound[0].children[0].children[1].textContent;
    panel.children[1].children[0].addEventListener("click", () => simAPlayOffGame(series4[0], series4[1]));
})
//West first round
firstRound[1].children[0].children[0].addEventListener("click", () => {
    panel.style.display = "grid";
    panel.children[0].textContent = firstRound[1].children[0].children[0].textContent;
    panel.children[1].children[0].addEventListener("click", () => simAPlayOffGame(series5[0], series5[1]));
})

firstRound[1].children[0].children[3].addEventListener("click", () => {
    panel.style.display = "grid";
    panel.children[0].textContent = firstRound[1].children[0].children[3].textContent;
    panel.children[1].children[0].addEventListener("click", () => simAPlayOffGame(series6[0], series6[1]));
})

firstRound[1].children[0].children[2].addEventListener("click", () => {
    panel.style.display = "grid";
    panel.children[0].textContent = firstRound[1].children[0].children[2].textContent;
    panel.children[1].children[0].addEventListener("click", () => simAPlayOffGame(series7[0], series7[1]));
})

firstRound[1].children[0].children[1].addEventListener("click", () => {
    panel.style.display = "grid";
    panel.children[0].textContent = firstRound[1].children[0].children[1].textContent;
    panel.children[1].children[0].addEventListener("click", () => simAPlayOffGame(series8[0], series8[1]));
})




//Panel controls
function simAPlayOffGame(team1, team2){
    if (Math.round(Math.random() * 3) === 1){
        let sub = team1;
        team1 = team2;
        team2 = sub;
    }
    aGame(team1, team2, true);
}


window.closePanel = function(){
    panel.style.display = "none";
}