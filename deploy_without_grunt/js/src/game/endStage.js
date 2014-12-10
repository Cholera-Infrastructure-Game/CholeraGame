var EndStage = function (game) {
	this.instructionText = null;
	this.replayButton = null;
}

EndStage.prototype = {

	init: function () {
        music.stop();
		this.input.maxPointers = 1;
		this.stage.disableVisibilityChange = true;
                if (game_state.day > 300) {
		    this.game_over_text = "Almost there!  You managed to survive " + game_state.day + " days!  Try and make it to a year!"
                }
                if (game_state.day > 200) {
		    this.game_over_text = "Good try!  You managed to survive " + game_state.day + " days! Try and make it past 4 villages!"
                }
                if (game_state.day > 100) {
		    this.game_over_text = "Cholera spread fast, but you managed to survive " + game_state.day + " days!"
                }
                else {
		    this.game_over_text = "Oh no!  Cholera spread too quickly!  Try and use prevention measures to keep it under control next time!"
                }

	},

	preload: function() {
		this.load.image('gameOverBackground', 'assets/images/GameOver.png');
		this.load.image('startButton', 'assets/images/start_button.png');
                this.load.audio('background_lose_music', ['assets/sound/GameOverTrack.mp3', 'assets/sound/GameOverTrack.ogg']);
	},

	create: function() {
        music = this.add.audio('background_lose_music');
        music.play('',0,.5,true);

		var background_sprite = this.add.sprite(0, 0, 'gameOverBackground');
        background_sprite.scale.x = GAME_WIDTH/background_sprite.width;
        background_sprite.scale.y = GAME_HEIGHT/background_sprite.height;

		// Add some instructions
		this.instructionText = this.add.text(this.game.world.centerX, 130, this.game_over_text, {font: "20px Arial", fill: "000000", align: "center"});
        this.instructionText.anchor.set(0.5);
        this.instructionText.wordWrap = true;
        this.instructionText.stroke = '#000000';
        this.instructionText.strokeThickness = 3;
        this.instructionText.fill = '#FFFFFF'
		this.instructionText.wordWrapWidth = 600;

		var back_to_title_text = this.add.text(this.game.world.centerX, 350, "TRY AGAIN", TITLE_STAGE_STYLE);
		back_to_title_text.anchor.set(0.5);
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
		this.game.state.start('title_stage');
	}
}
