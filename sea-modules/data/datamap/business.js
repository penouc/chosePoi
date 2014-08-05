define(function(require,exports,module){
	var business = {
		'name'			  : 'business',	
		'point_html'      : '商务拜访',
		'check_html'      : 'produBusinessCheck',
		'points'    	  :  require('data/point/business/business_points'),
		'cluster_points'  :  require('data/point/business/business_center'),
		'sample_points'   :  require('data/point/business/business_sample_points')
	}
module.exports = business;
})