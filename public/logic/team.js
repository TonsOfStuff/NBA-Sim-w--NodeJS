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
        this.players.forEach(player => {
            player.opponents.push(...opposingTeam.players);
            player.otherTeammates = this.players;
        });
    }
}