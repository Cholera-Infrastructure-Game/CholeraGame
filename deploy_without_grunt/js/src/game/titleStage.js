var TitleStage = function(game) {

};

music = null;

TitleStage.prototype = {
    init: function() {
    try {
        music.stop();
    }
    catch(err) {}
    },

    preload: function() {
        this.load.image('title_screen', 'assets/images/TitleScreen1.png');
        this.load.audio('background_music', ['assets/sound/africanTheme.mp3', 'assets/sound/africanTheme.ogg']);

    },

    create: function() {
        music = this.add.audio('background_music');
        music.play('',0,.5,true);

        var title_screen_sprite = this.game.add.sprite(0, 0, 'title_screen');
        title_screen_sprite.scale.x = GAME_WIDTH/title_screen_sprite.width;
        title_screen_sprite.scale.y = GAME_HEIGHT/title_screen_sprite.height;

        var play_game_text = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 120, "PLAY GAME", TITLE_STAGE_STYLE);
        play_game_text.anchor.set(0.5);
        play_game_text.inputEnabled = true;
        play_game_text.events.onInputOver.add(function() {
            this.game.add.tween(play_game_text.scale).to({x: 1.3, y: 1.3}, BUTTON_POP_TIME, Phaser.Easing.Default, true);
        }, this);
        play_game_text.events.onInputOut.add(function() {
            this.game.add.tween(play_game_text.scale).to({x: 1.0, y: 1.0}, BUTTON_POP_TIME, Phaser.Easing.Default, true);
        }, this);
        play_game_text.events.onInputUp.add(this.showInstructions, this);

        var credits_text = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 170, "CREDITS", TITLE_STAGE_STYLE);
        credits_text.anchor.set(0.5);
        credits_text.inputEnabled = true;
        credits_text.events.onInputOver.add(function() {
            this.game.add.tween(credits_text.scale).to({x: 1.3, y: 1.3}, BUTTON_POP_TIME, Phaser.Easing.Default, true);
        }, this);
        credits_text.events.onInputOut.add(function() {
            this.game.add.tween(credits_text.scale).to({x: 1.0, y: 1.0}, BUTTON_POP_TIME, Phaser.Easing.Default, true);
        }, this);
        credits_text.events.onInputUp.add(this.showCredits, this);


    },

    update: function() {

    },

    showInstructions: function() {
        this.game.state.start('help_stage');
    },

    showCredits: function() {
        this.game.state.start('credits_stage');
    }
}
