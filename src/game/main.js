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
currently_selected_village = 0;

var populateVillageInfoBox = function () {
    if (villageTextBox != null) {
        villageTextBox.destroy();
    }
    var selected_village = villages[currently_selected_village];
    var text = "Village " + (currently_selected_village + 1) + " Selected";
    text += "\nPopulation: " + selected_village.getPopulation();
    text += "\nPeople Infected: " + selected_village.getHowManyInfected();

    var selectedVillageActiveMethods = selected_village.getActiveMeasures();
    if (selectedVillageActiveMethods.length > 0) {
        text += "\n\nCurrent Active Measures:"
    }
    for (var i = 0; i < selectedVillageActiveMethods.length; i++) {
        text += "\n\t" + selectedVillageActiveMethods[i];
    }

    text += "\n\nMoney: " + money;
    text += "\nDays Left: " + daysLeft;
    
    var style = { font: "12px Arial", fill: "#ff0044", align: "left" };
    villageTextBox = game.add.text(768, 0, text, style);
};

var generateListenerForVillage = function(index) {
    return function() {
        currently_selected_village = index;
    };
}

var createEducatePopUp = function() {
    // a transparent black background to catch mouse events while the popup is up
    // need to draw it first and then convert it to a sprite
    var temp = game.add.graphics(0, 0);
    temp.beginFill(0x000000, 0.6);
    temp.drawRect(0, 0, 768+20, 768+20);
    temp.endFill();
    fullScreenBg = game.add.sprite(-20, -20, temp.generateTexture());
    fullScreenBg.inputEnabled = true;
    temp.destroy();

    // should be put in the center of the screen
    var style = { font: "30px Arial", fill: "#ff0044", align: "left" };
    var education_texts = ["Educate about soap", "Educate about vaccines", "Educate about chemical treatments",
                           "Educate about boiling water", "Educate about water containers", "Educate about moving waste",
                           "Educate about waste facilities", "Educate about washing facilities"];
    
    var education_text_GUIs = []
    for (i = 0; i < education_texts.length; i++) {
        var text_box = game.add.text(150, 50 + 30 * i, education_texts[i], style);
        text_box.inputEnabled = true;
        education_text_GUIs.push(text_box)
    }

	fullScreenBg.bringToTop;

    education_text_GUIs[0].events.onInputDown.add(villages[currently_selected_village].educateAboutSoap, this);
    education_text_GUIs[1].events.onInputDown.add(villages[currently_selected_village].educateAboutVaccine, this);
    education_text_GUIs[2].events.onInputDown.add(villages[currently_selected_village].educateAboutChemicalTreatment, this);
    education_text_GUIs[3].events.onInputDown.add(villages[currently_selected_village].educateAboutBoilingWater, this);
    education_text_GUIs[4].events.onInputDown.add(villages[currently_selected_village].educateAboutWaterContainers, this);
    education_text_GUIs[5].events.onInputDown.add(villages[currently_selected_village].educateAboutMovingWaste, this);
    education_text_GUIs[6].events.onInputDown.add(villages[currently_selected_village].educateAboutWasteFacilities, this);
    education_text_GUIs[7].events.onInputDown.add(villages[currently_selected_village].educateAboutWashingFacilities, this);
    fullScreenBg.events.onInputDown.add(function() {
        console.log("click registered");
        fullScreenBg.destroy();
        for (i = 0; i < education_text_GUIs.length; i++) {
            education_text_GUIs[i].destroy();
        }
    }, this);
};

var createPreventPopUp = function() {
    // a transparent black background to catch mouse events while the popup is up
    // need to draw it first and then convert it to a sprite
    var temp = game.add.graphics(0, 0);
    temp.beginFill(0x000000, 0.6);
    temp.drawRect(0, 0, 768+20, 768+20);
    temp.endFill();
    fullScreenBg = game.add.sprite(-20, -20, temp.generateTexture());
    fullScreenBg.inputEnabled = true;
    temp.destroy();

    // should be put in the center of the screen
    var style = { font: "30px Arial", fill: "#ff0044", align: "left" };
    var prevention_texts = ["Add soap", "Add vaccine 1", "Add vaccine 2", "Add chemical treatment",
                           "Add boiling water", "Add water containers", "Add moving waste",
                           "Add waste facilities", "Add washing facilities"];
    
    var prevention_text_GUIs = []
    for (i = 0; i < prevention_texts.length; i++) {
        var text_box = game.add.text(150, 50 + 30 * i, prevention_texts[i], style);
        text_box.inputEnabled = true;
        prevention_text_GUIs.push(text_box)
    }

    fullScreenBg.bringToTop;

    prevention_text_GUIs[0].events.onInputDown.add(villages[currently_selected_village].addSoap, this);
    prevention_text_GUIs[1].events.onInputDown.add(villages[currently_selected_village].addVaccineOne, this);
    prevention_text_GUIs[2].events.onInputDown.add(villages[currently_selected_village].addVaccineTwo, this);
    prevention_text_GUIs[3].events.onInputDown.add(villages[currently_selected_village].addChemicalTreatment, this);
    prevention_text_GUIs[4].events.onInputDown.add(villages[currently_selected_village].addBoilingWater, this);
    prevention_text_GUIs[5].events.onInputDown.add(villages[currently_selected_village].addWaterContainers, this);
    prevention_text_GUIs[6].events.onInputDown.add(villages[currently_selected_village].addMovingWaste, this);
    prevention_text_GUIs[7].events.onInputDown.add(villages[currently_selected_village].addWasteFacilities, this);
    prevention_text_GUIs[8].events.onInputDown.add(villages[currently_selected_village].addWashingFacilities, this);
    fullScreenBg.events.onInputDown.add(function() {
        console.log("click registered");
        fullScreenBg.destroy();
        for (i = 0; i < prevention_text_GUIs.length; i++) {
            prevention_text_GUIs[i].destroy();
        }
    }, this);
};

