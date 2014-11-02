
var DEATH_RATE = .02;

var BASE_FACTOR = 0.1;

// The additive factor to the infection rate the measure has over time.
var SOAP_FACTOR = -5.
var VACC_ONE_FACTOR = -10;
var VACC_TWO_FACTOR = -5;
var CHEM_FACTOR = -5;
var BOIL_FACTOR = -3;
var CONTAINER_FACTOR = -2;
var MOVE_WASTE_FACTOR = -2;
var WASTE_FACILITY_FACTOR = -10;
var WASH_FACILITY_FACTOR = -8;

// The multiplicative factor applied to the infected population immediately when the measure is applied.
var SOAP_IMMEDIATE_EFFECT = .98;
var VACC_ONE_IMMEDIATE_EFFECT = .95;
var VACC_TWO_IMMEDIATE_EFFECT = .99;
var CHEM_IMMEDIATE_EFFECT = .98;
var BOIL_IMMEDIATE_EFFECT = .99;
var CONTAINER_IMMEDIATE_EFFECT = .99;
var MOVE_WASTE_IMMEDIATE_EFFECT = .99;
var WASTE_FACILITY_IMMEDIATE_EFFECT = .95;
var WASH_FACILITY_IMMEDIATE_EFFECT = .94;

var SOAP_DURATION = 14;  // in days
var VACC_ONE_DURATION = 14 // in days
var VACC_TWO_DURATION = 30 // in days


