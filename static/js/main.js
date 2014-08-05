define(function(require,exports,module){
    var $ = require('jquery');
            require('jquery-add')($);
            require('bootstrap')($);
    		require('bootstrap-switch')($);

	var ArrTohtml = require('self/arrTohtml');
	$("[name='switchy']").bootstrapSwitch();
	require.async('data/datamap/work',function(work){
	  merge(work);
	}) 
	var tpl = document.getElementById('tpl_tab_pane').innerHTML;

	$('#myTab a').click(function(e) {
	  e.preventDefault();
	  $('#loading').show();
	  var flg = this.getAttribute('href').slice(1);
	  switch(flg){
		  case 'work':
			  require.async('data/datamap/work',function(work){
			  	merge(work);
			 }) 
			break;
	    case 'business':
	  	  require.async('data/datamap/business',function(business){
	  	  		merge(business);
	  	 }) 
	  	break;


		}
	});

	var merge = function(tabName){
		var arrt = new ArrTohtml(tabName);
		$('#loading').hide();
	 	var tab_html = tpl.replace(/\{point_name\}/g,tabName['point_html']).replace(/\{check_name\}/g,tabName['check_html']);
	 	$('#'+tabName['name']).html(tab_html);
	 	$("[name='dyswitchy']").bootstrapSwitch();
	 	arrt.datainit();
	 	var cheFac = $('#'+tabName['check_html']);
	 	arrt.addCheck(cheFac,'分块展示详细分布');
	 	$("[name='dyswitchy']").bootstrapSwitch();
	 	var allBtn = $('.btn'),
	 		localStorageName = tabName['name'] + 'Manual';
	 	arrt.btnAddEvent(allBtn,localStorageName);
	 	var allChe = $('.poi');
	 	arrt.switchAddEvent(allChe);
	}

})