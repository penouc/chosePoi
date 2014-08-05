

var myAjax = {

	xhr: window.XMLHttpRequest ? new XMLHttpRequest(): new ActiveXObject('Microsoft.XMLHTTP'),
	get: function(url, callback){
		this.xhr.open('get',url);
		this.onreadystatechange(callback,this.xhr);
		this.xhr.send(null);
	},
	post: function(url,data,callback){
		this.xhr.open('post',url);
		this.xhr.setRequestHeader('Content-Type','application/json');
		this.onreadystatechange(callback,this.xhr);
		this.xhr.send(data);
	},
	onreadystatechange: function(func, _xhr){
		_xhr.onreadystatechange = function(){
			if(_xhr.readyState == 4){
				if (_xhr.status == 200 || _xhr.status >=300) {
					func(_xhr.responseText);
				}
			}
		}
	}
}