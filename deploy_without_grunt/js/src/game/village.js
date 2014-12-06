Village = function(population, village_factors, village_number, initial_percentage_infected) {
    var village_factors = village_factors;
    var village_number = village_number;
    var total_population = population;
    var people_infected = population * initial_percentage_infected;
    var infected_rate = BASE_INFECTION_RATE; //from .00 to 1.00, the maximum percentage of people healthy that could become infected

    // Initialize all prevention measures to 0 (i.e. not implemented).
    // When a measure is put into place, the value is how many days are left.
    var prevention_measures = {
        washing_hands: 0,
        water_containers: 0,
        electrolytes: 0,
        boil_water: 0
    }


    return {
        incrementDay: function(available_villages) {
            for (var i = 0; i < available_villages; i++) {
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
                if (prevention_measures[prevention_measure] > 0) {
                    infected_rate -= PREVENTION_MEASURE_VALUES[prevention_measure].infection_rate_reduction;
                    prevention_measures[prevention_measure] -= 1;
                }
            }

            people_infected = Math.min(Math.ceil(people_infected + Math.ceil((people_infected / 0.6) * Math.random() * infected_rate)), total_population);
        },

        implementPreventionMeasure: function(prevention_measure) {
            var measure = PREVENTION_MEASURE_VALUES[prevention_measure];
            game_state.money -= measure.cost;
            prevention_measures[prevention_measure] = measure.duration;
            people_infected -= people_infected * measure.percent_cured;
        },

        getPreventionMeasureDaysLeft: function (prevention_measure) {
            return prevention_measures[prevention_measure];
        },

        getPopulation: function() {
            return total_population;
        },

        getHowManyInfected: function() {
            return people_infected;
        },

        isInfectedRatePositive: function() {
            return infected_rate > 0;
        }
    };
}

