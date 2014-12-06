//Static values
var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;

var BASE_INFECTION_RATE = .0075;
var BASE_FACTOR = 0.0000008;
var INFECTION_RATE_POPULATION_CAP = 50000;

// When percent infected in the first village hits this or less, the second village is unlocked
var SECOND_VILLAGE_UNLOCK_CRITERIA = .01

var SECOND_VILLAGE_UNLOCK_TEXT = "A new locality has appeared!\nYou'll have to deal with the\nnew locality's infection and make\nsure it doesn't spread to the\nold localities.";

var BOIL_WATER_UNLOCK_TEXT = "You have unlocked boiling water!\nBoiling water prevents infection\nfrom spreading from\nupstream localities.";

// This is how many pixels of map are still visible around the edge of the popup.
var POPUP_SHY_MARGIN = 30;
var SCORE_BAR_STYLE = { font: "24px Arial", fill: "#ff0044", stroke: "#000000", strokeThickness: 3, align: "center" };
var POPUP_TEXT_STYLE = { font: "32px Arial", fill: "#000000", align: "center" };
var POPUP_ACTION_NAME_STYLE = { font: "28px Arial", fill: "#000000", align: "center" };
var POPUP_DESC_HEADER_STYLE = { font: "24px Arial", fill: "#000000", align: "left" };
var POPUP_DESC_STYLE = { font: "20px Arial", fill: "#000000", align: "left" };
var POPUP_COST_TEXT_STYLE = { font: "16px Arial", fill: "#000000", align: "center" };
var POPUP_GAME_PAUSED_TEXT_STYLE = { font: "20px Arial", fill: "#606060" };
var TITLE_STAGE_STYLE = { font: "28px Arial", fill: "#000000", align: "center" };

// Time in milliseconds over which the popup window tweens out.
var POPUP_TIME = 500;
// Time in milliseconds over which the tweening occurs for making text get larger when moused over.
var BUTTON_POP_TIME = 100;

// Height in pixels of the top bar in the main game.
var TOP_BAR_HEIGHT = 40;

// Money you make per day
var DAILY_INCOME = 50;

// The additive factor to the infection rate the measure has over time.
var PREVENTION_MEASURE_VALUES = { //TODO balance these numbers
    washing_hands: {
        infection_rate_reduction: .025,
        percent_cured: .05,
        duration: 14,
        cost: 200,
        color: "#FF00FF",
        display_name: "Soap",
        description: "-2.5 infection rate\n+5% infected people cured\n\nWashing your hands with soap is cheap and reduces the spread of infection and the infected population a little.\n\nCheap all-around measure."
    },
    water_containers: {
        infection_rate_reduction: .05,
        percent_cured: 0,
        duration: 21,
        cost: 500,
        color: "#FFFF00",
        display_name: "Water Containers",
        description: "-5 infection rate\n\nStoring water in closed containers drastically reduces the spread of cholera, but does nothing for those already infected.\n\nWorks best when infection rate is high."
    },
    electrolytes: {
        infection_rate_reduction: 0,
        percent_cured: .40,
        duration: 7,
        cost: 200,
        color: "#00FFFF",
        display_name: "Electrolytes",
        description: "+40% infected people cured.\n\nElectrolytes help those infected with cholera get better, but do nothing to stop the spread of infection.\n\nWorks best when lots of people are infected."
    },
    boil_water: {
        infection_rate_reduction: .01,
        percent_cured: 0,
        duration: 21,
        cost: 500,
        upstream_effect_reduction: .9,
        color: "#FFA500",
        display_name: "Boiling Water",
        description: "-1 infected rate\n90% upstream infection reduction\n\nBoiling water reduces contamination from infected villages upstream.\n\nWorks best in downstream villages."
    }
}

VILLAGE_POSITIONS = [
    [550,450],
    [700,150],
    [425,175],
    [150,300],
];

PREVENTION_MEASURE_NAMES = [
	"washing_hands",
    "electrolytes",
	"water_containers",
	"boil_water"
];

TOTAL_POPULATION = 1000000;

// The first one is how many days pass until the second village unlocks if you suck and somehow dont beat the first village.
// The other entries are days after unlocking the second villages that it takes to unlock the following villages.
VILLAGE_UNLOCK_DAYS = [
        60,
        40,
        120,
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
        Village(100000, [1,0,0,.75], 1, .1),
        Village(200000, [0,1,.75,.75], 2, .3),
        Village(300000, [0,0,1,.75], 3, .4),
        Village(400000, [0,0,0,1], 4, .5),
    ];
    return {
        day: 0,
        money: 1000, //TODO figure out how much you should start with
        villages: villages,
        available_villages: 1,
        frame_count: -1,
        days_since_second_village_unlocked: -1,
        boiling_water_unlocked: false,
        score: 0
    };
}
