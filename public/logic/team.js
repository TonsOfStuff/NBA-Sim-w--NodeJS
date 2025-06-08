export class Team{
    constructor(name, inEast, players){
        this.name = name;
        this.inEast = inEast;
        this.players = players;

        this.wins = 0;
        this.losses = 0;
        this.oldWins = 0;
        this.oldLosses = 0;

        this.seed = 0;
        this.oldSeed = 0;
        

        //Lineup
        this.lineup = [];
        this.startingLineup = [];

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


        this.ptsLeader = null;
        this.ptsLeaderVal = 0;
        this.astLeader = null;
        this.astLeaderVal = 0;
        this.rebLeader = null;
        this.rebLeaderVal = 0;
        this.stlLeader = null;
        this.stlLeaderVal = 0;
        this.blkLeader = null;
        this.blkLeaderVal = 0;

        this.franchiseWins = 0;
        this.franchiseLosses = 0;

        this.playOffWins = 0;
        this.playerOffLosses = 0;
    }

    setOpponentsAndTeammates(opposingTeam){
        this.lineup.forEach(player => {
            player.opponents.push(...opposingTeam.lineup);
            player.otherTeammates = this.lineup;
        });
    }

    updateMin(){
        this.lineup.forEach(player => {
            player.min += 1;
        });
    }

    setPositions(){
        let playersCopy = [...this.players];

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
}