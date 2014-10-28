INFECTION_RATE_SEED = 0

function Village(population) {
	this.nearby_list = [];
	this.total_population = population;
	this.people_dead = 0;
	this.people_alive = total_population - people_dead;

	// TODO
	function nextDay() {

	}

	function set_nearby_list(list) {
		this.nearby_list = list;
	}
	
	// TODO
	function calculate_infection_rate() {
		infection_rate = INFECTION_RATE_SEED;
		for (int i = 0; i < nearby_list.length; i++) {

		}

	}

}