import { Player } from "./player.js";
import { Team } from "./team.js";
import { shooterStats, defensiveStats, slasherStats, twoWayStats, postPlayerStats, insideStats, playmakerStats, allAroundStats} from "./statRange.js";
import { fn, ln } from "./name.js";



//DOM elements
let main = document.getElementById("main");

function displayGame(team1, team2, team1Score, team2Score, playOff = false){
    main = playOff
        ? document.getElementById("displayGame")
        : document.getElementById("main");
    if (playOff === false){
        const dayCounter = document.getElementById("dayCounter");
        dayCounter.innerText = "Day: " + day;

        const yearCounter = document.getElementById("yearCounter");
        yearCounter.innerText = "Year: " + year;
    }
    

    while (main.firstChild){
        main.removeChild(main.firstChild);
    }
    team1.players.sort((a, b) => b.pts - a.pts);
    team2.players.sort((a, b) => b.pts - a.pts);

    team1.players.forEach(player => {
        const boxScoreRow = document.createElement("div");
        boxScoreRow.innerText = player.name + "|Min: " + player.min + "|Pts: " + player.pts + "|DReb: " + player.dReb + "|OReb: " + player.oReb + "|Ast: " + player.ast + "|Stl: " + player.stl + "|Blk: " + player.blk + "|Fls: " + player.fls + "|TO: " + player.tov + "|FG%: " + player.fgm + "/" + player.fga + "|3P%: " + player.tpm + "/" + player.tpa + "|FT%: " + player.ftm + "/" + player.fta + "|+/-: " + player.boxMinus;
        boxScoreRow.style.marginBottom = '10px';

        main.appendChild(boxScoreRow);
    });
    let teamStuff = document.createElement("div");
    teamStuff.innerText = team1.name + ": " + team1Score;
    main.appendChild(teamStuff)

    const space = document.createElement("div");
    space.innerText = " ";
    space.style.height = '50px';
    main.appendChild(space);

    team2.players.forEach(player => {
        const boxScoreRow = document.createElement("div");
        boxScoreRow.innerText = player.name + "|Min: " + player.min + "|Pts: " + player.pts + "|DReb: " + player.dReb + "|OReb: " + player.oReb + "|Ast: " + player.ast + "|Stl: " + player.stl + "|Blk: " + player.blk + "|Fls: " + player.fls + "|TO: " + player.tov + "|FG%: " + player.fgm + "/" + player.fga + "|3P%: " + player.tpm + "/" + player.tpa + "|FT%: " + player.ftm + "/" + player.fta + "|+/-: " + player.boxMinus;
        boxScoreRow.style.marginBottom = '10px';

        main.appendChild(boxScoreRow);
    });
    teamStuff = document.createElement("div");
    teamStuff.innerText = team2.name + ": " + team2Score;
    main.appendChild(teamStuff)
}

function displayAwards(mvp, dpoy, tempList, dpoyTempList, roty, smoty){
    while (main.firstChild){
        main.removeChild(main.firstChild);
    }

    const mvpStats = document.createElement("div");
    mvpStats.innerText = "MVP: " + mvp.name + "|Min:" + mvp.avgMin + "|Pts:" + mvp.avgPts + "|Reb:" + (mvp.avgOReb + mvp.avgDReb).toFixed(1) + "|DReb:" + mvp.avgDReb + "|OReb:" + mvp.avgOReb + "|Ast:" + mvp.avgAst + "|Stl:" + mvp.avgStl + "|Blk:" + mvp.avgBlk + "|Fls" + mvp.avgFls + "|Tov:" + mvp.avgTov + "|FG%:" + mvp.fgp + "|3P%:" + mvp.tpp + "|FT%:" + mvp.ftp;
    const dpoyStats = document.createElement("div");
    dpoyStats.innerText = "DPOY: " + dpoy.name + "|Min:" + dpoy.avgMin + "|Pts:" + dpoy.avgPts + "|Reb:" + (dpoy.avgOReb + dpoy.avgDReb).toFixed(1) + "|DReb:" + dpoy.avgDReb + "|OReb:" + dpoy.avgOReb + "|Ast:" + dpoy.avgAst + "|Stl:" + dpoy.avgStl + "|Blk:" + dpoy.avgBlk + "|Fls" + dpoy.avgFls + "|Tov:" + dpoy.avgTov + "|FG%:" + dpoy.fgp + "|3P%:" + dpoy.tpp + "|FT%:" + dpoy.ftp;
    const rotyStats = document.createElement("div");
    if (roty !== null){
        rotyStats.innerText = "ROTY: " + roty.name + "|Min:" + roty.avgMin + "|Pts:" + roty.avgPts + "|Reb:" + (roty.avgOReb + roty.avgDReb).toFixed(1) + "|DReb:" + roty.avgDReb + "|OReb:" + roty.avgOReb + "|Ast:" + roty.avgAst + "|Stl:" + roty.avgStl + "|Blk:" + roty.avgBlk + "|Fls" + roty.avgFls + "|Tov:" + roty.avgTov + "|FG%:" + roty.fgp + "|3P%:" + roty.tpp + "|FT%:" + roty.ftp;
    }else{
        rotyStats.innerText = "ROTY: N/A"
    }
    const smotyStats = document.createElement("div");
    smotyStats.innerText = "SMOTY: " + smoty.name + "|Min:" + smoty.avgMin + "|Pts:" + smoty.avgPts + "|Reb:" + (smoty.avgOReb + smoty.avgDReb).toFixed(1) + "|DReb:" + smoty.avgDReb + "|OReb:" + smoty.avgOReb + "|Ast:" + smoty.avgAst + "|Stl:" + smoty.avgStl + "|Blk:" + smoty.avgBlk + "|Fls" + smoty.avgFls + "|Tov:" + smoty.avgTov + "|FG%:" + smoty.fgp + "|3P%:" + smoty.tpp + "|FT%:" + smoty.ftp;
    

    main.appendChild(mvpStats);
    main.appendChild(dpoyStats);
    main.appendChild(rotyStats);
    main.appendChild(smotyStats);


    const allNBA1stText = document.createElement("div");
    const allNBA2ndText = document.createElement("div");
    const allNBA3rdText = document.createElement("div");
    allNBA1stText.style.marginTop = "10px";
    allNBA1stText.innerText = "All NBA 1st Team: |"+tempList[0].name+"|"+tempList[1].name+"|"+tempList[2].name+"|"+tempList[3].name+"|"+tempList[4].name;
    allNBA2ndText.innerText = "All NBA 2nd Team: |"+tempList[5].name+"|"+tempList[6].name+"|"+tempList[7].name+"|"+tempList[8].name+"|"+tempList[9].name;
    allNBA3rdText.innerText = "All NBA 3rd Team: |"+tempList[10].name+"|"+tempList[11].name+"|"+tempList[12].name+"|"+tempList[13].name+"|"+tempList[14].name;

    main.appendChild(allNBA1stText);
    main.appendChild(allNBA2ndText);
    main.appendChild(allNBA3rdText);



    const allDef1stText = document.createElement("div");
    const allDef2ndText = document.createElement("div");
    const allDef3rdText = document.createElement("div");
    allDef1stText.style.marginTop = "10px";
    allDef1stText.innerText = "All Def 1st Team: |"+dpoyTempList[0].name+"|"+dpoyTempList[1].name+"|"+dpoyTempList[2].name+"|"+dpoyTempList[3].name+"|"+dpoyTempList[4].name;
    allDef2ndText.innerText = "All Def 2nd Team: |"+dpoyTempList[5].name+"|"+dpoyTempList[6].name+"|"+dpoyTempList[7].name+"|"+dpoyTempList[8].name+"|"+dpoyTempList[9].name;
    allDef3rdText.innerText = "All Def 3rd Team: |"+dpoyTempList[10].name+"|"+dpoyTempList[11].name+"|"+dpoyTempList[12].name+"|"+dpoyTempList[13].name+"|"+dpoyTempList[14].name;

    main.appendChild(allDef1stText);
    main.appendChild(allDef2ndText);
    main.appendChild(allDef3rdText);

    const contButton = document.createElement("button");
    contButton.innerText = "Continue"
    contButton.addEventListener("click", async () => {
        await saving();
        window.location.href = "/playoff.html";
    })

    main.appendChild(contButton)
}

