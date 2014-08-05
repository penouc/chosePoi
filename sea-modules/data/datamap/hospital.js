define(function(require,exports,module){
	var hospital = {
		'name'            : 'hospital',
		'point_html'      : '医院人群',
		'check_html'      : 'produHospitalCheck',
		'points'    	  :  require('data/point/hospital/hospital_points'),
		'cluster_points'  :  require('data/point/hospital/hospital_center'),
		'sample_points'   :  require('data/point/hospital/hospital_sample_points')
	}
module.exports = hospital;
})