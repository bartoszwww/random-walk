var rw = new RandomWalk();
var thedata = rw.generateData();
$.plot('#the-diagram', [{data: thedata}]);
