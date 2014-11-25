var cholera_game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, "cholera_game", {preload: function() {}, create: create});

function create() {
	cholera_game.state.add("map_state", state);
	cholera_game.state.add("end_stage", EndStage);
	cholera_game.state.add("help_stage", HelpStage);
	cholera_game.state.start("help_stage");
}
