//class that runs all the timers and things that aren't inside any of the other entities
game.GameTimerManager = Object.extend({
	//constructor function
	init: function(x, y, settings){
		//sets timer
		this.now = new Date().getTime();
		//keeps track of last time creep was made
		this.lastCreep = new Date().getTime();
		this.paused = false;
		//keeps the function updating
		this.alwaysUpdate = true;
	},

	update: function(){
		//keeps track of timer
		this.now = new Date().getTime();
		this.goldTimerCheck();

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
			//creates and inserts creep into worls
			var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
			//adds the creeps to the worls
			me.game.world.addChild(creepe, 5);
		}
	}
});
	
game.HeroDeathManager = Object.extend({
	init: function(x, y, settings){
		//keeps the function updating
		this.alwaysUpdate = true;
	},

	update: function(){
		if(game.data.player.dead){
			me.game.world.removeChild(game.data.player);
			me.state.current().resetPlayer(10, 0);
		}
	return true;

	},	
});

game.ExperienceManager = Object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true;
	},

	update: function(){
		if(game.data.win === true){
			game.data.exp += 10;
		}else if(game.data.win === false){
			game.data.exp += 1;
		}
		console.log(game.data.exp);

		return true;
	},
});