function updateDayAndYearUI(){
    const dayCounter = document.getElementById("dayCounter");
    dayCounter.innerText = "Day: " + day;

    const yearCounter = document.getElementById("yearCounter");
    yearCounter.innerText = "Year: " + year;
}

window.displayNews = function (){
    while (main.firstChild){
        main.removeChild(main.firstChild);
    }

    news.forEach(txt => {
        const txtEl = document.createElement("div");
        txtEl.innerText = txt;

        main.appendChild(txtEl);
    });
}


//Players
const michaelJordan = new Player("Michael Jordan", "Slasher All", 99, 89, 96, 90, 99, 96, 32, 21, 52, 87, 12, 27, 56, 52, 96, 95, 99, 99, 92, 96, 25, 22, 50, 50, 94, 75, 79, 55, 99, 52, 87, 78, 34, 48, 99, 99)
const lebron = new Player("LeBron James", "All", 95, 93, 97, 76, 99, 86, 42, 21, 88, 45, 42, 35, 94, 81, 97, 99, 95, 91, 82, 87, 32, 32, 82, 85, 82, 90, 98, 95, 83, 79, 92, 81, 37, 42, 99, 99)
const kareem = new Player("Kareem Abdul-Jabbar", "Inside Post-player", 92, 0, 99, 73, 99, 99, 93, 87, 94, 31, 2, 30, 13, 12,57, 78, 96, 99, 42, 49, 0, 0, 0, 0, 95, 96, 62, 0, 54, 21, 78, 85, 40, 40, 95, 99);
const duncan = new Player("Tim Duncan", "Inside Defensive", 96, 50, 99, 80, 95, 99, 80, 90, 95, 82, 76, 35, 42, 48,52, 80, 91, 97, 96, 90, 0, 0, 1, 1, 92, 90, 97, 0, 31, 27, 76, 83, 38, 39, 93, 99);
const bird = new Player("Larry Bird", "All", 98, 98, 91, 94, 99, 76, 52, 21, 42, 88, 15, 39, 94, 50, 82, 90, 87, 85, 95, 99, 94, 92, 90, 67, 84, 88, 42, 83, 45, 69, 91, 81, 33, 37, 99, 99);
const magicJohnson = new Player("Magic Johnson", "Playmaker Inside", 96, 80, 97, 85, 93, 93, 45, 33, 72, 79, 62, 55, 99, 99, 94, 91, 99, 99, 92, 90, 1, 1, 2, 1, 87, 88, 99, 3, 81, 93, 90, 81, 35, 42, 98, 99);
const kobe = new Player("Kobe Bryant", "Slasher", 93, 92, 93, 90, 99, 92, 34, 22, 82, 80, 22, 21, 46, 15, 89, 88, 90, 83, 98, 73, 34, 21, 85, 88, 83, 72, 76, 77, 80, 77, 91, 78, 33, 40, 99, 99);
const shaq = new Player("Shaquille O'Neal", "Inside Post-player", 92, 0, 99, 55, 99, 88, 87, 80, 85, 21, 1, 28, 21, 26, 68, 92, 99, 99, 45, 43, 0, 0, 0, 0, 0, 0, 0, 0, 83, 14, 70, 85, 42, 45, 95, 99);
const curry = new Player("Stephen Curry", "Shooter Playmaker", 99, 99, 81, 99, 99, 67, 30, 15, 22, 90, 34, 45, 87, 75, 95, 90, 88, 47, 77, 78, 90, 90, 83, 99, 61, 65, 54, 99, 62, 47, 97, 75, 34, 38, 98, 99);
const hakeem = new Player("Hakeem Olajuwan", "Inside Post-player", 94, 0, 99, 78, 95, 99, 76, 76, 99, 40, 31, 38, 44, 32, 77, 79, 93, 93, 95, 90, 0, 0, 0, 0, 36, 44, 30, 0, 62, 33, 78, 84, 38, 38, 93, 99);
const billRussell = new Player("Bill Russell", "Defensive Post-player", 90, 0, 99, 65, 84, 99, 99, 99, 99, 80, 77, 52, 83, 43, 77, 91, 99, 99, 21, 20, 0,0, 0, 0, 10, 15, 14, 0, 82, 65, 81, 82, 40, 40, 87, 99);
const wilt = new Player("Wilt Chamberlain", "All Post-player", 97, 0, 99, 72, 99, 98, 99, 99, 99, 54, 21, 50, 82, 33, 88, 80, 99, 99, 87, 88, 0, 0, 0, 0, 54, 50, 33, 0, 99, 65, 94, 85, 48, 36, 71, 99);
const durant = new Player("Kevin Durant", "Two-way Shooter", 98, 98, 90, 95, 97, 81, 54, 40, 77, 62, 12, 33, 47, 31, 91, 82, 93, 47, 90, 90, 32, 21, 99, 80, 76, 80, 89, 99, 76, 22, 78, 83, 41, 38, 92, 99);
const wemby = new Player("Victor Wembanyama", "Two-way Defensive", 97, 91, 98, 84, 97, 99, 71, 55, 99, 82, 22, 38, 83, 34, 90, 82, 98, 81, 41, 33, 10, 12, 78, 92, 90, 14, 23, 94, 53, 77, 82, 90, 42, 38, 96, 99);
const doncic = new Player("Luka Doncic", "All Playmakers", 96, 95, 94, 82, 99, 48, 78, 66, 32, 44, 12, 41, 98, 90, 82, 88, 99, 92, 20, 12, 95, 90, 86, 88, 91, 90, 32, 99, 42, 33, 74, 78, 38, 43, 99, 99);
const jokic = new Player("Nikola Jokic", "Playmaker Inside", 96, 94, 98, 79, 94, 73, 87, 62, 34, 53, 33, 50, 99, 96, 93, 77, 99, 92, 32, 30, 0, 0, 65, 82, 45, 55, 88, 90, 23, 31, 69, 83, 38, 34, 93, 99);
const giannis = new Player("Giannis Antetokounmpo", "Inside All", 95, 79, 99, 70, 99, 93, 80, 72, 89, 53, 34, 41, 74, 86, 83, 82, 99, 99, 90, 90, 1, 1, 1, 2, 30, 33, 22, 10, 80, 84, 89, 83, 36, 50, 97, 99);
const shai = new Player("Shai Gilgeous Alexander", "Slasher", 90, 87, 94, 90, 92, 71, 25, 17, 46, 80, 21, 37, 23, 14, 92, 90, 90, 83, 89, 89, 18, 17, 29, 37, 82, 79, 93, 6, 45, 50, 91, 78, 36, 43, 95, 99);

