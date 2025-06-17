import db from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export const connection = await db.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) console.error('MySQL connection error:', err);
  else console.log('Connected to MySQL');
});




export async function savePlayer(player) {
  const sql = `
    INSERT INTO players (
      name, arch, twoPt, threePt, inside, freeThrow, offensiveAbility, defensiveAbility,
      defensiveReb, offensiveReb, blockTen, stealTen, takeCharges, passingTen, passingAccuracy,
      ballControl, catching, insideTen, closeTen, leftElbow, rightElbow, leftCorner, rightCorner,
      leftWing, rightWing, leftTwo, rightTwo, centerTwo, centerThree, vertical, hustle, stamina,
      height, foul, drawFoul, clutch, potential, gamesPlayed, gamesStarted, avgMin, avgPts, avgAst,
      avgDReb, avgOReb, avgStl, avgBlk, avgFls, avgTov, fgp, tpp, ftp,

      seasonTotalMin, seasonTotalPts, seasonTotalAst, seasonTotalOReb, seasonTotalDReb,
      seasonTotalStl, seasonTotalBlk, seasonTotalFls, seasonTotalTov, seasonTotalFGA,
      seasonTotalFGM, seasonTotalTPA, seasonTotalTPM, seasonTotalFTA, seasonTotalFTM,
      seasonTripleDoubles, seasonDoubleDoubles, seasonQuadDoubles,

      careerGamesPlayed, careerGamesStarted, careerAvgMin, careerAvgPts, careerAvgAst,
      careerAvgOReb, careerAvgDReb, careerAvgStl, careerAvgBlk, careerAvgFls, careerAvgTov,
      careerAvgFG, careerAvgTP, careerAvgFT, careerTotalMin, careerTotalPts, careerTotalAst,
      careerTotalOReb, careerTotalDReb, careerTotalStl, careerTotalBlk, careerTotalFls,
      careerTotalTov, careerTotalFGA, careerTotalFGM, careerTotalTPA, careerTotalTPM,
      careerTotalFTA, careerTotalFTM, careerTripleDoubles, careerDoubleDoubles, careerQuadDoubles,

      totalMVPS, totalDPOYs, totalROTYs, totalSMOTY, mvpNum, dpoyNum,
      allNBAFirst, allNBASecond, allNBAThird, allDefensiveFirst, allDefensiveSecond,
      allDefensiveThird, allStar, scoringChamp, assistChamp, reboundChamp, stealChamp, blockChamp,

      team, championships, finalsMVP, age, yearsPro,

      happiness, contractYears, money, yearsIntoContract
      
    ) VALUES (${Array(128).fill('?').join(',')})
  `;

  const values = [
    player.name, player.arch, player.twoPt, player.threePt, player.inside, player.freeThrow,
    player.offensiveAbility, player.defensiveAbility, player.defensiveReb, player.offensiveReb,
    player.blockTen, player.stealTen, player.takeCharges, player.passingTen, player.passingAccuracy,
    player.ballControl, player.catching, player.insideTen, player.closeTen, player.leftElbow,
    player.rightElbow, player.leftCorner, player.rightCorner, player.leftWing, player.rightWing,
    player.leftTwo, player.rightTwo, player.centerTwo, player.centerThree, player.vertical,
    player.hustle, player.stamina, player.height, player.foul, player.drawFoul, player.clutch,
    player.potential, player.gamesPlayed, player.gamesStarted, player.avgMin, player.avgPts,
    player.avgAst, player.avgDReb, player.avgOReb, player.avgStl, player.avgBlk, player.avgFls,
    player.avgTov, player.fgp, player.tpp, player.ftp,

    player.seasonTotalMin, player.seasonTotalPts, player.seasonTotalAst,
    player.seasonTotalOReb, player.seasonTotalDReb, player.seasonTotalStl, player.seasonTotalBlk,
    player.seasonTotalFls, player.seasonTotalTov, player.seasonTotalFGA, player.seasonTotalFGM,
    player.seasonTotalTPA, player.seasonTotalTPM, player.seasonTotalFTA, player.seasonTotalFTM,
    player.seasonTripleDoubles, player.seasonDoubleDoubles, player.seasonQuadDoubles,

    player.careerGamesPlayed, player.careerGamesStarted, player.careerAvgMin, player.careerAvgPts,
    player.careerAvgAst, player.careerAvgOReb, player.careerAvgDReb, player.careerAvgStl,
    player.careerAvgBlk, player.careerAvgFls, player.careerAvgTov, player.careerAvgFG,
    player.careerAvgTP, player.careerAvgFT, player.careerTotalMin, player.careerTotalPts,
    player.careerTotalAst, player.careerTotalOReb, player.careerTotalDReb, player.careerTotalStl,
    player.careerTotalBlk, player.careerTotalFls, player.careerTotalTov, player.careerTotalFGA,
    player.careerTotalFGM, player.careerTotalTPA, player.careerTotalTPM, player.careerTotalFTA,
    player.careerTotalFTM, player.careerTripleDoubles, player.careerDoubleDoubles,
    player.careerQuadDoubles,

    player.totalMVPS, player.totalDPOYs, player.totalROTYs, player.totalSMOTY,
    player.mvpNum, player.dpoyNum, player.allNBAFirst, player.allNBASecond, player.allNBAThird,
    player.allDefensiveFirst, player.allDefensiveSecond, player.allDefensiveThird,
    player.allStar, player.scoringChamp, player.assistChamp, player.reboundChamp,
    player.stealChamp, player.blockChamp,

    player.teamName, player.championships, player.finalsMVP, player.age, player.yearsPro,

    player.happiness, player.contractYears, player.money, player.yearsIntoContract
  ];


  await connection.execute(sql, values);
}


export async function saveTeams(team){

  const sql = `INSERT INTO teams (
    name, inEast, abr, wins, losses, oldWins, oldLosses, seed,
    oldSeed, startingLineupOne, startingLineupTwo, startingLineupThree,
    startingLineupFour, startingLineupFive, ptsAvg, astAvg, rebAvg, blkAvg, stlAvg, 
    fg, tp, ft, playOffAppearances, finalsAppearances, championships, ptsLeader,
    ptsLeaderVal, astLeader, astLeaderVal, rebLeader, rebLeaderVal, stlLeader, stlLeaderVal,
    blkLeader, blkLeaderVal, franchiseWins, franchiseLosses, playOffWins, playerOffLosses, 
    confSeed, oldConfSeed, money
  ) VALUES (${Array(42).fill('?').join(',')})`;

  const values = [team.name, team.inEast, team.abr, team.wins, team.losses, team.oldWins, team.oldLosses,
    team.seed, team.oldSeed, team.startingLineupName1, team.startingLineupName2, team.startingLineupName3, team.startingLineupName4, team.startingLineupName5,
    team.ptsAvg, team.astAvg, team.rebAvg, team.blkAvg, team.stlAvg, team.fg, team.tp, team.ft, team.playOffAppearances, team.finalsAppearances,
    team.championships, team.ptsLeader, team.ptsLeaderVal, team.astLeader, team.astLeaderVal, team.rebLeader, team.rebLeaderVal,
    team.stlLeader, team.stlLeaderVal, team.blkLeader, team.blkLeaderVal, team.franchiseWins, team.franchiseLosses, team.playOffWins,
    team.playerOffLosses, team.confSeed, team.oldConfSeed, team.money
  ];

  await connection.execute(sql, values);
}
