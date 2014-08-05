define(function(require,exports,module){

	function ComplexCustomOverlay(point,color){
	  this._point = point;
	  this._color = color;
	}
	module.exports = ComplexCustomOverlay;

	ComplexCustomOverlay.prototype = new BMap.Overlay();
	ComplexCustomOverlay.prototype.initialize = function(map){
	  this._map = map;
	  var div = this._div = document.createElement("div");
	  div.style.position = "absolute";
	  div.style.height = "5px";
	  div.style.width = "5px";
	  div.style.borderRadius = "5px"
	  div.style.backgroundColor= this._color;
	  div.style.opacity = '.5';
	  map.getPanes().labelPane.appendChild(div);
	  map.getPanes().labelPane.style.zIndex = '-999';
	  return div;
	}
	ComplexCustomOverlay.prototype.draw = function(){
	  var map = this._map;
	  var pixel = map.pointToOverlayPixel(this._point);
	  this._div.style.left = pixel.x  -3 + "px";
	  this._div.style.top  = pixel.y - 10 + "px";
	}

})