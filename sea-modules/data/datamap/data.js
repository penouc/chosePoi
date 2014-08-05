define(function(require,exports,module){
		var data = {
			'ondutyIn' : {
				'point_html'      : '上下班-家',
				'check_html'      : 'produOndiCheck',
				'points'    	  :  require('data/point/onOffDuty/in/ondutyIn_points'),
				'cluster_points'  :  require('data/point/onOffDuty/in/ondutyIn_cluster_points'),
				'sample_points'   :  require('data/point/onOffDuty/in/ondutyIn_sample_points')
			},
			'ondutyOut' : {
				'point_html' : '上下班-公司',
				'check_html' : 'produOndoCheck',
				'points'    	  :  require.async('data/point/onOffDuty/out/ondutyOut_points'),
				'cluster_points'  :  require.async('data/point/onOffDuty/out/ondutyOut_cluster_points'),
				'sample_points'   :  require.async('data/point/onOffDuty/out/ondutyOut_sample_points')
			},
			'business' : {
				'point_html' : '商务',
				'check_html' : 'produBizzCheck',
				'points'    	  :  require('data/point/business/business_points'),
				'cluster_points'  :  require('data/point/business/business_cluster_center'),
				'sample_points'   :  require('data/point/business/business_sample')
			},
			'shoppingIn' : {
				'point_html' : '商超in',
				'check_html' : 'produShoiCheck'
			},
			'shoppingOut' : {
				'point_html' : '商超out',
				'check_html' : 'produShooCheck'
			},
			'scenticIn' : {
				'point_html' : '景点in',
				'check_html' : 'produSceiCheck'
			},
			'scenticOut' : {
				'point_html' : '景点out',
				'check_html' : 'produSceoCheck'
			},
			'hospitalIn' : {
				'point_html' : '医院in',
				'check_html' : 'produHosiCheck'
			},
			'hospitalOut' : {
				'point_html' : '医院Out',
				'check_html' : 'produHosoCheck'
			},
			'transportIn' : {
				'point_html' : '火车站/飞机场in',
				'check_html' : 'produTraiCheck'
			},
			'transportOut' : {
				'point_html' : '火车站/飞机场Out',
				'check_html' : 'produTraoCheck'
			}
		}
	module.exports = data;
})