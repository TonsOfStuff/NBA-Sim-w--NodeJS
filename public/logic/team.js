export class Team{
    constructor(name, inEast, abr, players){
        this.name = name;
        this.inEast = inEast;
        this.abr = abr;
        this.players = players;

        this.wins = 0;
        this.losses = 0;
        this.oldWins = 0;
        this.oldLosses = 0;

        this.seed = 0;
        this.confSeed = 0;
        this.oldSeed = 0;
        this.oldConfSeed = 0;
        

        //Lineup
        this.lineup = [];
        this.startingLineup = [];
        this.startingLineupName1 = "";
        this.startingLineupName2 = "";
        this.startingLineupName3 = "";
        this.startingLineupName4 = "";
        this.startingLineupName5 = "";
        this.sixManName = "";

        this.pg = null;
        this.sg = null;
        this.sf = null;
        this.pf = null;
        this.c = null;
        this.sixthMan = null;

        //Random
        this.trackWins = [];
        
        //Team averages in season
        this.games = 0;

        this.ptsAvg = 0;
        this.astAvg = 0;
        this.rebAvg = 0;
        this.blkAvg = 0;
        this.stlAvg = 0;
        this.fg = 0;
        this.tp = 0;
        this.ft = 0;

        this.totalPts = 0;
        this.totalAst = 0;
        this.totalReb = 0;
        this.totalStl = 0;
        this.totalBlk = 0;
        this.totalFGA = 0;
        this.totalFGM = 0;
        this.totalTPA = 0;
        this.totalTPM = 0;
        this.totalFTA = 0;
        this.totalFTM = 0;


        //Franchise stats
        this.playOffAppearances = 0;
        this.finalsAppearances = 0;
        this.championships = 0;


        this.ptsLeader = "";
        this.ptsLeaderVal = 0;
        this.astLeader = "";
        this.astLeaderVal = 0;
        this.rebLeader = "";
        this.rebLeaderVal = 0;
        this.stlLeader = "";
        this.stlLeaderVal = 0;
        this.blkLeader = "";
        this.blkLeaderVal = 0;

        this.franchiseWins = 0;
        this.franchiseLosses = 0;

        this.playOffWins = 0;
        this.playerOffLosses = 0;

        this.playOffWinTemp = 0;


        //Misc
        this.shotClock = 0;
        this.money = 100000000;
    }

    setOpponentsAndTeammates(opposingTeam){
        this.lineup.forEach(player => {
            player.opponents.splice(0, player.opponents.length);
            player.otherTeammates.splice(0, player.otherTeammates.length);

            player.opponents.push(...opposingTeam.lineup);
            player.otherTeammates = [...this.lineup];
        });
    }

    updateMin(){
        this.lineup.forEach(player => {
            player.min += 1;
            player.energyUsed += 10;
        });
    }

    startingLineupBoost(){
        this.startingLineup.forEach(player => {
            player.passToOg += 20;
            player.passTo += 20;
        });

        this.lineup = [...this.startingLineup];
        this.startingLineupName1 = this.startingLineup[0].name;
        this.startingLineupName2 = this.startingLineup[1].name;
        this.startingLineupName3 = this.startingLineup[2].name;
        this.startingLineupName4 = this.startingLineup[3].name;
        this.startingLineupName5 = this.startingLineup[4].name;
    }

    changeStart(endOfYear = false){
        this.players.forEach(player => {
            player.calcAwardsVal();
        });

        let sub = [...this.players];
        if (endOfYear === false){
            sub.sort((a,b) => ((b.mvpNum) / b.avgMin) - ((a.mvpNum) / a.avgMin));
        }else{
            sub.sort((a,b) => (b.freeAgentValue - a.freeAgentValue));
        }
        

        this.startingLineup = [];

        this.startingLineup.push(...sub.slice(0, 5));
        this.lineup = [...this.startingLineup];
        this.startingLineupName1 = this.startingLineup[0].name;
        this.startingLineupName2 = this.startingLineup[1].name;
        this.startingLineupName3 = this.startingLineup[2].name;
        this.startingLineupName4 = this.startingLineup[3].name;
        this.startingLineupName5 = this.startingLineup[4].name;

        this.sixManName = sub[5].name;
        this.sixthMan = sub[5];

        this.startingLineupBoost();
        this.setPositions();
    }

    setPositions(){
        let playersCopy = [...this.lineup];
        try{
            this.pg.passTo = this.pg.passToOg;
            this.sg.passTo = this.sg.passToOg;
            this.sf.passTo = this.sf.passToOg;
            this.pf.passTo = this.pf.passToOg;
            this.c.passTo = this.c.passToOg;
        }catch{

        }
        

        this.lineup.sort((a,b) => b.pts - a.pts);
        this.lineup[0].passTo += 10;
        this.lineup[1].passTo += 3;
        this.lineup[2].passTo += 1;

        this.pg = playersCopy.reduce((best, current) => {
            const bestSum = best.passingAccuracy + best.passingTen;
            const currentSum = current.passingAccuracy + current.passingTen;
            return currentSum > bestSum ? current : best;
        });
        playersCopy.splice(playersCopy.indexOf(this.pg), 1);

        this.sg = playersCopy.reduce((best, current) => {
            const bestSum = best.twoPt + best.threePt;
            const currentSum = current.twoPt + current.threePt;
            return currentSum > bestSum ? current : best;
        });
        playersCopy.splice(playersCopy.indexOf(this.sg), 1);

        this.c = playersCopy.reduce((best, current) => {
            const bestSum = best.height + best.inside;
            const currentSum = current.inside + current.height;
            return currentSum > bestSum ? current : best;
        });
        playersCopy.splice(playersCopy.indexOf(this.c), 1);

        this.pf = playersCopy.reduce((best, current) => {
            const bestSum = best.height + best.inside;
            const currentSum = current.inside + current.height;
            return currentSum > bestSum ? current : best;
        });
        playersCopy.splice(playersCopy.indexOf(this.pf), 1);

        this.sf = playersCopy[0];
    }


    sub(quarter, time, team1Score, team2Score, team1, team2, insertStart = false){
        let smartSubNum = 8;
        if (quarter >= 4 && time > 100 && team1Score - team2Score > 15 && team1 === this){
            smartSubNum = this.players.length;
        }
        if (quarter >= 4 && time > 100 && team2Score - team1Score > 15 && team2 === this){
            smartSubNum = this.players.length;
        }
        this.lineup.forEach(player => {
            player.hasBall = false;
            player.otherTeammates.splice(0, player.otherTeammates.length);
            player.opponents.splice(0, player.opponents.length);
        });
        this.lineup = [];

        if (insertStart === false){
            let top = this.players.sort((a, b) => (b.stamina - b.energyUsed + b.boxMinus) - (a.stamina - a.energyUsed - a.min + a.boxMinus)).slice(0, smartSubNum);
            top.push(top[0]);

            for (let i = 0; i<5; i++){
                let chosen = top[Math.floor(Math.random() * top.length)]
                this.lineup.push(chosen);
                top = top.filter(p => p !== chosen);
            }
        }else{
            this.lineup = [...this.startingLineup];
        }
        //Reset energy used
        this.players.forEach(player => {
            if (!this.lineup.includes(player)){
                player.energyUsed = 0;
            }
        })
        
        this.setPositions()
    }

    calcBoxMinus(value){
        this.lineup.forEach(player => {
            player.boxMinus += value;
        });
    }

    calcSeed(allTeams){
        allTeams.sort((a,b) => b.wins - a.wins);
        for (let i = 0; i < allTeams.length; i++){
            if (this === allTeams[i]){
                this.seed = (i + 1);
            }
        }

        let confTeams = []
        allTeams.forEach(team => {
            if (team.inEast === this.inEast){
                confTeams.push(team);
            }
        });

        confTeams.sort((a,b) => b.wins - a.wins);
        for (let i = 0; i < confTeams.length; i++){
            if (this === confTeams[i]){
                this.confSeed = (i + 1);
            }
        }
    }

    calcTeamAvg(){
        this.games += 1;
        
        this.totalPts += this.players.reduce((sum, p) => sum + p.pts, 0);
        this.totalAst += this.players.reduce((sum, p) => sum + p.ast, 0);
        this.totalReb += this.players.reduce((sum, p) => sum + (p.oReb + p.dReb), 0);
        this.totalStl += this.players.reduce((sum, p) => sum + p.stl, 0);
        this.totalBlk += this.players.reduce((sum, p) => sum + p.blk, 0);
        this.totalFGA += this.players.reduce((sum, p) => sum + p.fga, 0);
        this.totalFGM += this.players.reduce((sum, p) => sum + p.fgm, 0);
        this.totalTPA += this.players.reduce((sum, p) => sum + p.tpa, 0);
        this.totalTPM += this.players.reduce((sum, p) => sum + p.tpm, 0);
        this.totalFTA += this.players.reduce((sum, p) => sum + p.fta, 0);
        this.totalFTM += this.players.reduce((sum, p) => sum + p.ftm, 0);

        this.ptsAvg = Number((this.totalPts / this.games).toFixed(1));
        this.astAvg = Number((this.totalAst / this.games).toFixed(1));
        this.rebAvg = Number((this.totalReb / this.games).toFixed(1));
        this.stlAvg = Number((this.totalStl / this.games).toFixed(1));
        this.blkAvg = Number((this.totalBlk / this.games).toFixed(1));
        this.fg = Number((this.totalFGM / this.totalFGA).toFixed(2));
        this.tp = Number((this.totalTPM / this.totalTPA).toFixed(2));
        this.ft = Number((this.totalFTM / this.totalFTA).toFixed(2));

    }

    resetSeason(){
        this.oldWins = this.wins;
        this.oldLosses = this.losses;
        this.oldSeed = this.seed;
        this.oldConfSeed = this.confSeed;

        this.seed = 0;
        this.confSeed = 0;
        this.wins = 0;
        this.losses = 0;

        this.games = 0;

        this.ptsAvg = 0;
        this.astAvg = 0;
        this.rebAvg = 0;
        this.blkAvg = 0;
        this.stlAvg = 0;
        this.fg = 0;
        this.tp = 0;
        this.ft = 0;

        this.totalPts = 0;
        this.totalAst = 0;
        this.totalReb = 0;
        this.totalStl = 0;
        this.totalBlk = 0;
        this.totalFGA = 0;
        this.totalFGM = 0;
        this.totalTPA = 0;
        this.totalTPM = 0;
        this.totalFTA = 0;
        this.totalFTM = 0;

        this.trackWins.length = 0;
    }

    releasePlayer(){
        if (this.players.length > 12){
            for (let i = 0; i < this.players.length; i++){
                if (this.players[i].freeAgentValue < 2){
                    this.players[i].teamName = "FA";

                    const splicedPlayer = this.players.splice(this.players.indexOf(this.players[i]), 1);
                    this.money += splicedPlayer[0].money;
                    return [splicedPlayer[0], splicedPlayer[0].name + " was released by " + this.abr];
                }
            }
        }
        return null;
    }
}