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
    }

    calcOvr() {
        this.ovr = Math.round((this.twoPt + this.threePt + this.inside + this.freeThrow + this.offensiveAbility + this.defensiveAbility + this.defensiveReb + this.offensiveReb + this.blockTen + this.stealTen + this.passingAccuracy + this.ballControl + this.catching + this.vertical + this.hustle + this.stamina + this.clutch + this.potential) / 17);
    }
}
