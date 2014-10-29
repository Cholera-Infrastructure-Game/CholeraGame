
BASE_FACTOR = .1;

function Village(population, village_factors, village_number) {
	this.village_factors = village_factors;
	this.village_number = village_number
	this.total_population = population;
	this.people_dead = 0;
	this.people_infected = 0;
	this.prevention_measures = [];
	this.education_measures = [];

	// TODO
	function incrementDay() {
		infected_rate = 1;
		for (i = 0; i < village_factors.length; i++) {
			infected_rate += all_villages_percent_infected[i] * BASE_FACTOR * village_factors[i];
		}
		for (i = 0; i < prevention_measures; i++) {
			//TODO: adjust infection rate based on prevention measures and education measures;
		}
		this.people_infected = this.people_infected + (this.population - this.people_infected) * Math.random() * (infected_rate) / 100;
		// update the temp amoutn here, when done updating all the villages move the temp to all_villages_people_infected
		temp_villages_percent_infected[village_number] =  this.people_infected / this.population;
	}
}