var state = {
    init: function() {
        // TODO: decide on actual money amounts
        money = 1000;
        daysLeft = 365;
        // TODO: put in actual village factors

        all_villages_number_of_people_infected = [0,0,0,0,0,0];
        temp_villages_number_of_people_infected = [0,0,0,0,0,0];
        villages = [
            Village(100000, [1,0,0,.5,0,0], 0),
            Village(200000, [0,1,0,0,0,0], 1),
            Village(300000, [0,.9,1,0,.5,0], 2),
            Village(300000, [1,0,0,1,0,0], 3),
            Village(200000, [.9,0,.5,.9,1,0], 4),
            Village(100000, [.9,0,0,.9,0,1], 5)
        ];
        populateVillageInfoBox();
        healthBars = [];
        base = 'health';

    },
    preload: function() {
        // STate preload logic goes here
        game.load.image('health0','assets/images/health_bar0.png');
        game.load.image('health1','assets/images/health_bar1.png');
        game.load.image('health2','assets/images/health_bar2.png');
        game.load.image('health3','assets/images/health_bar3.png');
        game.load.image('health4','assets/images/health_bar4.png');
        game.load.image('health5','assets/images/health_bar5.png');
        game.load.image('health_back','assets/images/health_bar_background.png');
        game.load.image('map', 'assets/images/Map.png');
        game.load.image('village', 'assets/images/TempCityIcon.png');
		game.load.spritesheet('TestButton', 'assets/images/TestButton.png');
        game.load.spritesheet('EducateButton', 'assets/images/EducateButton.png');
        game.load.spritesheet('PreventButton', 'assets/images/PreventButton.png');
    },
    create: function() {
        // State create logic goes here
        game.add.sprite(0, 0, "map");
        var villageImages = [];
        for (i = 0; i < villages.length; i++) {
            var villageImage = game.add.sprite(VILLAGE_POSITIONS[i][0], VILLAGE_POSITIONS[i][1], 'village');
            var healthbar_back = game.add.image(VILLAGE_POSITIONS[i][0], VILLAGE_POSITIONS[i][1]-30,'health_back');
            var healthbar = game.add.image(VILLAGE_POSITIONS[i][0], VILLAGE_POSITIONS[i][1]-30,base.concat(i.toString()));
            healthbar.cropEnabled = true;
            healthBars.push(healthbar);
            villageImage.anchor.set(0.5);
            villageImage.inputEnabled = true;
            villageImage.events.onInputDown.add(generateListenerForVillage(i), this);
            villageImages.push(villageImage);
            var text = "Village " + (i + 1);
            var style = { font: "12px Arial", fill: "#ffffff", align: "left" };
            game.add.text(VILLAGE_POSITIONS[i][0] - 20, VILLAGE_POSITIONS[i][1] + 10, text, style);
        }
        var eduButton = game.add.sprite(780, 300, "EducateButton");
        eduButton.inputEnabled = true;
        eduButton.events.onInputDown.add(createEducatePopUp, this);
        var prevButton = game.add.sprite(780, 400, "PreventButton");
        prevButton.inputEnabled = true;
        prevButton.events.onInputDown.add(createPreventPopUp, this);
    },
    update: function() {
        // Called 60 times per second
        count += 1;
        if (count % 90 == 0) {
            for(var i = 0; i <villages.length; i++){
                width = (villages[i].getPopulation() - villages[i].getHowManyInfected())/(villages[i].getPopulation())*healthBars[i].width;
                cropRect = new Phaser.Rectangle(0, 0, width, 9);
            if (i==0){
                console.log(width)
            }
                healthBars[i].crop(cropRect);
                healthBars[i].updateCrop();
            }

            // This happens once every 1.5 seconds, so total game length is about 9 minutes.
            money += 25;
            daysLeft -= 1;
            if (daysLeft == 0) {
                game.state.add('end', EndStage, true);
            }
            var total_population = 0;
            var total_infected = 0;
            for (var i = 0; i < villages.length; i++) {
                total_population += village.getPopulation();
                total_infected += village.getHowManyInfected();
            }
            if (total_infected >= total_population * 0.6) {
                game.state.add('end',EndStage,true);
            }
            for (var i = 0; i < villages.length; i++) {
                villages[i].incrementDay();
            }
            all_villages_number_of_people_infected = temp_villages_number_of_people_infected.slice();
            populateVillageInfoBox();
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
game.state.add('main',state);
