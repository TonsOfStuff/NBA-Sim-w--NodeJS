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

        this.location = "Center Three"
    }

    calcOvr() {
        this.ovr = Math.round((this.twoPt + this.threePt + this.inside + this.freeThrow + this.offensiveAbility + this.defensiveAbility + this.defensiveReb + this.offensiveReb + this.blockTen + this.stealTen + this.passingAccuracy + this.ballControl + this.catching + this.vertical + this.hustle + this.stamina + this.clutch + this.potential) / 15);
        /*
        if (this.ovr > 99){
            this.ovr = 99;
        }
        */
    }

    shooting(location, defense){
        const defensiveImpact = this.offensiveAbility - defense.defensiveAbility * (Math.random() + 1.2);
        const insideStress = 100;
        const twoStress = 130;
        const threeStress = 155;


        if (location === "Inside" && this.insideTen + defensiveImpact >= Math.round(Math.random() * 100)){
            this.fga += 1;
            if (this.inside + defensiveImpact >= Math.round(Math.random() * insideStress)){
                this.fgm += 1;
                return true;
            }
            else{
                return false;
            }
        }
        else if (location === "Close" && this.closeTen + defensiveImpact >= Math.round(Math.random() * 100)){
            this.fga += 1;
            if (this.inside + defensiveImpact >= Math.round(Math.random() * insideStress)){
                this.fgm += 1;
                return true;
            }
            else{
                return false;
            }
        }
        else if (location === "Left Elbow" && this.leftElbow + defensiveImpact >= Math.round(Math.random() * 100)){
            this.fga += 1;
            if (this.twoPt + defensiveImpact >= Math.round(Math.random() * twoStress)){
                this.fgm += 1;
                return true;
            }
            else{
                return false;
            }
        }
        else if (location === "Right Elbow" && this.rightElbow + defensiveImpact >= Math.round(Math.random() * 100)){
            this.fga += 1;
            if (this.twoPt + defensiveImpact >= Math.round(Math.random() * twoStress)){
                this.fgm += 1;
                return true;
            }
            else{
                return false;
            }
        }
        else if (location === "Left" && this.leftTwo + defensiveImpact >= Math.round(Math.random() * 100)){
            this.fga += 1;
            if (this.twoPt + defensiveImpact >= Math.round(Math.random() * twoStress)){
                this.fgm += 1;
                return true;
            }
            else{
                return false;
            }
        }
        else if (location === "Right" && this.rightTwo + defensiveImpact >= Math.round(Math.random() * 100)){
            this.fga += 1;
            if (this.twoPt + defensiveImpact >= Math.round(Math.random() * twoStress)){
                this.fgm += 1;
                return true;
            }
            else{
                return false;
            }
        }
        else if (location === "Center" && this.centerTwo + defensiveImpact >= Math.round(Math.random() * 100)){
            this.fga += 1;
            if (this.twoPt + defensiveImpact >= Math.round(Math.random() * twoStress)){
                this.fgm += 1;
                return true;
            }
            else{
                return false;
            }
        }
        else if (location === "Left Corner" && this.leftCorner + defensiveImpact >= Math.round(Math.random() * 100)){
            this.fga += 1;
            this.tpa += 1;
            if (this.threePt + defensiveImpact >= Math.round(Math.random() * threeStress)){
                this.fgm += 1;
                this.tpm += 1;
                return true;
            }
            else{
                return false;
            }
        }
        else if (location === "Right Corner" && this.rightCorner + defensiveImpact >= Math.round(Math.random() * 100)){
            this.fga += 1;
            this.tpa += 1;
            if (this.threePt + defensiveImpact >= Math.round(Math.random() * threeStress)){
                this.fgm += 1;
                this.tpm += 1;
                return true;
            }
            else{
                return false;
            }
        }
        else if (location === "Left Wing" && this.leftWing + defensiveImpact >= Math.round(Math.random() * 100)){
            this.fga += 1;
            this.tpa += 1;
            if (this.threePt + defensiveImpact >= Math.round(Math.random() * threeStress)){
                this.fgm += 1;
                this.tpm += 1;
                return true;
            }
            else{
                return false;
            }
        }
        else if (location === "Right Wing" && this.rightWing + defensiveImpact >= Math.round(Math.random() * 100)){
            this.fga += 1;
            this.tpa += 1;
            if (this.threePt + defensiveImpact >= Math.round(Math.random() * threeStress)){
                this.fgm += 1;
                this.tpm += 1;
                return true;
            }
            else{
                return false;
            }
        }
        else if (location === "Center Three" && this.centerThree + defensiveImpact >= Math.round(Math.random() * 100)){
            this.fga += 1;
            this.tpa += 1;
            if (this.threePt + defensiveImpact >= Math.round(Math.random() * threeStress)){
                this.fgm += 1;
                this.tpm += 1;
                return true;
            }
            else{
                return false;
            }
        }
    }

    moving(){
        const possiblePlaces = ["Inside", "Close", "Left Elbow", "Right Elbow", "Left Corner", "Right Corner", "Left Wing", "Right Wing", "Left", "Right", "Center", "Center Three"]
        const chosenPlaceToMove = possiblePlaces[Math.floor(Math.random() * possiblePlaces.length)]
        const moveStress = 200;

        if (chosenPlaceToMove != this.location){
            if (chosenPlaceToMove === "Inside" && this.insideTen >= Math.random() * moveStress){
                this.location = chosenPlaceToMove;
            }
            else if (chosenPlaceToMove === "Close" && this.closeTen >= Math.random() * moveStress){
                this.location = chosenPlaceToMove;
            }
            else if (chosenPlaceToMove === "Left Elbow" && this.leftElbow >= Math.random() * moveStress){
                this.location = chosenPlaceToMove;
            }
            else if (chosenPlaceToMove === "Right Elbow" && this.rightElbow >= Math.random() * moveStress){
                this.location = chosenPlaceToMove;
            }
            else if (chosenPlaceToMove === "Left Corner" && this.leftCorner >= Math.random() * moveStress){
                this.location = chosenPlaceToMove;
            }
            else if (chosenPlaceToMove === "Right Corner" && this.rightCorner >= Math.random() * moveStress){
                this.location = chosenPlaceToMove;
            }
            else if (chosenPlaceToMove === "Left Wing" && this.leftWing >= Math.random() * moveStress){
                this.location = chosenPlaceToMove;
            }
            else if (chosenPlaceToMove === "Right Wing" && this.rightWing >= Math.random() * moveStress){
                this.location = chosenPlaceToMove;
            }
            else if (chosenPlaceToMove === "Left" && this.leftTwo >= Math.random() * moveStress){
                this.location = chosenPlaceToMove;
            }
            else if (chosenPlaceToMove === "Right" && this.rightTwo >= Math.random() * moveStress){
                this.location = chosenPlaceToMove;
            }
            else if (chosenPlaceToMove === "Center" && this.centerTwo >= Math.random() * moveStress){
                this.location = chosenPlaceToMove;
            }
            else if (chosenPlaceToMove === "Center Three" && this.centerThree >= Math.random() * moveStress){
                this.location = chosenPlaceToMove;
            }
        }
    }
}
