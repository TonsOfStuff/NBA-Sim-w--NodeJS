import { Player } from "./player.js";
import { Team } from "./team.js";
import { shooterStats, defensiveStats, slasherStats, twoWayStats, postPlayerStats, insideStats, playmakerStats, allAroundStats} from "./statRange.js";
import { fn, ln } from "./name.js";

//Players
const michaelJordan = new Player("Michael Jordan", "Slasher", 99, 89, 96, 90, 99, 96, 32, 21, 52, 87, 12, 29, 56, 96, 95, 93, 95, 92, 96, 75, 82, 90, 90, 94, 95, 87, 75, 99, 52, 87, 78, 34, 45, 99, 99)
const lebron = new Player("LeBron James", "All", 95, 93, 97, 76, 99, 86, 42, 21, 88, 45, 42, 35, 94, 97, 99, 95, 91, 82, 87, 32, 32, 82, 85, 82, 90, 98, 95, 83, 79, 92, 81, 37, 42, 99, 99)
const kareem = new Player("Kareem Abdul-Jabbar", "Inside Post-player", 92, 40, 99, 73, 99, 99, 93, 87, 94, 31, 2, 30, 13, 57, 78, 96, 99, 42, 49, 0, 0, 0, 0, 95, 96, 62, 0, 54, 21, 78, 85, 40, 40, 95, 99);
const duncan = new Player("Tim Duncan", "Inside Defensive", 96, 62, 99, 80, 95, 99, 80, 90, 95, 82, 76, 35, 42, 52, 80, 91, 97, 96, 90, 0, 0, 1, 1, 92, 90, 97, 0, 31, 27, 76, 83, 38, 39, 93, 99);
const bird = new Player("Larry Bird", "All", 98, 98, 91, 94, 99, 76, 52, 21, 42, 88, 15, 39, 94, 82, 90, 87, 85, 95, 99, 94, 92, 90, 87, 84, 88, 42, 83, 45, 69, 91, 81, 33, 37, 99, 99);
const magic = new Player("Magic Johnson", "Playmaker Inside", 92, 80, 97, 85, 93, 93, 45, 33, 72, 79, 62, 40, 99, 94, 91, 99, 99, 92, 90, 1, 1, 2, 1, 56, 65, 99, 3, 81, 93, 90, 81, 35, 42, 98, 99);
const kobe = new Player("Kobe Bryant", "Slasher", 93, 92, 93, 90, 99, 92, 34, 22, 82, 80, 22, 21, 46, 89, 88, 90, 83, 98, 73, 34, 21, 85, 88, 83, 72, 76, 77, 80, 77, 91, 78, 33, 40, 99, 99);
const shaq = new Player("Shaquille O'Neal", "Inside Post-player", 92, 40, 99, 55, 99, 88, 87, 80, 85, 21, 1, 28, 21, 68, 92, 99, 99, 45, 43, 0, 0, 0, 0, 0, 0, 0, 0, 83, 14, 70, 85, 42, 45, 95, 99);
const curry = new Player("Stephen Curry", "Shooter Playmaker", 99, 99, 87, 99, 99, 67, 30, 15, 22, 90, 34, 38, 87, 95, 90, 88, 47, 77, 78, 96, 97, 93, 99, 61, 65, 54, 99, 62, 47, 97, 75, 34, 38, 98, 99);
const hakeem = new Player("Hakeem Olajuwan", "Inside Post-player", 94, 40, 99, 78, 95, 99, 76, 76, 99, 40, 31, 38, 44, 77, 79, 93, 93, 95, 90, 0, 0, 0, 0, 36, 44, 30, 0, 62, 33, 78, 84, 38, 38, 93, 99);

