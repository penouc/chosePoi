define(function(require,exports,module){
	var getRandomColor = function(){ 
    return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).substr(-6); 
	}

	module.exports = getRandomColor;
})