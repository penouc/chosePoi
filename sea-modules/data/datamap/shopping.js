define(function(require,exports,module){
	var shopping = {
		'name'            : 'shopping',
		'point_html'      : '商超人群',
		'check_html'      : 'produShoppingCheck',
		'points'    	  :  require('data/point/shopping/shopping_points'),
		'cluster_points'  :  require('data/point/shopping/shopping_center'),
		'sample_points'   :  require('data/point/shopping/shopping_sample_points')
	}
module.exports = shopping;
})