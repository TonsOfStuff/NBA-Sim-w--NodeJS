import { hasBallPlayerSetter } from "./main.js";

export class Player{
    constructor(name, arch, twoPt, threePt, inside, freeThrow, offensiveAbility, defensiveAbility, defensiveReb, offensiveReb, blockTen, stealTen, takeCharges, passingTen, passingAccuracy, ballControl, catching, insideTen, closeTen, leftElbow, rightElbow, leftCorner, rightCorner, leftWing, rightWing, leftTwo, rightTwo, centerTwo, centerThree, vertical, hustle, stamina, height, foul, drawFoul, clutch, potential){
        this.name = name;
        this.arch = arch;

        //Shooting
        this.twoPt = twoPt;
        this.threePt = threePt;
        this.inside = inside;
        this.freeThrow = freeThrow;
        this.offensiveAbility = offensiveAbility;

        //Defense
        this.defensiveAbility = defensiveAbility;
        this.defensiveReb = defensiveReb;
        this.offensiveReb = offensiveReb;
        this.blockTen = blockTen;
        this.stealTen = stealTen;
        this.takeCharges = takeCharges;

        //Assisting
        this.passingTen = passingTen;
        this.passingAccuracy = passingAccuracy;
        this.ballControl = ballControl; //See how often you get stolen
        this.catching = catching; //See how often you are unable to catch a pass

        //Shooting tendencies
        this.insideTen = insideTen;
        this.closeTen = closeTen;
        this.leftElbow = leftElbow;
        this.rightElbow = rightElbow;
        this.leftCorner = leftCorner;
        this.rightCorner = rightCorner;
        this.leftWing = leftWing;
        this.rightWing = rightWing;
        this.leftTwo = leftTwo;
        this.rightTwo = rightTwo;
        this.centerTwo = centerTwo;
        this.centerThree = centerThree;
        
        //Physical
        this.vertical = vertical;
        this.hustle = hustle;
        this.stamina = stamina;
        this.height = height;

        //Misc
        this.foul = foul;
        this.drawFoul = drawFoul;
        this.clutch = clutch;
        this.potential = potential;

        //Other stats
        this.ovr = 0;
        this.team = null;

        //Game necessaries
        this.location = "Center Three"
        this.otherTeammates = [];
        this.opponents = [];
        this.hasBall = false;
        this.passTo = 10;
        this.passedFromSomeone = false;

        //Game stats
        this.min = 0;
        this.pts = 0;
        this.ast = 0;
        this.dReb = 0;
        this.oReb = 0;
        this.stl = 0;
        this.blk = 0;
        this.fls = 0;
        this.tov = 0;
        this.fga = 0;
        this.fgm = 0;
        this.tpa = 0;
        this.tpm = 0;
        this.fta = 0;
        this.ftm = 0;
        this.boxMinus = 0;

        //Season stats
        this.gamesPlayed = 0;
        this.gamesStarted = 0;
    
        this.avgMin = 0;
        this.avgPts = 0;
        this.avgAst = 0;
        this.avgDReb = 0;
        this.avgOReb = 0;
        this.avgStl = 0;
        this.avgBlk = 0;
        this.avgFls = 0;
        this.avgTov = 0;
        this.fgp = 0;
        this.tpp = 0;
        this.ftp = 0;

        this.seasonTotalPts = 0;
        this.seasonTotalAst = 0;
        this.seasonTotalOReb = 0;
        this.seasonTotalDReb = 0;
        this.seasonTotalStl = 0;
        this.seasonTotalBlk = 0;
        this.seasonTotalFls = 0;
        this.seasonTotalTov = 0;
        this.seasonTotalFGA = 0;
        this.seasonTotalFGM = 0;
        this.seasonTotalTPA = 0;
        this.seasonTotalTPM = 0;
        this.seasonTotalFTA = 0;
        this.seasonTotalFTM = 0;

        this.seasonTripleDoubles = 0;
        this.seasonDoubleDoubles = 0;
        this.seasonQuadDoubles = 0;



        //Career Stats
        this.careerGamesPlayed = 0;
        this.careerGamesStarted = 0;

        this.careerAvgPts = 0;
        this.careerAvgAst = 0;
        this.careerAvgOReb = 0;
        this.careerAvgDReb = 0;
        this.careerAvgStl = 0;
        this.careerAvgBlk = 0;
        this.careerAvgFls = 0;
        this.careerAvgTov = 0;
        this.careerAvgFG = 0;
        this.careerAvgTP = 0;
        this.careerAvgFT = 0;

        this.careerTotalPts = 0;
        this.careerTotalAst = 0;
        this.careerTotalOReb = 0;
        this.careerTotalDReb = 0;
        this.careerTotalStl = 0;
        this.careerTotalBlk = 0;
        this.careerTotalFls = 0;
        this.careerTotalTov = 0;
        this.careerTotalFGA = 0;
        this.careerTotalFGM = 0;
        this.careerTotalTPA = 0;
        this.careerTotalTPM = 0;
        this.careerTotalFTA = 0;
        this.careerTotalFTM = 0;

        this.careerTripleDoubles = 0;
        this.careerDoubleDoubles = 0;
        this.careerQuadDoubles = 0;
    }

