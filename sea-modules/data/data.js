define(function(require,exports,module){
		var data = {
			'work' : {
				'point_html'      : '上下班',
				'check_html'      : 'produWorCheck',
				'points'    	  :  require.async('data/point/onOffDuty/in/ondutyIn_points'),
				'cluster_points'  :  require.async('data/point/onOffDuty/in/ondutyIn_cluster_points'),
				'sample_points'   :  require.async('data/point/onOffDuty/in/ondutyIn_sample_points')
			},
			'business' : {
				'point_html' : '商务',
				'check_html' : 'produBizCheck',
				'points'    	  :  require.async('data/point/business/business_points'),
				'cluster_points'  :  require.async('data/point/business/business_cluster_center'),
				'sample_points'   :  require.async('data/point/business/business_sample')
			},
			'shopping' : {
				'point_html' : '商超',
				'check_html' : 'produShoCheck'
			},
			'scentic' : {
				'point_html' : '景点',
				'check_html' : 'produSceCheck'
			},
			'hospital' : {
				'point_html' : '医院',
				'check_html' : 'produHosCheck'
			},
			'transport' : {
				'point_html' : '火车站/飞机场',
				'check_html' : 'produTraCheck'
			}
		}
	module.exports = data;
})