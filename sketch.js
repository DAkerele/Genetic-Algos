let target;
let popmax;
let mutationRate;
let population;

let bestPhrase;
let allPhrases;
let stats;

function setup() {

  bestPhrase = createP("Best phrase:");
  //bestPhrase.position(10,10);
  bestPhrase.class("best");

  allPhrases = createP("All phrases:");
  allPhrases.position(1000, 10);
  console.log(allPhrases);
  
  allPhrases.class("all");

  stats = createP("Stats");
  //stats.position(10,200);
  stats.class("stats");

  //createCanvas(640, 360);
  target = "To be or not to be that is the question.";
  popmax = 3000;
  mutationRate = 20;

  // Create a population with a target phrase, mutation rate, and population max
  population = new Population(popmax,mutationRate,target);
  allPhrases.html("All phrases:<br>");
}


function draw() {
	
		population.calcFitness();//caculate fitness of the population
		population.naturalSelection();// create a mating pool based on fitness of population members
		if (population.evaluate()) {
		    //println(millis()/1000.0);
		    noLoop();
	  	}
		population.generateNewPopulation();//creates new population with childern from mating pool
		displayInfo();
	  	// If we found the target phrase, stop
	  	
	 
	
	
}

function displayInfo() {
  // Display current status of population
  let answer = population.getBest();

  bestPhrase.html("Best phrase:<br>" + "<p style = font-size:50px; font-family:Courier New, Courier, monospace>"+answer+"</p>");
  let statstext = "total generations:     " + population.generations + "<br>";
  statstext += "total population:      " + population.popSize + "<br>";

  stats.html(statstext);
  for(var i = 0; i < population.popSize;i++){

  	allPhrases.html("All phrases:<br>" + population.allPhrases());

  }
  
}