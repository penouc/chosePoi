define(function(require,exports,module){

  var ComplexCustomOverlay = require('self/ComplexCustomOverlay');

  var json = [],
      jsonMarkers = [],
      storage = window.localStorage;

  var poiFunc = {

    getAllComplOverlay : function(samplePoi,colors,index){                                          //增加复杂各种颜色麻点
        var arr =[],
            currenColor = '';

        if(arguments.length == 3){
          var currencomplArr = samplePoi[index].locations,
              len = samplePoi[index].locations.length,
              currenColor = colors[index];
          
            for(var i = 0; i < len; i++){
                var complOverlay = new ComplexCustomOverlay(new BMap.Point(currencomplArr[i].locx,currencomplArr[i].locy),currenColor);
                arr.push(complOverlay);
            }   
          }
        if(arguments.length == 2){
              var len = samplePoi.length,
                  samType = Object.prototype.toString.call(samplePoi[0]).slice(8,-1),
                  currenColor = colors;

              if(samType == 'Array'){
                for (var i = 0; i < len; i++){
                   var inn_len = samplePoi[i].length;
                   for(var j = 0; j < inn_len; j++){
                     var complOverlay = new ComplexCustomOverlay(new BMap.Point(samplePoi[i][j].locx,samplePoi[i][j].locy),currenColor[i]);
                     arr.push(complOverlay);
                   }
                  }
                }
              if (samType == 'Object') {
                for(var i = 0; i < len; i++){
                    var complOverlay = new ComplexCustomOverlay(new BMap.Point(samplePoi[i].locx,samplePoi[i].locy),color);
                    arr.push(complOverlay);
                }   
              }
        }
        return arr;
    },

    getMarker : function(cluster_name, image){           //获取覆盖物（即大头针）位置
        var arr = [];                                           
        var current_cluster = cluster_name;
        var len = current_cluster.length;

        if (arguments.length === 1) {
            for (var i = 0; i < len; i++) {
            var mMarker = new BMap.Marker(new BMap.Point(current_cluster[i].locx,current_cluster[i].locy));
            arr.push(mMarker);
          }
        }else{
            for (var i = 0; i < len; i++) {
                var pt = new BMap.Point(current_cluster[i].locx,current_cluster[i].locy);
                var myIcon = new BMap.Icon(image, new BMap.Size(50,60));
                var marker = new BMap.Marker(pt,{icon:myIcon,offset: new BMap.Size(15,10)});            // 创建标注
                //marker.setZIndex({zIndex:999999999});
                marker.enableDragging();
                arr.push(marker);
            }
        }
        return arr; 
    },

    manualAddPoi : function(e){                                    //手动选点事件程序
        jMarker = new BMap.Marker(e.point);
        jMarker.enableDragging();
        map.addOverlay(jMarker);
        jsonMarkers.push(jMarker);
        poiFunc.output_xy();
        jMarker.addEventListener('dragging',function(e){
          poiFunc.output_xy();
        })
        jMarker.addEventListener('dragend',function(ee){
          poiFunc.output_xy();
        })
    },

    output_xy : function(){
      var xys = '';
      json = [];
      for(var i = 0; i < jsonMarkers.length; i++){
        var jso = {locx:jsonMarkers[i].S.lng, locy:jsonMarkers[i].S.lat};
        json.push(jso);
      }
      xys = JSON.stringify(json);
      document.getElementById("currentPoi").value=xys;
    },


    // add_point : function(arr, callback){
    //   if( arr == null || arr.length == 0 || typeof(callback) != "function" )
    //         return;
             
    //   var idx = 0; 
    //   function step() {
    //     callback(arr[idx]);
    //     idx++;
    //     if (idx < arr.length) {
    //       requestAnimationFrame(step);
    //     }
    //   }
    //   requestAnimationFrame(step);
    // },

    add_point : function (arr, callback){                                          //异步放点
        if( arr == null || arr.length == 0 || typeof(callback) != "function" )
            return;
             
        var idx = 0; 
        while( idx < arr.length )
        {
            setTimeout((function(item, itemIdx){
                return function(){
                    callback(item, itemIdx);    
                };
            })(arr[idx],idx), 0); 
            idx ++;
        }
    },

    addOver : function (item) {
        map.addOverlay(item);
    },

    remove_point : function(arra){          //移除地图上的点
        var len = arra.length;

        for (var i = 0; i < len; i++) {
            map.removeOverlay(arra[i]);
        }
    },

    setMarker : function(arr){
        var len = arr.length;

        for (var i = 0; i < len; i++) {
            arr[i].enableDragging();
            jsonMarkers.push(arr[i]);
            arr[i].addEventListener('dragging',function(e){
              output_xy();
            })
            arr[i].addEventListener('dragend',function(ee){
              output_xy();
            })
        };

    },

    checkFactory : function(chef,points,ps,colors) {
        chef.html(function(){                                   //生成的大坨点
        var comd = '<p class="til"><span class="spleft"><a>&nbsp;&nbsp;id</a></span><span class="spright"><a>数据量</a></span><p>';
        for (var i = 1 ;i <= points.length ; i++) {
          if(i<10){
            str1 = "<p>&nbsp;&nbsp;" + i +":";
          }else{
            str1 = "<p>" + i  +":";
          }
          str2 = "<input class='poi' name='dyswitchy' data-size='mini' type='checkbox' checked data-pan='poi' data-no='" + i + "' >"+ (points[i-1].number)+"</p>";
          str = str1+str2;
          comd += str;
        };
        return ps +":" + comd;
      })
    },

    putArrToMarker : function(){
        for(var prop in configures){
        var disPoints = configures[prop]['checkPoints'],
            samplePoints = configures[prop]['samplePoints'];
          for(var i = 0; i < disPoints.length; i++){
            configures[prop]['markerArr'].push(poiFunc.getAllComplOverlay(disPoints,prop,i));  
        }
        configures[prop]['sampleMarkerArr'] = poiFunc.getAllComplOverlay(samplePoints,prop);
      }
    },

    clearPoi : function(){
      this.remove_point(jsonMarkers);
      json = [];
      jsonMarkers = [];
    },

    saveJson : function(localName){
      poiFunc.output_xy();
      if (json.length === 0) {
        alert('请先选择点');
        return ;
      };
      storage.setItem(localName,JSON.stringify(json));
    },

    load : function(localName){
      var tempArr = JSON.parse(storage.getItem(localName));
      return tempArr;
    }

  };

  module.exports = poiFunc;
})
