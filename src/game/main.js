/**
 *
 * This is a simple state template to use for getting a Phaser game up
 * and running quickly. Simply add your own game logic to the default
 * state object or delete it and make your own.
 *
 */

count = 0;

var state = {
    init: function() {
        // TODO: put in actual village factors

        all_villages_percent_infected = [0,0,0,0,0,0];
        temp_villages_percent_infected = [0,0,0,0,0,0];
        villages = [
            Village(100, [1,1,1,1,1,1], 0),
            Village(200, [1,1,1,1,1,1], 1),
            Village(300, [1,1,1,1,1,1], 2),
            Village(300, [1,1,1,1,1,1], 3),
            Village(200, [1,1,1,1,1,1], 4),
            Village(100, [1,1,1,1,1,1], 5)
        ];

    },
    preload: function() {
        this.load.image("map", "/assets/images/Map.png");

        this.load.image("city", "/assets/images/TempCityIcon.png");
    },
    create: function() {

        game.add.sprite(0, 0, "map");


        // TODO:
        // sprite.events.onInputUp.add(yourFunction, this)




      // State create logic goes here
    },
    update: function() {
        // Called 60 times per second
        count += 1;
        if (count == 60) {
            count = 0;
            for (i = 0; i < villages.length; i++) {
                villages[i].incrementDay();
            }
            all_villages_percent_infected = temp_villages_percent_infected.slice();
        }
    }

    // Don't you need to update temp to actual? Confused here
};

function 
var game = new Phaser.Game(
    800,
    480,
    Phaser.AUTO,
    'game',
    state
);