let allPlayers = [michaelJordan, lebron, kareem, duncan, bird, magic, kobe, shaq, curry, hakeem];
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
function randInRangeWithQuality([min, max], quality, clampMin = 0, clampMax = 99) {
  const adjustedMin = Math.max(clampMin, min + quality);
  const adjustedMax = Math.min(clampMax, max + quality);
  return Math.floor(Math.random() * (adjustedMax - adjustedMin + 1)) + adjustedMin;
}
function genPlayer(amount){
    for (let i = 0; i<amount; i++){
        let archStat = null;
        let gen = null;
        const arch = ["Shooter", "Defensive", "Slasher", "Two-way", "Post-player", "Inside", "Playmaker", "All"];
        const chosenArch = arch[Math.floor(Math.random() * arch.length)];
        if (chosenArch === "Shooter"){
            archStat = shooterStats;
        }
        else if (chosenArch === "Defensive"){
            archStat = defensiveStats;
        }
        else if (chosenArch === "Slasher"){
            archStat = slasherStats;
        }
        else if (chosenArch === "Two-way"){
            archStat = twoWayStats;
        }
        else if (chosenArch === "Post-player"){
            archStat = postPlayerStats;
        }
        else if (chosenArch === "Inside"){
            archStat = insideStats;
        }
        else if (chosenArch === "Playmaker"){
            archStat = playmakerStats;
        }
        else{
            archStat = allAroundStats;
        }

        //Name chooser
        const name = `${fn[Math.floor(Math.random() * fn.length)]} ${ln[Math.floor(Math.random() * ln.length)]}`;


        const quality = Math.round(Math.random() * 3);
        if (quality === 3){
            gen = new Player(name, chosenArch, randInRangeWithQuality(archStat.twoPt, 10), randInRangeWithQuality(archStat.threePt, 10), randInRangeWithQuality(archStat.inside, 10), randInRangeWithQuality(archStat.freeThrow, 10), randInRangeWithQuality(archStat.offensiveAbility, 15), randInRangeWithQuality(archStat.defensiveAbility, 15), randInRangeWithQuality(archStat.defensiveReb, 20), randInRangeWithQuality(archStat.offensiveReb, 20), randInRangeWithQuality(archStat.blockTen, 20), randInRangeWithQuality(archStat.stealTen, 20), randInRangeWithQuality(archStat.takeCharges, 10), randInRangeWithQuality(archStat.passingTen, 0), randInRangeWithQuality(archStat.passingAccuracy, 30), randInRangeWithQuality(archStat.ballControl, 10), randInRangeWithQuality(archStat.catching, 10), randInRangeWithQuality(archStat.insideTen, 0), randInRangeWithQuality(archStat.closeTen, 0), randInRangeWithQuality(archStat.leftElbow, 0), randInRangeWithQuality(archStat.rightElbow, 0), randInRangeWithQuality(archStat.leftCorner, 0), randInRangeWithQuality(archStat.rightCorner, 0), randInRangeWithQuality(archStat.leftWing, 0), randInRangeWithQuality(archStat.rightWing, 0), randInRangeWithQuality(archStat.leftTwo, 0), randInRangeWithQuality(archStat.rightTwo, 0), randInRangeWithQuality(archStat.centerTwo, 0), randInRangeWithQuality(archStat.centerThree, 0), randInRangeWithQuality(archStat.vertical, 20), randInRangeWithQuality(archStat.hustle, 10), randInRangeWithQuality(archStat.stamina, 10), randInRangeWithQuality(archStat.height, 0), randInRangeWithQuality(archStat.foul, 0), randInRangeWithQuality(archStat.drawFoul, 10), randInRangeWithQuality(archStat.clutch, 20), randInRangeWithQuality(archStat.potential, 20));
        }else if (quality === 2){
            gen = new Player(name, chosenArch, randInRangeWithQuality(archStat.twoPt, 5), randInRangeWithQuality(archStat.threePt, 5), randInRangeWithQuality(archStat.inside, 5), randInRangeWithQuality(archStat.freeThrow, 5), randInRangeWithQuality(archStat.offensiveAbility, 10), randInRangeWithQuality(archStat.defensiveAbility, 10), randInRangeWithQuality(archStat.defensiveReb, 10), randInRangeWithQuality(archStat.offensiveReb, 10), randInRangeWithQuality(archStat.blockTen, 10), randInRangeWithQuality(archStat.stealTen, 10), randInRangeWithQuality(archStat.takeCharges, 5), randInRangeWithQuality(archStat.passingTen, 0), randInRangeWithQuality(archStat.passingAccuracy, 15), randInRangeWithQuality(archStat.ballControl, 5), randInRangeWithQuality(archStat.catching, 5), randInRangeWithQuality(archStat.insideTen, 0), randInRangeWithQuality(archStat.closeTen, 0), randInRangeWithQuality(archStat.leftElbow, 0), randInRangeWithQuality(archStat.rightElbow, 0), randInRangeWithQuality(archStat.leftCorner, 0), randInRangeWithQuality(archStat.rightCorner, 0), randInRangeWithQuality(archStat.leftWing, 0), randInRangeWithQuality(archStat.rightWing, 0), randInRangeWithQuality(archStat.leftTwo, 0), randInRangeWithQuality(archStat.rightTwo, 0), randInRangeWithQuality(archStat.centerTwo, 0), randInRangeWithQuality(archStat.centerThree, 0), randInRangeWithQuality(archStat.vertical, 10), randInRangeWithQuality(archStat.hustle, 5), randInRangeWithQuality(archStat.stamina, 5), randInRangeWithQuality(archStat.height, 0), randInRangeWithQuality(archStat.foul, 0), randInRangeWithQuality(archStat.drawFoul, 5), randInRangeWithQuality(archStat.clutch, 10), randInRangeWithQuality(archStat.potential, 10));
        }else{
            gen = new Player(name, chosenArch, randInRangeWithQuality(archStat.twoPt, 0), randInRangeWithQuality(archStat.threePt, 0), randInRangeWithQuality(archStat.inside, 0), randInRangeWithQuality(archStat.freeThrow, 0), randInRangeWithQuality(archStat.offensiveAbility, 0), randInRangeWithQuality(archStat.defensiveAbility, 0), randInRangeWithQuality(archStat.defensiveReb, 0), randInRangeWithQuality(archStat.offensiveReb, 0), randInRangeWithQuality(archStat.blockTen, 0), randInRangeWithQuality(archStat.stealTen, 0), randInRangeWithQuality(archStat.takeCharges, 0), randInRangeWithQuality(archStat.passingTen, 0), randInRangeWithQuality(archStat.passingAccuracy, 0), randInRangeWithQuality(archStat.ballControl, 0), randInRangeWithQuality(archStat.catching, 0), randInRangeWithQuality(archStat.insideTen, 0), randInRangeWithQuality(archStat.closeTen, 0), randInRangeWithQuality(archStat.leftElbow, 0), randInRangeWithQuality(archStat.rightElbow, 0), randInRangeWithQuality(archStat.leftCorner, 0), randInRangeWithQuality(archStat.rightCorner, 0), randInRangeWithQuality(archStat.leftWing, 0), randInRangeWithQuality(archStat.rightWing, 0), randInRangeWithQuality(archStat.leftTwo, 0), randInRangeWithQuality(archStat.rightTwo, 0), randInRangeWithQuality(archStat.centerTwo, 0), randInRangeWithQuality(archStat.centerThree, 0), randInRangeWithQuality(archStat.vertical, 0), randInRangeWithQuality(archStat.hustle, 0), randInRangeWithQuality(archStat.stamina, 0), randInRangeWithQuality(archStat.height, 0), randInRangeWithQuality(archStat.foul, 0), randInRangeWithQuality(archStat.drawFoul, 0), randInRangeWithQuality(archStat.clutch, 0), randInRangeWithQuality(archStat.potential, 0));
        }

        allPlayers.push(gen); //Push newly generated player into allPlayer list to be used
        removePlayers.push(gen);
    }
}

