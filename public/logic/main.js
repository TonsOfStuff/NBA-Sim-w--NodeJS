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
    teamStuff.style.display = "flex";
    teamStuff.style.alignItems = "center";
    teamStuff.style.columnGap = "30px";
    let teamImg = document.createElement("img");
    let teamStat = document.createElement("div");
    teamStat.style.fontSize = "20px";
    teamImg.style.width = "50px";
    teamImg.src = `../images/${team1.abr}.svg`;
    teamStat.innerText = team1.name + ": " + team1Score;

    teamStuff.appendChild(teamImg);
    teamStuff.appendChild(teamStat);
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
    teamStuff.style.display = "flex";
    teamStuff.style.alignItems = "center";
    teamStuff.style.columnGap = "30px";
    teamStat = document.createElement('div');
    teamImg = document.createElement('img');
    teamStat.style.fontSize = "20px";
    teamImg.style.width = "50px";
    teamImg.src = `../images/${team2.abr}.svg`;
    teamStat.innerText = team2.name + ": " + team2Score;

    teamStuff.appendChild(teamImg);
    teamStuff.appendChild(teamStat);
    main.appendChild(teamStuff);

    if (!window.location.pathname.includes("playoff.html")){
        updateCalender(focusedTeam);
    }
}

function displayAwards(mvp, dpoy, tempList, dpoyTempList, roty, smoty){
    while (main.firstChild){
        main.removeChild(main.firstChild);
    }

    const mvpStats = document.createElement("div");
    mvpStats.innerText = "MVP: " + mvp.name + "|Min:" + mvp.avgMin + "|Pts:" + mvp.avgPts + "|Reb:" + (mvp.avgOReb + mvp.avgDReb).toFixed(1) + "|DReb:" + mvp.avgDReb + "|OReb:" + mvp.avgOReb + "|Ast:" + mvp.avgAst + "|Stl:" + mvp.avgStl + "|Blk:" + mvp.avgBlk + "|Fls:" + mvp.avgFls + "|Tov:" + mvp.avgTov + "|FG%:" + mvp.fgp + "|3P%:" + mvp.tpp + "|FT%:" + mvp.ftp;
    const dpoyStats = document.createElement("div");
    dpoyStats.innerText = "DPOY: " + dpoy.name + "|Min:" + dpoy.avgMin + "|Pts:" + dpoy.avgPts + "|Reb:" + (dpoy.avgOReb + dpoy.avgDReb).toFixed(1) + "|DReb:" + dpoy.avgDReb + "|OReb:" + dpoy.avgOReb + "|Ast:" + dpoy.avgAst + "|Stl:" + dpoy.avgStl + "|Blk:" + dpoy.avgBlk + "|Fls:" + dpoy.avgFls + "|Tov:" + dpoy.avgTov + "|FG%:" + dpoy.fgp + "|3P%:" + dpoy.tpp + "|FT%:" + dpoy.ftp;
    const rotyStats = document.createElement("div");
    if (roty !== null){
        rotyStats.innerText = "ROTY: " + roty.name + "|Min:" + roty.avgMin + "|Pts:" + roty.avgPts + "|Reb:" + (roty.avgOReb + roty.avgDReb).toFixed(1) + "|DReb:" + roty.avgDReb + "|OReb:" + roty.avgOReb + "|Ast:" + roty.avgAst + "|Stl:" + roty.avgStl + "|Blk:" + roty.avgBlk + "|Fls:" + roty.avgFls + "|Tov:" + roty.avgTov + "|FG%:" + roty.fgp + "|3P%:" + roty.tpp + "|FT%:" + roty.ftp;
    }else{
        rotyStats.innerText = "ROTY: N/A"
    }
    const smotyStats = document.createElement("div");
    smotyStats.innerText = "SMOTY: " + smoty.name + "|Min:" + smoty.avgMin + "|Pts:" + smoty.avgPts + "|Reb:" + (smoty.avgOReb + smoty.avgDReb).toFixed(1) + "|DReb:" + smoty.avgDReb + "|OReb:" + smoty.avgOReb + "|Ast:" + smoty.avgAst + "|Stl:" + smoty.avgStl + "|Blk:" + smoty.avgBlk + "|Fls:" + smoty.avgFls + "|Tov:" + smoty.avgTov + "|FG%:" + smoty.fgp + "|3P%:" + smoty.tpp + "|FT%:" + smoty.ftp;

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

    allPlayers.forEach(player => {
        player.addToCareer(year);
    });

    const contButton = document.createElement("button");
    contButton.innerText = "Continue"
    contButton.addEventListener("click", async () => {
        let o = {"MVP": mvp.name, "DPOY": dpoy.name, "ROTY": roty!==null ? roty.name:"N/A", "SMOTY": smoty.name};
        leagueHistory[year] = o;

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
const michaelJordan = new Player("Michael Jordan", "Slasher All", 99, 90, 99, 93, 99, 99, 39, 21, 82, 97, 53, 32, 92, 32, 96, 95, 99, 99, 99, 99, 58, 67, 79, 77, 99, 99, 99, 99, 99, 52, 93, 78, 34, 48, 99, 99, 99)
const lebron = new Player("LeBron James", "All", 95, 93, 97, 76, 99, 86, 42, 21, 88, 45, 42, 35, 94, 81, 97, 99, 95, 91, 82, 87, 32, 32, 82, 85, 82, 90, 98, 95, 83, 79, 92, 81, 37, 42, 99, 99, 99)
const kareem = new Player("Kareem Abdul-Jabbar", "Inside Post-player", 92, 0, 99, 73, 99, 99, 93, 87, 94, 31, 2, 30, 13, 12,57, 78, 96, 99, 42, 49, 0, 0, 0, 0, 95, 96, 62, 0, 54, 21, 78, 85, 40, 40, 95, 95, 99);
const duncan = new Player("Tim Duncan", "Inside Defensive", 96, 50, 99, 80, 95, 99, 80, 90, 95, 82, 76, 35, 42, 48,52, 80, 91, 97, 96, 90, 0, 0, 1, 1, 92, 90, 97, 0, 31, 27, 76, 83, 38, 39, 93, 98, 99);
const bird = new Player("Larry Bird", "All", 98, 98, 91, 94, 99, 76, 52, 21, 42, 88, 15, 39, 94, 50, 82, 90, 87, 85, 95, 99, 94, 92, 90, 67, 84, 88, 42, 83, 45, 69, 91, 81, 33, 37, 99, 92, 99);
const magicJohnson = new Player("Magic Johnson", "Playmaker Inside", 98, 80, 97, 85, 96, 93, 47, 33, 72, 79, 62, 53, 99, 99, 94, 91, 99, 99, 92, 90, 1, 1, 2, 1, 87, 88, 99, 3, 81, 93, 90, 81, 35, 42, 98, 89, 99);
const kobe = new Player("Kobe Bryant", "Slasher", 93, 92, 93, 90, 99, 92, 34, 22, 82, 80, 22, 21, 46, 15, 89, 88, 90, 83, 98, 73, 34, 21, 85, 88, 83, 72, 76, 77, 80, 77, 91, 78, 33, 40, 99, 99, 99);
const shaq = new Player("Shaquille O'Neal", "Inside Post-player", 92, 0, 99, 55, 99, 88, 87, 80, 85, 21, 1, 28, 21, 26, 68, 92, 99, 99, 45, 43, 0, 0, 0, 0, 0, 0, 0, 0, 83, 14, 70, 85, 42, 45, 95, 99, 99);
const curry = new Player("Stephen Curry", "Shooter Playmaker", 99, 99, 81, 99, 99, 67, 10, 5, 22, 90, 34, 45, 87, 75, 95, 90, 88, 47, 77, 78, 90, 90, 83, 99, 61, 65, 54, 99, 62, 47, 97, 75, 34, 38, 98, 90, 99);
const hakeem = new Player("Hakeem Olajuwan", "Inside Post-player", 94, 0, 99, 78, 95, 99, 76, 76, 99, 40, 31, 38, 44, 32, 77, 79, 93, 93, 95, 90, 0, 0, 0, 0, 36, 44, 30, 0, 62, 33, 78, 84, 38, 38, 93, 93, 99);
const billRussell = new Player("Bill Russell", "Defensive Post-player", 90, 0, 99, 65, 84, 99, 99, 99, 99, 80, 77, 52, 83, 43, 77, 91, 99, 99, 21, 20, 0,0, 0, 0, 10, 15, 14, 0, 82, 65, 81, 82, 40, 40, 87, 80, 99);
const wilt = new Player("Wilt Chamberlain", "All Post-player", 97, 0, 99, 72, 99, 98, 99, 99, 99, 54, 21, 50, 82, 33, 88, 80, 99, 99, 87, 88, 0, 0, 0, 0, 54, 50, 33, 0, 99, 65, 94, 85, 48, 36, 71, 87, 99);
const durant = new Player("Kevin Durant", "Two-way Shooter", 98, 98, 90, 95, 97, 81, 54, 40, 77, 62, 12, 33, 47, 31, 91, 82, 93, 47, 90, 90, 32, 21, 99, 80, 76, 80, 89, 99, 76, 22, 78, 83, 41, 38, 92, 92, 99);
const wemby = new Player("Victor Wembanyama", "Two-way Defensive", 97, 91, 98, 84, 97, 99, 71, 55, 99, 82, 22, 37, 83, 38, 90, 82, 98, 99, 71, 63, 80, 62, 88, 92, 99, 99, 83, 99, 53, 77, 85, 90, 42, 38, 96, 99, 99);
const doncic = new Player("Luka Doncic", "All Playmakers", 96, 95, 94, 82, 99, 48, 78, 66, 32, 44, 12, 41, 98, 90, 82, 88, 99, 92, 20, 12, 95, 90, 86, 88, 91, 90, 32, 99, 42, 33, 74, 78, 38, 43, 99, 95, 99);
const jokic = new Player("Nikola Jokic", "Playmaker Inside", 96, 94, 98, 79, 99, 73, 87, 62, 34, 53, 33, 50, 99, 99, 93, 77, 99, 99, 72, 80, 0, 0, 65, 82, 45, 55, 88, 90, 23, 31, 69, 83, 38, 34, 93, 99, 99);
const giannis = new Player("Giannis Antetokounmpo", "Inside All", 95, 79, 99, 70, 99, 93, 80, 72, 89, 53, 34, 41, 74, 86, 83, 82, 99, 99, 90, 90, 1, 1, 1, 2, 30, 33, 22, 10, 80, 84, 89, 83, 36, 50, 97, 97, 99);
const shai = new Player("Shai Gilgeous Alexander", "Slasher", 90, 87, 94, 90, 92, 71, 25, 17, 46, 80, 21, 37, 23, 14, 92, 90, 90, 83, 89, 89, 18, 17, 29, 37, 82, 79, 93, 6, 45, 50, 91, 78, 36, 43, 95, 93, 99);
const tatum = new Player("Jayson Tatum", "All Two-way", 95, 92, 94, 85, 93, 87, 34, 24, 75, 79, 44, 37, 82, 35, 82, 90, 94, 90, 86, 72, 13, 15, 82, 80, 34, 90, 32, 99, 75, 63, 81, 80, 40, 34, 89, 92, 97);
const ant = new Player("Anthony Edwards", "Slasher Shooter", 92, 96, 97, 83, 96, 80, 23, 19, 80, 75, 10, 34, 56, 28, 93, 90, 99, 93, 25, 29, 39, 59, 90, 82, 98, 93, 70, 34, 96, 22, 90, 76, 41, 39, 93, 90, 99);
const oscar = new Player("Oscar Robertson", "All Playmaker", 94, 83, 97, 90, 97, 53, 60, 32, 33, 72, 10, 48, 94, 96, 92, 87, 90, 97, 94, 99, 32, 10, 4, 7, 30, 33, 55, 11, 66, 69, 77, 77, 33, 37, 92, 96, 99);
const dirk = new Player("Dirk Nowitzki", "Shooter", 96, 92, 90, 87, 97, 68, 42, 10, 70, 75, 18, 38, 42, 53, 88, 94, 92, 93, 99, 90, 13, 10, 32, 11, 56, 78, 77, 80, 32, 43, 80, 84, 40, 38, 95, 91, 99);
const iverson = new Player("Allen Iverson", "Slasher Shooter", 93, 89, 87, 81, 97, 58, 15, 9, 20, 96, 58, 36, 88, 11, 99, 85, 88, 87, 90, 82, 57, 60, 79, 61, 88, 87, 85, 68, 90, 95, 90, 72, 30, 38, 99, 90, 99);
const stockton = new Player("John Stockton", "Playmaker Defensive", 90, 85, 87, 86, 88, 89, 24, 18, 24, 99, 90, 50, 98, 99, 89, 83, 70, 68, 74, 73, 69, 26, 31, 53, 80, 80, 78, 72, 74, 91, 84, 73, 28, 31, 95, 79, 98);
const malone = new Player("Karl Malone", "Inside Post-player", 95, 0, 99, 76, 93, 87, 68, 65, 76, 38, 22, 36, 40, 28, 77, 85, 94, 96, 75, 71, 0, 0, 0, 0, 93, 88, 94, 0, 84, 79, 89, 81, 35, 38, 93, 89, 98);
const drexler = new Player("Clyde Drexler", "Slasher Two-way", 95, 89, 94, 78, 95, 84, 35, 24, 40, 81, 45, 36, 60, 67, 88, 84, 85, 83, 87, 81, 64, 68, 77, 80, 78, 80, 79, 82, 89, 87, 82, 78, 36, 34, 92, 88, 97);
const isiah = new Player("Isiah Thomas", "Playmaker", 93, 81, 95, 85, 94, 79, 20, 12, 18, 93, 71, 44, 93, 95, 91, 85, 86, 84, 85, 84, 74, 76, 81, 79, 83, 84, 81, 75, 85, 88, 85, 74, 32, 35, 95, 90, 97);
const pippen = new Player("Scottie Pippen", "All Defensive", 93, 88, 92, 79, 87, 98, 50, 42, 88, 88, 55, 41, 74, 50, 82, 83, 86, 85, 83, 88, 82, 80, 84, 86, 82, 85, 84, 88, 86, 90, 90, 79, 33, 36, 90, 85, 98);
const moses = new Player("Moses Malone", "Inside Post-player", 90, 0, 99, 78, 97, 87, 92, 99, 68, 33, 22, 36, 30, 16, 65, 90, 99, 99, 65, 62, 0, 0, 0, 0, 94, 92, 91, 0, 87, 76, 89, 84, 41, 37, 88, 90, 97);
const brunson = new Player("Jalen Brunson", "Shooter Slasher", 94, 94, 90, 89, 92, 65, 19, 10, 43, 82, 33, 38, 56, 47, 90, 98, 95, 95, 32, 34, 44, 56, 25, 92, 89, 90, 76, 88, 50, 73, 77, 74, 40, 40, 97, 91, 99);
const jimmyButler = new Player("Jimmy Butler", "Two-way Slasher", 96, 85, 91, 85, 94, 94, 48, 35, 58, 85, 45, 41, 78, 72, 88, 91, 89, 88, 77, 76, 31, 28, 62, 58, 82, 93, 90, 40, 78, 94, 92, 79, 35, 40, 95, 86, 97);
const traeYoung = new Player("Trae Young", "Playmaker Shooter", 85, 96, 72, 90, 92, 58, 12, 9, 18, 45, 28, 42, 88, 85, 98, 80, 70, 58, 64, 69, 93, 87, 92, 91, 55, 42, 70, 95, 32, 41, 85, 73, 20, 32, 89, 83, 96);
const demarDeRozan = new Player("DeMar DeRozan", "Slasher Shooter", 95, 75, 93, 84, 92, 73, 22, 18, 22, 50, 30, 36, 58, 60, 86, 88, 93, 91, 95, 93, 35, 38, 72, 70, 92, 88, 86, 20, 74, 65, 90, 78, 30, 33, 90, 87, 94);
const paulGeorge = new Player("Paul George", "Two-way Shooter", 92, 91, 86, 87, 91, 92, 42, 9, 52, 87, 35, 40, 58, 32, 87, 90, 84, 84, 89, 87, 91, 90, 84, 81, 84, 83, 83, 64, 76, 70, 87, 80, 32, 36, 92, 88, 95);
const kawhiLeonard = new Player("Kawhi Leonard", "Two-way Defensive", 94, 91, 92, 85, 89, 97, 64, 40, 78, 90, 22, 37, 85, 30, 84, 89, 92, 92, 90, 89, 62, 64, 86, 87, 83, 80, 86, 47, 77, 72, 85, 78, 28, 30, 97, 99, 99);
const dame = new Player("Damian Lillard", "Shooter Slasher", 92, 97, 79, 89, 93, 60, 12, 6, 24, 60, 29, 39, 82, 70, 91, 87, 86, 72, 81, 83, 90, 93, 90, 89, 66, 55, 50, 90, 65, 58, 89, 74, 33, 39, 95, 85, 98);
const pennyHardaway = new Player("Penny Hardaway", "All Playmaker", 94, 82, 92, 86, 92, 74, 44, 22, 45, 65, 40, 39, 87, 40, 91, 84, 86, 87, 89, 88, 50, 55, 70, 68, 88, 85, 85, 48, 78, 80, 85, 80, 36, 38, 91, 85, 96);
const reggieMiller = new Player("Reggie Miller", "Shooter", 95, 99, 70, 92, 92, 65, 24, 9, 20, 44, 22, 36, 79, 28, 82, 83, 70, 68, 89, 91, 99, 97, 84, 85, 74, 73, 76, 99, 54, 50, 84, 78, 34, 34, 89, 90, 94);
const yaoMing = new Player("Yao Ming", "Inside Post-player", 92, 0, 99, 83, 88, 80, 95, 84, 76, 25, 12, 40, 60, 55, 52, 82, 98, 96, 65, 67, 0, 0, 0, 0, 66, 61, 78, 0, 40, 38, 72, 90, 44, 36, 84, 86, 91);
const benWallace = new Player("Ben Wallace", "Defensive Post-player", 72, 0, 95, 42, 66, 99, 99, 98, 92, 66, 45, 36, 80, 48, 52, 70, 91, 90, 20, 22, 0, 0, 0, 0, 40, 35, 52, 0, 90, 99, 87, 81, 47, 25, 88, 78, 89);
const joelEmbiid = new Player("Joel Embiid", "Inside Post-player", 94, 85, 99, 81, 95, 88, 90, 88, 91, 38, 20, 36, 54, 38, 75, 82, 98, 96, 63, 66, 20, 18, 30, 34, 78, 75, 85, 50, 72, 72, 88, 84, 42, 42, 93, 93, 98);
const zachLaVine = new Player("Zach LaVine", "Slasher Shooter", 91, 90, 89, 85, 90, 65, 20, 14, 38, 58, 21, 35, 67, 42, 91, 86, 87, 84, 81, 90, 80, 70, 80, 78, 71, 67, 75, 88, 98, 72, 85, 77, 34, 36, 90, 87, 93);
const chrisPaul = new Player("Chris Paul", "Playmaker", 92, 91, 75, 93, 90, 82, 11, 2, 20, 95, 66, 47, 97, 99, 94, 85, 72, 70, 76, 77, 84, 82, 78, 80, 68, 70, 65, 84, 62, 70, 86, 72, 30, 30, 88, 92, 91);
const russellWestbrook = new Player("Russell Westbrook", "Slasher Playmaker", 90, 80, 99, 76, 92, 75, 45, 38, 58, 60, 35, 40, 86, 87, 94, 88, 97, 97, 62, 73, 21, 27, 46, 48, 76, 74, 73, 75, 99, 99, 84, 76, 40, 38, 94, 95, 96);
const chrisWebber = new Player("Chris Webber", "Inside Playmaker", 93, 40, 94, 79, 89, 82, 74, 66, 65, 42, 20, 35, 60, 48, 74, 82, 92, 90, 55, 60, 14, 11, 30, 25, 77, 70, 76, 20, 74, 72, 86, 82, 38, 37, 89, 83, 91);
const kevinGarnett = new Player("Kevin Garnett", "Two-way Post-player", 97, 65, 99, 80, 90, 97, 85, 84, 92, 64, 40, 35, 54, 28, 78, 84, 97, 94, 66, 69, 0, 1, 1, 0, 74, 70, 82, 0, 90, 90, 87, 83, 42, 39, 93, 89, 97);
const manuGinobili = new Player("Manu Ginobili", "Slasher Shooter", 92, 90, 88, 84, 87, 78, 29, 18, 33, 74, 55, 40, 84, 36, 88, 87, 82, 81, 85, 86, 87, 88, 78, 79, 72, 70, 73, 78, 76, 68, 85, 78, 32, 34, 92, 82, 93);
const kevinMcHale = new Player("Kevin McHale", "Inside Post-player", 94, 20, 97, 73, 86, 91, 84, 82, 90, 32, 18, 34, 48, 50, 64, 78, 94, 91, 58, 61, 0, 0, 0, 0, 70, 68, 81, 0, 72, 66, 82, 82, 39, 36, 85, 83, 91);
const rudyGobert = new Player("Rudy Gobert", "Defensive Post-player", 70, 0, 90, 64, 78, 98, 98, 92, 97, 28, 12, 35, 30, 11, 52, 72, 90, 87, 30, 28, 0, 0, 0, 0, 40, 35, 50, 0, 88, 91, 83, 85, 44, 30, 80, 74, 88);
const andreIguodala = new Player("Andre Iguodala", "All Defensive", 85, 82, 80, 76, 84, 92, 42, 33, 58, 81, 50, 37, 79, 52, 85, 80, 78, 76, 70, 72, 63, 61, 70, 69, 75, 72, 68, 66, 84, 85, 82, 78, 30, 28, 88, 81, 90);
const jamesHarden = new Player("James Harden", "Shooter Slasher", 92, 96, 90, 88, 97, 83, 21, 14, 42, 79, 23, 38, 90, 33, 94, 86, 92, 90, 87, 88, 54, 56, 94, 95, 22, 19, 18, 99, 40, 27, 81, 78, 38, 43, 79, 91, 95);

export let allPlayers = [michaelJordan, lebron, kareem, duncan, bird, magicJohnson, kobe, shaq, curry, hakeem, billRussell, wilt, durant, wemby, doncic, jokic, giannis, shai,
    tatum, ant, oscar, dirk, iverson, stockton, malone, drexler, isiah, pippen, moses, brunson, jimmyButler, traeYoung, demarDeRozan, paulGeorge, kawhiLeonard, dame, pennyHardaway, reggieMiller,
    yaoMing, benWallace, joelEmbiid, zachLaVine, chrisPaul, russellWestbrook, chrisWebber, kevinGarnett, manuGinobili, kevinMcHale, rudyGobert, andreIguodala, jamesHarden
];
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
const nets = new Team("Brooklyn Nets", true, "BKN", []);
const hornets = new Team("Charlotte Hornets", true, "CHA", []);
const wizards = new Team("Washington Wizards", true, "WAS", []);
const pelicans = new Team("New Orleans Pelicans", false, "NOP", []);
const suns = new Team("Phoenix Suns", false, "PHX", []);
const trailblazers = new Team("Portland Traiblazers", false, "POR", []);

export let allTeams = [bulls, lakers, celtics, pacers, kings, okc, knicks, timberwolves, heat, raptors, clippers, jazz, cavs, rockets, spurs, magic, sixers, grizzlies, warriors, 
    bucks, pistons, hawks, nuggets, mavs, nets, hornets, wizards, pelicans, suns, trailblazers
];
let allTeamsTemp = [...allTeams];
export let freeAgency = [];
let news = [];
let leagueHistory = {};
export function addLeagueHistory(winner, award, yearT){
    leagueHistory[yearT][award] = winner;
}

//Global variables
let hasBallPlayer = null;
export function hasBallPlayerSetter(player){
    hasBallPlayer = player;
}

let day = 0;
export function setDay(daySet){
    day = daySet;
}
export let year = 1;
export function setYear(yearSet){
    year += yearSet;
}
let simmedAllStar = false;
export function setAllStarSimmed(val){
    simmedAllStar = val;
}

//Generate the calender and what teams play who at what date
const assignments = {};
function genComp(){
    for(let k = 0; k < 82; k++){
        assignments[(k + 1).toString()] = [];
        for(let i = 0; i<1 * allTeams.length / 2;i++){
            if (allTeamsTemp.length === 0){
                allTeamsTemp = [...allTeams];
            }
            const chosenTeam1 = allTeamsTemp[Math.floor(Math.random() * allTeamsTemp.length)];
            allTeamsTemp.splice(allTeamsTemp.indexOf(chosenTeam1), 1);
            const chosenTeam2 = allTeamsTemp[Math.floor(Math.random() * allTeamsTemp.length)];
            allTeamsTemp.splice(allTeamsTemp.indexOf(chosenTeam2), 1);

            assignments[(k + 1).toString()].push([chosenTeam1, chosenTeam2]);
        }
    }
}
genComp();

let focusNum = 0;
let focusedTeam = allTeams[focusNum];
function nextTeam(){
    focusNum += 1;
    if (focusNum >= 30){
        focusNum = 0;
    }
    focusedTeam = allTeams[focusNum];
    document.getElementById("changeTeamImg").src = `../images/${focusedTeam.abr}.svg`
    updateCalender(focusedTeam);
}
function prevTeam(){
    focusNum -= 1;
    if (focusNum < 0){
        focusNum = 29;
    }
    focusedTeam = allTeams[focusNum];
    document.getElementById("changeTeamImg").src = `../images/${focusedTeam.abr}.svg`
    updateCalender(focusedTeam);
}



//Update calender
let pageNum = 1;
function updateCalender(chosenTeam = null, page = 0){
    if (chosenTeam === null){
        allTeams.forEach(team => {
            if (team.abr === "BOS"){
                chosenTeam = team;
            }
        });;
    }
    if (day < 42){
        pageNum = 1;
    }else{
        pageNum = 2;
    }
    if (page === 2){
        pageNum = 2;
    }else if (page === 1){
        pageNum = 1;
    }
    document.getElementById("nextCalenderPage").innerText = pageNum;

    if (pageNum === 1){
        let dayCounter = 0;
        pageNum = 2;
        const calender = document.getElementById("calenderBody");
        while (calender.firstChild){
            calender.removeChild(calender.firstChild);
        }
        for (let i = 0; i < 6; i++){
            const row = document.createElement("tr");
            for (let k = 0; k < 7; k++){
                dayCounter += 1;
                if (dayCounter > 41){
                    const td = document.createElement("td");
                    td.className = "calenderDate";

                    const container = document.createElement("div");
                    container.className = "calenderContainer"
                    const dateNum = document.createElement("div");
                    dateNum.style.position = "absolute";
                    dateNum.style.top = "0";
                    dateNum.style.fontSize = "1vw";
                    dateNum.innerText = "All Star";
                    container.appendChild(dateNum);
                    const dateInfo = document.createElement("div");
                    dateInfo.style.display = "flex";
                    dateInfo.style.justifyContent = "space-around";
                    dateInfo.style.alignItems = "center";
                    const text = document.createElement("div");
                    text.style.fontSize = "1.2vw";
                    text.innerText = "vs"
                    
                    const team1Img = document.createElement("img");
                    const team2Img = document.createElement("img");
                    const team1Cap = document.createElement("figcaption");
                    const team2Cap = document.createElement("figcaption");
                    const team1Fig = document.createElement("figure");
                    const team2Fig = document.createElement("figure");
                    team1Fig.appendChild(team1Img);
                    team1Fig.appendChild(team1Cap);
                    team2Fig.appendChild(team2Img);
                    team2Fig.appendChild(team2Cap);
                    team1Fig.style.margin = "0px";
                    team2Fig.style.margin = "0px";
                    team1Fig.style.justifyItems = "center";
                    team2Fig.style.justifyItems = "center";
                    team1Cap.style.fontSize = "0.8vw";
                    team2Cap.style.fontSize = "0.8vw";


                    dateInfo.appendChild(team1Fig);
                    dateInfo.appendChild(text);
                    dateInfo.appendChild(team2Fig);

                    team1Img.style.width = "3vw";
                    team1Img.src = `../images/ASE.svg`
                    team1Cap.innerText = "EAST";

                    team2Img.style.width = "3vw";
                    team2Img.src = `../images/ASW.svg`
                    team2Cap.innerText = "WEST";

                    container.appendChild(dateInfo);

                    td.appendChild(container);
                    row.appendChild(td);

                    if (simmedAllStar === true || simmedAllStar === 1){
                        td.style.backgroundColor = "rgba(0, 0, 0, 0.26)";
                    }else{
                        td.addEventListener("click", () => {
                            const panel = document.getElementById("controlPanel");
                            panel.style.display = "grid";
                            panel.children[1].children[2].onclick = () => {
                                panel.style.display = "none";
                            }
                            panel.children[0].children[0].children[0].style.height = "9vw";
                            panel.children[0].children[0].children[0].src = `../images/ASE.svg`
                            panel.children[0].children[0].children[1].innerText = "ASE"

                            panel.children[0].children[2].children[0].style.height = "9vw";
                            panel.children[0].children[2].children[0].src = `../images/ASW.svg`
                            panel.children[0].children[2].children[1].innerText = "ASW"

                            panel.children[0].children[1].textContent = "All Star Break";


                            panel.children[1].children[0].onclick = () => simToDay(41, false);
                            panel.children[1].children[1].onclick = () => simToDay(41, true);
                        });
                    }

                    break;
                }
                const td = document.createElement("td");
                td.className = "calenderDate";
                if (dayCounter <= day){
                    if (chosenTeam.trackWins[dayCounter - 1] === "W"){
                        td.style.backgroundColor = "rgba(9, 255, 0, 0.255)";
                    }else{
                        td.style.backgroundColor = "rgba(255, 0, 0, 0.255)";
                    }
                }else{
                    const thisDay = dayCounter;
                    td.addEventListener("click", () => {
                        const panel = document.getElementById("controlPanel");
                        panel.style.display = "grid";
                        panel.children[1].children[2].onclick = () => {
                            panel.style.display = "none";
                        }
                        assignments[thisDay.toString()].forEach(teams => {
                            if (teams.includes(chosenTeam)){
                                panel.children[0].children[0].children[0].style.height = "9vw";
                                panel.children[0].children[0].children[0].src = `../images/${teams[0].abr}.svg`
                                panel.children[0].children[0].children[1].innerText = teams[0].abr

                                panel.children[0].children[2].children[0].style.height = "9vw";
                                panel.children[0].children[2].children[0].src = `../images/${teams[1].abr}.svg`
                                panel.children[0].children[2].children[1].innerText = teams[1].abr

                                panel.children[0].children[1].textContent = "Day " + thisDay;


                                panel.children[1].children[0].onclick = () => simToDay(thisDay, false);
                                panel.children[1].children[1].onclick = () => simToDay(thisDay, true);
                            }
                        });
                        
                    })
                }

                const container = document.createElement("div");
                container.className = "calenderContainer"
                const dateNum = document.createElement("div");
                dateNum.style.position = "absolute";
                dateNum.style.top = "0";
                dateNum.style.fontSize = "1vw";
                dateNum.innerText = dayCounter;
                container.appendChild(dateNum);
                const dateInfo = document.createElement("div");
                dateInfo.style.display = "flex";
                dateInfo.style.justifyContent = "space-around";
                dateInfo.style.alignItems = "center";
                const text = document.createElement("div");
                text.style.fontSize = "1.2vw";
                text.innerText = "vs"
                
                const team1Img = document.createElement("img");
                const team2Img = document.createElement("img");
                const team1Cap = document.createElement("figcaption");
                const team2Cap = document.createElement("figcaption");
                const team1Fig = document.createElement("figure");
                const team2Fig = document.createElement("figure");
                team1Fig.appendChild(team1Img);
                team1Fig.appendChild(team1Cap);
                team2Fig.appendChild(team2Img);
                team2Fig.appendChild(team2Cap);
                team1Fig.style.margin = "0px";
                team2Fig.style.margin = "0px";
                team1Fig.style.justifyItems = "center";
                team2Fig.style.justifyItems = "center";
                team1Cap.style.fontSize = "0.8vw";
                team2Cap.style.fontSize = "0.8vw";


                dateInfo.appendChild(team1Fig);
                dateInfo.appendChild(text);
                dateInfo.appendChild(team2Fig);

                assignments[dayCounter.toString()].forEach(teams => {
                    if (teams.includes(chosenTeam)){
                        team1Img.style.width = "3vw";
                        team1Img.src = `../images/${teams[0].abr}.svg`
                        team1Cap.innerText = teams[0].abr;

                        team2Img.style.width = "3vw";
                        team2Img.src = `../images/${teams[1].abr}.svg`
                        team2Cap.innerText = teams[1].abr;
                    }
                });
                container.appendChild(dateInfo);

                td.appendChild(container);
                row.appendChild(td);
            }
            
            
            calender.appendChild(row);
        }

    }else{
        let dayCounter = 41;
        pageNum = 1;
        const calender = document.getElementById("calenderBody");
        while (calender.firstChild){
            calender.removeChild(calender.firstChild);
        }
        for (let i = 0; i < 6; i++){
            const row = document.createElement("tr");
            for (let k = 0; k < 7; k++){
                dayCounter += 1;
                if (dayCounter > 82){
                    break;
                }
                const td = document.createElement("td");
                td.className = "calenderDate";
                if (dayCounter <= day){
                    if (chosenTeam.trackWins[dayCounter - 1] === "W"){
                        td.style.backgroundColor = "rgba(9, 255, 0, 0.255)";
                    }else{
                        td.style.backgroundColor = "rgba(255, 0, 0, 0.255)";
                    }
                }else{
                    const thisDay = dayCounter;
                    td.addEventListener("click", () => {
                        const panel = document.getElementById("controlPanel");
                        panel.style.display = "grid";
                        panel.children[1].children[2].onclick = () => {
                            panel.style.display = "none";
                        }
                        assignments[thisDay.toString()].forEach(teams => {
                            if (teams.includes(chosenTeam)){
                                panel.children[0].children[0].children[0].style.height = "9vw";
                                panel.children[0].children[0].children[0].src = `../images/${teams[0].abr}.svg`
                                panel.children[0].children[0].children[1].innerText = teams[0].abr

                                panel.children[0].children[2].children[0].style.height = "9vw";
                                panel.children[0].children[2].children[0].src = `../images/${teams[1].abr}.svg`
                                panel.children[0].children[2].children[1].innerText = teams[1].abr

                                panel.children[0].children[1].textContent = "Day " + thisDay;


                                panel.children[1].children[0].onclick = () => simToDay(thisDay, false);
                                panel.children[1].children[1].onclick = () => simToDay(thisDay, true);
                            }
                        });
                        
                    })
                }

                const container = document.createElement("div");
                container.className = "calenderContainer"
                const dateNum = document.createElement("div");
                dateNum.style.position = "absolute";
                dateNum.style.top = "0";
                dateNum.style.fontSize = "1vw";
                dateNum.innerText = dayCounter;
                container.appendChild(dateNum);
                const dateInfo = document.createElement("div");
                dateInfo.style.display = "flex";
                dateInfo.style.justifyContent = "space-around";
                dateInfo.style.alignItems = "center";
                const text = document.createElement("div");
                text.style.fontSize = "1.2vw";
                text.innerText = "vs"
                
                const team1Img = document.createElement("img");
                const team2Img = document.createElement("img");
                const team1Cap = document.createElement("figcaption");
                const team2Cap = document.createElement("figcaption");
                const team1Fig = document.createElement("figure");
                const team2Fig = document.createElement("figure");
                team1Fig.appendChild(team1Img);
                team1Fig.appendChild(team1Cap);
                team2Fig.appendChild(team2Img);
                team2Fig.appendChild(team2Cap);
                team1Fig.style.margin = "0px";
                team2Fig.style.margin = "0px";
                team1Fig.style.justifyItems = "center";
                team2Fig.style.justifyItems = "center";
                team1Cap.style.fontSize = "0.8vw";
                team2Cap.style.fontSize = "0.8vw";


                dateInfo.appendChild(team1Fig);
                dateInfo.appendChild(text);
                dateInfo.appendChild(team2Fig);
                assignments[dayCounter.toString()].forEach(teams => {
                    if (teams.includes(chosenTeam)){
                        //dateInfo.innerText = teams[0].abr + " vs " + teams[1].abr;
                        team1Img.style.width = "3vw";
                        team1Img.src = `../images/${teams[0].abr}.svg`
                        team1Cap.innerText = teams[0].abr;

                        team2Img.style.width = "3vw";
                        team2Img.src = `../images/${teams[1].abr}.svg`
                        team2Cap.innerText = teams[1].abr;
                    }
                });
                container.appendChild(dateInfo);

                td.appendChild(container);
                row.appendChild(td);
            }
            
            
            calender.appendChild(row);
        }
    }
}
if (!window.location.pathname.includes("playoff.html")){
    updateCalender(focusedTeam);
    document.getElementById("changeTeamImg").src = `../images/${focusedTeam.abr}.svg`

    document.getElementById("next").addEventListener("click", () => {
        nextTeam();
    })
    document.getElementById("prev").addEventListener("click", () => {
        prevTeam();
    })
    document.getElementById("nextCalenderPage").addEventListener("click", () => {
        updateCalender(focusedTeam, pageNum);
    })
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
            gen = new Player(name, chosenArch, randInRangeWithQuality(archStat.twoPt, 10), randInRangeWithQuality(archStat.threePt, 10), randInRangeWithQuality(archStat.inside, 10), randInRangeWithQuality(archStat.freeThrow, 10), randInRangeWithQuality(archStat.offensiveAbility, 15), randInRangeWithQuality(archStat.defensiveAbility, 15), randInRangeWithQuality(archStat.defensiveReb, 20), randInRangeWithQuality(archStat.offensiveReb, 20), randInRangeWithQuality(archStat.blockTen, 20), randInRangeWithQuality(archStat.stealTen, 20), randInRangeWithQuality(archStat.takeCharges, 10), randInRangeWithQuality(archStat.passingTen, 0), randInRangeWithQuality(archStat.passingAccuracy, 30), randInRangeWithQuality(archStat.passingEff, 20), randInRangeWithQuality(archStat.ballControl, 10), randInRangeWithQuality(archStat.catching, 10), randInRangeWithQuality(archStat.insideTen, 0), randInRangeWithQuality(archStat.closeTen, 0), randInRangeWithQuality(archStat.leftElbow, 0), randInRangeWithQuality(archStat.rightElbow, 0), randInRangeWithQuality(archStat.leftCorner, 0), randInRangeWithQuality(archStat.rightCorner, 0), randInRangeWithQuality(archStat.leftWing, 0), randInRangeWithQuality(archStat.rightWing, 0), randInRangeWithQuality(archStat.leftTwo, 0), randInRangeWithQuality(archStat.rightTwo, 0), randInRangeWithQuality(archStat.centerTwo, 0), randInRangeWithQuality(archStat.centerThree, 0), randInRangeWithQuality(archStat.vertical, 20), randInRangeWithQuality(archStat.hustle, 10), randInRangeWithQuality(archStat.stamina, 10), randInRangeWithQuality(archStat.height, 0), randInRangeWithQuality(archStat.foul, 0), randInRangeWithQuality(archStat.drawFoul, 10), randInRangeWithQuality(archStat.clutch, 20), randInRangeWithQuality(archStat.usage, 20), randInRangeWithQuality(archStat.potential, 20));
        }else if (quality === 2){
            gen = new Player(name, chosenArch, randInRangeWithQuality(archStat.twoPt, 5), randInRangeWithQuality(archStat.threePt, 5), randInRangeWithQuality(archStat.inside, 5), randInRangeWithQuality(archStat.freeThrow, 5), randInRangeWithQuality(archStat.offensiveAbility, 10), randInRangeWithQuality(archStat.defensiveAbility, 10), randInRangeWithQuality(archStat.defensiveReb, 10), randInRangeWithQuality(archStat.offensiveReb, 10), randInRangeWithQuality(archStat.blockTen, 10), randInRangeWithQuality(archStat.stealTen, 10), randInRangeWithQuality(archStat.takeCharges, 5), randInRangeWithQuality(archStat.passingTen, 0), randInRangeWithQuality(archStat.passingAccuracy, 15), randInRangeWithQuality(archStat.passingEff, 10), randInRangeWithQuality(archStat.ballControl, 5), randInRangeWithQuality(archStat.catching, 5), randInRangeWithQuality(archStat.insideTen, 0), randInRangeWithQuality(archStat.closeTen, 0), randInRangeWithQuality(archStat.leftElbow, 0), randInRangeWithQuality(archStat.rightElbow, 0), randInRangeWithQuality(archStat.leftCorner, 0), randInRangeWithQuality(archStat.rightCorner, 0), randInRangeWithQuality(archStat.leftWing, 0), randInRangeWithQuality(archStat.rightWing, 0), randInRangeWithQuality(archStat.leftTwo, 0), randInRangeWithQuality(archStat.rightTwo, 0), randInRangeWithQuality(archStat.centerTwo, 0), randInRangeWithQuality(archStat.centerThree, 0), randInRangeWithQuality(archStat.vertical, 10), randInRangeWithQuality(archStat.hustle, 5), randInRangeWithQuality(archStat.stamina, 5), randInRangeWithQuality(archStat.height, 0), randInRangeWithQuality(archStat.foul, 0), randInRangeWithQuality(archStat.drawFoul, 5), randInRangeWithQuality(archStat.clutch, 10), randInRangeWithQuality(archStat.usage, 10), randInRangeWithQuality(archStat.potential, 10));
        }else{
            gen = new Player(name, chosenArch, randInRangeWithQuality(archStat.twoPt, 0), randInRangeWithQuality(archStat.threePt, 0), randInRangeWithQuality(archStat.inside, 0), randInRangeWithQuality(archStat.freeThrow, 0), randInRangeWithQuality(archStat.offensiveAbility, 0), randInRangeWithQuality(archStat.defensiveAbility, 0), randInRangeWithQuality(archStat.defensiveReb, 0), randInRangeWithQuality(archStat.offensiveReb, 0), randInRangeWithQuality(archStat.blockTen, 0), randInRangeWithQuality(archStat.stealTen, 0), randInRangeWithQuality(archStat.takeCharges, 0), randInRangeWithQuality(archStat.passingTen, 0), randInRangeWithQuality(archStat.passingAccuracy, 0), randInRangeWithQuality(archStat.passingEff, 0), randInRangeWithQuality(archStat.ballControl, 0), randInRangeWithQuality(archStat.catching, 0), randInRangeWithQuality(archStat.insideTen, 0), randInRangeWithQuality(archStat.closeTen, 0), randInRangeWithQuality(archStat.leftElbow, 0), randInRangeWithQuality(archStat.rightElbow, 0), randInRangeWithQuality(archStat.leftCorner, 0), randInRangeWithQuality(archStat.rightCorner, 0), randInRangeWithQuality(archStat.leftWing, 0), randInRangeWithQuality(archStat.rightWing, 0), randInRangeWithQuality(archStat.leftTwo, 0), randInRangeWithQuality(archStat.rightTwo, 0), randInRangeWithQuality(archStat.centerTwo, 0), randInRangeWithQuality(archStat.centerThree, 0), randInRangeWithQuality(archStat.vertical, 0), randInRangeWithQuality(archStat.hustle, 0), randInRangeWithQuality(archStat.stamina, 0), randInRangeWithQuality(archStat.height, 0), randInRangeWithQuality(archStat.foul, 0), randInRangeWithQuality(archStat.drawFoul, 0), randInRangeWithQuality(archStat.clutch, 0), randInRangeWithQuality(archStat.usage, 0), randInRangeWithQuality(archStat.potential, 0));
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
        body: JSON.stringify([day, year, simmedAllStar, leagueHistory])
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
    simmedAllStar = generalData[0]["simmedAllStar"];
    leagueHistory = JSON.parse(generalData[0]["leagueHistory"]);

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

            trackWins: JSON.parse(p.trackWins),

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

            money: p.money,
            draftPicks: JSON.parse(p.draftPicks)
        });
        return team;
    });
    allTeams.splice(0, allTeams.length);
    allTeams = [...teams];

    try{
        Object.keys(assignments).forEach(dayKey => {
            assignments[dayKey] = assignments[dayKey].map(([team1, team2]) => {
                const newTeam1 = allTeams.find(t => t.abr === team1.abr);
                const newTeam2 = allTeams.find(t => t.abr === team2.abr);
                return [newTeam1, newTeam2];
            });
        });
    }catch{

    }

    const players = playerData.map(p => {
        const player = new Player(
            p.name, p.arch, p.twoPt, p.threePt, p.inside, p.freeThrow,
            p.offensiveAbility, p.defensiveAbility, p.defensiveReb, p.offensiveReb,
            p.blockTen, p.stealTen, p.takeCharges, p.passingTen, p.passingAccuracy, p.passingEff,
            p.ballControl, p.catching, p.insideTen, p.closeTen, p.leftElbow,
            p.rightElbow, p.leftCorner, p.rightCorner, p.leftWing, p.rightWing,
            p.leftTwo, p.rightTwo, p.centerTwo, p.centerThree, p.vertical,
            p.hustle, p.stamina, p.height, p.foul, p.drawFoul, p.clutch, p.usageAtt, p.potential
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
            yearsIntoContract: p.yearsIntoContract,

            yearsInFA: p.yearsInFA
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
}

window.loading = async function (){
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.textContent = "Loading...";
    loadingScreen.style.display = "flex"; 

    await load();
    updateDayAndYearUI();

    loadingScreen.style.display = "none";

    focusedTeam = allTeams[focusNum];
    updateCalender(focusedTeam);
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

        focusedTeam = allTeams[focusNum];
        updateCalender(focusedTeam);

        sessionStorage.removeItem("redirect");

        updateDayAndYearUI();
    }

});


