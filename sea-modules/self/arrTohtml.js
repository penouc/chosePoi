define(function(require,exports,module){

	var poif = require('self/poiFunc');

	var AddTohtml = function(arr){
		this.arr = arr;
		this.colors = [];
		this.json = [];
		this.jsonMarkers = [];
		this.marpoint = {
			'marpoi'   : [],
			'marclpoi' : [],
			'marsapoi' : [],
			'marmanpoi': []
		};
	}

	module.exports = AddTohtml;

	AddTohtml.prototype.setColor = function() {
	        for(var i = 0 ; i < this.marpoint['marclpoi'].length; i++){
	          this.colors.push(this.getRandomColor());
	        }
	};
	AddTohtml.prototype.getRandomColor = function(){ 
	  return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).substr(-6); 
	}

	AddTohtml.prototype.datainit = function(){
		var getMarker = poif['getMarker'];
		var clusterpoints = this.arr['cluster_points'];
		var img = this.arr['images'];
		this.marpoint.marclpoi = getMarker(clusterpoints,img);

		var getAllComplOverlay = poif['getAllComplOverlay'];
		var samplepoints = this.arr['sample_points'];
		this.setColor();
		this.marpoint.marsapoi = getAllComplOverlay(samplepoints,this.colors);

		var points = this.arr['points'];
		for (var i = 0; i < points.length; i++) {
			this.marpoint.marpoi.push(getAllComplOverlay(points,this.colors,i));
		};
	}

	AddTohtml.prototype.switchAddEvent = function(che){
		var that = this;
		che.on('switchChange.bootstrapSwitch',function(event, state){
			var flg = this.getAttribute('data-pan');
			if (flg == 'cluster') {
				if(!state){
					poif.add_point(that.marpoint['marclpoi'],poif.addOver);
				}else{
					poif.remove_point(that.marpoint['marclpoi']);
				}
			}
			if (flg == 'sample') {
				if(!state){
					poif.add_point(that.marpoint['marsapoi'],poif.addOver);
				}else{
					poif.remove_point(that.marpoint['marsapoi']);
				}
			};
			if (flg == 'poi') {
				var ind = this.getAttribute('data-no');
				if (!state) {
					poif.add_point(that.marpoint['marpoi'][ind-1],poif.addOver);
				}else{
					poif.remove_point(that.marpoint['marpoi'][ind-1]);
				}
			};
			if(flg == 'add') {
				if(!state){
					map.addEventListener('click',poif.manualAddPoi);
				}else{
					map.removeEventListener('click',poif.manualAddPoi);
				}
			};
			if (flg == 'manpoi') {
				if (!state) {
					poif.add_point(that.marpoint['marmanpoi'],poif.addOver);
				}else{
					poif.remove_point(that.marpoint['marmanpoi']);
				}
			};
		})
	}

	AddTohtml.prototype.btnAddEvent = function(btn,storageStr){
		var that = this;
		btn.on('click',function(){
			var flg = this.getAttribute('data-pan');
			if (flg == 'clear') {
				poif.clearPoi();
			};
			if (flg == 'saveJson') {
				poif.saveJson(storageStr);
			};
			if (flg == 'load') {
				var imgUrl = that.arr['images_man'];
				that.marpoint['marmanpoi'] = poif.getMarker(poif.load(storageStr),imgUrl);
			};
		})
	}

	AddTohtml.prototype.addCheck = function(chef,ps){
		var checkFactory = poif['checkFactory'];
		checkFactory(chef,this.arr['points'],ps,this.colors);
	}
})