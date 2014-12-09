var HelpStage = function (game) {
	this.instructionText = null;
	this.startButton = null;
};

var mainHelpText = "Cholera is spreading!\n\nClick on villages to add various measures to stop the epidemic before its too late!\nMore villages will pop up over time, so be ready to deal with infection spreading downstream.";

HelpStage.prototype = {

	init: function () {
		this.input.maxPointers = 1;
		this.stage.disableVisibilityChange = true;
	},

	preload: function() {
		this.load.image('homeBackground', 'assets/images/GameOver.png');
		this.load.image('startButton', 'assets/images/start_button.png');
	},

	create: function() {
		this.add.sprite(0, 0, 'homeBackground');

		// Add some instructions
		this.instructionText = this.add.text(this.game.world.centerX, 130, mainHelpText, {font: "20px Arial", fill: "000000", align: "center"});
                this.instructionText.anchor.set(0.5);
                this.instructionText.wordWrap = true;
                this.instructionText.stroke = '#000000';
                this.instructionText.strokeThickness = 3;
                this.instructionText.fill = '#FFFFFF'
		this.instructionText.wordWrapWidth = 600;

		var back_to_title_text = this.add.text(this.game.world.centerX, 350, "START GAME", {font: "45px Arial", fill: "000000", align: "center"});
                back_to_title_text.anchor.set(0.5);
                back_to_title_text.stroke = '#FFFFFF';
                back_to_title_text.strokeThickness = 1;
                back_to_title_text.fill = '#000000';

        back_to_title_text.inputEnabled = true;
        back_to_title_text.events.onInputOver.add(function() {
            this.game.add.tween(back_to_title_text.scale).to({x: 1.3, y: 1.3}, BUTTON_POP_TIME, Phaser.Easing.Default, true);
        }, this);
        back_to_title_text.events.onInputOut.add(function() {
            this.game.add.tween(back_to_title_text.scale).to({x: 1.0, y: 1.0}, BUTTON_POP_TIME, Phaser.Easing.Default, true);
        }, this);
        back_to_title_text.events.onInputUp.add(this.returnToTitle, this);
	},

	returnToTitle: function() {
		// Is this enough to restart the game - we'll see!
		this.game.state.start('map_stage');
	}
}
