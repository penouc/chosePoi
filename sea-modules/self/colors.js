define(function(require,exports,module){

  function Colors(arr){
     this.arr = arr;
     this.colors = [];
     this.conso = function(){
      console.log(this.colors);
     }
  }
  module.exports = Colors;

  Colors.prototype.setColor = function() {
          for(var i = 0 ; i < this.arr.length; i++){
            this.colors.push(this.getRandomColor());
          }
  };
  Colors.prototype.getRandomColor = function(){ 
    return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).substr(-6); 
  }
	
})