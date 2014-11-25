//Static values
var GAME_WIDTH = 968;
var GAME_HEIGHT = 768;

var BASE_INFECTION_RATE = .00;
var BASE_FACTOR = 0.000005;



// The additive factor to the infection rate the measure has over time.
var prevention_measure_values = { //TODO balance these numbers
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
        cost: 20
    }
}

VILLAGE_POSITIONS = [ //TODO update these positions
    [131,356],
    [337,525],
    [439,120],
    [540,431],
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

var generateGameState = function () {
    villages = [
        Village(100000, [1,0,0,.9], 1),
        Village(200000, [0,1,.9,.9], 2),
        Village(300000, [0,0,1,.9], 3),
        Village(400000, [0,0,0,1], 4),
    ];
    return {
        day: 0,
        money: 1000, //TODO figure out how much you should start with
        selected_village: null,
        villages: villages,
    };
}