    calcOvr() {
        this.ovr = Math.round((this.twoPt + this.threePt + this.inside + this.freeThrow + this.offensiveAbility + this.defensiveAbility + this.defensiveReb + this.offensiveReb + this.blockTen + this.stealTen + this.passingAccuracy + this.ballControl + this.catching + this.vertical + this.hustle + this.stamina + this.clutch + this.potential) / 15);
        /*
        if (this.ovr > 99){
            this.ovr = 99;
        }
        */
    }

    shooting(defense){
        const defensiveImpact = this.offensiveAbility - defense.defensiveAbility * (Math.random() + 1.2);
        const insideStress = 100;
        const twoStress = 130;
        const threeStress = 155;


        if (this.location === "Inside" && this.insideTen + defensiveImpact >= Math.round(Math.random() * 100)){
            this.fga += 1;
            if(defense.block(this)){
                return false;
            }
            if (this.inside + defensiveImpact >= Math.round(Math.random() * insideStress)){
                this.fgm += 1;
                this.pts += 2;
                if (this.passedFromSomeone != false) this.passedFromSomeone.ast += 1;
                return true;
            }
            else{
                return false;
            }
        }
        else if (this.location === "Close" && this.closeTen + defensiveImpact >= Math.round(Math.random() * 100)){
            this.fga += 1;
            if(defense.block(this)){
                return false;
            }
            if (this.inside + defensiveImpact >= Math.round(Math.random() * insideStress)){
                this.fgm += 1;
                this.pts += 2;
                if (this.passedFromSomeone != false) this.passedFromSomeone.ast += 1;
                return true;
            }
            else{
                return false;
            }
        }
        else if (this.location === "Left Elbow" && this.leftElbow + defensiveImpact >= Math.round(Math.random() * 100)){
            this.fga += 1;
            if(defense.block(this)){
                return false;
            }
            if (this.twoPt + defensiveImpact >= Math.round(Math.random() * twoStress)){
                this.fgm += 1;
                this.pts += 2;
                if (this.passedFromSomeone != false) this.passedFromSomeone.ast += 1;
                return true;
            }
            else{
                return false;
            }
        }
        else if (this.location === "Right Elbow" && this.rightElbow + defensiveImpact >= Math.round(Math.random() * 100)){
            this.fga += 1;
            if(defense.block(this)){
                return false;
            }
            if (this.twoPt + defensiveImpact >= Math.round(Math.random() * twoStress)){
                this.fgm += 1;
                this.pts += 2;
                if (this.passedFromSomeone != false) this.passedFromSomeone.ast += 1;
                return true;
            }
            else{
                return false;
            }
        }
        else if (this.location === "Left" && this.leftTwo + defensiveImpact >= Math.round(Math.random() * 100)){
            this.fga += 1;
            if(defense.block(this)){
                return false;
            }
            if (this.twoPt + defensiveImpact >= Math.round(Math.random() * twoStress)){
                this.fgm += 1;
                this.pts += 2;
                if (this.passedFromSomeone != false) this.passedFromSomeone.ast += 1;
                return true;
            }
            else{
                return false;
            }
        }
        else if (this.location === "Right" && this.rightTwo + defensiveImpact >= Math.round(Math.random() * 100)){
            this.fga += 1;
            if(defense.block(this)){
                return false;
            }
            if (this.twoPt + defensiveImpact >= Math.round(Math.random() * twoStress)){
                this.fgm += 1;
                this.pts += 2;
                if (this.passedFromSomeone != false) this.passedFromSomeone.ast += 1;
                return true;
            }
            else{
                return false;
            }
        }
        else if (this.location === "Center" && this.centerTwo + defensiveImpact >= Math.round(Math.random() * 100)){
            this.fga += 1;
            if(defense.block(this)){
                return false;
            }
            if (this.twoPt + defensiveImpact >= Math.round(Math.random() * twoStress)){
                this.fgm += 1;
                this.pts += 2;
                if (this.passedFromSomeone != false) this.passedFromSomeone.ast += 1;
                return true;
            }
            else{
                return false;
            }
        }
        else if (this.location === "Left Corner" && this.leftCorner + defensiveImpact >= Math.round(Math.random() * 100)){
            this.fga += 1;
            this.tpa += 1;
            if(defense.block(this, true)){
                return false;
            }
            if (this.threePt + defensiveImpact >= Math.round(Math.random() * threeStress)){
                this.fgm += 1;
                this.tpm += 1;
                this.pts += 3;
                if (this.passedFromSomeone != false) this.passedFromSomeone.ast += 1;
                return true;
            }
            else{
                return false;
            }
        }
        else if (this.location === "Right Corner" && this.rightCorner + defensiveImpact >= Math.round(Math.random() * 100)){
            this.fga += 1;
            this.tpa += 1;
            if(defense.block(this, true)){
                return false;
            }
            if (this.threePt + defensiveImpact >= Math.round(Math.random() * threeStress)){
                this.fgm += 1;
                this.tpm += 1;
                this.pts += 3;
                if (this.passedFromSomeone != false) this.passedFromSomeone.ast += 1;
                return true;
            }
            else{
                return false;
            }
        }
        else if (this.location === "Left Wing" && this.leftWing + defensiveImpact >= Math.round(Math.random() * 100)){
            this.fga += 1;
            this.tpa += 1;
            if(defense.block(this, true)){
                return false;
            }
            if (this.threePt + defensiveImpact >= Math.round(Math.random() * threeStress)){
                this.fgm += 1;
                this.tpm += 1;
                this.pts += 3;
                if (this.passedFromSomeone != false) this.passedFromSomeone.ast += 1;
                return true;
            }
            else{
                return false;
            }
        }
        else if (this.location === "Right Wing" && this.rightWing + defensiveImpact >= Math.round(Math.random() * 100)){
            this.fga += 1;
            this.tpa += 1;
            if(defense.block(this, true)){
                return false;
            }
            if (this.threePt + defensiveImpact >= Math.round(Math.random() * threeStress)){
                this.fgm += 1;
                this.tpm += 1;
                this.pts += 3;
                if (this.passedFromSomeone != false) this.passedFromSomeone.ast += 1;
                return true;
            }
            else{
                return false;
            }
        }
        else if (this.location === "Center Three" && this.centerThree + defensiveImpact >= Math.round(Math.random() * 100)){
            this.fga += 1;
            this.tpa += 1;
            if(defense.block(this, true)){
                return false;
            }
            if (this.threePt + defensiveImpact >= Math.round(Math.random() * threeStress)){
                this.fgm += 1;
                this.tpm += 1;
                this.pts += 3;
                if (this.passedFromSomeone != false) this.passedFromSomeone.ast += 1;
                return true;
            }
            else{
                return false;
            }
        }
    }

