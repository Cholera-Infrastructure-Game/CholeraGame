
window.onload = function() {
    var cholera_game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, "cholera_game", HelpStage);

    cholera_game.state.add("map_stage", MapStage);
    cholera_game.state.add("end_stage", EndStage);
    cholera_game.state.add("help_stage", HelpStage);
    cholera_game.state.start("help_stage");
}