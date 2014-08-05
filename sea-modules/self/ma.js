
//自定义marker
function ComplexCustomOverlay(point, text, mouseoverText){
  this._point = point;
  this._text = text;
  this._overText = mouseoverText;
}

function ComplexCustomOverlay(point,color){
  this._point = point;
  this._color = color;
}
ComplexCustomOverlay.prototype = new BMap.Overlay();
ComplexCustomOverlay.prototype.initialize = function(map){
  this._map = map;
  var div = this._div = document.createElement("div");
  div.style.position = "absolute";
  div.style.height = "5px";
  div.style.width = "5px";
  div.style.borderRadius = "5px"
  div.style.backgroundColor= this._color;
  div.style.opacity = '.5';
  map.getPanes().labelPane.appendChild(div);
  map.getPanes().labelPane.style.zIndex = '-999';
  return div;
}
ComplexCustomOverlay.prototype.draw = function(){
  var map = this._map;
  var pixel = map.pointToOverlayPixel(this._point);
  this._div.style.left = pixel.x  -3 + "px";
  this._div.style.top  = pixel.y - 10 + "px";
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var json = [],
    jsonMarkers = [];

var getRandomColor = function(){ 
    return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).substr(-6); 
}

var colors = {
      setColor : function(){
        for(var prop in configures){
          this[prop] = [];
          for(var i = 0 ; i < configures[prop]['checkPoints'].length; i++){
            this[prop].push(getRandomColor());
          }
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var poiFunc = {

    getAllComplOverlay : function(samplePoi,flg,index){                                          //增加复杂各种颜色麻点
        var arr =[],
            currenColor = '';
        var json = [],
            jsonMarkers = [];

        if(arguments.length == 3){
          var currencomplArr = samplePoi[index].locations,
              len = samplePoi[index].locations.length,
              currenColor = colors[flg][index];
          
            for(var i = 0; i < len; i++){
                var complOverlay = new ComplexCustomOverlay(new BMap.Point(currencomplArr[i].locx,currencomplArr[i].locy),currenColor);
                arr.push(complOverlay);
            }   
          }
        if(arguments.length == 2){
              var len = samplePoi.length,
                  samType = Object.prototype.toString.call(samplePoi[0]).slice(8,-1),
                  currenColor = colors[flg];

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
            })(arr[idx],idx), 1); 
            idx ++;
        }
    },


    addOver : function (item, itemIdx) {
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

    checkFactory : function() {
        for(var prop in configures){
            var proEle = configures[prop]['checkName'],
                points = configures[prop]['checkPoints'],
                checkEle = configures[prop]['Area'],
                ps = configures[prop]['content'];

          $('#'+proEle).html(function(){                                   //生成的大坨点
          var comd = '';
          for (var i = 1 ;i <= points.length ; i++) {
            if(i<10){
              str = "<p>" + i + ":<input type='checkbox' id='"+ checkEle + i + "' >&nbsp;"+ (points[i-1].number)+"</p>";
            }else{
              str = "<p>" + i + ":<input type='checkbox' id='"+ checkEle + i + "' >&nbsp;"+ (points[i-1].number)+"</p>";
            }
            comd += str;
          };
          return ps +":" + comd;
        })
      }
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
    }

}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//事件们

$('.ui.checkbox').on('click',function(){
    var sclz =  this.firstElementChild.getAttribute('class'),
        flg = $('.active')['0'].getAttribute('data-tab'),
        currenArra = [],
        url = './images/cluster_small_blue.png';

    if(sclz == 'manJson'){
        var flgManArrstr = 'arr_'+ flg + '_man_point';
        currenArra = configures[flg]['chosenPoiMarker'];
        if(!currenArra.length || currenArra.length === 0){
          alert('请先点击右边‘载入’');
          throw '中断点击操作';
        }
    }
    if(sclz == 'cluster'){
        configures[flg]['clusterPoints'] = clusterPois[flg];
        currenArra = configures[flg]['clusterPoints'];
    }
    if(sclz == 'sample'){
        currenArra = configures[flg]['sampleMarkerArr'];
    }

    if (!this.firstElementChild.checked) {
        poiFunc.add_point(currenArra,poiFunc.addOver);
    }else{
        poiFunc.remove_point(currenArra);
    }
})

$('#addPoi').on('click',function(){                               //以下全都是选点的事件
    if (this.checked) {
        map.addEventListener('click',poiFunc.manualAddPoi)
    }
    else{
        map.removeEventListener('click',poiFunc.manualAddPoi)
    }
}); 

$('.ui.button').on('click',function(){
  var flg = $('.active')['0'].getAttribute('data-tab'),
      nameVal = this.getAttribute('name'),
      flgArrstr = flg + '_xuanzhi',
      flgManArrstr = 'arr_'+ flg + '_man_point',
      imgurl = "images/location_icon_" + flg + ".png";
      url = '',
      myDis = new BMapLib.DistanceTool(map);

  if (nameVal === 'load') {
      url = './mandata/'+ flgArrstr +'.js';
  }
  if(nameVal === 'reset'){
      url = './mandata/backup/'+ flgArrstr +'.js';
  }
  if (nameVal === 'measure') {
      myDis.open();
  };
  if(nameVal === null || nameVal === undefined){
      throw '先把button的name属性加上好不好.';
  }
  myAjax.get(url,function(data){
    tempArr = JSON.parse(data);
    configures[flg]['chosenPoiMarker'] = poiFunc.getMarker(tempArr,imgurl);
    poiFunc.setMarker(configures[flg]['chosenPoiMarker']);
  });
})

$('#saveJson').on('click',function(){
  poiFunc.output_xy();
  if (json.length === 0) {
    alert('请先选择点');
    return ;
  };
  var flg = $('.active')['0'].getAttribute('data-tab');
  var reaData = JSON.stringify(json) + flg;
  myAjax.post('',reaData,function(data){
  })
})

$('#clearPoi').on('click', function(){
  poiFunc.remove_point(jsonMarkers);
  $('#currentPoi').val('');
  json = [];
  jsonMarkers = [];
})


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var configures = {
    // 'home' : {
    //     'checkName'   : 'produHomeCheck',
    //     'checkPoints' : home_points,
    //     'Area'        : 'homArea',
    //     'content'     : '分块显示起点',
    //     'sampleMarkerArr' : [],
    //     'markerArr'   : [],
    //     'clusterPoints': [],
    //     'samplePoints' : home_sample_points,
    //     'chosenPoiMarker' : ''
    // },
    // 'company' : {
    //     'checkName'   : 'produCompCheck',
    //     'checkPoints' : company_points,
    //     'Area'        : 'comArea',
    //     'content'     : '分块显示终点',
    //     'sampleMarkerArr' : [],
    //     'markerArr'   : [],
    //     'clusterPoints': [],
    //     'samplePoints' : company_sample_points,
    //     'chosenPoiMarker' : ''
    // },
    'business' : {
        'checkName'   : 'produBizzCheck',
        'checkPoints' : business_points,
        'Area'        : 'bizArea',
        'content'     : '分块显示商务点',
        'sampleMarkerArr' : [],
        'markerArr'   : [],
        'clusterPoints': [],
        'samplePoints' : business_sample_points,
        'chosenPoiMarker' : ''
    },
    'shoppingIn' : {
        'checkName'   : 'produShoiCheck',
        'checkPoints' : shopping_in_points,
        'Area'        : 'spiArea',
        'content'     : '分块显示商店in点',
        'markerArr'   : [],
        'sampleMarkerArr' : [],
        'clusterPoints': [],
        'samplePoints' : shopping_in_sample_points,
        'chosenPoiMarker' : ''
    },
    'shoppingOut' : {
        'checkName'   : 'produShooCheck',
        'checkPoints' : shopping_out_points,
        'Area'        : 'shoArea',
        'content'     : '分块显示商店out点',
        'sampleMarkerArr' : [],
        'markerArr'   : [],
        'clusterPoints': [],
        'samplePoints' : shopping_out_sample_points,
        'chosenPoiMarker' : ''
    },
    'scenticIn' : {
        'checkName'   : 'produSceiCheck',
        'checkPoints' : scentic_in_points,
        'Area'        : 'sciArea',
        'content'     : '分块显示景点in点',
        'markerArr'   : [],
        'sampleMarkerArr' : [],
        'clusterPoints': [],
        'samplePoints' : scentic_in_sample_points,
        'chosenPoiMarker' : ''
    },
    'scenticOut' : {
        'checkName'   : 'produSceoCheck',
        'checkPoints' : scentic_out_points,
        'Area'        : 'scoArea',
        'content'     : '分块显示景点out点',
        'sampleMarkerArr' : [],
        'markerArr'   : [],
        'clusterPoints': [],
        'samplePoints' : scentic_out_sample_points,
        'chosenPoiMarker' : ''
      },
    'hospitalIn' : {
        'checkName'   : 'produHosiCheck',
        'checkPoints' : hospital_in_points,
        'Area'        : 'hsiArea',
        'content'     : '分块显示医院in点',
        'markerArr'   : [],
        'sampleMarkerArr' : [],
        'clusterPoints': [],
        'samplePoints' : hospital_in_sample_points,
        'chosenPoiMarker' : ''
    },
    'hospitalOut' : {
        'checkName'   : 'produHosoCheck',
        'checkPoints' : hospital_out_points,
        'Area'        : 'hsoArea',
        'content'     : '分块显示医院out点',
        'sampleMarkerArr' : [],
        'markerArr'   : [],
        'clusterPoints': [],
        'samplePoints' : hospital_out_sample_points,
        'chosenPoiMarker' : ''
      },
    'transportIn' : {
        'checkName'   : 'produTraiCheck',
        'checkPoints' : transport_in_points,
        'Area'        : 'tsiArea',
        'content'     : '分块显示交通in点',
        'markerArr'   : [],
        'sampleMarkerArr' : [],
        'clusterPoints': [],
        'samplePoints' : transport_in_sample_points,
        'chosenPoiMarker' : ''
    },
    'transportOut' : {
        'checkName'   : 'produTraoCheck',
        'checkPoints' : transport_out_points,
        'Area'        : 'tsoArea',
        'content'     : '分块显示交通out点',
        'sampleMarkerArr' : [],
        'markerArr'   : [],
        'clusterPoints': [],
        'samplePoints' : transport_out_sample_points,
        'chosenPoiMarker' : ''
      },
    'ondutyIn' : {
        'checkName'   : 'produOndiCheck',
        'checkPoints' : home_points_new,
        'Area'        : 'hwiArea',
        'content'     : '分块显示上班in点',
        'markerArr'   : [],
        'sampleMarkerArr' : [],
        'clusterPoints': [],
        'samplePoints' : home_sample_points_new,
        'chosenPoiMarker' : ''
    },
    'ondutyOut' : {
        'checkName'   : 'produOndoCheck',
        'checkPoints' : company_points_new,
        'Area'        : 'cwoArea',
        'content'     : '分块显示上班out点',
        'sampleMarkerArr' : [],
        'markerArr'   : [],
        'clusterPoints': [],
        'samplePoints' : company_sample_points_new,
        'chosenPoiMarker' : ''
    }
}

poiFunc.checkFactory();
colors.setColor();
poiFunc.putArrToMarker();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var loopAddCheckEvent = function(){
  for(var prop in configures){
    var totalArr = configures[prop]['checkPoints'],
        area = configures[prop]['Area'];

        (function(propp){
                      return function(){

                        for(var i = 0 ;i < totalArr.length ; i++){
                            var currenCheck = "#"+ area + (i+1);

                            $(currenCheck).parent().css('color',colors[propp][i]);

                              $(currenCheck).on('click',function(e){
                                  var ind = this.id.slice(7),
                                      markerArra = configures[propp]['markerArr'];
                                  if (this.checked) {
                                      poiFunc.add_point(markerArra[ind-1],poiFunc.addOver);
                                  }else{
                                      poiFunc.remove_point(markerArra[ind-1]);
                                }
                              })
                        }

                    }
              })(prop)()

  }
}

$(document).ready(function() {

  $('.demo.menu .item').tab();

  $('.ui.checkbox').checkbox();

  loopAddCheckEvent();
})

var clusterPois = {
  // 'home'       : poiFunc.getMarker(home_cluster_points,'images/cluster_small.png'),
  // 'company'    : poiFunc.getMarker(company_cluster_points,'images/cluster_small_red.png'),
  'business'   : poiFunc.getMarker(business_cluster_points,'images/cluster_small_blue.png'),
  'shoppingIn' : poiFunc.getMarker(shopping_in_cluster_points,'images/cluster_small.png'),
  'shoppingOut': poiFunc.getMarker(shopping_out_cluster_points,'images/cluster_small_blue.png'),
  'scenticIn'  : poiFunc.getMarker(scentic_in_cluster_points,'images/cluster_small_red.png'),
  'scenticOut' : poiFunc.getMarker(scentic_out_cluster_points,'images/cluster_small.png'),
  'hospitalIn' : poiFunc.getMarker(hospital_in_cluster_points,'images/cluster_small.png'),
  'hospitalOut': poiFunc.getMarker(hospital_out_cluster_points,'images/cluster_small_blue.png'),
  'transportIn' : poiFunc.getMarker(transport_in_cluster_points,'images/cluster_small.png'),
  'transportOut': poiFunc.getMarker(transport_out_cluster_points,'images/cluster_small_blue.png'),
  'ondutyIn'    : poiFunc.getMarker(home_cluster_points_new,'images/cluster_small_red.png'),
  'ondutyOut'   : poiFunc.getMarker(company_cluster_points_new,'images/cluster_small.png')
}