    moving(defense){
        const possiblePlaces = ["Inside", "Close", "Left Elbow", "Right Elbow", "Left Corner", "Right Corner", "Left Wing", "Right Wing", "Left", "Right", "Center", "Center Three"]
        const chosenPlaceToMove = possiblePlaces[Math.floor(Math.random() * possiblePlaces.length)]
        const moveStress = 200;

        if (chosenPlaceToMove != this.location){
            if (chosenPlaceToMove === "Inside" && this.insideTen >= Math.random() * moveStress){
                this.location = chosenPlaceToMove;
                defense.location = chosenPlaceToMove;
            }
            else if (chosenPlaceToMove === "Close" && this.closeTen >= Math.random() * moveStress){
                this.location = chosenPlaceToMove;
                defense.location = chosenPlaceToMove;
            }
            else if (chosenPlaceToMove === "Left Elbow" && this.leftElbow >= Math.random() * moveStress){
                this.location = chosenPlaceToMove;
                defense.location = chosenPlaceToMove;
            }
            else if (chosenPlaceToMove === "Right Elbow" && this.rightElbow >= Math.random() * moveStress){
                this.location = chosenPlaceToMove;
                defense.location = chosenPlaceToMove;
            }
            else if (chosenPlaceToMove === "Left Corner" && this.leftCorner >= Math.random() * moveStress){
                this.location = chosenPlaceToMove;
                defense.location = chosenPlaceToMove;
            }
            else if (chosenPlaceToMove === "Right Corner" && this.rightCorner >= Math.random() * moveStress){
                this.location = chosenPlaceToMove;
                defense.location = chosenPlaceToMove;
            }
            else if (chosenPlaceToMove === "Left Wing" && this.leftWing >= Math.random() * moveStress){
                this.location = chosenPlaceToMove;
                defense.location = chosenPlaceToMove;
            }
            else if (chosenPlaceToMove === "Right Wing" && this.rightWing >= Math.random() * moveStress){
                this.location = chosenPlaceToMove;
                defense.location = chosenPlaceToMove;
            }
            else if (chosenPlaceToMove === "Left" && this.leftTwo >= Math.random() * moveStress){
                this.location = chosenPlaceToMove;
                defense.location = chosenPlaceToMove;
            }
            else if (chosenPlaceToMove === "Right" && this.rightTwo >= Math.random() * moveStress){
                this.location = chosenPlaceToMove;
                defense.location = chosenPlaceToMove;
            }
            else if (chosenPlaceToMove === "Center" && this.centerTwo >= Math.random() * moveStress){
                this.location = chosenPlaceToMove;
                defense.location = chosenPlaceToMove;
            }
            else if (chosenPlaceToMove === "Center Three" && this.centerThree >= Math.random() * moveStress){
                this.location = chosenPlaceToMove;
                defense.location = chosenPlaceToMove;
            }
        }
    }

