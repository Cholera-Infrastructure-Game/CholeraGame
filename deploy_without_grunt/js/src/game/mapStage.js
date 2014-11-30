var MapStage = function (game) {
    this.money_text_object;
    this.time_text_object;
};

MapStage.prototype = {
	init: function() {
        var game_state = new GameState();

    },
    preload: function() {
        this.load.image('health0','assets/images/health_bar0.png');
        this.load.image('health1','assets/images/health_bar1.png');
        this.load.image('health2','assets/images/health_bar2.png');
        this.load.image('health3','assets/images/health_bar3.png');
        this.load.image('health4','assets/images/health_bar4.png');
        this.load.image('health5','assets/images/health_bar5.png');
        this.load.image('health_back','assets/images/health_bar_background.png');
        this.load.image('map', 'assets/images/Map.png');
        this.load.image('village', 'assets/images/TempCityIcon.png');
        this.load.spritesheet('TestButton', 'assets/images/TestButton.png');
        this.load.spritesheet('EducateButton', 'assets/images/EducateButton.png');
        this.load.spritesheet('PreventButton', 'assets/images/PreventButton.png');
    },
    create: function() {

        this.game.add.sprite(0, 0, 'homeBackground');
        this.game.add.sprite(0, 40  , 'map');

        var villageImages = [];
        for (i = 0; i < villages.length; i++) {
            var villageImage = this.game.add.sprite(VILLAGE_POSITIONS[i][0], VILLAGE_POSITIONS[i][1], 'village');
            villageImage.anchor.set(0.5);
            villageImage.inputEnabled = true;
            villageImages.push(villageImage);
            var text = "Village " + (i + 1);
            var style = { font: "12px Arial", fill: "#ffffff", align: "left" };
            this.game.add.text(VILLAGE_POSITIONS[i][0] - 20, VILLAGE_POSITIONS[i][1] + 10, text, style);
        }

        this.createScoreBar();
        
    },
    update: function() {
        this.money_text_object.text = "Money: " + game_state.money;
        this.time_text_object.text = "Day: " + game_state.day;


    },

    createScoreBar: function() {
        var money_text = "Money: " + game_state.money;
        this.money_text_object = this.game.add.text(10, 10, money_text, SCORE_BAR_STYLE);

        var time_text = "Day: " + game_state.day;
        this.time_text_object = this.game.add.text(300, 10, time_text, SCORE_BAR_STYLE);

        var pause = this.game.add.text(this.game.world.width - 300, 10, "PAUSE", SCORE_BAR_STYLE);
        pause.inputEnabled = true;
        pause.events.onInputUp.add(this.createPauseMenu, this);
    },

    createPauseMenu: function() {
        // TODO: Make pause menu
        console.log("TODO: need to make pause menu");
        return;
    }

}