export let allPlayers = [michaelJordan, lebron, kareem, duncan, bird, magicJohnson, kobe, shaq, curry, hakeem, billRussell, wilt, durant, wemby, doncic, jokic, giannis, shai];
let removePlayers = [...allPlayers];



//Teams
const bulls = new Team("Chicago Bulls", true, "CHI", []);
const lakers = new Team("Los Angeles Lakers", false, "LAL", []);
const celtics = new Team("Boston Celitcs", true, "BOS", []);
const pacers = new Team("Indiana Pacers", true, "IND", []);
const kings = new Team("Sacramento Kings", false, "SAC", []);
const okc = new Team("Oklahoma City Thunder", false, "OKC", []);
const knicks = new Team("New York Knicks", true, "NYK", []);
const timberwolves = new Team("Minnesota Timberwolves", false, "MIN", []);
const heat = new Team("Miami Heat", true, "MIA", []);
const raptors = new Team("Toronto Raptors", true, "TOR", []);
const clippers = new Team("Los Angeles Clippers", false, "LAC", []);
const jazz = new Team("Utah Jazz", false, "UTA", []);
const cavs = new Team("Cleveland Caveliers", true, "CLE", []);
const rockets = new Team("Houston Rockets", false, "HOU", []);
const spurs = new Team("San Antonio Spurs", false, "SAS", []);
const magic = new Team("Orlando Magic", true, "ORL", []);
const sixers = new Team("Philadelphia 76ers", true, "PHI", []);
const grizzlies = new Team("Memphis Grizzlies", false, "MEM", []);
const warriors = new Team("Golden State Warriors", false, "GSW", []);
const bucks = new Team("Milwaukee Bucks", true, "MIL", []);
const pistons = new Team("Detroit Pistons", true, "DET", []);
const hawks = new Team("Atlanta Hawks", true, "ATL", []);
const nuggets = new Team("Denver Nuggets", false, "DEN", []);
const mavs = new Team("Dallas Mavericks", false, "DAL", []);

export let allTeams = [bulls, lakers, celtics, pacers, kings, okc, knicks, timberwolves, heat, raptors, clippers, jazz, cavs, rockets, spurs, magic, sixers, grizzlies, warriors, 
    bucks, pistons, hawks, nuggets, mavs
];
let allTeamsTemp = [...allTeams];
export let freeAgency = [];
let news = [];

//Global variables
let hasBallPlayer = null;
export function hasBallPlayerSetter(player){
    hasBallPlayer = player;
}

let day = 0;
export function setDay(daySet){
    day = daySet;
}
export let year = 0;
export function setYear(yearSet){
    year += yearSet;
}

