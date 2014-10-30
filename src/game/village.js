
var BASE_FACTOR = 0.1;
var VACCONE_FACTOR = -10;
var VACCTWO_FACTOR = -5;
var CHEM_FACTOR = -5;
var BOIL_FACTOR = -3;
var CONTAINER_FACTOR = -2;
var MOVEWASTE_FACTOR = -2;
var WASTEFACILITY_FACTOR = -10;
var SANITIZER_FACTOR = -7;
var WASH_FACTOR = -8;
var GATORADE_EFFECT;


function Village(population, village_factors, village_number) {
	this.village_factors = village_factors;
	this.village_number = village_number;
	this.total_population = population;
	this.people_dead = 0;
	this.people_infected = 0;
	//this.prevention_measures = [];
	this.education_measures = {};
	this.education_measures["vacc"] = 1;
	this.education_measures["wash"] = 1;
	this.education_measures["boil"] = 1;
	this.education_measures["container"] = 1;
	this.education_measures["waste"] = 1;
	this.education_measures["sanitize"] = 1;
	this.prevention_measures = {};


    function educate(education_action) {
        this.education_measures[education_action] = 1.5;
	}

	function prevent(prevent_action) {
		this.prevention_measures[prevent_action] = 1;
	}
    
	// TODO
	function incrementDay() {
		var infected_rate = 1;
		for (i = 0; i < village_factors.length; i++) {
			infected_rate += all_villages_percent_infected[i] * BASE_FACTOR * village_factors[i];
		}
        
        for (var key in this.prevention_measures) {
            if (this.prevention_measures.hasOwnProperty(key) && this.prevention_measures[key]>0) {
                if (key == 'gatorade'){
                    this.people_infected += this.prevention_measures[key];
                    delete this.prevention_measures[key];
                }
                if (key == 'vaccOne') {
                    infected_rate += VACCONE_FACTOR*this.education_measures["vacc"];
                }
                if (key == 'vaccTwo') {
                    infected_rate += VACCTWO_FACTOR*this.education_measures["vacc"];
                }
                if (key == 'chem') {
                    infected_rate += CHEM_FACTOR;
                }
                if (key == 'boil') {
                    infected_rate += BOIL_FACTOR*this.education_measures["boil"];
                }
                if (key == 'container') {
                    infected_rate += CONTAINER_FACTOR*this.education_measures["container"];
                }
                if (key == 'moveWaste') {
                    infected_rate += MOVEWASTE_FACTOR;
                }
                if (key == 'wasteFacility') {
                    infected_rate += WASTEFACILITY_FACTOR*this.education_measures["waste"];
                }
                if (key == 'sanitizer') {
                    infected_rate += SANITIZER_FACTOR*this.education_measures["sanitize"];
                }
                if (key == 'washFacility') {
                    infected_rate += WASH_FACTOR*this.education_measures["wash"];
                }
            }
        }

//		for (i = 0; i < prevention_measures; i++) {
//			if(this.prevention_measures[i] == 'gatorade'){
//				this.people_infected += GATORADE_EFFECT;
//			}
//			if (this.prevention_measures[i] == 'vaccOne'){
//				infected_rate += VACCONE_FACTOR*education_measures["vacc"];
//			}
//			if (this.prevention_measures[i] == 'vaccTwo'){
//				infected_rate += VACCTWO_FACTOR*education_measures["vacc"];
//			}
//			if (this.prevention_measures[i] == 'chem'){
//				infected_rate += CHEM_FACTOR;
//			}
//			if (this.prevention_measures[i] == 'boil'){
//				infected_rate += BOIL_FACTOR*education_measures["boil"];
//			}
//			if (this.prevention_measures[i] == 'container'){
//				infected_rate += CONTAINER_FACTOR*education_measures["container"];
//			}
//			if (this.prevention_measures[i] == 'moveWaste'){
//				infected_rate += MOVEWASTE_FACTOR;
//			}
//			if (this.prevention_measures[i] == 'wasteFacility'){
//				infected_rate += WASTEFACILITY_FACTOR*education_measures["waste"];
//			}
//			if (this.prevention_measures[i] == 'sanitizer'){
//				infected_rate += SANITIZER_FACTOR*education_measures["sanitize"];
//			}
//			if (this.prevention_measures[i] == 'washFacility'){
//				infected_rate += WASH_FACTOR*education_measures["wash"];
//			}
//			//TODO: adjust infection rate based on prevention measures and education measures;
//		}
		this.people_infected = this.people_infected + (this.population - this.people_infected) * Math.random() * (infected_rate) / 100;
		// update the temp amoutn here, when done updating all the villages move the temp to all_villages_people_infected
		temp_villages_percent_infected[village_number] =  this.people_infected / this.population;
	}
}

