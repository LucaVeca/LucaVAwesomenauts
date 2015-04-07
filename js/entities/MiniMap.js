game.MiniMap = me.Entity.extend({
	init: function(x, y, settings){
		this._super(me.Entity, "init", [x, y, {
			//settings. shows the creep
				image: "minimap",
				//sets aside a width of 64 pixels for the sprite
				width: 762,
				//sets aside a height of 64 pixels for the sprite
				height: 158,
				//gives the sprite a width of 64. 
				spritewidth : "762",
				//gives the sprite a width of 64
				spriteheight: "158",
				//gives creep a form
				getShape: function(){
					return(new me.Rect(0, 0, 762, 158)).toPolygon();
				}
		}]);
		this.floating = true;
	}

});