define(function(require,exports,module){
	var scentic = {
		'name'            : 'scentic',
		'point_html'      : '景点人群',
		'check_html'      : 'produScenticCheck',
		'points'    	  :  require('data/point/scentic/scentic_points'),
		'cluster_points'  :  require('data/point/scentic/scentic_center'),
		'sample_points'   :  require('data/point/scentic/scentic_sample_points')
	}
module.exports = scentic;
})