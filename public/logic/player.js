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
        this.teamName = "Free Agent";

        //Game necessaries
        this.location = "Center Three"
        this.otherTeammates = [];
        this.opponents = [];
        this.hasBall = false;
        this.passTo = 1;
        this.passToOg = 1;
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

        this.seasonTotalMin = 0;
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

        this.careerAvgMin = 0;
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

        this.careerTotalMin = 0;
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


        //Awards
        this.totalMVPS = 0;
        this.totalDPOYs = 0;
        this.totalROTYs = 0;
        this.totalSMOTY = 0;

        this.mvpNum = 0;
        this.dpoyNum = 0;

        this.allNBAFirst = 0;
        this.allNBASecond = 0;
        this.allNBAThird = 0;
        this.allDefensiveFirst = 0;
        this.allDefensiveSecond = 0;
        this.allDefensiveThird = 0;

        this.allStar = 0;

        this.scoringChamp = 0;
        this.assistChamp = 0;
        this.reboundChamp = 0;
        this.stealChamp = 0;
        this.blockChamp = 0;
    }

    calcOvr() {
        this.ovr = Math.round((this.twoPt + this.threePt + this.inside + this.freeThrow + this.offensiveAbility + this.defensiveAbility + this.defensiveReb + this.offensiveReb + this.blockTen + this.stealTen + this.passingAccuracy + this.ballControl + this.catching + this.vertical + this.hustle + this.stamina + this.clutch + this.potential) / 15);
        /*
        if (this.ovr > 99){
            this.ovr = 99;
        }
        */
    }

    calcAwardsVal(){
        this.mvpNum = Number((this.avgPts + this.avgAst * 1.1 + this.avgDReb * 1.05 + this.avgOReb * 1.05 + this.avgStl * 2 + this.avgBlk * 3.4 + this.fgp / 15 + this.tpp / 7 + this.ftp / 30 - this.avgFls - this.avgTov).toFixed(3));
        this.dpoyNum = Number((this.avgStl * 2 + this.avgBlk * 9 + this.avgDReb * 3 + this.avgOReb + 2).toFixed(3));
    }

    shooting(defense, time){
        let defensiveImpact = 0;
        if (this.passedFromSomeone === false){
            defensiveImpact = this.offensiveAbility - defense.defensiveAbility * (Math.random() + 2);
        }else{
            defensiveImpact = this.offensiveAbility + (this.passedFromSomeone.passingAccuracy - Math.random() * 30) - this.defensiveAbility * (Math.random() + 1.4)
        }
        let factor = 0;
        if (time > 180){
            factor = Math.round(this.clutch * 0.3);
        }
        let shootTend = 100;
        
        let insideStress = 120;
        const twoStress = 150;
        const threeStress = 250;
        let drawFreeThrowAmount = 50;
        const freeThrowDiff = 110;

        //Archetype Effect
        if (this.arch.includes("Shooter")){
            shootTend += 10;
        }
        if (this.arch.includes("Two-Way")){
            shootTend += 5;
        }
        if (this.arch.includes("Post-player")){
            insideStress -= 10;
        }
        if (this.arch.includes("Slasher")){
            drawFreeThrowAmount -= 10;
        }

        if (this.location === "Inside" && this.insideTen + defensiveImpact >= Math.round(Math.random() * shootTend)){
            if(defense.takeCharges > Math.random() * 10000){
                this.fls += 1;
                return true;
            }
            this.fga += 1;
            if(defense.block(this)){
                return false;
            }
            if (this.inside + defensiveImpact >= Math.round(Math.random() * (insideStress - factor))){
                this.fgm += 1;
                this.pts += 2;
                this.team.calcBoxMinus(2);
                defense.team.calcBoxMinus(-2);
                if (this.passedFromSomeone != false && Math.random() * 3 > 1) this.passedFromSomeone.ast += 1;
                if (this.drawFoul + defense.foul > Math.random() * (drawFreeThrowAmount + 200)){
                    defense.fls += 1;
                    this.fta += 1;
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                    }else{
                        return false;
                    }
                }
                return true;
            }
            else{
                //Fts
                if (this.drawFoul + defense.foul > Math.random() * drawFreeThrowAmount){
                    defense.fls += 1;
                    this.fta += 2;
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                    }
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                        return true;
                    }
                }
                return false;
            }
        }
        else if (this.location === "Close" && this.closeTen + defensiveImpact >= Math.round(Math.random() * shootTend)){
            if(defense.takeCharges > Math.random() * 10000){
                this.fls += 1;
                return true;
            }
            this.fga += 1;
            if(defense.block(this)){
                return false;
            }
            if (this.inside + defensiveImpact >= Math.round(Math.random() * (insideStress - factor))){
                this.fgm += 1;
                this.pts += 2;
                this.team.calcBoxMinus(2);
                defense.team.calcBoxMinus(-2);
                if (this.passedFromSomeone != false && Math.random() * 3 > 1) this.passedFromSomeone.ast += 1;
                if (this.drawFoul + defense.foul > Math.random() * (drawFreeThrowAmount + 200)){
                    defense.fls += 1;
                    this.fta += 1;
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                    }else{
                        return false;
                    }
                }
                return true;
            }
            else{
                //Fts
                if (this.drawFoul + defense.foul > Math.random() * drawFreeThrowAmount){
                    defense.fls += 1;
                    this.fta += 2;
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                    }
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                        return true;
                    }
                }
                return false;
            }
        }
        else if (this.location === "Left Elbow" && this.leftElbow + defensiveImpact >= Math.round(Math.random() * shootTend)){
            this.fga += 1;
            if(defense.block(this)){
                return false;
            }
            if (this.twoPt + defensiveImpact >= Math.round(Math.random() * (twoStress - factor))){
                this.fgm += 1;
                this.pts += 2;
                this.team.calcBoxMinus(2);
                defense.team.calcBoxMinus(-2);
                if (this.passedFromSomeone != false && Math.random() * 3 > 1) this.passedFromSomeone.ast += 1;
                if (this.drawFoul + defense.foul > Math.random() * (drawFreeThrowAmount + 500)){
                    defense.fls += 1;
                    this.fta += 1;
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                    }else{
                        return false;
                    }
                }
                return true;
            }
            else{
                //Fts
                if (this.drawFoul + defense.foul > Math.random() * drawFreeThrowAmount + 300){
                    defense.fls += 1;
                    this.fta += 2;
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                    }
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                        return true;
                    }
                }
                return false;
            }
        }
        else if (this.location === "Right Elbow" && this.rightElbow + defensiveImpact >= Math.round(Math.random() * shootTend)){
            this.fga += 1;
            if(defense.block(this)){
                return false;
            }
            if (this.twoPt + defensiveImpact >= Math.round(Math.random() * (twoStress - factor))){
                this.fgm += 1;
                this.pts += 2;
                this.team.calcBoxMinus(2);
                defense.team.calcBoxMinus(-2);
                if (this.passedFromSomeone != false && Math.random() * 3 > 1) this.passedFromSomeone.ast += 1;
                if (this.drawFoul + defense.foul > Math.random() * (drawFreeThrowAmount + 500)){
                    defense.fls += 1;
                    this.fta += 1;
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                    }else{
                        return false;
                    }
                }
                return true;
            }
            else{
                //Fts
                if (this.drawFoul + defense.foul > Math.random() * drawFreeThrowAmount + 300){
                    defense.fls += 1;
                    this.fta += 2;
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                    }
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                        return true;
                    }
                }
                return false;
            }
        }
        else if (this.location === "Left" && this.leftTwo + defensiveImpact >= Math.round(Math.random() * shootTend)){
            this.fga += 1;
            if(defense.block(this)){
                return false;
            }
            if (this.twoPt + defensiveImpact >= Math.round(Math.random() * (twoStress - factor))){
                this.fgm += 1;
                this.pts += 2;
                this.team.calcBoxMinus(2);
                defense.team.calcBoxMinus(-2);
                if (this.passedFromSomeone != false && Math.random() * 3 > 1) this.passedFromSomeone.ast += 1;
                if (this.drawFoul + defense.foul > Math.random() * (drawFreeThrowAmount + 500)){
                    defense.fls += 1;
                    this.fta += 1;
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                    }else{
                        return false;
                    }
                }
                return true;
            }
            else{
                //Fts
                if (this.drawFoul + defense.foul > Math.random() * drawFreeThrowAmount + 300){
                    defense.fls += 1;
                    this.fta += 2;
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                    }
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                        return true;
                    }
                }
                return false;
            }
        }
        else if (this.location === "Right" && this.rightTwo + defensiveImpact >= Math.round(Math.random() * shootTend)){
            this.fga += 1;
            if(defense.block(this)){
                return false;
            }
            if (this.twoPt + defensiveImpact >= Math.round(Math.random() * (twoStress - factor))){
                this.fgm += 1;
                this.pts += 2;
                this.team.calcBoxMinus(2);
                defense.team.calcBoxMinus(-2);
                if (this.passedFromSomeone != false && Math.random() * 3 > 1) this.passedFromSomeone.ast += 1;
                if (this.drawFoul + defense.foul > Math.random() * (drawFreeThrowAmount + 500)){
                    defense.fls += 1;
                    this.fta += 1;
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                    }else{
                        return false;
                    }
                }
                return true;
            }
            else{
                //Fts
                if (this.drawFoul + defense.foul > Math.random() * drawFreeThrowAmount + 300){
                    defense.fls += 1;
                    this.fta += 2;
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                    }
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                        return true;
                    }
                }
                return false;
            }
        }
        else if (this.location === "Center" && this.centerTwo + defensiveImpact >= Math.round(Math.random() * shootTend)){
            this.fga += 1;
            if(defense.block(this)){
                return false;
            }
            if (this.twoPt + defensiveImpact >= Math.round(Math.random() * (twoStress - factor))){
                this.fgm += 1;
                this.pts += 2;
                this.team.calcBoxMinus(2);
                defense.team.calcBoxMinus(-2);
                if (this.passedFromSomeone != false && Math.random() * 3 > 1) this.passedFromSomeone.ast += 1;
                if (this.drawFoul + defense.foul > Math.random() * (drawFreeThrowAmount + 500)){
                    defense.fls += 1;
                    this.fta += 1;
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                    }else{
                        return false;
                    }
                }
                return true;
            }
            else{
                //Fts
                if (this.drawFoul + defense.foul > Math.random() * drawFreeThrowAmount + 300){
                    defense.fls += 1;
                    this.fta += 2;
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                    }
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                        return true;
                    }
                }
                return false;
            }
        }
        else if (this.location === "Left Corner" && this.leftCorner + defensiveImpact >= Math.round(Math.random() * shootTend)){
            this.fga += 1;
            this.tpa += 1;
            if(defense.block(this, true)){
                return false;
            }
            if (this.threePt + defensiveImpact >= Math.round(Math.random() * (threeStress - factor))){
                this.fgm += 1;
                this.tpm += 1;
                this.pts += 3;
                this.team.calcBoxMinus(3);
                defense.team.calcBoxMinus(-3);
                if (this.passedFromSomeone != false && Math.random() * 3 > 1) this.passedFromSomeone.ast += 1;
                if (this.drawFoul + defense.foul > Math.random() * (drawFreeThrowAmount + 1500)){
                    defense.fls += 1;
                    this.fta += 1;
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                    }else{
                        return false;
                    }
                }
                return true;
            }
            else{
                //Fts
                if (this.drawFoul + defense.foul > Math.random() * drawFreeThrowAmount + 1000){
                    defense.fls += 1;
                    this.fta += 3;
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                    }
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                    }
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                        return true;
                    }
                }
                return false;
            }
        }
        else if (this.location === "Right Corner" && this.rightCorner + defensiveImpact >= Math.round(Math.random() * shootTend)){
            this.fga += 1;
            this.tpa += 1;
            if(defense.block(this, true)){
                return false;
            }
            if (this.threePt + defensiveImpact >= Math.round(Math.random() * (threeStress - factor))){
                this.fgm += 1;
                this.tpm += 1;
                this.pts += 3;
                this.team.calcBoxMinus(3);
                defense.team.calcBoxMinus(-3);
                if (this.passedFromSomeone != false && Math.random() * 3 > 1) this.passedFromSomeone.ast += 1;
                if (this.drawFoul + defense.foul > Math.random() * (drawFreeThrowAmount + 1500)){
                    defense.fls += 1;
                    this.fta += 1;
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                    }else{
                        return false;
                    }
                }
                return true;
            }
            else{
                //Fts
                if (this.drawFoul + defense.foul > Math.random() * drawFreeThrowAmount + 1000){
                    defense.fls += 1;
                    this.fta += 3;
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                    }
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                    }
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                        return true;
                    }
                }
                return false;
            }
        }
        else if (this.location === "Left Wing" && this.leftWing + defensiveImpact >= Math.round(Math.random() * shootTend)){
            this.fga += 1;
            this.tpa += 1;
            if(defense.block(this, true)){
                return false;
            }
            if (this.threePt + defensiveImpact >= Math.round(Math.random() * (threeStress - factor))){
                this.fgm += 1;
                this.tpm += 1;
                this.pts += 3;
                this.team.calcBoxMinus(3);
                defense.team.calcBoxMinus(-3);
                if (this.passedFromSomeone != false && Math.random() * 3 > 1) this.passedFromSomeone.ast += 1;
                if (this.drawFoul + defense.foul > Math.random() * (drawFreeThrowAmount + 1500)){
                    defense.fls += 1;
                    this.fta += 1;
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                    }else{
                        return false;
                    }
                }
                return true;
            }
            else{
                //Fts
                if (this.drawFoul + defense.foul > Math.random() * drawFreeThrowAmount + 1000){
                    defense.fls += 1;
                    this.fta += 3;
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                    }
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                    }
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                        return true;
                    }
                }
                return false;
            }
        }
        else if (this.location === "Right Wing" && this.rightWing + defensiveImpact >= Math.round(Math.random() * shootTend)){
            this.fga += 1;
            this.tpa += 1;
            if(defense.block(this, true)){
                return false;
            }
            if (this.threePt + defensiveImpact >= Math.round(Math.random() * (threeStress - factor))){
                this.fgm += 1;
                this.tpm += 1;
                this.pts += 3;
                this.team.calcBoxMinus(3);
                defense.team.calcBoxMinus(-3);
                if (this.passedFromSomeone != false && Math.random() * 3 > 1) this.passedFromSomeone.ast += 1;
                if (this.drawFoul + defense.foul > Math.random() * (drawFreeThrowAmount + 1500)){
                    defense.fls += 1;
                    this.fta += 1;
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                    }else{
                        return false;
                    }
                }
                return true;
            }
            else{
                //Fts
                if (this.drawFoul + defense.foul > Math.random() * drawFreeThrowAmount + 1000){
                    defense.fls += 1;
                    this.fta += 3;
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                    }
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                    }
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                        return true;
                    }
                }
                return false;
            }
        }
        else if (this.location === "Center Three" && this.centerThree + defensiveImpact >= Math.round(Math.random() * shootTend)){
            this.fga += 1;
            this.tpa += 1;
            if(defense.block(this, true)){
                return false;
            }
            if (this.threePt + defensiveImpact >= Math.round(Math.random() * (threeStress - factor))){
                this.fgm += 1;
                this.tpm += 1;
                this.pts += 3;
                this.team.calcBoxMinus(3);
                defense.team.calcBoxMinus(-3);
                if (this.passedFromSomeone != false && Math.random() * 3 > 1) this.passedFromSomeone.ast += 1;
                if (this.drawFoul + defense.foul > Math.random() * (drawFreeThrowAmount + 1500)){
                    defense.fls += 1;
                    this.fta += 1;
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                    }else{
                        return false;
                    }
                }
                return true;
            }
            else{
                //Fts
                if (this.drawFoul + defense.foul > Math.random() * drawFreeThrowAmount + 1000){
                    defense.fls += 1;
                    this.fta += 3;
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                    }
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                    }
                    if (this.freeThrow > Math.random() * freeThrowDiff){
                        this.pts += 1;
                        this.ftm += 1;
                        this.team.calcBoxMinus(1);
                        defense.team.calcBoxMinus(-1);
                        return true;
                    }
                }
                return false;
            }
        }else{
            if (Math.round(Math.random() * 5) === 1){
                this.fga += 1;
                if (this.twoPt + defensiveImpact >= Math.round(Math.random() * (twoStress - factor))){
                    this.fgm += 1;
                    this.pts += 2;
                    this.team.calcBoxMinus(2);
                    defense.team.calcBoxMinus(-2);
                    if (this.passedFromSomeone != false && Math.random() * 3 > 1) this.passedFromSomeone.ast += 1;
                    if (this.drawFoul + defense.foul > Math.random() * (drawFreeThrowAmount + 500)){
                        defense.fls += 1;
                        this.fta += 1;
                        if (this.freeThrow > Math.random() * freeThrowDiff){
                            this.pts += 1;
                            this.ftm += 1;
                            this.team.calcBoxMinus(1);
                            defense.team.calcBoxMinus(-1);
                        }else{
                            return false;
                        }
                    }
                    return true;
                }
                else{
                    //Fts
                    if (this.drawFoul + defense.foul > Math.random() * drawFreeThrowAmount + 300){
                        defense.fls += 1;
                        this.fta += 2;
                        if (this.freeThrow > Math.random() * freeThrowDiff){
                            this.pts += 1;
                            this.ftm += 1;
                            this.team.calcBoxMinus(1);
                            defense.team.calcBoxMinus(-1);
                        }
                        if (this.freeThrow > Math.random() * freeThrowDiff){
                            this.pts += 1;
                            this.ftm += 1;
                            this.team.calcBoxMinus(1);
                            defense.team.calcBoxMinus(-1);
                            return true;
                        }
                    }
                    return false;
                }
            }else{
                this.pass(defense);
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
        if (this.arch.includes("Defensive")){
            blockFactor -= 20;
        }
        if (this.arch.includes("Two-way")){
            blockFactor -= 10;
        }
        if (Math.pow(this.blockTen, 1.5) + Math.pow(this.height, 1.5) - offense.ballControl - offense.offensiveAbility - blockFactor > Math.random() * 7000){
            this.blk += 1;
            return true;
        }else{
            return false;
        }
    }

    pass(defense){
        let passingList = [];
        for (let i = 0; i < this.otherTeammates.length; i++){
            if (this.otherTeammates[i] === this){
                continue;
            }
            let passingAmount = this.otherTeammates[i].passTo;
            if (this.otherTeammates[i].arch.includes("All")){
                passingAmount += 1;
            }
            //Progressive slowdown
            if (this.otherTeammates[i].fga > 20){
                passingAmount -= 1;
            }
            else if (this.otherTeammates[i].fga > 30){
                passingAmount -= 3;
            }
            else if (this.otherTeammates[i].fga > 40){
                passingAmount -= 5;
            }
            if (passingAmount < 0){
                passingAmount = 0;
            }
            passingList.push(...Array(passingAmount).fill(this.otherTeammates[i]));
        }

        //Check for ball turning over and if defense steals it
        if (300 - this.passingAccuracy + this.ballControl > Math.random() * 15000){
            this.tov += 1;
            this.hasBall = false;
            const newPlayer = defense.otherTeammates[Math.floor(Math.random() * defense.otherTeammates.length)];
            hasBallPlayerSetter(newPlayer);
            newPlayer.hasBall = true;
            this.team.shotClock = 0;
        }
        else if (500 - (this.passingAccuracy + this.passingTen + this.ballControl - defense.stealTen) > Math.random() * 12000){
            this.tov += 1;
            this.hasBall = false;
            defense.hasBall = true;
            hasBallPlayerSetter(defense);
            defense.stl += 1;
            this.team.shotClock = 0;
        }
        else{
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

        let totalWeight = this.otherTeammates.reduce((sum, p) => sum + Math.pow(p.offensiveReb, 1.5) + Math.pow(p.height, 1.5) + p.hustle + p.vertical, 0);
        let rand = Math.random() * totalWeight;

        let runningSum = 0;
        for (let player of this.otherTeammates) {
            runningSum += Math.pow(player.offensiveReb, 1.5) + Math.pow(player.height, 1.5) + player.hustle + player.vertical;
            if (rand < runningSum){
                oPToReb = player;
                break;
            }
        }


        totalWeight = defense.otherTeammates.reduce((sum, p) => sum + Math.pow(p.defensiveReb, 1.5) + Math.pow(p.height, 1.5) + p.hustle + p.vertical, 0);
        rand = Math.random() * totalWeight;

        runningSum = 0;
        for (let player of defense.otherTeammates) {
            runningSum += Math.pow(player.defensiveReb, 1.5) + Math.pow(player.height, 1.5) + player.hustle + player.vertical;
            if (rand < runningSum){
                dPToReb = player;
                break;
            }
        }
        rand = Math.random() * (oPToReb.offensiveReb * (oPToReb.arch.includes("Inside") ? 2 : 1) + dPToReb.defensiveReb * (dPToReb.arch.includes("Inside") ? 7 : 5));
        if (rand < dPToReb.defensiveReb) {
            oPToReb.oReb += 1;
            return oPToReb;
        } else {
            dPToReb.dReb += 1;
            return dPToReb;
        }
    }

    playerPossesion(defense, time){
        this.moving(defense);
        let passTen = 100;
        if (this.arch.includes("Playermaker")){
            passTen -= 30;
        }
        if (this.passedFromSomeone !== false){
            passTen += this.passedFromSomeone.passingAccuracy / 2
        }
			
        if (this.passingTen + this.fga > Math.random() * passTen && this.team.shotClock < 5){
            this.pass(defense);
            this.team.shotClock += 1;
        }else{
            const shotOutcome = this.shooting(defense, time);
            if (shotOutcome === false){
                this.passedFromSomeone = false;
                const newPlayer = this.rebound(defense);
                newPlayer.hasBall = true;
                hasBallPlayerSetter(newPlayer);
                this.team.shotClock = 0;
            }else if (shotOutcome === true){
                this.passedFromSomeone = false;
                this.hasBall = false;
                const newPlayer = defense.otherTeammates[Math.floor(Math.random() * defense.otherTeammates.length)];
                hasBallPlayerSetter(newPlayer);
                newPlayer.hasBall = true;
                this.team.shotClock = 0;
            }
        }
    }

    statsUpdate(){
        if (this.min != 0){
            this.gamesPlayed += 1;
            this.careerGamesPlayed += 1;
            if (this.team.startingLineup.includes(this)){
                this.gamesStarted += 1;
                this.careerGamesStarted += 1;
            }

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
            this.seasonTotalMin += this.min;
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

            this.avgMin = Number((this.seasonTotalMin / this.gamesPlayed).toFixed(1));
            this.avgPts = Number((this.seasonTotalPts / this.gamesPlayed).toFixed(1));
            this.avgAst = Number((this.seasonTotalAst / this.gamesPlayed).toFixed(1));
            this.avgOReb = Number((this.seasonTotalOReb / this.gamesPlayed).toFixed(1));
            this.avgDReb = Number((this.seasonTotalDReb / this.gamesPlayed).toFixed(1));
            this.avgStl = Number((this.seasonTotalStl / this.gamesPlayed).toFixed(1));
            this.avgBlk = Number((this.seasonTotalBlk / this.gamesPlayed).toFixed(1));
            this.avgFls = Number((this.seasonTotalFls / this.gamesPlayed).toFixed(1));
            this.avgTov = Number((this.seasonTotalTov / this.gamesPlayed).toFixed(1));
            this.fgp = Number((this.seasonTotalFGM / this.seasonTotalFGA).toFixed(2));
            this.tpp = Number((this.seasonTotalTPM / this.seasonTotalTPA).toFixed(2));
            this.ftp = Number((this.seasonTotalFTM / this.seasonTotalFTA).toFixed(2));


            //Career updates
            this.careerTotalMin += this.min;
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

            this.careerAvgMin = Number((this.careerTotalMin / this.careerGamesPlayed).toFixed(1));
            this.careerAvgPts = Number((this.careerTotalPts / this.careerGamesPlayed).toFixed(1));
            this.careerAvgAst = Number((this.careerTotalAst / this.careerGamesPlayed).toFixed(1));
            this.careerAvgOReb = Number((this.careerTotalOReb / this.careerGamesPlayed).toFixed(1));
            this.careerAvgDReb = Number((this.careerTotalDReb / this.careerGamesPlayed).toFixed(1));
            this.careerAvgStl = Number((this.careerTotalStl / this.careerGamesPlayed).toFixed(1));
            this.careerAvgBlk = Number((this.careerTotalBlk / this.careerGamesPlayed).toFixed(1));
            this.careerAvgFls = Number((this.careerTotalFls / this.careerGamesPlayed).toFixed(1));
            this.careerAvgTov = Number((this.careerTotalTov / this.careerGamesPlayed).toFixed(1));
            this.careerAvgFG = Number((this.careerTotalFGM / this.careerTotalFGA).toFixed(2));
            this.careerAvgTP = Number((this.careerTotalTPM / this.careerTotalTPA).toFixed(2));
            this.careerAvgFT = Number((this.careerTotalFTM / this.careerTotalFTA).toFixed(2));



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
