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

		this.checkBuyKeys();


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
		//binds the F keys that we need 
		me.input.bindKey(me.input.KEY.F1, "F1", true);
		me.input.bindKey(me.input.KEY.F2, "F2", true);
		me.input.bindKey(me.input.KEY.F3, "F3", true);
		me.input.bindKey(me.input.KEY.F4, "F4", true);
		me.input.bindKey(me.input.KEY.F5, "F5", true);
		me.input.bindKey(me.input.KEY.F6, "F6", true);
		this.setBuyText();
	},

	setBuyText: function(){
		game.data.buytext = new (me.Renderable.extend({
			init: function(){
				//renders the text
				this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]);
				//font and font color
				this.font = new me.Font("Arial", 26, "white");
				this.updateWhenPaused = true;
				this.alwaysUpdate = true;
			},

			draw: function(renderer){
				//sets the position on the screen for the text
				//how to purchase upgrades
				this.font.draw(renderer.getContext(), "PRESS F1-F6 TO BUY, B TO EXIT. CURRENT GOLD:" + game.data.gold, this.pos.x, this.pos.y);
				this.font.draw(renderer.getContext(), "Skill 1: Increase Damage. Current Level: " + game.data.skill1 + " Cost " + ((game.data.exp1+1) * 10), this.pos.x, this.pos.y + 50);
				this.font.draw(renderer.getContext(), "Skill 2: Run Faster! Current Level: " + game.data.skill2 + " Cost " + ((game.data.exp2+1) * 10), this.pos.x, this.pos.y + 100);
				this.font.draw(renderer.getContext(), "Skill 3: Increase Health. Current Level: " + game.data.skill3 + " Cost " + ((game.data.exp3+1) * 10), this.pos.x, this.pos.y + 150);
				this.font.draw(renderer.getContext(), "Q Ability: Speed Burst. Current Level: " + game.data.ability1 + " Cost " + ((game.data.exp4+1) * 10), this.pos.x, this.pos.y + 200);
				this.font.draw(renderer.getContext(), "W Ability: Eat Your Creep For Health: " + game.data.ability2  + " Cost " + ((game.data.exp5+1) * 10), this.pos.x, this.pos.y + 250);
				this.font.draw(renderer.getContext(), "E Ability: Throw Your Spear: " + game.data.ability3 + " Cost " + ((game.data.exp6+1) * 10), this.pos.x, this.pos.y + 300);
			},
		}));
		//when text is bought the purchase is added to the game
		me.game.world.addChild(game.data.buytext, 35);
	},

	stopBuying: function(){
		this.buying = false;
		game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
		me.state.resume(me.state.PLAY);
		//unbinds all of the F keys that we need 
		me.input.unbindKey(me.input.KEY.F1, "F1", true);
		me.input.unbindKey(me.input.KEY.F2, "F2", true);
		me.input.unbindKey(me.input.KEY.F3, "F3", true);
		me.input.unbindKey(me.input.KEY.F4, "F4", true);
		me.input.unbindKey(me.input.KEY.F5, "F5", true);
		me.input.unbindKey(me.input.KEY.F6, "F6", true);
		//allows the text to be bought in game
		me.game.world.removeChild(game.data.buytext);
	},			

	checkBuyKeys: function(){
		if(me.input.isKeyPressed("F1")){
			if(this.checkCost(1)){
				this.makePurchase(1);
			}
		}
		else if(me.input.isKeyPressed("F2")){
			if(this.checkCost(2)){
				this.makePurchase(2);
			}
		}
		else if(me.input.isKeyPressed("F3")){
			if(this.checkCost(3)){
				this.makePurchase(3);
			}
		}
		else if(me.input.isKeyPressed("F4")){
			if(this.checkCost(4)){
				this.makePurchase(4);
			}
		}
		else if(me.input.isKeyPressed("F5")){
			if(this.checkCost(5)){
				this.makePurchase(5);
			}
		}
		else if(me.input.isKeyPressed("F6")){
			if(this.checkCost(6)){
				this.makePurchase(6);
			}
		}
	},

	checkCost: function(skill){
		if(skill===1 && (game.data.gold >=1 ((game.data.skill1+1) * 10))){
			return true;
		}
		else if(skill===1 && (game.data.gold >=2 ((game.data.skill2+1) * 10))){
			return true;
		}
		else if(skill===1 && (game.data.gold >=3 ((game.data.skill3+1) * 10))){
			return true;
		}
		else if(skill===1 && (game.data.gold >=4 ((game.data.skill4+1) * 10))){
			return true;
		}
		else if(skill===1 && (game.data.gold >=5 ((game.data.skill5+1) * 10))){
			return true;
		}
		else if(skill===1 && (game.data.gold >=6 ((game.data.skill6+1) * 10))){
			return true;
		}
		else{
			return false;
		}
	},

	makePurchase: function(skill){
		if(skill === 1){
			game.data.gold -= ((game.data.skill1 +1) * 10);
			game.data.skill1 += 1;
			game.data.player.attack += 1;
		}
		else if(skill === 2){
			game.data.gold -= ((game.data.skill2 +1) * 10);
			game.data.skill2 += 1;
		}
		else if(skill === 3){
			game.data.gold -= ((game.data.skill3 +1) * 10);
			game.data.skill3 += 1;
		}
		else if(skill === 4){
			game.data.gold -= ((game.data.ability1 +1) * 10);
			game.data.ability1 += 1;
		}
		else if(skill === 5){
			game.data.gold -= ((game.data.ability2 +1) * 10);
			game.data.ability2 += 1;
		}
		else if(skill === 6){
			game.data.gold -= ((game.data.ability3 +1) * 10);
			game.data.ability3 += 1;
		}
	}
});		