//Static values
var GAME_WIDTH = 968;
var GAME_HEIGHT = 768;

var BASE_INFECTION_RATE = .00;
var BASE_FACTOR = 0.000005;
var INFECTION_RATE_POPULATION_CAP = 10000;

// This is how many pixels of map are still visible around the edge of the popup.
var POPUP_SHY_MARGIN = 30;
var SCORE_BAR_STYLE = { font: "24px Arial", fill: "#ff0044", stroke: "#000000", strokeThickness: 3, align: "center" };
var POPUP_TEXT_STYLE = { font: "32px Arial", fill: "#000000", align: "center" };
var POPUP_ACTION_NAME_STYLE = { font: "28px Arial", fill: "#000000", align: "center" };
var POPUP_DESC_HEADER_STYLE = { font: "24px Arial", fill: "#000000", align: "left" };
var POPUP_DESC_STYLE = { font: "20px Arial", fill: "#000000", align: "left" };
var POPUP_COST_TEXT_STYLE = { font: "16px Arial", fill: "#000000", align: "center" };
var POPUP_GAME_PAUSED_TEXT_STYLE = { font: "20px Arial", fill: "#606060" };
// Time in milliseconds over which the popup window tweens out.
var POPUP_TIME = 500;
// Time in milliseconds over which the tweening occurs for making text get larger when moused over.
var BUTTON_POP_TIME = 100;

// Height in pixels of the top bar in the main game.
var TOP_BAR_HEIGHT = 40;

// The additive factor to the infection rate the measure has over time.
var PREVENTION_MEASURE_VALUES = { //TODO balance these numbers
    washing_hands: {
        infection_rate_reduction: .05,
        percent_cured: .05,
        duration: 14,
        cost: 20
    },
    water_containers: {
        infection_rate_reduction: .1,
        percent_cured: 0,
        duration: 14,
        cost: 20
    },
    electrolytes: {
        infection_rate_reduction: 0,
        percent_cured: .1,
        duration: 14,
        cost: 20
    },
    boil_water: {
        infection_rate_reduction: .01,
        percent_cured: 0,
        duration: 14,
        cost: 20,
        upstream_effect_reduction: .5
    }
}

VILLAGE_POSITIONS = [ //TODO update these positions
    [131,356],
    [337,525],
    [439,250],
    [540,431],
];

ACTION_NAMES = [
	"Hand washing",
	"Rehydration",
	"Water Container",
	"Boil water"
];

ACTION_COSTS = [
	7,
	25,
	120,
	455,
];
    
ACTION_COLORS = [
	"#FF00FF",
	"#FFFF00",
	"#00FFFF",
	"#FFA500",
];

ACTION_ICONS = [
	"soap",
	"electrolyte",
	"container",
	"boil",
];

ACTION_DESCRIPTIONS = [
	"Washing your hands is straight-up legit OP IRL, so it is here too.",
	"Rehydrating is delicious, or something.",
	"Because I'm sure we all hate unmanaged waste as much as the next guy.",
	"Raise to 373 K to be free of pathogens."
];

VILLAGE_UNLOCK_DAYS = [
        10,
        20,
        30
];

var prevention_descript = [ // TODO update this text
    "Lather and rinse for thorough handwashing. Cheap and simple but eventually runs out.",
    "Very effective at preventing cholera, though the immunity ends a little sooner. Moderately expensive.",
    "Less effective at preventing cholera, though the immunity lasts a while. Moderately expensive.",
    "Disinfect water with fancy kits. Quick to use and quite effective, but also moderately expensive.",
    "Pots, pots for everyone! A cheap, easy way for anyone to disinfect water. ",
    "Take waste away from drinking water and put it someplace else. Quick and cheap to implement, but not always efficient.",
    "Specific containers for storing clean water. Not too expensive and moderately helpful assuming they’re clean.",
    "A specific place for waste to be deposited. Pricey and takes time to build, but very effective.",
    "A specific place for handwashing. Pricey and takes time to build, but very effective."
];

var GameState = function () {
    villages = [
        Village(100000, [1,0,0,.9], 1),
        Village(200000, [0,1,.9,.9], 2),
        Village(300000, [0,0,1,.9], 3),
        Village(400000, [0,0,0,1], 4),
    ];
    return {
        day: 0,
        money: 1000, //TODO figure out how much you should start with
        villages: villages,
        available_villages: 1,
    };
}
