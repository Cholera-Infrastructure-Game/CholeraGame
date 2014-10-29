
BASE_FACTOR = .1;
VACCONE_FACTOR = -10;
VACCTWO_FACTOR = -5;
CHEM_FACTOR = -5;
BOIL_FACTOR = -3;
CONTAINER_FACTOR = -2;
MOVEWASTE_FACTOR = -2;
WASTEFACILITY_FACTOR = -10;
SANITIZER_FACTOR = -7;
WASH_FACTOR = -8;
GATORADE_EFFECT;


function Village(population, village_factors, village_number) {
	this.village_factors = village_factors;
	this.village_number = village_number
	this.total_population = population;
	this.people_dead = 0;
	this.people_infected = 0;
	this.prevention_measures = [];
	Dictionary<string, int> education_measures;
	education_measures["vacc"] = 1;
	education_measures["wash"] = 1;
	education_measures["boil"] = 1;
	education_measures["container"] = 1;
	education_measures["waste"] = 1;
	education_measures["sanitize"] = 1;
	Dictionary<string, int> prevention_measures;

function educate(education_action) {
	education_measures[education_action] = 1.5;
	}
	// TODO
	function incrementDay() {
		infected_rate = 1;
		for (i = 0; i < village_factors.length; i++) {
			infected_rate += all_villages_percent_infected[i] * BASE_FACTOR * village_factors[i];
		}

		for (i = 0; i < prevention_measures; i++) {
			if(this.prevention_measures[i] == 'gatorade'){
				this.people_infected -= 
			}
			if (this.prevention_measures[i] == 'vaccOne'){
				infected_rate += VACCONE_FACTOR*education_measures["vacc"];
			}
			if (this.prevention_measures[i] == 'vaccTwo'){
				infected_rate += VACCTWO_FACTOR*education_measures["vacc"];
			}
			if (this.prevention_measures[i] == 'chem'){
				infected_rate += CHEM_FACTOR;
			}
			if (this.prevention_measures[i] == 'boil'){
				infected_rate += BOIL_FACTOR*education_measures["boil"];
			}
			if (this.prevention_measures[i] == 'container'){
				infected_rate += CONTAINER_FACTOR*education_measures["container"];
			}
			if (this.prevention_measures[i] == 'moveWaste'){
				infected_rate += MOVEWASTE_FACTOR;
			}
			if (this.prevention_measures[i] == 'wasteFacility'){
				infected_rate += WASTEFACILITY_FACTOR*education_measures["waste"];
			}
			if (this.prevention_measures[i] == 'sanitizer'){
				infected_rate += SANITIZER_FACTOR*education_measures["sanitize"];
			}
			if (this.prevention_measures[i] == 'washFacility'){
				infected_rate += WASH_FACTOR*education_measures["wash"];
			}
			//TODO: adjust infection rate based on prevention measures and education measures;
		}
		this.people_infected = this.people_infected + (this.population - this.people_infected) * Math.random() * (infected_rate) / 100;
		// update the temp amoutn here, when done updating all the villages move the temp to all_villages_people_infected
		temp_villages_percent_infected[village_number] =  this.people_infected / this.population;
	}
}

