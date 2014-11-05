/**
 *
 * This is a simple state template to use for getting a Phaser game up
 * and running quickly. Simply add your own game logic to the default
 * state object or delete it and make your own.
 *
 */

count = 0;
villageTextBox = null;
moneyText = null;
currently_selected_village = 0;

var populateVillageInfoBox = function () {
    if (villageTextBox != null) {
        villageTextBox.destroy();
    }
    var selected_village = villages[currently_selected_village];
    var text = "Village " + currently_selected_village
    text += "\nPopulation: " + (selected_village.getPopulation() - selected_village.getHowManyDead());
    text += "\nPeople Infected: " + selected_village.getHowManyInfected();
    text += "\nPeople Dead: " + selected_village.getHowManyDead();
    var style = { font: "12px Arial", fill: "#ff0044", align: "left" };
    villageTextBox = game.add.text(0, game.world._height-200, text, style);
};

var moneyTextBox = function () {
    var style = { font: "16px Arial", fill: "#ff0044", align: "left" };
    if(moneyText == null){
        moneyText = game.add.text(0, 1100, "Your income: " + money, style);
    }
}
var generateListenerForVillage = function(index) {
    return function() {
        currently_selected_village = index;
    };
}

var state = {
    init: function() {
        // TODO: decide on actual money amounts
        money = 1000
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
        populateVillageInfoBox();
        moneyTextBox();
    },
    preload: function() {
        // STate preload logic goes here
        game.load.image('map', 'assets/images/Map.png');
        game.load.image('village', 'assets/images/TempCityIcon.png');
    },
    create: function() {
        // State create logic goes here
        game.add.sprite(0, 0, "map");
        var villageImages = [];
        for (i = 0; i < villages.length; i++) {
            var villageImage = game.add.sprite(100*(i+1), game.world.centerY, 'village');
            villageImage.anchor.set(0.5);
            villageImage.inputEnabled = true;
            var iCopy = i+0;
            villageImage.events.onInputDown.add(generateListenerForVillage(i), this);
            villageImages.push(villageImage);
        }
    },
    update: function() {
        populateVillageInfoBox();
        // Called 60 times per second
        count += 1;
        if (count == 60) {
            count = 0;
            money += 25;
            moneyText.setText("Your income: " + money);
            for (i = 0; i < villages.length; i++) {
                villages[i].incrementDay();
            }
            all_villages_percent_infected = temp_villages_percent_infected.slice();
        }
    }

};

var game = new Phaser.Game(
    1024,
    1224,
    Phaser.AUTO,
    'game',
    state
);