//Generate Players
function randInRangeWithQuality([min, max], quality, clampMin = 0, clampMax = 99) {
  const adjustedMin = Math.max(clampMin, min + quality);
  const adjustedMax = Math.min(clampMax, max + quality);
  return Math.floor(Math.random() * (adjustedMax - adjustedMin + 1)) + adjustedMin;
}
export function genPlayer(amount){
    let listGen = []
    for (let i = 0; i<amount; i++){
        let archStat = null;
        let gen = null;
        let arch = ["Shooter", "Defensive", "Slasher", "Two-way", "Post-player", "Inside", "Playmaker", "All"];
        let chosenArch = arch[Math.floor(Math.random() * arch.length)];
        arch.splice(arch.indexOf(chosenArch), 1);
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
        if (Math.round(Math.random() * 2) === 1){
            chosenArch += " " + arch[Math.floor(Math.random() * arch.length)];
        }

        //Name chooser
        const name = `${fn[Math.floor(Math.random() * fn.length)]} ${ln[Math.floor(Math.random() * ln.length)]}`;


        const quality = Math.round(Math.random() * 4);
        if (quality >= 3){
            gen = new Player(name, chosenArch, randInRangeWithQuality(archStat.twoPt, 10), randInRangeWithQuality(archStat.threePt, 10), randInRangeWithQuality(archStat.inside, 10), randInRangeWithQuality(archStat.freeThrow, 10), randInRangeWithQuality(archStat.offensiveAbility, 15), randInRangeWithQuality(archStat.defensiveAbility, 15), randInRangeWithQuality(archStat.defensiveReb, 20), randInRangeWithQuality(archStat.offensiveReb, 20), randInRangeWithQuality(archStat.blockTen, 20), randInRangeWithQuality(archStat.stealTen, 20), randInRangeWithQuality(archStat.takeCharges, 10), randInRangeWithQuality(archStat.passingTen, 0), randInRangeWithQuality(archStat.passingAccuracy, 30), randInRangeWithQuality(archStat.passingEff, 20), randInRangeWithQuality(archStat.ballControl, 10), randInRangeWithQuality(archStat.catching, 10), randInRangeWithQuality(archStat.insideTen, 0), randInRangeWithQuality(archStat.closeTen, 0), randInRangeWithQuality(archStat.leftElbow, 0), randInRangeWithQuality(archStat.rightElbow, 0), randInRangeWithQuality(archStat.leftCorner, 0), randInRangeWithQuality(archStat.rightCorner, 0), randInRangeWithQuality(archStat.leftWing, 0), randInRangeWithQuality(archStat.rightWing, 0), randInRangeWithQuality(archStat.leftTwo, 0), randInRangeWithQuality(archStat.rightTwo, 0), randInRangeWithQuality(archStat.centerTwo, 0), randInRangeWithQuality(archStat.centerThree, 0), randInRangeWithQuality(archStat.vertical, 20), randInRangeWithQuality(archStat.hustle, 10), randInRangeWithQuality(archStat.stamina, 10), randInRangeWithQuality(archStat.height, 0), randInRangeWithQuality(archStat.foul, 0), randInRangeWithQuality(archStat.drawFoul, 10), randInRangeWithQuality(archStat.clutch, 20), randInRangeWithQuality(archStat.potential, 20));
        }else if (quality === 2){
            gen = new Player(name, chosenArch, randInRangeWithQuality(archStat.twoPt, 5), randInRangeWithQuality(archStat.threePt, 5), randInRangeWithQuality(archStat.inside, 5), randInRangeWithQuality(archStat.freeThrow, 5), randInRangeWithQuality(archStat.offensiveAbility, 10), randInRangeWithQuality(archStat.defensiveAbility, 10), randInRangeWithQuality(archStat.defensiveReb, 10), randInRangeWithQuality(archStat.offensiveReb, 10), randInRangeWithQuality(archStat.blockTen, 10), randInRangeWithQuality(archStat.stealTen, 10), randInRangeWithQuality(archStat.takeCharges, 5), randInRangeWithQuality(archStat.passingTen, 0), randInRangeWithQuality(archStat.passingAccuracy, 15), randInRangeWithQuality(archStat.passingEff, 10), randInRangeWithQuality(archStat.ballControl, 5), randInRangeWithQuality(archStat.catching, 5), randInRangeWithQuality(archStat.insideTen, 0), randInRangeWithQuality(archStat.closeTen, 0), randInRangeWithQuality(archStat.leftElbow, 0), randInRangeWithQuality(archStat.rightElbow, 0), randInRangeWithQuality(archStat.leftCorner, 0), randInRangeWithQuality(archStat.rightCorner, 0), randInRangeWithQuality(archStat.leftWing, 0), randInRangeWithQuality(archStat.rightWing, 0), randInRangeWithQuality(archStat.leftTwo, 0), randInRangeWithQuality(archStat.rightTwo, 0), randInRangeWithQuality(archStat.centerTwo, 0), randInRangeWithQuality(archStat.centerThree, 0), randInRangeWithQuality(archStat.vertical, 10), randInRangeWithQuality(archStat.hustle, 5), randInRangeWithQuality(archStat.stamina, 5), randInRangeWithQuality(archStat.height, 0), randInRangeWithQuality(archStat.foul, 0), randInRangeWithQuality(archStat.drawFoul, 5), randInRangeWithQuality(archStat.clutch, 10), randInRangeWithQuality(archStat.potential, 10));
        }else{
            gen = new Player(name, chosenArch, randInRangeWithQuality(archStat.twoPt, 0), randInRangeWithQuality(archStat.threePt, 0), randInRangeWithQuality(archStat.inside, 0), randInRangeWithQuality(archStat.freeThrow, 0), randInRangeWithQuality(archStat.offensiveAbility, 0), randInRangeWithQuality(archStat.defensiveAbility, 0), randInRangeWithQuality(archStat.defensiveReb, 0), randInRangeWithQuality(archStat.offensiveReb, 0), randInRangeWithQuality(archStat.blockTen, 0), randInRangeWithQuality(archStat.stealTen, 0), randInRangeWithQuality(archStat.takeCharges, 0), randInRangeWithQuality(archStat.passingTen, 0), randInRangeWithQuality(archStat.passingAccuracy, 0), randInRangeWithQuality(archStat.passingEff, 0), randInRangeWithQuality(archStat.ballControl, 0), randInRangeWithQuality(archStat.catching, 0), randInRangeWithQuality(archStat.insideTen, 0), randInRangeWithQuality(archStat.closeTen, 0), randInRangeWithQuality(archStat.leftElbow, 0), randInRangeWithQuality(archStat.rightElbow, 0), randInRangeWithQuality(archStat.leftCorner, 0), randInRangeWithQuality(archStat.rightCorner, 0), randInRangeWithQuality(archStat.leftWing, 0), randInRangeWithQuality(archStat.rightWing, 0), randInRangeWithQuality(archStat.leftTwo, 0), randInRangeWithQuality(archStat.rightTwo, 0), randInRangeWithQuality(archStat.centerTwo, 0), randInRangeWithQuality(archStat.centerThree, 0), randInRangeWithQuality(archStat.vertical, 0), randInRangeWithQuality(archStat.hustle, 0), randInRangeWithQuality(archStat.stamina, 0), randInRangeWithQuality(archStat.height, 0), randInRangeWithQuality(archStat.foul, 0), randInRangeWithQuality(archStat.drawFoul, 0), randInRangeWithQuality(archStat.clutch, 0), randInRangeWithQuality(archStat.potential, 0));
        }

        listGen.push(gen); //Push newly generated player into allPlayer list to be used
        gen.calcOvr();
    }

    return listGen;
}

