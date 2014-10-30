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
        // Create simple text display for current Phaser version
        var text = "Phaser Version "+Phaser.DEV_VERSION + " works! Hallelujah!";
        var style = { font: "24px Arial", fill: "#fff", align: "center" };
        var t = game.add.text(this.world.centerX, this.world.centerY, text, style);
        t.anchor.setTo(0.5, 0.5);

    },
    preload: function() {
        // STate preload logic goes here
    },
    create: function(){
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
        }
    }

    // Don't you need to update temp to actual? Confused here
};

var game = new Phaser.Game(
    800,
    480,
    Phaser.AUTO,
    'game',
    state
);
