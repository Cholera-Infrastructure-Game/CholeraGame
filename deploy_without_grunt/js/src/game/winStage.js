WinStage = function(game) {
    this.win_text = "You survived a year of Cholera!  Congratulations!";

};

WinStage.prototype = {

    init: function () {
        music.stop();
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
    },

    preload: function() {
        this.load.image('winBackground', 'assets/images/WinScreen.png');
        this.load.image('startButton', 'assets/images/start_button.png');
        this.load.image('boil_water', 'assets/images/NewIcons/BoilingWaterIcon.png');
        this.load.audio('background_win_music', ['assets/sound/VictoryTrack.mp3', 'assets/sound/VictoryTrack.ogg']);
    },

    create: function() {
        music = this.add.audio('background_win_music');
        music.play('',0,.5,true);

        var background_sprite = this.add.sprite(0, 0, 'winBackground');
        background_sprite.scale.x = GAME_WIDTH/background_sprite.width;
        background_sprite.scale.y = GAME_HEIGHT/background_sprite.height;

        // Add some instructions
        this.instructionText = this.add.text(this.game.world.centerX, 130, this.win_text, {font: "20px Arial", fill: "000000", align: "center"});
        this.instructionText.anchor.set(0.5);
        this.instructionText.wordWrap = true;
        this.instructionText.wordWrapWidth = 600;

        var back_to_title_text = this.add.text(this.game.world.centerX, 350, "PLAY AGAIN", TITLE_STAGE_STYLE);
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
