// TODO
game.PlayerEntity = me.Entity.extend({
	init: function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, {
			image: "player",
			//tells us the amount of space the screen needs to reserve
			width: 64,
			height: 64,
			//tells us the size of the image
			spritewidth: "64",
			spriteheight: "64",
			//the size of the character
			getShape: function(){
				return(new me.Rect(0, 0, 64, 64)).toPolygon();
			}
		}]);

		//the speed the player moves at
		this.body.setVelocity(5, 20);
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

		//animates walking for the character
		this.renderable.addAnimation("idle", [78]);
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);

		//when no key is pressed there is a default standing animation
		this.renderable.setCurrentAnimation("idle");

	},

	//when the right key is pressed the character will move to the right
	update: function(delta){
		if(me.input.isKeyPressed("right")){
			//adds to the position of my x by adding the velocity defined above in
			//setVelocity() and multiplying it by me.timer.tick.
			//me.timer.tick makes the movement look smooth
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			//flips animation to front facing
			this.flipX(true);
		}
		else{
			this.body.vel.x = 0;
		}

		if(me.input.isKeyPressed("attack")){
			if(!this.renderable.setCurrentAnimation("attack")){
				//sets current animation to attack and once that is over
				//goes back to the idle animation
				this.renderable.setCurrentAnimation("attack", "idle");
				//makes it so that the next time we start this sequence we begin
				//from the first animation, not wherever we left off when we
				//switched to another animation
				this.renderable.setAnimationFrame();
			}
		}

		//renders walking animation
		else if(this.body.vel.x !== 0){
			if(!this.renderable.isCurrentAnimation("walk")){
				this.renderable.setCurrentAnimation("walk");
			}
		}
		else{
			this.renderable.setCurrentAnimation("idle");
		}


		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	}


});

//creates base for your player
game.PlayerBaseEntity = me.Entity.extend({
	init : function(x, y, settings){
		//specs of the base
		this._super(me.Entity, 'init', [x, y, {
			image: "tower",
			width: 100,
			height: 100,
			spritewidth: "100",
			spriteheight: "100",
			getShape: function(){
				return (new me.Rect(0, 0, 100, 100)).toPolygon();
			}
		}]);
		//health of the base 
		this.broken = false;
		this.health = 10;
		this.alwaysUpdate = true;
		this.body.onCollision = this.onCollision.bind(this);
		console.log("init");
		this.type = "PlayerBaseEntity";

		//Gives a idle animation for a base that is healthy
		this.renderable.addAnimation("idle", [0]);
		this.renderable.addAnimation("broken", [1]);
		this.renderable.setCurrentAnimation("idle");

	},

	update:function(delta){
		//if the base is broken it goes away
		if(this.health<=0){
			this.broken = true;
			//Gives a idle animation for a base that is healthy
			this.renderable.setCurrentAnimation("broken");
		}
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	},

	onCollision: function(){

	}

});

//creates base for enemy with the same specs and attributes as the player
game.EnemyBaseEntity = me.Entity.extend({
	init : function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, {
			image: "tower",
			width: 100,
			height: 100,
			spritewidth: "100",
			spriteheight: "100",
			getShape: function(){
				return (new me.Rect(0, 0, 100, 100)).toPolygon();
			}
		}]);
		this.broken = false;
		this.health = 10;
		this.alwaysUpdate = true;
		this.body.onCollision = this.onCollision.bind(this);
		console.log("init");
		this.type = "EnemyBaseEntity";

		//Gives a idle animation for a base that is healthy
		this.renderable.addAnimation("idle", [0]);
		this.renderable.addAnimation("broken", [1]);
		this.renderable.setCurrentAnimation("idle");

	},

	update:function(delta){
		if(this.health<=0){
			this.broken = true;
			//gives an animation for a broken base 
			this.renderable.setCurrentAnimation("broken");
		}
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	},

	onCollision: function(){
		
	}

});