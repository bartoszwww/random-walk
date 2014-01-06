var rw = new RandomWalk();
var ind1 = new MovingAverageIndicator(rw.values);
rw.addIndicator(ind1);

var thedata = [];
var theoptions = {
	/*series: {
		candlestick:{active:true}
	}*/
};
thedata.push($.plot.candlestick.createCandlestick({
	data: rw.values,
	candlestick: {
		show: true,
		rangeWidth: 1,
		rangeColor: '#000'
	}
}));
for (var i = 0; i < rw.indicators.length; i++) {
	var indicator = rw.indicators[i];
	thedata.push({ data: indicator.values });
}


$.plot('#the-diagram', thedata, theoptions);
