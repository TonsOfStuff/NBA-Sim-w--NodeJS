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

        this.pg = null;
        this.sg = null;
        this.sf = null;
        this.pf = null;
        this.c = null;
        this.sixthMan = null;
        
        //Team averages in season
        this.ptsAvg = 0;
        this.astAvg = 0;
        this.rebAvg = 0;
        this.blkAvg = 0;
        this.stlAvg = 0;
        this.fg = 0;
        this.tp = 0;
        this.ft = 0;


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

    changeStart(){
        this.players.forEach(player => {
            player.calcAwardsVal();
        });

        let sub = [...this.players];
        sub.sort((a,b) => (b.mvpNum + b.fgp) - (a.mvpNum + a.fgp));

        this.startingLineup = [];

        this.startingLineup.push(...sub.slice(0, 5));
        this.lineup = [...this.startingLineup];
        this.startingLineupName1 = this.startingLineup[0].name;
        this.startingLineupName2 = this.startingLineup[1].name;
        this.startingLineupName3 = this.startingLineup[2].name;
        this.startingLineupName4 = this.startingLineup[3].name;
        this.startingLineupName5 = this.startingLineup[4].name;

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
        this.lineup.splice(0, this.lineup.length);

        if (insertStart === false){
            const top = this.players.sort((a, b) => (b.stamina - b.min + b.fgm) - (a.stamina - a.min + a.fgm)).slice(0, smartSubNum);

            for (let i = 0; i<5; i++){
                let chosen = top[Math.floor(Math.random() * top.length)]
                this.lineup.push(chosen);
                top.splice(top.indexOf(chosen), 1);
            }
        }else{
            this.lineup = [...this.startingLineup];
        }
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

    resetSeason(){
        this.oldWins = this.wins;
        this.oldLosses = this.losses;
        this.oldSeed = this.seed;
        this.oldConfSeed = this.confSeed;

        this.seed = 0;
        this.confSeed = 0;
        this.wins = 0;
        this.losses = 0;

        this.ptsAvg = 0;
        this.astAvg = 0;
        this.rebAvg = 0;
        this.blkAvg = 0;
        this.stlAvg = 0;
        this.fg = 0;
        this.tp = 0;
        this.ft = 0;
    }
}