//Function for finding totals
function findTotalScore(team1, team2){
    let team1Total = 0;
    team1.players.forEach(player => {
        team1Total += player.pts;
    });

    let team2Total = 0;
    team2.players.forEach(player => {
        team2Total += player.pts;
    });

    return [team1Total, team2Total];
}

//Saving and loading
export function save(players, teams, news = false){
    const strippedPlayers = players.map(player => {
        const copy = { ...player};
        delete copy.team;
        delete copy.otherTeammates;
        delete copy.opponents;
        delete copy.passedFromSomeone;
        return copy;
    });

    const playerPromise = fetch('/api/save-player', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(strippedPlayers)
        })
    .then(res => res.json())
    .then(data => console.log(data.message))
    .catch(err => console.error(err));
    
    teams.forEach(team => {
        team.calcSeed([...allTeams]);
    });

    const strippedTeams = teams.map(team => {
        const copy = {...team};
        delete copy.lineup;
        delete copy.startingLineup;
        delete copy.players;
        delete copy.pg;
        delete copy.sg;
        delete copy.sf;
        delete copy.pf;
        delete copy.c;
        delete copy.sixthMan;
        return copy;
    });

    const teamPromise = fetch('/api/saveTeams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(strippedTeams)
        })
    .then(res => res.json())
    .then(data => console.log(data.message))
    .catch(err => console.error(err));

    const generalsPromise = fetch('/api/saveGeneral', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([day, year])
    }).then(res => res.json()).then(data =>console.log(data.message)).catch(err => console.error(err));
    
    if (news !== false){
        const newsPromise = fetch("/api/saveNews", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(news)
        }).then(res => res.json()).then(data =>console.log(data.message)).catch(err => console.error(err));

        return Promise.all([playerPromise, teamPromise, generalsPromise, newsPromise])
    }else{
        return Promise.all([playerPromise, teamPromise, generalsPromise])
    }

    
}

