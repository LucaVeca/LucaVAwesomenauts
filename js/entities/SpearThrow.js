game.SpearThrow = me.Entity.extend({
	init: function(x, y, settings, facing){
			//reaches the constructor function for enitity
			this._super(me.Entity, 'init', [x, y, {
				//settings. shows the creep
				image: "spear",
				//sets aside a width of 64 pixels for the sprite
				width: 48,
				//sets aside a height of 64 pixels for the sprite
				height: 48,
				//gives the sprite a width of 64. 
				spritewidth : "48",
				//gives the sprite a width of 64
				spriteheight: "48",
				//gives creep a form
				getShape: function(){
					return(new me.Rect(0, 0, 48, 48)).toPolygon();
				}
			}]);
			//makes the creep's satus continuosly update
			this.alwaysUpdate = true;
			//sets the creep's horizantal and vertical speed
			this.body.setVelocity(8, 0);
			this.attack = game.data.ability3 * 3;
			//sets the sprite's type
			this.type = "spear";
			this.facing = facing
	},

	update: function(delta){
			if(this.facing === "left"){
				//direction
				this.body.vel.x -= this.body.accel.x *  me.timer.tick;
			}
			else{
				//direction
				this.body.vel.x += this.body.accel.x *  me.timer.tick;	
			}
			
			//checks for collisions with player
			me.collision.check(this, true, this.collideHandler.bind(this), true);
			//basic update functions
			this.body.update(delta);
			this._super(me.Entity, "update", [delta]);
			return true;
	},

	//function for creeps' collisions
		collideHandler: function(response){
			//runs if creep collides with tower 
			if (response.b.type === 'EnemyBase' || response.b.type === 'EnemyCreep') {
				//runs the losehealth function, with 1 point damage
				response.b.loseHealth(this.Attack);
				me.game.world.removeChild(this);
			}
		}	
})