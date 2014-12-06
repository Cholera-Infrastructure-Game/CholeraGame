var TitleStage = function(game) {

};

TitleStage.prototype = {
    init: function() {

    },

    preload: function() {
        this.load.image('title_screen', 'assets/images/TitleScreen1.png');

    },

    create: function() {
        this.game.stage.backgroundColor = "#C8A3FF";
        var title_screen_sprite = this.game.add.sprite(0, 0, 'title_screen');
        title_screen_sprite.scale.x = GAME_WIDTH/title_screen_sprite.width;
        title_screen_sprite.scale.y = GAME_HEIGHT/title_screen_sprite.height;
    },

    update: function() {

    }
}