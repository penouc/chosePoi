define(function(require,exports,module){
	var work = {
		'name'            : 'work',
		'point_html'      : '上下班人群',
		'check_html'      : 'produWorkCheck',
		'images'          : 'images/cluster_small.png',
		'images_man'      : 'images/location_icon_work.png',
		'points'    	  :  require('data/point/work/work_points'),
		'cluster_points'  :  require('data/point/work/work_center'),
		'sample_points'   :  require('data/point/work/work_sample_points')
	}
module.exports = work;
})