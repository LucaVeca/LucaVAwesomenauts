game.LoadProfile = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		//calls the image you set as the title screen
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('load-screen')), -10); // TODO

		me.input.unbindKey(me.input.KEY.B);
		me.input.unbindKey(me.input.KEY.Q);
		me.input.unbindKey(me.input.KEY.E);
		me.input.unbindKey(me.input.KEY.W);
		me.input.unbindKey(me.input.KEY.A);

		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				//renders the text
				this._super(me.Renderable, 'init', [10, 10, 300, 50]);
				//font and font color
				this.font = new me.Font("Arial", 26, "white");
			},

			draw: function(renderer){
				//sets the position on the screen for the text
				//how to purchase upgrades
				this.font.draw(renderer.getContext(), "ENTER YOUR USERNAME AND PASSWORD", this.pos.x, this.pos.y);
			}
		})));

		
	},
		
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
	}
});
