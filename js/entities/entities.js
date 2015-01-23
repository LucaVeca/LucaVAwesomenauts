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
		this.body.setVelocity(5, 0);

	},

	//when the right key is pressed the character will move to the right
	update: function(delta){
		if(me.input.isKeyPressed("right")){
			//adds to the position of my x by adding the velocity defined above in
			//setVelocity() and multiplying it by me.timer.tick.
			//me.timer.tick makes the movement look smooth
			this.body.vel.x += this.body.accel.x * me.timer.tick;
		}
		else{
			this.body.vel.x = 0;
		}

		this.body.update(delta);
		return true;
	}


});