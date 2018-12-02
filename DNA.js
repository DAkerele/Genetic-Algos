		function DNA(mutationRate, available_chars, phrase,initialize = true){//creates new DNA object
			this.genes = [];
			this.fitness = 0;
			this.mutationRate = mutationRate;
			this.phrase = phrase;
			this.available_chars = available_chars;
			if(initialize){
				for(var i = 0; i < this.phrase.length; i++){
					this.genes.push(this.available_chars.charAt(Math.floor(Math.random() * this.available_chars.length)));
				}
			}
			
			this.genePhrase = this.genes.join("");

		}

		DNA.prototype.calcFitness = function(target){//caculates the fitness of a DNA object
			var score = 0;
			for(var i = 0; i < this.genes.length; i++){
				if(this.genes[i] == target.charAt(i)){
					score++;
				}
			}
			this.fitness = score / target.length;
			
		}	



		DNA.prototype.crossover = function(parentB){// crossover two parent genes into one child
			var child = new DNA(this.mutationRate,this.available_chars,this.phrase,false);
			
			var midpoint = Math.floor(Math.random()*this.genes.length); // Pick a midpoint

	    	
	    	for (var i = 0; i < this.genes.length; i++) {
	      		if (i > midpoint) child.genes[i] = this.genes[i];
	      		else child.genes[i] = parentB.genes[i];
	    	}
	 		//console.log(child.genes.join(""));
			child.initialize = true;
			return child;

		}

		//used to introduce more variation to the population, randomly changes one the characters of a DNA object based on mutationRate
		DNA.prototype.mutate = function(){
			var mutate = Math.random() * 100;
			if(mutate < this.mutationRate){
				var random_index = Math.random() * this.genes.length;
				this.genes[random_index] = this.available_chars.charAt(Math.floor(Math.random() * this.available_chars.length));
			}
		}