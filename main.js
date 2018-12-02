
$(document).ready(function() {
	function main(){
		var population = new Population(1000,1,"to be or not to be");
		
		while(!population.evaluate()){//evolution loop
			
			//document.getElementById("result").innerHTML = ""+population.pop[0].genePhrase;
			//console.log(population.pop[0].genePhrase);
			population.calcFitness();//caculate fitness of the population
			population.naturalSelection();// create a mating pool based on fitness of population members
			population.generateNewPopulation();//creates new population with childern from mating pool
			
		}

	}

	main();
});
