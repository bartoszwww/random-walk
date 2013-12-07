var rw = new RandomWalk();
var ind1 = new MovingAverageIndicator(rw.values);
rw.addIndicator(ind1);

var thedata = [];
thedata.push({ data: rw.values });
for (var i = 0; i < rw.indicators.length; i++) {
	var indicator = rw.indicators[i];
	thedata.push({ data: indicator.values });
}
$.plot('#the-diagram', thedata);
