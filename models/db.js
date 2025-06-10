import db from "mysql2";
import dotenv from "dotenv";
dotenv.config();

export const connection = db.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err.message);
    return;
  }
  console.log('Connected to MySQL');
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
      allDefensiveThird, allStar, scoringChamp, assistChamp, reboundChamp, stealChamp, blockChamp
    ) VALUES (${Array(119).fill('?').join(',')})
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
    player.stealChamp, player.blockChamp
  ];


  await connection.execute(sql, values);
  console.log("Saved ", player.name);
}
