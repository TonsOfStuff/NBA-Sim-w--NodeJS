import { Player } from "./player.js";
import { Team } from "./team.js";

//Players
const michaelJordan = new Player("Michael Jordan", "Slasher", 99, 89, 96, 90, 99, 96, 32, 21, 52, 87, 12, 29, 56, 96, 95, 93, 95, 92, 96, 75, 82, 90, 90, 94, 95, 87, 75, 99, 52, 87, 78, 34, 45, 99, 99)
const lebron = new Player("LeBron James", "All", 95, 93, 97, 76, 99, 86, 42, 21, 88, 45, 42, 35, 94, 97, 99, 95, 91, 82, 87, 32, 32, 82, 85, 82, 90, 98, 95, 83, 79, 92, 81, 37, 42, 99, 99)


//Teams
const chicagoBulls = new Team("Chicago Bulls", true, []);

window.test = function(){
    lebron.moving();
    lebron.shooting(lebron.location, michaelJordan);

    console.log("Field Goal: " + lebron.fgm.toString() + "/" + lebron.fga.toString());
    console.log("Three: " + lebron.tpm.toString() + "/" + lebron.tpa.toString());
}