function Village(population, village_factors, village_number) {
    this.village_factors = village_factors;
    this.village_number = village_number;
    this.total_population = population;
    this.people_dead = 0;
    this.people_infected = 0;
    // Initialize Education measures to 1 (so no increase in prevention measure effect)
    this.education_measures = {};
    this.education_measures["vacc"] = 1;
    this.education_measures["wash"] = 1;
    this.education_measures["boil"] = 1;
    this.education_measures["container"] = 1;
    this.education_measures["waste"] = 1;
    this.education_measures["sanitize"] = 1;

    // Initialize all prevention measures to 0 (i.e. not implemented).
    // When a measure is put into place, the factor is put as the value in the map.
    this.soap_days_left = 0;
    this.prevention_measures = {};
    this.prevention_measures["soap"] = 0;
    this.prevention_measures["vacc"] = 0;
    this.prevention_measures["chem"] = 0;
    this.prevention_measures["boil"] = 0;
    this.prevention_measures["container"] = 0;
    this.prevention_measures["moveWaste"] = 0;
    this.prevention_measures["wasteFacility"] = 0;
    this.prevention_measures["sanitizer"] = 0;
    this.prevention_measures["washFacility"] = 0;

    function educate(education_action) {
        this.education_measures[education_action] = 1.5;
    }

    function incrementDay() {
        people_newly_dead = Math.random() * people_infected * DEATH_RATE;
        this.people_dead += people_newly_dead;
        this.people_infected -= people_newly_dead;

        var infected_rate = 1;
        for (i = 0; i < village_factors.length; i++) {
            infected_rate += all_villages_percent_infected[i] * BASE_FACTOR * village_factors[i];
        }
        for (var key in this.prevention_measures) {
            infected_rate += this.prevention_measures[key] * this.education_measures[key]
        }

        this.soap_days_left = Math.max(0, this.soap_days_left - 1);
        if (this.soap_days_left === 0) {
            this.prevention_measures["soap"] = 0;
        }
        this.vacc_days_left = Math.max(0, this.vacc_days_left - 1);
        if (this.vacc_days_left === 0) {
            this.prevention_measures["vacc"] = 0;
        }

        this.people_infected += (this.population - this.people_dead - this.people_infected) * Math.random() * (infected_rate) * .01;
        // update the temp amount here, when done updating all the villages move the temp to all_villages_people_infected
        temp_villages_percent_infected[village_number] =  this.people_infected / this.population;
    }

    // These functions are to be called when a prevention measure is added to a village.
    function addSoap() {
        if (this.prevention_measures["soap"] === 0) {
            this.people_infected = Math.floor(SOAP_IMMEDIATE_EFFECT * this.people_infected);
        }
        this.prevention_measures["soap"] = SOAP_FACTOR;
        this.soap_days_left += SOAP_DURATION;
    }

    // ***Something to consider:  this makes it possible to alternate between the two vaccine types, causing a flat reduction in # of people infected every time.  Maybe we don't want this exploit to be possible?  Maybe its too expensive to be doable in game anyway?
    function addVaccineOne() {
        if (this.prevention_measures["vacc"] != VACC_ONE_FACTOR) {
            this.people_infected = Math.floor(VACC_ONE_IMMEDIATE_EFFECT * this.people_infected);
        }
        this.prevention_measures[""] = VACC_ONE_FACTOR;
        this.vacc_days_left = VACC_ONE_DURATION;
    }

    function addVaccineTwo() {
        if (this.prevention_measures["vacc"] != VACC_TWO_FACTOR) {
            this.people_infected = Math.floor(VACC_TWO_IMMEDIATE_EFFECT * this.people_infected);
        }
        this.prevention_measures["vacc"] = VACC_TWO_FACTOR;
        this.vacc_days_left = VACC_TWO_DURATION;
    }

    function addChemicalTreatment() {
        if (this.prevention_measures["chem"] === 0) {
            this.people_infected = Math.floor(CHEM_IMMEDIATE_EFFECT * this.people_infected);
        }
        this.prevention_measures["chem"] = CHEM_FACTOR;
    }

    function addBoilingWater() {
        if (this.prevention_measures["boil"] === 0) {
            this.people_infected = Math.floor(BOIL_IMMEDIATE_EFFECT * this.people_infected);
        }
        this.prevention_measures["boil"] = BOIL_FACTOR;
    }

    function addWaterContainers() {
        if (this.prevention_measures["container"] === 0) {
            this.people_infected = Math.floor(CONTAINER_IMMEDIATE_EFFECT * this.people_infected);
        }
        this.prevention_measures["container"] = CONTAINER_FACTOR;
    }

    function addMovingWaste() {
        if (this.prevention_measures["moveWaste"] === 0) {
            this.people_infected = Math.floor(MOVE_WASTE_IMMEDIATE_EFFECT * this.people_infected);
        }
        this.prevention_measures["moveWaste"] = MOVE_WASTE_FACTOR;
    }

    function addWasteFacilities() {
        if (this.prevention_measures["wasteFacility"] === 0) {
            this.people_infected = Math.floor(WASTE_FACILITY_IMMEDIATE_EFFECT * this.people_infected);
        }
        this.prevention_measures["wasteFacility"] = WASTE_FACILITY_FACTOR;
    }

    function addWashingFacilities() {
        if (this.prevention_measures["washFacility"] === 0) {
            this.people_infected = Math.floor(WASH_FACILITY_IMMEDIATE_EFFECT * this.people_infected);
        }
        this.prevention_measures["washFacility"] = WASH_FACILITY_FACTOR;
    }

    // These functions are to be called when an education measure is added to a village.  Note that these have no immediate effect (maybe they should?) and do nothing when the corresponding prevention measure is not in effect.
    function educateAboutSoap() {
        this.education_measures["soap"] = 1.5;
    }

    function educateAboutVaccine() {
        this.education_measures["vacc"] = 1.5;
    }

    function educateAboutChemicalTreatment() {
        this.education_measures["chem"] = 1.5;
    }

    function educateAboutBoilingWater() {
        this.education_measures["boil"] = 1.5;
    }

    function educateAboutWaterContainers() {
        this.education_measures["container"] = 1.5;
    }

    function educateAboutMovingWaste() {
        this.education_measures["moveWaste"] = 1.5;
    }

    function educateAboutWasteFacilities() {
        this.education_measures["wasteFacility"] = 1.5;
    }

    function educateAboutWashingFacilities() {
        this.education_measures["washFacility"] = 1.5;
    }

    function getHowManyDead() {
        return this.people_dead;
    }

}

