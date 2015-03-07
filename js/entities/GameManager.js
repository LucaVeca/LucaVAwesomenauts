//class that runs all the timers and occurences that aren't inside any of the other entities
game.GameTimerManager = Object.extend({
	//constructor function
	init: function(x, y, settings){
		//sets timer
		this.now = new Date().getTime();
		//keeps track of last time creep was made
		this.lastCreep = new Date().getTime();
		//says the game is not paused
		this.paused = game.data.paused;
		//keeps the function updating
		this.alwaysUpdate = true;
	},

	update: function(){
		//keeps track of timer
		this.now = new Date().getTime();
		
		this.goldTimerCheck();
		this.creepTimerCheck();

		//updates
		return true;
	},

	goldTimerCheck: function(){
		//checks to make sure there is a multiple of ten. makes sure its been at least a second since last creep has been made
		if(Math.round(this.now/1000)%20 === 0 && (this.now - this.lastCreep >= 1000)){
			game.data.gold += 1;
			console.log("Current gold: " + game.data.gold);
		}
	},

	creepTimerCheck: function(){
		//checks to make sure there is a multiple of ten. makes sure its been at least a second since last creep has been made
		if(Math.round(this.now/1000)%10 === 0 && (this.now - this.lastCreep >= 1000)){
			//updates timer
			this.lastCreep = this.now;
			//creates and inserts creeps into world
			var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
			//adds the creeps to the world
			me.game.world.addChild(creepe, 5);
		} 
	}
});


game.HeroDeathManager = Object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true;
	},

	update: function(){
		//runs if player is dead
		if(game.data.player.dead){
			//takes the player off the screen
			me.game.world.removeChild(game.data.player);
			//runs the resetPlayer function
			me.state.current().resetPlayer(10, 0);

		}

		return true;
	}
});

game.ExperienceManager = Object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true;
		this.gameOver = false;
	},
	update: function(){
		if (game.data.win === true && !this.gameOver) {
			this.gameOver(true);
		}
		else if (game.data.win === false && !this.gameOver) {
			this.gameOver(false);
		}

		console.log(game.data.exp);
		return true;
	},

	gameOver: function(win){
		if(win){
			game.data.exp += 10;
		}
		else{
			game.data.exp += 1;
		}
		
		this.gameOver = true;
		me.save.exp = game.data.exp;
	}
});