export async function load(){
    const [teamsRes, playersRes, generalRes, newsRes] = await Promise.all([
        fetch("/api/loadTeams"),
        fetch("/api/load-players"),
        fetch("/api/loadGeneral"),
        fetch("/api/loadNews")
    ]);

    const teamData = await teamsRes.json();
    const playerData = await playersRes.json();
    const generalData = await generalRes.json();
    const loadNews = await newsRes.json();
    
    //Load general data here
    day = generalData[0]["days"];
    year = generalData[0]["years"];

    if (loadNews.length !== 0){
        loadNews.forEach(txt => {
            news.push(txt.txt);
        });
    }


    const teams = teamData.map(p => {
        const team = new Team(p.name, p.inEast, p.abr, []);
        Object.assign(team, {
            wins: p.wins,
            losses: p.losses,
            oldWins: p.oldWins,
            oldLosses: p.oldLosses,
            seed: p.seed,
            oldSeed: p.oldSeed,
            confSeed: p.confSeed,
            oldConfSeed: p.oldConfSeed,

            startingLineupName1: p.startingLineupOne,
            startingLineupName2: p.startingLineupTwo,
            startingLineupName3: p.startingLineupThree,
            startingLineupName4: p.startingLineupFour,
            startingLineupName5: p.startingLineupFive,
            sixManName: p.sixManName,

            games: p.games,

            ptsAvg: p.ptsAvg,
            astAvg: p.astAvg,
            rebAvg: p.rebAvg,
            blkAvg: p.blkAvg,
            stlAvg: p.stlAvg,
            fg: p.fg,
            tp: p.tp,
            ft: p.ft,

            totalPts: p.totalPts,
            totalAst: p.totalAst,
            totalReb: p.totalReb,
            totalStl: p.totalStl,
            totalBlk: p.totalBlk,
            totalFGA: p.totalFGA,
            totalFGM: p.totalFGM,
            totalTPA: p.totalTPA,
            totalTPM: p.totalTPM,
            totalFTA: p.totalFTA,
            totalFTM: p.totalFTM,

            playOffAppearances: p.playOffAppearances,
            finalsAppearances: p.finalsAppearances,
            championships: p.championships,

            ptsLeader: p.ptsLeader,
            ptsLeaderVal: p.ptsLeaderVal,
            astLeader: p.astLeader,
            astLeaderVal: p.astLeaderVal,
            rebLeader: p.rebLeader,
            rebLeaderVal: p.rebLeaderVal,
            stlLeader: p.stlLeader,
            stlLeaderVal: p.stlLeaderVal,
            blkLeader: p.blkLeader,
            blkLeaderVal: p.blkLeaderVal,

            franchiseWins: p.franchiseWins,
            franchiseLosses: p.franchiseLosses,
            playOffWins: p.playOffWins,
            playerOffLosses: p.playerOffLosses,

            money: p.money
        });

        return team;
    });
    allTeams.splice(0, allTeams.length);
    allTeams = [...teams];


    const players = playerData.map(p => {
        const player = new Player(
            p.name, p.arch, p.twoPt, p.threePt, p.inside, p.freeThrow,
            p.offensiveAbility, p.defensiveAbility, p.defensiveReb, p.offensiveReb,
            p.blockTen, p.stealTen, p.takeCharges, p.passingTen, p.passingAccuracy, p.passingEff,
            p.ballControl, p.catching, p.insideTen, p.closeTen, p.leftElbow,
            p.rightElbow, p.leftCorner, p.rightCorner, p.leftWing, p.rightWing,
            p.leftTwo, p.rightTwo, p.centerTwo, p.centerThree, p.vertical,
            p.hustle, p.stamina, p.height, p.foul, p.drawFoul, p.clutch, p.potential
        );
        Object.assign(player, {
            age: p.age,
            yearsPro: p.yearsPro,
            pickNum: p.pickNum,
            pickTeam: p.draftTeam,

            gamesPlayed: p.gamesPlayed,
            gamesStarted: p.gamesStarted,
            avgMin: p.avgMin,
            avgPts: p.avgPts,
            avgAst: p.avgAst,
            avgDReb: p.avgDReb,
            avgOReb: p.avgOReb,
            avgStl: p.avgStl,
            avgBlk: p.avgBlk,
            avgFls: p.avgFls,
            avgTov: p.avgTov,
            fgp: p.fgp,
            tpp: p.tpp,
            ftp: p.ftp,

            ovr: p.ovr,

            career: JSON.parse(p.career),

            seasonTotalMin: p.seasonTotalMin,
            seasonTotalPts: p.seasonTotalPts,
            seasonTotalAst: p.seasonTotalAst,
            seasonTotalOReb: p.seasonTotalOReb,
            seasonTotalDReb: p.seasonTotalDReb,
            seasonTotalStl: p.seasonTotalStl,
            seasonTotalBlk: p.seasonTotalBlk,
            seasonTotalFls: p.seasonTotalFls,
            seasonTotalTov: p.seasonTotalTov,
            seasonTotalFGA: p.seasonTotalFGA,
            seasonTotalFGM: p.seasonTotalFGM,
            seasonTotalTPA: p.seasonTotalTPA,
            seasonTotalTPM: p.seasonTotalTPM,
            seasonTotalFTA: p.seasonTotalFTA,
            seasonTotalFTM: p.seasonTotalFTM,
            seasonTripleDoubles: p.seasonTripleDoubles,
            seasonDoubleDoubles: p.seasonDoubleDoubles,
            seasonQuadDoubles: p.seasonQuadDoubles,

            careerGamesPlayed: p.careerGamesPlayed,
            careerGamesStarted: p.careerGamesStarted,
            careerAvgMin: p.careerAvgMin,
            careerAvgPts: p.careerAvgPts,
            careerAvgAst: p.careerAvgAst,
            careerAvgOReb: p.careerAvgOReb,
            careerAvgDReb: p.careerAvgDReb,
            careerAvgStl: p.careerAvgStl,
            careerAvgBlk: p.careerAvgBlk,
            careerAvgFls: p.careerAvgFls,
            careerAvgTov: p.careerAvgTov,
            careerAvgFG: p.careerAvgFG,
            careerAvgTP: p.careerAvgTP,
            careerAvgFT: p.careerAvgFT,
            careerTotalMin: p.careerTotalMin,
            careerTotalPts: p.careerTotalPts,
            careerTotalAst: p.careerTotalAst,
            careerTotalOReb: p.careerTotalOReb,
            careerTotalDReb: p.careerTotalDReb,
            careerTotalStl: p.careerTotalStl,
            careerTotalBlk: p.careerTotalBlk,
            careerTotalFls: p.careerTotalFls,
            careerTotalTov: p.careerTotalTov,
            careerTotalFGA: p.careerTotalFGA,
            careerTotalFGM: p.careerTotalFGM,
            careerTotalTPA: p.careerTotalTPA,
            careerTotalTPM: p.careerTotalTPM,
            careerTotalFTA: p.careerTotalFTA,
            careerTotalFTM: p.careerTotalFTM,
            careerTripleDoubles: p.careerTripleDoubles,
            careerDoubleDoubles: p.careerDoubleDoubles,
            careerQuadDoubles: p.careerQuadDoubles,

            totalMVPS: p.totalMVPS,
            totalDPOYs: p.totalDPOYs,
            totalROTYs: p.totalROTYs,
            totalSMOTY: p.totalSMOTY,
            mvpNum: p.mvpNum,
            dpoyNum: p.dpoyNum,

            allNBAFirst: p.allNBAFirst,
            allNBASecond: p.allNBASecond,
            allNBAThird: p.allNBAThird,
            allDefensiveFirst: p.allDefensiveFirst,
            allDefensiveSecond: p.allDefensiveSecond,
            allDefensiveThird: p.allDefensiveThird,
            allStar: p.allStar,

            scoringChamp: p.scoringChamp,
            assistChamp: p.assistChamp,
            reboundChamp: p.reboundChamp,
            stealChamp: p.stealChamp,
            blockChamp: p.blockChamp,

            teamName: p.team,

            championships: p.championships,
            finalsMVP: p.finalsMVP,

            happiness: p.happiness,
            contractYears: p.contractYears,
            money: p.money,
            yearsIntoContract: p.yearsIntoContract
        });

        return player;
    });
    allPlayers.splice(0, allPlayers.length);
    allPlayers = [...players];
    freeAgency = [];
    allPlayers.forEach(player => {
        if (player.teamName === "FA"){
            freeAgency.push(player);
        }
        for (let i = 0; i < allTeams.length; i++){
            if (player.name === allTeams[i].startingLineupName1 || player.name === allTeams[i].startingLineupName2 || player.name === allTeams[i].startingLineupName3 || player.name === allTeams[i].startingLineupName4 || player.name === allTeams[i].startingLineupName5){
                if (player.teamName === allTeams[i].abr){
                    allTeams[i].startingLineup.push(player);
                }
            }
            if (allTeams[i].sixManName === player.name && player.teamName === allTeams[i].abr){
                allTeams[i].sixthMan = player;
            }
            if(player.teamName === allTeams[i].abr){
                player.team = allTeams[i];
                allTeams[i].players.push(player);
                break;
            }
        }
       
    });
    allTeamsTemp = [...allTeams];
    console.log("loaded")
}

window.loading = async function (){
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.textContent = "Loading...";
    loadingScreen.style.display = "flex"; 

    await load();
    updateDayAndYearUI();

    loadingScreen.style.display = "none";
}
window.saving = async function(){
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.textContent = "Saving...";
    loadingScreen.style.display = "flex"; 

    await save(allPlayers, allTeams);

    loadingScreen.style.display = "none";
}

//Function for subbing
function subbing(quarter, time, team1, team2, possesion, insertStart = false){
    let teamScores = [];

    teamScores = findTotalScore(team1, team2);
    if (insertStart === false && Math.random() * 7 < 1){
        insertStart = true;
    }
    team1.sub(quarter, time, teamScores[0], teamScores[1], team1, team2, insertStart);
    team2.sub(quarter, time, teamScores[0], teamScores[1], team1, team2, insertStart);

    team1.setOpponentsAndTeammates(team2);
    team2.setOpponentsAndTeammates(team1);

    hasBallPlayer = possesion.lineup[Math.floor(Math.random() * 5)];
    //hasBallPlayer = possesion.pg;
    hasBallPlayer.hasBall = true;
}

