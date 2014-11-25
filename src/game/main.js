var GAME_WIDTH = 968;
var GAME_HEIGHT = 768;

var cholera_game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, "cholera_game", HelpStage)

cholera_game.state.add("map", state);
cholera_game.state.add("end_stage", EndStage);