    block(offense, three = false){
        let blockFactor = 0;
        if (three === true){
            blockFactor = 100;
        }
        if (this.blk * this.height - offense.ballControl - offense.offensiveAbility - blockFactor > Math.random() * 1){
            this.blk += 1;
            return true;
        }else{
            return false;
        }
    }

    pass(defense){
        const passingList = [];
        for (let i = 0; i < this.otherTeammates.length; i++){
            if (this.otherTeammates[i] === this){
                continue;
            }
            passingList.push(...Array(this.otherTeammates[i].passTo).fill(this.otherTeammates[i]));
        }

        //Check for ball turning over and if defense steals it
        if (this.passingAccuracy + this.ballControl >= Math.random() * 1000){
            this.tov += 1;
            this.hasBall = false;
            const newPlayer = defense.otherTeammates[Math.floor(Math.random() * defense.otherTeammates.length)];
            hasBallPlayerSetter(newPlayer);
            newPlayer.hasBall = true;
        }
        else if (this.passingAccuracy + defense.stealTen >= Math.random() * 2000){
            this.tov += 1;
            this.hasBall = false;
            defense.hasBall = true;
            hasBallPlayerSetter(defense);
            defense.stl += 1;
        }else{
            const passedTo = passingList[Math.floor(Math.random() * passingList.length)];
            passedTo.hasBall = true;
            hasBallPlayerSetter(passedTo);
            this.hasBall = false;
            passedTo.passedFromSomeone = this;
        }


    }
    
