define(function(require,exports,module){
	var transport = {
		'name'            : 'transport',
		'point_html'      : '交通人群',
		'check_html'      : 'produTransportCheck',
		'points'    	  :  require('data/point/transport/transport_points'),
		'cluster_points'  :  require('data/point/transport/transport_center'),
		'sample_points'   :  require('data/point/transport/transport_sample_points')
	}
module.exports = transport;
})