/**
 *
 * This is a simple state template to use for getting a Phaser game up
 * and running quickly. Simply add your own game logic to the default
 * state object or delete it and make your own.
 *
 */

VILLAGE_POSITIONS = [
    [187,127],
    [131,356],
    [337,525],
    [439,120],
    [540,431],
    [712,225]
];

count = 0;
villageTextBox = null;
moneyText = null;
dateText = null;
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
    villageTextBox = game.add.text(768, 0, text, style);
};

var moneyTextBox = function () {
    var style = { font: "16px Arial", fill: "#ff0044", align: "left" };
    if(moneyText == null){
        moneyText = game.add.text(0, 1100, "Your income: " + money, style);
    }
}

var dateTextBox = function () {
    var style = { font: "16px Arial", fill: "#ff0044", align: "left" };
    if(dateText == null){
        dateText = game.add.text(0, 1120, "Time left: " + timeLeft, style);
    }

}
var generateListenerForVillage = function(index) {
    return function() {
        currently_selected_village = index;
    };
}

var createPopUp = function(popup_text) {
    // a transparent black background to catch mouse events while the popup is up
    // need to draw it first and then convert it to a sprite
    var temp = game.add.graphics(0, 0);
    temp.beginFill(0x000000, 0.6);
    temp.drawRect(0, 0, 768, 768);
    temp.endFill();
    fullScreenBg = game.add.sprite(0, 0, temp.generateTexture());
    fullScreenBg.inputEnabled = true;
    temp.destroy();

    // should be put in the center of the screen
    var background = game.add.sprite(320, 300, "TestButton");
    background.scale.setTo(0.72, 0.86);
    background.anchor.setTo(0.5, 0.5);
    fullScreenBg.addChild(background);

	fullScreenBg.bringToTop();
	background.bringToTop();

	console.log("Foobar");
};

var state = {
    init: function() {
        // TODO: decide on actual money amounts
        money = 1000
        timeLeft = 600
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
        dateTextBox();
    },
    preload: function() {
        // STate preload logic goes here
        game.load.image('map', 'assets/images/Map.png');
        game.load.image('village', 'assets/images/TempCityIcon.png');
		game.load.spritesheet('TestButton', 'assets/images/TestButton.png');
    },
    create: function() {
        // State create logic goes here
        game.add.sprite(0, 0, "map");
        var villageImages = [];
        for (i = 0; i < villages.length; i++) {
            var villageImage = game.add.sprite(VILLAGE_POSITIONS[i][0], VILLAGE_POSITIONS[i][1], 'village');
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
		if (count == 100)
			createPopUp("Hello, world!");

        if (count % 60 == 0) {
            money += 25;
            timeLeft -= 1;
            moneyText.setText("Your income: " + money);
            dateText.setText("Time left: " + timeLeft);
            for (i = 0; i < villages.length; i++) {
                villages[i].incrementDay();
            }
            all_villages_percent_infected = temp_villages_percent_infected.slice();
        }
    }

};

var game = new Phaser.Game(
    968,
    768,
    Phaser.AUTO,
    'game',
    state
);