    rebound(defense){
        let oPToReb = null;
        let dPToReb = null;

        let totalWeight = this.otherTeammates.reduce((sum, p) => sum + p.offensiveReb, 0);
        let rand = Math.random() * totalWeight;

        let runningSum = 0;
        for (let player of this.otherTeammates) {
            runningSum += player.offensiveReb;
            if (rand < runningSum){
                oPToReb = player;
                break;
            }
        }


        totalWeight = defense.otherTeammates.reduce((sum, p) => sum + p.defensiveReb, 0);
        rand = Math.random() * totalWeight;

        runningSum = 0;
        for (let player of defense.otherTeammates) {
            runningSum += player.defensiveReb;
            if (rand < runningSum){
                dPToReb = player;
                break;
            }
        }

        rand = Math.random() * (oPToReb.offensiveReb + dPToReb.defensiveReb * 3);
        if (rand < dPToReb.defensiveReb) {
            oPToReb.oReb += 1;
            return oPToReb;
        } else {
            dPToReb.dReb += 1;
            return dPToReb;
        }
    }

    playerPossesion(defense){
        this.moving(defense);
        if (this.passingTen > Math.random() * 80){
            this.pass(defense);
        }else{
            const shotOutcome = this.shooting(defense);
            if (shotOutcome === false){
                const newPlayer = this.rebound(defense);
                newPlayer.hasBall = true;
                hasBallPlayerSetter(newPlayer);
            }else{
                this.hasBall = false;
                const newPlayer = defense.otherTeammates[Math.floor(Math.random() * defense.otherTeammates.length)];
                hasBallPlayerSetter(newPlayer);
                newPlayer.hasBall = true;
            }
        }
    }

