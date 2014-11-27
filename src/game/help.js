var HelpStage = function (game) {
	this.instructionText = null;
	this.startButton = null;
};

var mainHelpText = "Cholera has broken out in the area! The localities have come together and decided to elect you to stop its terrible spread! Use the money raised by the localities to implement measures that will heal people and reduce cholera's infection rate. New measures unlock with time, and maybe at the end of the year something good will happen??? But be warned, if too many people are infected by cholera, it's game over!";

HelpStage.prototype = {

	init: function () {
		this.input.maxPointers = 1;
		this.stage.disableVisibilityChange = true;
	},

	preload: function() {
		this.load.image('homeBackground', 'assets/images/background.png');
		this.load.image('startButton', 'assets/images/start_button.png');

	},

	create: function() {
		this.add.sprite(0, 0, 'homeBackground');

		// Add some instructions
		this.instructionText = this.add.text(140, 130, mainHelpText, {font: "24px Bubblegum Sans"});
		this.instructionText.fontSize = 24;
		this.instructionText.fill = "#FFFFFF";
        this.instructionText.wordWrap = true;
		this.instructionText.wordWrapWidth = 600;

		this.startButton = this.add.button(200, 350, 'startButton', this.playGame);
	},

	playGame: function() {
		// Is this enough to restart the game - we'll see!
		this.game.state.start('map_stage');

	}
}