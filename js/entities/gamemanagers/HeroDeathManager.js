game.HeroDeathManager = Object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true;
	},

	update: function(){
		//runs if player is dead
		if(game.data.player.dead){
			//takes the player off the screen
			me.game.world.removeChild(game.data.player);
			me.game.world.removeChild(game.data.miniPlayer);
			//runs the resetPlayer function
			me.state.current().resetPlayer(10, 0);

		}

		return true;
	}
});