    statsUpdate(){
        if (this.min === 0){
            this.gamesPlayed += 1;
            this.careerGamesPlayed += 1;
            /*
            if (this.team.startingLineup.includes(this)){
                this.gamesStarted += 1;
                this.careerGamesStarted += 1;
            }
            */

            //Check for double doubles, triple doubles, quadruple doubles
            let greaterThanTenAmount = 0;
            if (this.pts >= 10){
                greaterThanTenAmount += 1;
            }
            if (this.ast >= 10){
                greaterThanTenAmount += 1;
            }
            if (this.oReb + this.dReb >= 10){
                greaterThanTenAmount += 1;
            }
            if (this.stl >= 10){
                greaterThanTenAmount += 1;
            }
            if (this.blk >= 10){
                greaterThanTenAmount += 1;
            }

            if (greaterThanTenAmount === 2){
                this.seasonDoubleDoubles += 1;
                this.careerDoubleDoubles += 1;
            }
            if (greaterThanTenAmount === 3){
                this.seasonTripleDoubles += 1;
                this.careerTripleDoubles += 1;
            }
            if (greaterThanTenAmount >= 4){
                this.seasonQuadDoubles += 1;
                this.careerQuadDoubles += 1;
            }

            //Season updates
            this.seasonTotalPts += this.pts;
            this.seasonTotalAst += this.ast;
            this.seasonTotalOReb += this.oReb;
            this.seasonTotalDReb += this.dReb;
            this.seasonTotalStl += this.stl;
            this.seasonTotalBlk += this.blk;
            this.seasonTotalFls += this.fls;
            this.seasonTotalTov += this.tov;
            this.seasonTotalFGA += this.fga;
            this.seasonTotalFGM += this.fgm;
            this.seasonTotalTPA += this.tpa;
            this.seasonTotalTPM += this.tpm;
            this.seasonTotalFTA += this.fta;
            this.seasonTotalFTM += this.ftm;

            this.avgPts = Number((this.seasonTotalPts / this.gamesPlayed).toFixed(1));
            this.avgAst = Number((this.seasonTotalAst / this.gamesPlayed).toFixed(1));
            this.avgOReb = Number((this.seasonTotalOReb / this.gamesPlayed).toFixed(1));
            this.avgDReb = Number((this.seasonTotalDReb / this.gamesPlayed).toFixed(1));
            this.avgStl = Number((this.seasonTotalStl / this.gamesPlayed).toFixed(1));
            this.avgBlk = Number((this.seasonTotalBlk / this.gamesPlayed).toFixed(1));
            this.avgFls = Number((this.seasonTotalFls / this.gamesPlayed).toFixed(1));
            this.avgTov = Number((this.seasonTotalTov / this.gamesPlayed).toFixed(1));
            this.fgp = Number((this.seasonTotalFGM / this.seasonTotalFGA).toFixed(1));
            this.tpp = Number((this.seasonTotalTPM / this.seasonTotalTPA).toFixed(1));
            this.ftp = Number((this.seasonTotalFTM / this.seasonTotalFTA).toFixed(1));


            //Career updates
            this.careerTotalPts += this.pts;
            this.careerTotalAst += this.ast;
            this.careerTotalOReb += this.oReb;
            this.careerTotalDReb += this.dReb;
            this.careerTotalStl += this.stl;
            this.careerTotalBlk += this.blk;
            this.careerTotalFls += this.fls;
            this.careerTotalTov += this.tov;
            this.careerTotalFGA += this.fga;
            this.careerTotalFGM += this.fgm;
            this.careerTotalTPA += this.tpa;
            this.careerTotalTPM += this.tpm;
            this.careerTotalFTA += this.fta;
            this.careerTotalFTM += this.ftm;

            this.careerAvgPts = Number((this.careerTotalPts / this.careerGamesPlayed).toFixed(1));
            this.careerAvgAst = Number((this.careerTotalAst / this.careerGamesPlayed).toFixed(1));
            this.careerAvgOReb = Number((this.careerTotalOReb / this.careerGamesPlayed).toFixed(1));
            this.careerAvgDReb = Number((this.careerTotalDReb / this.careerGamesPlayed).toFixed(1));
            this.careerAvgStl = Number((this.careerTotalStl / this.careerGamesPlayed).toFixed(1));
            this.careerAvgBlk = Number((this.careerTotalBlk / this.careerGamesPlayed).toFixed(1));
            this.careerAvgFls = Number((this.careerTotalFls / this.careerGamesPlayed).toFixed(1));
            this.careerAvgTov = Number((this.careerTotalTov / this.careerGamesPlayed).toFixed(1));
            this.careerAvgFG = Number((this.careerTotalFGM / this.careerTotalFGA).toFixed(1));
            this.careerAvgTP = Number((this.careerTotalTPM / this.careerTotalTPA).toFixed(1));
            this.careerAvgFT = Number((this.careerTotalFTM / this.careerTotalFTA).toFixed(1));


            //Reset game stats
            this.min = 0;
            this.pts = 0;
            this.ast = 0;
            this.dReb = 0;
            this.oReb = 0;
            this.stl = 0;
            this.blk = 0;
            this.fls = 0;
            this.tov = 0;
            this.fga = 0;
            this.fgm = 0;
            this.tpa = 0;
            this.tpm = 0;
            this.fta = 0;
            this.ftm = 0;
            this.boxMinus = 0;
        }
    }
}
