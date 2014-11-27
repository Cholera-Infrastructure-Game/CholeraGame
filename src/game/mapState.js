var MapState = function (game) {};

MapState.prototype = {
	init: function() {

    },
    preload: function() {
        // STate preload logic goes here
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
        // State create logic goes here
        game.add.sprite(0, 0, "map");
    },
    update: function() {
    }

}

