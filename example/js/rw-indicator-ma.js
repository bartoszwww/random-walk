MovingAverageIndicator = function(baseData) {
	RandomWalkIndicator.call(this);	
	this._c = {
		cycle: 10
	}
	this._baseData = baseData;
	this.values = [];
	this._initData();
}

MovingAverageIndicator.prototype = Object.create( RandomWalkIndicator.prototype );

MovingAverageIndicator.prototype._initData = function() {
	for (var i = 0; i < this._baseData.length; i++) {
		if (i < this._c.cycle) continue;
		var value = 0;
		for (var j = this._c.cycle; j >= 0; j--) {
			value += this._baseData[i-j][1];
		}
		value /= this._c.cycle;
		this.values.push([this._baseData[i][0], value]);
	}
}
