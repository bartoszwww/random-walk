/**
 * Initial random walk algorythm was taken from
 * http://stackoverflow.com/questions/11355615/simulating-stock-rates
 */
function RandomWalk(config) {
	this._c = {
		start: 1,
		stop: 100,
		stepX: 1,
		stepY: 1,
		price: 0,
		ohlc: true,
		ohlcStepsPerCycle: 10
	}
	// merge config
	if (config) {
		
	}
	
	this.indicators = [];
	this.values = [];
	this.currentPrice = this._c.price;
	
	this._initData();
}
RandomWalk.prototype._initData = function() {
	var ohlc = [], min, max;
	for (var i = this._c.start; i <= this._c.stop; i += this._c.stepX) {
		if (this._c.ohlc) {
			ohlc = [i, this.currentPrice]; // add open
			min = max = this.currentPrice;
			for (var j = 0; j < this._c.ohlcStepsPerCycle - 1; j++) {
				this._generateNewPrice();
				min = min > this.currentPrice ? this.currentPrice : min;
				max = max < this.currentPrice ? this.currentPrice : max;
			}
			ohlc.push(this.currentPrice); // add close
			ohlc.push(min); // add low
			ohlc.push(max); // add high
			this.values.push(ohlc);
			this._generateNewPrice();
		}
		else {
			this.values.push([i, this.currentPrice]);
			this._generateNewPrice();
		}
	}
}
RandomWalk.prototype._generateNewPrice = function() {
	this.currentPrice += Math.random() >= 0.5 ? this._c.stepY : -this._c.stepY;
}
RandomWalk.prototype.addIndicator = function(indicator) {
	this.indicators.push(indicator);
}

/**
 *
 */
function RandomWalkIndicator(baseData) {
	this._c = {}
	this._baseData = baseData;
	
	this.values = [];
}

function MovingAverageIndicator(baseData) {
	this._c = {
		cycle: 100
	}
	this._baseData = baseData;
	
	this.values = [];
	//RandomWalkIndicator.call(this);
	
	this._initData();
}
//MovingAverageIndicator.prototype = new RandomWalkIndicator();
//MovingAverageIndicator.prototype.constructor = MovingAverageIndicator;
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