//Set teams
const k = genPlayer(allTeams.length * 12 - allPlayers.length);
allPlayers.push(...k);
removePlayers.push(...k);
for (let i=0;i<allTeams.length;i++){
    for (let k=0;k<12;k++){
        const chosenPlayer = removePlayers[Math.floor(Math.random() * removePlayers.length)];
        allTeams[i].players.push(chosenPlayer);
        chosenPlayer.calcOvr();
        chosenPlayer.team = allTeams[i];
        chosenPlayer.teamName = chosenPlayer.team.abr;
        chosenPlayer.money = 1000000
        chosenPlayer.contractYears = Math.round(Math.random() * 4) + 1;
        allTeams[i].money -= chosenPlayer.money;
        removePlayers.splice(removePlayers.indexOf(chosenPlayer), 1);
    }

    allTeams[i].players.sort((a, b) => b.ovr - a.ovr);
    allTeams[i].startingLineup.push(...allTeams[i].players.slice(0, 5));
    allTeams[i].lineup = [...allTeams[i].startingLineup];
    allTeams[i].startingLineupName1 = allTeams[i].startingLineup[0].name;
    allTeams[i].startingLineupName2 = allTeams[i].startingLineup[1].name;
    allTeams[i].startingLineupName3 = allTeams[i].startingLineup[2].name;
    allTeams[i].startingLineupName4 = allTeams[i].startingLineup[3].name;
    allTeams[i].startingLineupName5 = allTeams[i].startingLineup[4].name;
    allTeams[i].sixthMan = allTeams[i].players[5];
    allTeams[i].sixManName = allTeams[i].players[5].name;
    

    allTeams[i].startingLineupBoost();
    allTeams[i].setPositions();
}

document.addEventListener("DOMContentLoaded", async () => {
    if (sessionStorage.getItem("redirect") === "finals") {
        console.log("Redirected from playoffs");
        await load()
        sessionStorage.removeItem("redirect");
        console.log(allTeams)
        console.log(allPlayers);
        updateDayAndYearUI();
    }

});

window.test = function(){
    for(let i = 0; i< (82 - day) * allTeams.length / 2;i++){
        if (allTeamsTemp.length === 0){
            allTeamsTemp = [...allTeams];
        }
        const chosenTeam1 = allTeamsTemp[Math.floor(Math.random() * allTeamsTemp.length)];
        allTeamsTemp.splice(allTeamsTemp.indexOf(chosenTeam1), 1);
        const chosenTeam2 = allTeamsTemp[Math.floor(Math.random() * allTeamsTemp.length)];
        allTeamsTemp.splice(allTeamsTemp.indexOf(chosenTeam2), 1);

        aGame(chosenTeam1, chosenTeam2);
    }
    for (let i = 0; i < 8; i++){
        console.log(allTeams[i].abr + ": " + allTeams[i].wins + ":" + allTeams[i].losses);
    }
    
    day += (82 - day);
    const dayCounter = document.getElementById("dayCounter");
    dayCounter.innerText = "Day: " + day;
}

window.simGame = function(){
    day += 1;
    for(let i = 0; i<1 * allTeams.length / 2;i++){
        if (allTeamsTemp.length === 0){
            allTeamsTemp = [...allTeams];
        }
        const chosenTeam1 = allTeamsTemp[Math.floor(Math.random() * allTeamsTemp.length)];
        allTeamsTemp.splice(allTeamsTemp.indexOf(chosenTeam1), 1);
        const chosenTeam2 = allTeamsTemp[Math.floor(Math.random() * allTeamsTemp.length)];
        allTeamsTemp.splice(allTeamsTemp.indexOf(chosenTeam2), 1);

        aGame(chosenTeam1, chosenTeam2);
    }
}

window.testP = function(){
    playOffs();
}

window.allStars = function(){
    allPlayers.forEach(player => {
        player.calcAwardsVal();
    });

    let savedTeam = [];
    let playerOrder = [];

    allPlayers.sort((a,b) => b.mvpNum - a.mvpNum);

    let allStarTeam1 = [];
    let allStarTeam2 = [];
    for (let i = 0; i < 24; i++){
        playerOrder.push(allPlayers[i]);
        savedTeam.push(allPlayers[i].team);
        allPlayers[i].allStar += 1;
        if (i < 12){
            allStarTeam1.push(allPlayers[i]);
        }else{
            allStarTeam2.push(allPlayers[i]);
        }
    }

    const starTeam1 = new Team("All Star East", true, "ASE", allStarTeam1);
    const starTeam2 = new Team("All Star West", false, "ASW", allStarTeam2);

    starTeam1.players.forEach(player => {
        player.team = starTeam1;
    });

    starTeam2.players.forEach(player => {
        player.team = starTeam2;
;    })

    starTeam1.players.sort((a, b) => b.mvpNum - a.mvpNum);
    starTeam1.startingLineup.push(...starTeam1.players.slice(0, 5));
    starTeam1.lineup = [...starTeam1.startingLineup];

    starTeam2.players.sort((a, b) => b.mvpNum - a.mvpNum);
    starTeam2.startingLineup.push(...starTeam2.players.slice(0, 5));
    starTeam2.lineup = [...starTeam2.startingLineup];

    starTeam1.setPositions();
    starTeam2.setPositions();
    

    aGame(starTeam1, starTeam2, false, 0, true, true);

    for (let i = 0; i < playerOrder.length; i++){
        playerOrder[i].team = savedTeam[i];
    }
}

