
var BASE_INFECTION_RATE = .00;
var BASE_FACTOR = 0.000005;

Village = function(population, village_factors, village_number) {
    var village_factors = village_factors;
    var village_number = village_number;
    var total_population = population;
    var people_infected = 10;

    // Initialize all prevention measures to 0 (i.e. not implemented).
    // When a measure is put into place, the value is how many days are left.
    var prevention_measures = {
        soap: 0,
        boil: 0,
        container: 0,
        electrolyte: 0
    }


    return {
        incrementDay: function() {
            var infected_rate = BASE_INFECTION_RATE; //from .00 to 1.00, the maximum percentage of people healthy that could become infected
            for (var i = 0; i < village_factors.length; i++) {
                // sort of balanced so it is at most an increase of .05
                infected_rate += Math.min(all_villages_number_of_people_infected[i] * BASE_FACTOR, 10000 * BASE_FACTOR) * village_factors[i];
            }
            for (var key in prevention_measures) {
                //TODO: replace with function that grabs nums from gamestate
                //though i guess since each object does something different, maybe we should do a case switch thing?
                infected_rate += prevention_measures[key]; 
                prevention_measures[key] = Math.max(0, prevention_measures[key]-1);
            }

            people_infected = Math.min(Math.ceil(people_infected + Math.ceil((people_infected / 0.6) * Math.random() * infected_rate)), total_population);
            // update the temp amount here, when done updating all the villages move the temp to all_villages_people_infected
            temp_villages_number_of_people_infected[village_number] =  people_infected;
        },

        // These functions are to be called when a prevention measure is added to a village.
        // Upon implementing a prevention measure, 1/10 of the maximum long term daily effect is done immediately.
        addSoap: function() {
            if (money < prevention_measure_costs["soap"]) {
                return  //Ideally produce an error message here
            }
            if (prevention_measures["soap"] === 0) {
                people_infected = Math.floor((1-(SOAP_FACTOR * .1)) * people_infected);
            }
            prevention_measures["soap"] = SOAP_FACTOR;
            money -= prevention_measure_costs["soap"];
            soap_days_left += SOAP_DURATION;
        },
        
        //TODO: change to affect incoming 
        addBoilingWater: function() {
            if (money < prevention_measure_costs["boil"]) {
                return  //Ideally produce an error message here
            }
            if (prevention_measures["boil"] === 0) {
                people_infected = Math.floor((1-(BOIL_FACTOR * .1)) * people_infected);
            }
            prevention_measures["boil"] = BOIL_FACTOR;
            money -= prevention_measure_costs["boil"];
        },

        addWaterContainers: function() {
            if (money < prevention_measure_costs["container"]) {
                return  //Ideally produce an error message here
            }
            if (prevention_measures["container"] === 0) {
                people_infected = Math.floor((1-(CONTAINER_FACTOR * .1)) * people_infected);
            }
            prevention_measures["container"] = CONTAINER_FACTOR;
            money -= prevention_measure_costs["container"];
        },


        //TODO: Actually implement electrolytes
        addElectrolytes: function() {

            
        },

        getPopulation: function() {
            return total_population;
        },

        getHowManyInfected: function() {
            return people_infected;
        },
        
        getActiveMeasures: function() {
            var activeMeasures = [];
            for (var key in prevention_measures) {
                if (prevention_measures[key] != 0) {
                    activeMeasures.push(key);
                }
            }
            return activeMeasures;
        }
    };
}

