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
			game.data.gold += (game.data.exp1+1);
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
		this.gameover = false;
	},
	update: function(){
		if (game.data.win === true && !this.gameover) {
			this.gameover(true);
		}
		else if (game.data.win === false && !this.gameover) {
			this.gameover(false);
		}

		console.log(game.data.exp);
		return true;
	},

	gameover: function(win){
		if(win){
			game.data.exp += 10;
		}
		else{
			game.data.exp += 1;
		}
		
		this.gameover = true;
		me.save.exp = game.data.exp;
		//testing purposes  
		me.save.exp2 = 4;
	}
});

game.SpendGold = Object.extend({
	init: function(x, y, settings){
		//sets timer
		this.now = new Date().getTime();
		//keeps track of last time creep was made
		this.lastBuy = new Date().getTime();
		//says the game is not paused
		this.paused = game.data.paused;
		//keeps the function updating
		this.alwaysUpdate = true;
		this.updateWhenPaused = true;
	},

	update: function(){
		this.now = new Date().getTime();

		if(me.input.isKeyPressed("buy") && this.now-this.lastBuy >=1000){
			this.lastBuy = this.now;
			if(!this.buying){
				this.startBuying();
			}
			else{
				this.stopBuying();
			}

		}

		return true;
	},

	startBuying: function(){
		this.buying = true;
		me.state.pause(me.state.PLAY);
		game.data.pausePos = me.game.viewport.localToWorld(0, 0);
		game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('gold-screen'));
		game.data.buyscreen.updateWhenPaused = true;
		game.data.buyscreen.setOpacity(0.8);
		me.game.world.addChild(game.data.buyscreen, 34);
		game.data.player.body.setVelocity(0, 0);

	},

	stopBuying: function(){
		this.buying = false;
		game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
		me.state.resume(me.state.PLAY);
	}
});