export function aGame(chosenTeam1, chosenTeam2, playOff = false, series = 0, display = true, allStar = false){

    const team1 = chosenTeam1;
    const team2 = chosenTeam2;
    let quarter = 1;
    const theTime = 12 * 17;
    const subFreq = 100;
    
    //Init teams
    if (day % 20 === 0){
        team1.changeStart();
        team2.changeStart();
    }


    team1.lineup = [...team1.startingLineup];
    team2.lineup = [...team2.startingLineup];
    team1.setOpponentsAndTeammates(team2);
    team2.setOpponentsAndTeammates(team1);


    team1.setPositions();
    team2.setPositions();

    hasBallPlayer = team1.pg;
    for (let i = 0; i < theTime; i++){ //Quarter 1
        hasBallPlayer.playerPossesion(hasBallPlayer.opponents[Math.floor(Math.random() * hasBallPlayer.opponents.length)])
        if (i % (theTime / 12) === 0){
            team1.updateMin();
            team2.updateMin();
        }
        if (i % subFreq){
            subbing(quarter, i, team1, team2, hasBallPlayer.team)
        }
    }
    subbing(quarter + 1, 0, team1, team2, team1);

    quarter += 1;
    for (let i = 0; i < theTime; i++){ //Quarter 2
        hasBallPlayer.playerPossesion(hasBallPlayer.opponents[Math.floor(Math.random() * hasBallPlayer.opponents.length)])
        if (i % (theTime / 12) === 0){
            team1.updateMin();
            team2.updateMin();
        }
        if (i % subFreq){
            subbing(quarter, i, team1, team2, hasBallPlayer.team)
        }
    }
    subbing(quarter + 1, 0, team1, team2, team2, true);

    quarter += 1;
    for (let i = 0; i < theTime; i++){ //Quarter 3
        hasBallPlayer.playerPossesion(hasBallPlayer.opponents[Math.floor(Math.random() * hasBallPlayer.opponents.length)])
        if (i % (theTime / 12) === 0){
            team1.updateMin();
            team2.updateMin();
        }
        if (i % subFreq){
            subbing(quarter, i, team1, team2, hasBallPlayer.team)
        }
    }
    subbing(quarter + 1, 0, team1, team2, team2);

    quarter += 1;
    for (let i = 0; i < theTime; i++){ //Quarter 4
        hasBallPlayer.playerPossesion(hasBallPlayer.opponents[Math.floor(Math.random() * hasBallPlayer.opponents.length)])
        if (i % (theTime / 12) === 0){
            team1.updateMin();
            team2.updateMin();
        }
        if (i % subFreq){
            subbing(quarter, i, team1, team2, hasBallPlayer.team)
        }
    }

    let teamScores = findTotalScore(team1, team2);
    while (true) { 
        if (teamScores[0] > teamScores[1]){
            if (!playOff){
                team1.wins += 1;
                team2.losses += 1;
                team1.franchiseWins += 1;
                team2.franchiseLosses += 1;
            }else{
                team1.playOffWins += 1;
                team2.playerOffLosses += 1;

                team1.playOffWinTemp += 1;
            }
            break;
        }else if (teamScores[0] < teamScores[1]){
            if (!playOff){
                team1.losses += 1;
                team2.wins += 1;
                team1.franchiseLosses += 1;
                team2.franchiseWins += 1;
            }else{
                team1.playerOffLosses += 1;
                team2.playOffWins += 1;

                team2.playOffWinTemp += 1;
            }
            
            break;
        }else{ //Overtime
            subbing(quarter, 0, team1, team2, team1, true);
            quarter += 1;
            for (let i = 0; i < 240; i++){ //OT
                hasBallPlayer.playerPossesion(hasBallPlayer.opponents[Math.floor(Math.random() * hasBallPlayer.opponents.length)])
                if (i % 20 === 0){
                    team1.updateMin();
                    team2.updateMin();
                }
                if (i % subFreq){
                    subbing(quarter, i, team1, team2, hasBallPlayer.team)
                }
            }
            teamScores = findTotalScore(team1, team2);
        }
    }
    
    if (display === true){
        displayGame(team1, team2, teamScores[0], teamScores[1], playOff);
    }

    if (allStar === false){
        team1.calcTeamAvg();
        team2.calcTeamAvg();

        team1.players.forEach(player => {
            if (!playOff){
                player.statsUpdate();
            }else{
                player.statsPlayoffs(series)
            }
            
        });
        team2.players.forEach(player => {
            if (!playOff){
                player.statsUpdate();
            }else{
                player.statsPlayoffs(series)
            }
        });
    }else{
        team1.players.forEach(player => {
            player.resetAllStar();
        });

        team2.players.forEach(player => {
            player.resetAllStar();
        });
    }

    if (day > 42){
        document.getElementById("allStarButton").style.display = "block";
    }
    
}

function playOffs(){
    //Calc awards
    let mvp = null;
    let dpoy = null;
    let roty = null;
    let smoty = null;

    allPlayers.forEach(player => {
        player.calcAwardsVal();
    });
    
    const tempPlayers = allPlayers.filter(player => player.teamName !== "FA");
    //Champs
    tempPlayers.sort((a,b)=>b.avgPts - a.avgPts);
    tempPlayers[0].scoringChamp += 1;
    tempPlayers.sort((a,b)=>(b.avgDReb + b.avgOReb) - (a.avgDReb + b.avgOReb));
    tempPlayers[0].reboundChamp += 1;
    tempPlayers.sort((a,b)=>b.avgAst - a.avgAst);
    tempPlayers[0].assistChamp += 1;
    tempPlayers.sort((a,b)=>b.avgStl - a.avgStl);
    tempPlayers[0].stealChamp += 1;
    tempPlayers.sort((a,b)=>b.avgBlk - a.avgBlk);
    tempPlayers[0].blockChamp += 1;

    allTeams.forEach(team => {
        team.calcSeed([...allTeams]);
    });

    //MVP and DPOY
    tempPlayers.sort((a,b)=>(b.mvpNum - b.team.seed) - (a.mvpNum - a.team.seed));
    tempPlayers[0].totalMVPS += 1;
    mvp = tempPlayers[0];

    for (let i = 0; i<15; i++){
        if (i <= 4){
            tempPlayers[i].allNBAFirst += 1;
        }else if (i<= 9){
            tempPlayers[i].allNBASecond += 1;
        }else{
            tempPlayers[i].allNBAThird += 1;
        }
    }

    const dpoyTempList = allPlayers.filter(player => player.teamName !== "FA");;
    dpoyTempList.sort((a,b)=>b.dpoyNum - a.dpoyNum);
    dpoyTempList[0].totalDPOYs += 1;
    dpoy = dpoyTempList[0];

    for (let i = 0; i<15; i++){
        if (i <= 4){
            dpoyTempList[i].allDefensiveFirst += 1;
        }else if (i<= 9){
            dpoyTempList[i].allDefensiveSecond += 1;
        }else{
            dpoyTempList[i].allDefensiveThird += 1;
        }
    }
    //ROTY and SMOTY
    const rookies = allPlayers.filter(player => player.yearsPro <= 1);
    if (rookies.length !== 0){
        rookies.sort((a,b) => b.mvpNum - a.mvpNum)
        rookies[0].totalROTYs += 1;
        roty = rookies[0];
    }else{
        roty = null;
    }

    let smotyList = [];
    allTeams.forEach(team => {
        smotyList.push(team.sixthMan);
    });
    
    smotyList.sort((a,b) => b.mvpNum - a.mvpNum);
    smoty = smotyList[0];
    smoty.totalSMOTY += 1;
    


    displayAwards(mvp, dpoy, tempPlayers, dpoyTempList, roty, smoty);

}