//Function for finding totals
function findTotalScore(team1, team2){
    let team1Total = 0;
    team1.players.forEach(player => {
        team1Total += player.pts;
    });

    let team2Total = 0;
    team2.players.forEach(player => {
        team1Total += player.pts;
    });

    return [team1Total, team2Total];
}

//Function for subbing
function subbing(quarter, time, team1, team2){
    let teamScores = [];

    teamScores = findTotalScore(team1, team2);
    team1.sub(quarter + 1, 0, teamScores[0], teamScores[1]);
    team2.sub(quarter + 1, 0, teamScores[0], teamScores[1]);

    team1.setOpponentsAndTeammates(team2);
    team2.setOpponentsAndTeammates(team1);

    hasBallPlayer = team1.pg;
    team1.pg.hasBall = true;
}

//Set teams
genPlayer(14)

for (let i=0;i<allTeams.length;i++){
    for (let k=0;k<12;k++){
        const chosenPlayer = removePlayers[Math.floor(Math.random() * removePlayers.length)];
        allTeams[i].players.push(chosenPlayer);
        chosenPlayer.calcOvr();
        chosenPlayer.team = allTeams[i];
        removePlayers.splice(removePlayers.indexOf(chosenPlayer), 1);
    }

    allTeams[i].players.sort((a, b) => b.ovr - a.ovr);
    allTeams[i].startingLineup.push(...allTeams[i].players.slice(0, 5));
    allTeams[i].lineup = allTeams[i].startingLineup;
    allTeams[i].setPositions();
}

