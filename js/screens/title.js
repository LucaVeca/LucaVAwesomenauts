game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		//calls the image you set as the title screen
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO

		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				//renders the text
				this._super(me.Renderable, 'init', [270, 240, 300, 50]);
				//font and font color
				this.font = new me.Font("Arial", 46, "white");
			},

			draw: function(renderer){
				//sets the position on the screen for the text
				this.font.draw(renderer.getContext(), "START A NEW GAME", 450, 130);
				this.font.draw(renderer.getContext(), "Press ENTER to play", this.pos.x, this.pos.y);

			}
		})));
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {

	}
});
