var HelpStage = function (game) {
	this.instructionText = null;
	this.startButton = null;
};

var mainHelpText = "Cholera is spreading in the localities!\n\n\n\n\n" + 
"To stop the outbreak, you need to implement various prevention measures in each locality:\n\n\n\n" + 
"Click on a locality and choose which prevention measures you want to implement. Although you gain money every day, be careful of your spending!\n\n" +
"More localities will pop up over time, so be prepared because cholera is easily spread down river. Plus, even if a locality is healthy, there's always a chance for a random outbreak.";

HelpStage.prototype = {

	init: function () {
		this.input.maxPointers = 1;
		this.stage.disableVisibilityChange = true;
	},

	preload: function() {
		this.load.image('homeBackground', 'assets/images/GameOver.png');
		this.load.image('startButton', 'assets/images/start_button.png');
        this.load.image('boil_water_circle', 'assets/images/NewIcons/boil_water_circle.png');
        this.load.image('washing_hands_circle', 'assets/images/NewIcons/soap_circle.png');
        this.load.image('electrolytes_circle', 'assets/images/NewIcons/electrolytes_circle.png');
        this.load.image('water_containers_circle', 'assets/images/NewIcons/water_containers_circle.png');
        this.load.spritesheet('village', 'assets/images/NewIcons/CitySpriteSheet.png', 128, 128);

	},

	create: function() {
		var background_sprite = this.game.add.sprite(0, 0, 'homeBackground');
        background_sprite.scale.x = GAME_WIDTH/background_sprite.width;
        background_sprite.scale.y = GAME_HEIGHT/background_sprite.height;

		// Add some instructions
		this.instructionText = this.game.add.text(this.game.world.centerX, 50, mainHelpText, {font: "20px Arial", fill: "000000", align: "center"});
        this.instructionText.anchor.set(0.5, 0);
        this.instructionText.wordWrap = true;
        this.instructionText.stroke = '#000000';
        this.instructionText.strokeThickness = 3;
        this.instructionText.fill = '#FFFFFF'
		this.instructionText.wordWrapWidth = 650;

        var start_button_sprite = this.game.add.text(this.game.world.centerX, this.game.world.height - 100, "START", TITLE_STAGE_STYLE);
        start_button_sprite.anchor.set(0.5);
        start_button_sprite.inputEnabled = true;
        start_button_sprite.events.onInputOver.add(function() {
            this.game.add.tween(start_button_sprite.scale).to({x: 1.3, y: 1.3}, BUTTON_POP_TIME, Phaser.Easing.Default, true);
        }, this);
        start_button_sprite.events.onInputOut.add(function() {
            this.game.add.tween(start_button_sprite.scale).to({x: 1, y: 1}, BUTTON_POP_TIME, Phaser.Easing.Default, true);
        }, this);
        start_button_sprite.events.onInputUp.add(this.returnToTitle, this);

        var village_sprite = this.game.add.button(this.game.world.centerX, 120, 'village', function() {}, {}, 1, 1);
        village_sprite.anchor.set(0.5);
        village_sprite.scale.x = .6;
        village_sprite.scale.y = .6;

        for (var i = 0; i < 4; i++) {
            var circle = this.game.add.sprite((this.game.world.width - 360)/2 +  120 * i, 250, PREVENTION_MEASURE_NAMES[i]+"_circle");
            circle.anchor.set(0.5);
            circle.scale.x = 0.3;
            circle.scale.y = 0.3;
        }
	},

	returnToTitle: function() {
		// Is this enough to restart the game - we'll see!
		this.game.state.start('map_stage');
	}
}
