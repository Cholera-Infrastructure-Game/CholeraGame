
var DEATH_RATE = .02;

var BASE_FACTOR = 0.000000167;

// The additive factor to the infection rate the measure has over time.
var SOAP_FACTOR = -.003;
var VACC_ONE_FACTOR = -.01;
var VACC_TWO_FACTOR = -.005;
var CHEM_FACTOR = -.003;
var BOIL_FACTOR = -.002;
var CONTAINER_FACTOR = -.001;
var MOVE_WASTE_FACTOR = -.001;
var WASTE_FACILITY_FACTOR = -.008;
var WASH_FACILITY_FACTOR = -.007;

var SOAP_DURATION = 14;  // in days
var VACC_ONE_DURATION = 14 // in days
var VACC_TWO_DURATION = 30 // in days


Village = function(population, village_factors, village_number) {
    var village_factors = village_factors;
    var village_number = village_number;
    var total_population = population;
    var people_dead = 0;
    var people_infected = 10;
    // Initialize Education measures to 1 (so no increase in prevention measure effect)
    var education_measures = {};
    education_measures["soap"] = 1;
    education_measures["vacc"] = 1;
    education_measures["chem"] = 1;
    education_measures["boil"] = 1;
    education_measures["container"] = 1;
    education_measures["moveWaste"] = 1;
    education_measures["wasteFacility"] = 2;//For testing purposes, should also be 1
    education_measures["sanitizer"] = 1;
    education_measures["washFacility"] = 1;

    // Initialize all prevention measures to 0 (i.e. not implemented).
    // When a measure is put into place, the factor is put as the value in the map.
    var soap_days_left = 0;
    var prevention_measures = {};
    prevention_measures["soap"] = 0;
    prevention_measures["vacc"] = 0;
    prevention_measures["chem"] = 0;
    prevention_measures["boil"] = 0;
    prevention_measures["container"] = 0;
    prevention_measures["moveWaste"] = 0;
    prevention_measures["wasteFacility"] = 0;
    prevention_measures["sanitizer"] = 0;
    prevention_measures["washFacility"] = 0;

    var vacc_days_left = 0;


    return {
        incrementDay: function() {
            people_newly_dead = Math.floor(Math.random() * people_infected * DEATH_RATE);
            people_dead += people_newly_dead;
            people_infected -= people_newly_dead;

            var infected_rate = .01; //from .00 to 1.00, the maximum percentage of people healthy that could become infected
            for (var i = 0; i < village_factors.length; i++) {
                // sort of balanced so it is at most an increase of .05
                infected_rate += all_villages_number_of_people_infected[i] * BASE_FACTOR * village_factors[i];
            }
            for (var key in prevention_measures) {
                infected_rate += prevention_measures[key] * education_measures[key];
            }

            soap_days_left = Math.max(0, soap_days_left - 1);
            if (soap_days_left === 0) {
                prevention_measures["soap"] = 0;
            }
            vacc_days_left = Math.max(0, vacc_days_left - 1);
            if (vacc_days_left === 0) {
                prevention_measures["vacc"] = 0;
            }
            people_infected += Math.floor((total_population - people_dead - people_infected) * Math.random() * (infected_rate));
            // update the temp amount here, when done updating all the villages move the temp to all_villages_people_infected
            temp_villages_number_of_people_infected[village_number] =  people_infected;
        },

        // These functions are to be called when a prevention measure is added to a village.
        // Upon implementing a prevention measure, 1/10 of the maximum long term daily effect is done immediately.
        addSoap: function() {
            if (prevention_measures["soap"] === 0) {
                people_infected = Math.floor((1-(SOAP_FACTOR * .1)) * people_infected);
            }
            prevention_measures["soap"] = SOAP_FACTOR;
            soap_days_left += SOAP_DURATION;
        },

        // ***Something to consider:  this makes it possible to alternate between the two vaccine types, causing a flat reduction in # of people infected every time.  Maybe we don't want this exploit to be possible?  Maybe its too expensive to be doable in game anyway?
        addVaccineOne: function() {
            if (prevention_measures["vacc"] != VACC_ONE_FACTOR) {
                people_infected = Math.floor((1-(VACC_ONE_FACTOR/10)) * people_infected);
            }
            prevention_measures[""] = VACC_ONE_FACTOR;
            vacc_days_left = VACC_ONE_DURATION;
        },

        addVaccineTwo: function() {
            if (prevention_measures["vacc"] != VACC_TWO_FACTOR) {
                people_infected = Math.floor((1-(VACC_TWO_FACTOR * .1)) * people_infected);
            }
            prevention_measures["vacc"] = VACC_TWO_FACTOR;
            vacc_days_left = VACC_TWO_DURATION;
        },

        addChemicalTreatment: function() {
            if (prevention_measures["chem"] === 0) {
                people_infected = Math.floor((1-(CHEM_FACTOR * .1)) * people_infected);
            }
            prevention_measures["chem"] = CHEM_FACTOR;
        },

        addBoilingWater: function() {
            if (prevention_measures["boil"] === 0) {
                people_infected = Math.floor((1-(BOIL_FACTOR * .1)) * people_infected);
            }
            prevention_measures["boil"] = BOIL_FACTOR;
        },

        addWaterContainers: function() {
            if (prevention_measures["container"] === 0) {
                people_infected = Math.floor((1-(CONTAINER_FACTOR * .1)) * people_infected);
            }
            prevention_measures["container"] = CONTAINER_FACTOR;
        },

        addMovingWaste: function() {
            if (prevention_measures["moveWaste"] === 0) {
                people_infected = Math.floor((1-(MOVE_WASTE_FACTOR * .1)) * people_infected);
            }
            prevention_measures["moveWaste"] = MOVE_WASTE_FACTOR;
        },

        addWasteFacilities: function() {
            if (prevention_measures["wasteFacility"] === 0) {
                people_infected = Math.floor((1-(WASTE_FACILITY_FACTOR * .1)) * people_infected);
            }
            prevention_measures["wasteFacility"] = WASTE_FACILITY_FACTOR;
        },

        addWashingFacilities: function() {
            if (prevention_measures["washFacility"] === 0) {
                people_infected = Math.floor((1-(WASH_FACILITY_FACTOR * .1)) * people_infected);
            }
            prevention_measures["washFacility"] = WASH_FACILITY_FACTOR;
        },

        // These functions are to be called when an education measure is added to a village.  Note that these have no immediate effect (maybe they should?) and do nothing when the corresponding prevention measure is not in effect.
        educateAboutSoap: function() {
            education_measures["soap"] = 1.5;
        },

        educateAboutVaccine: function() {
            education_measures["vacc"] = 1.5;
        },

        educateAboutChemicalTreatment: function() {
            education_measures["chem"] = 1.5;
        },

        educateAboutBoilingWater: function() {
            education_measures["boil"] = 1.5;
        },

        educateAboutWaterContainers: function() {
            education_measures["container"] = 1.5;
        },

        educateAboutMovingWaste: function() {
            education_measures["moveWaste"] = 1.5;
        },

        educateAboutWasteFacilities: function() {
            education_measures["wasteFacility"] = 1.5;
        },

        educateAboutWashingFacilities: function() {
            education_measures["washFacility"] = 1.5;
        },

        getHowManyDead: function() {
            return people_dead;
        },

        getPopulation: function() {
            return total_population;
        },

        getHowManyInfected: function() {
            return people_infected;
        },
        
        getActiveMeasures: function() {
            var activeMeasures = [];
            for (var key in education_measures) {
                if (education_measures.hasOwnProperty(key) && education_measures[key] > 1) {
                    activeMeasures.push(key);
                }
            }
            for (var key in prevention_measures) {
                if (prevention_measures.hasOwnProperty(key) && prevention_measures[key] > 0) {
                    activeMeasures.push(key);
                }
            }
            return activeMeasures;
        }
    };
}

