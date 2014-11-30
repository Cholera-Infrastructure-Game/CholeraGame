var EndStage = function (game) {
	this.instructionText = null;
	this.replayButton = null;
}

EndStage.prototype = {

	init: function () {
		this.input.maxPointers = 1;
		this.stage.disableVisibilityChange = true;
	},

	preload: function() {
		this.load.image('homeBackground', 'assets/images/background.png');
		this.load.image('replayButton', 'assets/images/replay_button.png');

	},

	create: function() {
		this.add.sprite(0, 0, 'homeBackground');

		// Add some instructions
		this.instructionText = this.add.text(140, 130, "Game Over", {font: "110px Bubblegum Sans"});
		this.instructionText.fontSize = 110;
		this.instructionText.fill = "#FFFFFF";
		this.instructionText.wordWrapWidth = 600;

		this.replayButton = this.add.button(200, 350, 'replayButton', this.replayGame);
	},

	replayGame: function() {
		// Is this enough to restart the game - we'll see!
		this.game.state.start('map');

	}
}