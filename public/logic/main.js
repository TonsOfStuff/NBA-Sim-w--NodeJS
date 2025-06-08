import { Player } from "./player.js";
import { Team } from "./team.js";

//Players
const michaelJordan = new Player("Michael Jordan", "Slasher", 99, 89, 96, 90, 99, 96, 32, 21, 52, 87, 12, 29, 56, 96, 95, 93, 95, 92, 96, 75, 82, 90, 90, 94, 95, 87, 75, 99, 52, 87, 78, 34, 45, 99, 99)
const lebron = new Player("LeBron James", "All", 95, 93, 97, 76, 99, 86, 42, 21, 88, 45, 42, 35, 94, 97, 99, 95, 91, 82, 87, 32, 32, 82, 85, 82, 90, 98, 95, 83, 79, 92, 81, 37, 42, 99, 99)
const kareem = new Player("Kareem Abdul-Jabbar", "Inside Post-player", 92, 40, 99, 73, 99, 99, 93, 87, 94, 31, 2, 30, 13, 57, 78, 96, 99, 42, 49, 0, 0, 0, 0, 95, 96, 62, 0, 54, 21, 78, 85, 40, 40, 95, 99);
const duncan = new Player("Tim Duncan", "Inside Defensive", 96, 62, 99, 80, 95, 99, 80, 90, 95, 82, 76, 35, 42, 52, 80, 91, 97, 96, 90, 0, 0, 1, 1, 92, 90, 97, 0, 31, 27, 76, 83, 38, 39, 93, 99);

//Teams
const chicagoBulls = new Team("Chicago Bulls", true, []);

//Global variables
let hasBallPlayer = michaelJordan;
export function hasBallPlayerSetter(player){
    hasBallPlayer = player;
}

michaelJordan.otherTeammates.push(kareem);
michaelJordan.otherTeammates.push(michaelJordan);
lebron.otherTeammates.push(duncan);
lebron.otherTeammates.push(lebron);
duncan.otherTeammates.push(lebron);
duncan.otherTeammates.push(duncan);
kareem.otherTeammates.push(kareem);
kareem.otherTeammates.push(michaelJordan);

michaelJordan.opponents.push(lebron);
michaelJordan.opponents.push(duncan);
kareem.opponents.push(lebron);
kareem.opponents.push(duncan);
duncan.opponents.push(michaelJordan)
duncan.opponents.push(kareem)
lebron.opponents.push(michaelJordan)
lebron.opponents.push(kareem)

window.test = function(){
    for (let i = 0; i < 50; i++){
        hasBallPlayer.playerPossesion(hasBallPlayer.opponents[Math.floor(Math.random() * 2)])
        console.log("Field Goal: " + kareem.fgm.toString() + "/" + kareem.fga.toString());
        console.log("Three: " + kareem.tpm.toString() + "/" + kareem.tpa.toString());
        console.log("Pts: " + kareem.pts.toString() + " Ast: " + kareem.ast.toString() + " OReb:" + kareem.oReb.toString() + " DReb: " + kareem.dReb.toString() + " Stl: " + kareem.stl.toString());
    }
}



