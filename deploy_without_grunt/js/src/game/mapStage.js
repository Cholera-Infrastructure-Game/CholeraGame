var MapStage = function (game) {
    this.money_text_object;
    this.time_text_object;
    this.village_groups;
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
        this.load.image('map', 'assets/images/NewMap.png');//Need to rearrange villages for NewMap
        this.load.image('boil', 'assets/images/NewIcons/BoilingWaterIcon.png');
        this.load.image('soap', 'assets/images/NewIcons/SoapIcon.png');
        this.load.image('container', 'assets/images/NewIcons/WaterContainerIcon.png');
        
        this.load.spritesheet('village', 'assets/images/NewIcons/CitySpriteSheet.png', 128, 128);
    },
    create: function() {

        this.game.add.sprite(0, 0, 'homeBackground');
        this.game.add.sprite(0, 40  , 'map');

        this.village_groups = [];
        for (i = 0; i < villages.length; i++) {
            var village_group = this.game.add.group()
            var village_sprite = this.game.add.button(VILLAGE_POSITIONS[i][0], VILLAGE_POSITIONS[i][1], 'village', this.createPauseMenu, this, 1, 0);
            Timer(this.game, VILLAGE_POSITIONS[i][0]+50, VILLAGE_POSITIONS[i][1]+50, 40, 2000, true);
            village_sprite.village_index = i;
            village_sprite.anchor.set(0.5);
            village_sprite.inputEnabled = true;
            village_sprite.events.onInputUp.add(this.createVillagePopup , {selected_village_index: i})
            village_group.add(village_sprite);
            var text = "Village " + (i + 1);
            var style = { font: "12px Arial", fill: "#ffffff", align: "left" };
            var village_text = this.game.add.text(VILLAGE_POSITIONS[i][0] - 20, VILLAGE_POSITIONS[i][1] + 10, text, style);
            village_group.add(village_text);
            village_group.visible = false;
            this.village_groups.push(village_group);
        }

        this.createScoreBar();
        
    },
    update: function() {
        this.money_text_object.text = "Money: " + game_state.money;
        this.time_text_object.text = "Day: " + game_state.day;

        for (var i = 0; i < game_state.available_villages; i++) {
            this.village_groups[i].visible = true;
        }


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
    },

    createVillagePopup: function() {
        // TODO: make pop up
        console.log("TODO: Make village popup for village index " + this.selected_village_index);

    }

}