async function simToDay(dayTo, show){
    let totalGames = (dayTo - day) * allTeams.length / 2;
    let gamesSimulated = 0;
    while (gamesSimulated < totalGames) {
        if (day === 41 && (simmedAllStar === false || simmedAllStar === 0)){
            allStars();
            continue;
        }
        const chosenTeam1 = assignments[(day + 1).toString()][gamesSimulated % 15][0];
        const chosenTeam2 = assignments[(day + 1).toString()][gamesSimulated % 15][1];

        if (show === false){
            aGame(chosenTeam1, chosenTeam2, false, 0, false);
        }else{
            aGame(chosenTeam1, chosenTeam2);
        }
        
        gamesSimulated++;
        if (gamesSimulated % 15 === 0){
            day++;
        }
        updateCalender(focusedTeam);

        if (show === false){
            main.innerText = focusedTeam.abr + "  " + focusedTeam.wins + ":" + focusedTeam.losses;
        }
         

        if (gamesSimulated % 5 === 0){
            await new Promise(res => setTimeout(res, 0));
        }
    }
    if (dayTo === 41){
        if (day === 41 && (simmedAllStar === false || simmedAllStar === 0)){
            allStars();
        }
    }

    const dayCounter = document.getElementById("dayCounter");
    dayCounter.innerText = "Day: " + day;
    await saving();
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

    simmedAllStar = true;

    updateCalender(focusedTeam)
}

export function aGame(chosenTeam1, chosenTeam2, playOff = false, series = 0, display = true, allStar = false){

    const team1 = chosenTeam1;
    const team2 = chosenTeam2;
    let quarter = 1;
    const theTime = 12 * 15;
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
                team1.trackWins.push("W");
                team2.losses += 1;
                team2.trackWins.push("L");
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
                team1.trackWins.push("L");
                team2.wins += 1;
                team2.trackWins.push("W");
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
    
    const tempPlayers = allPlayers.filter(player => player.teamName !== "FA" && player.teamName !== "HOF");
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
    tempPlayers.sort((a,b)=>(b.mvpNum - b.team.seed - b.totalMVPS) - (a.mvpNum - a.team.seed - a.totalMVPS));
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

    const dpoyTempList = allPlayers.filter(player => player.teamName !== "FA" && player.teamName !== "HOF");
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




