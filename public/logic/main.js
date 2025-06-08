import { Player } from "./player.js";
import { Team } from "./team.js";

//Players
const michaelJordan = new Player("Michael Jordan", "Slasher", 99, 89, 96, 90, 99, 96, 32, 21, 52, 87, 12, 29, 56, 96, 95, 93, 95, 92, 96, 75, 82, 90, 90, 94, 95, 87, 75, 99, 52, 87, 78, 34, 45, 99, 99)
const lebron = new Player("LeBron James", "All", 95, 93, 97, 76, 99, 86, 42, 21, 88, 45, 42, 35, 94, 97, 99, 95, 91, 82, 87, 32, 32, 82, 85, 82, 90, 98, 95, 83, 79, 92, 81, 37, 42, 99, 99)
const kareem = new Player("Kareem Abdul-Jabbar", "Inside Post-player", 92, 40, 99, 73, 99, 99, 93, 87, 94, 31, 2, 30, 13, 57, 78, 96, 99, 42, 49, 0, 0, 0, 0, 95, 96, 62, 0, 54, 21, 78, 85, 40, 40, 95, 99);
const duncan = new Player("Tim Duncan", "Inside Defensive", 96, 62, 99, 80, 95, 99, 80, 90, 95, 82, 76, 35, 42, 52, 80, 91, 97, 96, 90, 0, 0, 1, 1, 92, 90, 97, 0, 31, 27, 76, 83, 38, 39, 93, 99);
const bird = new Player("Larry Bird", "All", 98, 98, 91, 94, 99, 76, 52, 21, 42, 88, 15, 39, 94, 82, 90, 87, 85, 95, 99, 94, 92, 90, 87, 84, 88, 42, 83, 45, 69, 91, 81, 33, 37, 99, 99);
const magic = new Player("Magic Johnson", "Passer Inside", 92, 80, 97, 85, 93, 93, 45, 33, 72, 79, 62, 40, 99, 94, 91, 99, 99, 92, 90, 1, 1, 2, 1, 56, 65, 99, 3, 81, 93, 90, 81, 35, 42, 98, 99);
const kobe = new Player("Kobe Bryant", "Slasher", 93, 92, 93, 90, 99, 92, 34, 22, 82, 80, 22, 21, 46, 89, 88, 90, 83, 98, 73, 34, 21, 85, 88, 83, 72, 76, 77, 80, 77, 91, 78, 33, 40, 99, 99);
const shaq = new Player("Shaquille O'Neal", "Inside Post-player", 92, 40, 99, 55, 99, 88, 87, 80, 85, 21, 1, 28, 21, 68, 92, 99, 99, 45, 43, 0, 0, 0, 0, 0, 0, 0, 0, 83, 14, 70, 85, 42, 45, 95, 99);
const curry = new Player("Stephen Curry", "Shooter Passer", 99, 99, 87, 99, 99, 67, 30, 15, 22, 90, 34, 38, 87, 95, 90, 88, 47, 77, 78, 96, 97, 93, 99, 61, 65, 54, 99, 62, 47, 97, 75, 34, 38, 98, 99);
const hakeem = new Player("Hakeem Olajuwan", "Inside Post-player", 94, 40, 99, 78, 95, 99, 76, 76, 99, 40, 31, 38, 44, 77, 79, 93, 93, 95, 90, 0, 0, 0, 0, 36, 44, 30, 0, 62, 33, 78, 84, 38, 38, 93, 99);

const allPlayers = [michaelJordan, lebron, kareem, duncan, bird, magic, kobe, shaq, curry, hakeem];
let removePlayers = [michaelJordan, lebron, kareem, duncan, bird, magic, kobe, shaq, curry, hakeem];

//Teams
const bulls = new Team("Chicago Bulls", true, []);
const lakers = new Team("Los Angeles Lakers", false, []);

const allTeams = [bulls, lakers]

//Global variables
let hasBallPlayer = null;
export function hasBallPlayerSetter(player){
    hasBallPlayer = player;
}

//Generate Players
function genPlayer(amount){
    for (let i = 0; i<amount; i++){
        
    }
}

//Set teams
for (let i=0;i<allTeams.length;i++){
    for (let k=0;k<5;k++){
        const chosenPlayer = removePlayers[Math.floor(Math.random() * removePlayers.length)];
        allTeams[i].players.push(chosenPlayer);
        removePlayers.splice(removePlayers.indexOf(chosenPlayer), 1);
    }
}

console.log(bulls.players);
console.log(lakers.players);

bulls.setOpponentsAndTeammates(lakers);
lakers.setOpponentsAndTeammates(bulls);


window.test = function(){
    hasBallPlayer = bulls.players[0];
    for (let i = 0; i < 250; i++){ //Quarter 1
        hasBallPlayer.playerPossesion(hasBallPlayer.opponents[Math.floor(Math.random() * 2)])
    }

    for (let i = 0; i < 250; i++){ //Quarter 2
        hasBallPlayer.playerPossesion(hasBallPlayer.opponents[Math.floor(Math.random() * 2)])
    }

    for (let i = 0; i < 250; i++){ //Quarter 3
        hasBallPlayer.playerPossesion(hasBallPlayer.opponents[Math.floor(Math.random() * 2)])
    }

    for (let i = 0; i < 250; i++){ //Quarter 4
        hasBallPlayer.playerPossesion(hasBallPlayer.opponents[Math.floor(Math.random() * 2)])
    }

    for (let i = 0; i < 10; i++){
        allPlayers[i].statsUpdate();
        console.log("Avgs " + allPlayers[i].name + ": " + allPlayers[i].avgPts + " " + allPlayers[i].avgAst + " " + (allPlayers[i].avgOReb + allPlayers[i].avgDReb).toFixed(1) + " " + allPlayers[i].avgStl + " " + allPlayers[i].avgTov);
    }
}