console.log(bulls);
console.log(lakers);

bulls.setOpponentsAndTeammates(lakers);
lakers.setOpponentsAndTeammates(bulls);


window.test = function(){
    const team1 = allTeams[0];
    const team2 = allTeams[1];
    let quarter = 1;
    


    hasBallPlayer = team1.pg;
    for (let i = 0; i < 240; i++){ //Quarter 1
        hasBallPlayer.playerPossesion(hasBallPlayer.opponents[Math.floor(Math.random() * hasBallPlayer.opponents.length)])
        if (i % 20 === 0){
            team1.updateMin();
            team2.updateMin();
        }
    }
    subbing(quarter, 0, team1, team2);

    quarter += 1;
    for (let i = 0; i < 240; i++){ //Quarter 2
        hasBallPlayer.playerPossesion(hasBallPlayer.opponents[Math.floor(Math.random() * hasBallPlayer.opponents.length)])
        if (i % 20 === 0){
            team1.updateMin();
            team2.updateMin();
        }
    }
    subbing(quarter, 0, team1, team2);

    quarter += 1;
    for (let i = 0; i < 240; i++){ //Quarter 3
        hasBallPlayer.playerPossesion(hasBallPlayer.opponents[Math.floor(Math.random() * hasBallPlayer.opponents.length)])
        if (i % 20 === 0){
            team1.updateMin();
            team2.updateMin();
        }
    }
    subbing(quarter, 0, team1, team2);

    quarter += 1;
    for (let i = 0; i < 240; i++){ //Quarter 4
        hasBallPlayer.playerPossesion(hasBallPlayer.opponents[Math.floor(Math.random() * hasBallPlayer.opponents.length)])
        if (i % 20 === 0){
            team1.updateMin();
            team2.updateMin();
        }
    }

    for (let i = 0; i < 11; i++){
        allPlayers[i].statsUpdate();
        console.log("Avgs " + allPlayers[i].name + ": " + allPlayers[i].avgMin + " " + allPlayers[i].avgPts + " " + allPlayers[i].avgAst + " " + (allPlayers[i].avgOReb + allPlayers[i].avgDReb).toFixed(1) + " " + allPlayers[i].avgStl + " " + allPlayers[i].avgTov + " " + allPlayers[i].avgBlk);
    }
}



