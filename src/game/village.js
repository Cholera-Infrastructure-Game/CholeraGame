Village = function(population, village_factors, village_number) {
    var village_factors = village_factors;
    var village_number = village_number;
    var total_population = population;
    var people_infected = 10;

    // Initialize all prevention measures to 0 (i.e. not implemented).
    // When a measure is put into place, the value is how many days are left.
    var prevention_measures = {
        washing_hands: 0,
        water_containers: 0,
        electrolytes: 0,
        boil_water: 0
    }


    return {
        incrementDay: function() {
            var infected_rate = BASE_INFECTION_RATE; //from .00 to 1.00, the maximum percentage of people healthy that could become infected
            for (var i = 0; i < village_factors.length; i++) {
                var village_infection_contribution = Math.min(game_state.villages[i].getHowManyInfected() * BASE_FACTOR, INFECTION_RATE_POPULATION_CAP * BASE_FACTOR)
                if (village_factors[i] === 1 || prevention_measures.boil_water === 0) {
                    //no need to modify the upstream factor
                    infected_rate += village_infection_contribution * village_factors[i];
                }
                else {
                    infected_rate += village_infection_contribution * village_factors[i] * PREVENTION_MEASURE_VALUES.boil_water.upstream_effect_reduction;
                }
            }
            for (var prevention_measure in prevention_measures) {
                if (prevention_measures[prevention_measures] > 0) {
                    infected_rate -= PREVENTION_MEASURE_VALUES[prevention_measure].infection_rate_reduction;
                    prevention_measures[prevention_measure] -= -1;
                }
            }

            people_infected = Math.min(Math.ceil(people_infected + Math.ceil((people_infected / 0.6) * Math.random() * infected_rate)), total_population);
        },

        // These functions are to be called when a prevention measure is added to a village.
        implementWashingHands: function() {
            var washing_hands = PREVENTION_MEASURE_VALUES.washing_hands;
            if (game_state.money < washing_hands.cost) {
                return  //Ideally tell player that they can't afford it
            }
            if (prevention_measures.washing_hands != 0) {
                return // Ideally tell player that its already implemented
            }
            game_state.money -= washing_hands.cost;
            prevention_measures.washing_hands = washing_hands.duration;
            people_infected -= people_infected * washing_hands.percent_cured;
        },

        getWashingHandsDaysLeft: function() {
            return prevention_measures.washing_hands;
        },

        implementWaterContainers: function() {
            var water_containers = PREVENTION_MEASURE_VALUES.water_containers;
            if (game_state.money < water_containers.cost) {
                return  //Ideally tell player that they can't afford it
            }
            if (prevention_measures.water_containers != 0) {
                return // Ideally tell player that its already implemented
            }
            game_state.money -= water_containers.cost;
            prevention_measures.water_containers = water_containers.duration;
            people_infected -= people_infected * water_containers.percent_cured;
        },

        getWaterContainersDaysLeft: function() {
            return prevention_measures.water_containers;
        },

        implementElectrolytes: function() {
            var electrolytes = PREVENTION_MEASURE_VALUES.electrolytes;
            if (game_state.money < electrolytes.cost) {
                return  //Ideally tell player that they can't afford it
            }
            if (prevention_measures.electrolytes != 0) {
                return // Ideally tell player that its already implemented
            }
            game_state.money -= electrolytes.cost;
            prevention_measures.electrolytes = electrolytes.duration;
            people_infected -= people_infected * electrolytes.percent_cured;
        },

        getElectrolytesDaysLeft: function() {
            return prevention_measures.electrolyes;
        },

        implementBoilWater: function() {
            var boil_water = PREVENTION_MEASURE_VALUES.boil_water;
            if (game_state.money < boil_water.cost) {
                return  //Ideally tell player that they can't afford it
            }
            if (prevention_measures.boil_water != 0) {
                return // Ideally tell player that its already implemented
            }
            game_state.money -= boil_water.cost;
            prevention_measures.boil_water = boil_water.duration;
            people_infected -= people_infected * boil_water.percent_cured;
        },

        getBoilWaterDaysLeft: function() {
            return prevention_measures.boil_water;
        },

        getPopulation: function() {
            return total_population;
        },

        getHowManyInfected: function() {
            return people_infected;
        }
    };
}

