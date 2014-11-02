
var BASE_FACTOR = 0.1;
var SOAP_FACTOR = -5.
var VACC_ONE_FACTOR = -10;
var VACC_TWO_FACTOR = -5;
var CHEM_FACTOR = -5;
var BOIL_FACTOR = -3;
var CONTAINER_FACTOR = -2;
var MOVE_WASTE_FACTOR = -2;
var WASTE_FACILITY_FACTOR = -10;
var WASH_FACILITY_FACTOR = -8;
var SOAP_DURATION = 14;  //Days
var VACC_ONE_DURATION = 14 //Days
var VACC_TWO_DURATION = 30 //Days


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

    // Initialize all prevention measures to 0 (i.e. not implemented)
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

        this.people_infected = this.people_infected + (this.population - this.people_infected) * Math.random() * (infected_rate) / 100;
        // update the temp amount here, when done updating all the villages move the temp to all_villages_people_infected
        temp_villages_percent_infected[village_number] =  this.people_infected / this.population;
    }

    function addSoap() {
        this.prevention_measures["soap"] = SOAP_FACTOR;
        this.soap_days_left += SOAP_DURATION;
    }

    function addVaccineOne() {
        this.prevention_measures["vacc"] = VACC_ONE_FACTOR;
        this.vacc_days_left = VACC_ONE_DURATION;
    }

    function addVaccineTwo() {
        this.prevention_measures["vacc"] = VACC_TWO_FACTOR;
        this.vacc_days_left = VACC_TWO_DURATION;
    }

    function addChemicalTreatment() {
        this.prevention_measures["chem"] = CHEM_FACTOR;
    }

    function addBoilingWater() {
        this.prevention_measures["boil"] = BOIL_FACTOR;
    }

    function addWaterContainers() {
        this.prevention_measures["container"] = CONTAINER_FACTOR;
    }

    function addMovingWaste() {
        this.prevention_measures["moveWaste"] = MOVE_WASTE_FACTOR;
    }

    function addWasteFacilities() {
        this.prevention_measures["wasteFacility"] = WASTE_FACILITY_FACTOR;
    }

    function addWashingFacilities() {
        this.prevention_measures["washFacility"] = WASH_FACILITY_FACTOR;
    }

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

}

