/**
 *
 */
 
function RandomWalk() {
	this._c = {
		start: 1,
		stop: 10000,
		stepX: 1,
		stepY: 1,
		price: 0
	}
	
	this.currentPrice = this._c.price;
	
	this.generateData = function() {
		var result = [];
		for (var i = this._c.start; i <= this._c.stop; i += this._c.stepX) {
			result.push([i, this.currentPrice]);
			this.currentPrice += Math.random() >= 0.5 ? this._c.stepY : -this._c.stepY;
		}
		return result;
	}
}