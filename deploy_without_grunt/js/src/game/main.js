var game_state = new GameState();
window.onload = function() {
    var cholera_game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, "cholera_game", HelpStage);

    cholera_game.state.add("title_stage", TitleStage);
    cholera_game.state.add("map_stage", MapStage);
    cholera_game.state.add("end_stage", EndStage);
    cholera_game.state.add("help_stage", HelpStage);
    cholera_game.state.start("help_stage");
    // cholera_game.state.start("title_stage");
//	cholera_game.state.start("map_stage");
}
