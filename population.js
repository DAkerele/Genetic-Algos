
		function Population(popSize, mutationRate,phrase){//creates new Population object
			this.phrase = phrase;
			this.mutationRate = mutationRate;
			this.popSize = popSize;
			this.pop = this.initialize();
			this.generations = 0;
			this.best = "";

		}

		Population.prototype.initialize = function(){//initializes population with DNA objects
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz. ";
			var result = [];
			for(var i = 0; i < this.popSize; i++){
				data = new DNA(this.mutationRate , possible, this.phrase);
				result.push(data);
			}
			return result;
		}

		
		Population.prototype.calcFitness = function(){//calculates the fitness of the whole population
			for(var i = 0; i < this.popSize; i++){
				this.pop[i].calcFitness(this.phrase);
			}
		}

		Population.prototype.naturalSelection = function(){//creates mating pool based on the respective fitness of each DNA node
			this.matingPool = [];
			//console.log(this.popSize);
			var maxFitness = 0;
			for(var i = 0; i < this.popSize; i++){
				if(this.pop[i].fitness > maxFitness){
					maxFitness = this.pop[i].fitness;
				}
			}
			var num 
			for(var i = 0; i < this.popSize; i++){
				var fitness = map(this.pop[i].fitness, 0, maxFitness, 0, 1);
				var num = Math.floor(fitness * 100);
				for(var j = 0; j < num; j++){
					this.matingPool.push(this.pop[i]);
				}
			}
			
		}

		Population.prototype.generateNewPopulation = function(){//generates a new population with childern created from crossover function
			//console.log(this.matingPool.length);
			for(var i = 0; i < this.popSize;i++){
				var a = Math.floor(Math.random()*this.matingPool.length);
				var b = Math.floor(Math.random()*this.matingPool.length);
				var parentA = this.matingPool[a];
				var parentB = this.matingPool[b];
				var child = parentA.crossover(parentB);
				//console.log(child);
				child.mutate(this.mutationRate);
				this.pop[i] = child;
				
			}
			this.generations++;
		}

		Population.prototype.evaluate = function(){//evaluates wether we've reach the target phrase
			let worldrecord = 0.0;
		    let index = 0;
		    for (let i = 0; i < this.pop.length; i++) {
		      if (this.pop[i].fitness > worldrecord) {
		        index = i;
		        worldrecord = this.pop[i].fitness;
		      }
		    }

		    this.best = this.pop[index].genes.join("");
		    if (worldrecord === 1) {
		      return true;
		    }
		    return false;
		  }
		
		Population.prototype.getBest = function(){
			return this.best;
		}
		

		//maps the fitness values from original range to a different range
		function map(value, minA, maxA, minB, maxB) {
	    	return (1 - ((value - minA) / (maxA - minA))) * minB + ((value - minA) / (maxA - minA)) * maxB;
		}
		
	Population.prototype.allPhrases = function() {
	    let everything = "";

	    let displayLimit = min(this.pop.length, 50);


	    for (let i = 0; i < displayLimit; i++) {
	      everything += this.pop[i].genes.join("")+ "<br>";
	    }
	    return everything;
	  }