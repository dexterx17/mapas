 var viewer = new Cesium.Viewer('cesiumContainer',{timeline:false, baseLayerPicker : false});
 
var scene = viewer.scene;
var handler;

//Enable lighting based on sun/moon positions
viewer.scene.globe.enableLighting = true;

//Use STK World Terrain
viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
    url : 'https://assets.agi.com/stk-terrain/v1/tilesets/world/tiles',
    requestWaterMask : true,
    requestVertexNormals : true
});

var imageryLayers = viewer.imageryLayers;

var viewModel = {
    layers : [],
    baseLayers : [],
    upLayer : null,
    downLayer : null,
    selectedLayer : null,
    isSelectableLayer : function(layer) {
        return baseLayers.indexOf(layer) >= 0;
    },
    raise : function(layer, index) {
        imageryLayers.raise(layer);
        viewModel.upLayer = layer;
        viewModel.downLayer = viewModel.layers[Math.max(0, index - 1)];
        updateLayerList();
        window.setTimeout(function() { viewModel.upLayer = viewModel.downLayer = null; }, 10);
    },
    lower : function(layer, index) {
        imageryLayers.lower(layer);
        viewModel.upLayer = viewModel.layers[Math.min(viewModel.layers.length - 1, index + 1)];
        viewModel.downLayer = layer;
        updateLayerList();
        window.setTimeout(function() { viewModel.upLayer = viewModel.downLayer = null; }, 10);
    },
    canRaise : function(layerIndex) {
        return layerIndex > 0;
    },
    canLower : function(layerIndex) {
        return layerIndex >= 0 && layerIndex < imageryLayers.length - 1;
    }
};
Cesium.knockout.track(viewModel);

var baseLayers = viewModel.baseLayers;

function setupLayers() {
    // Create all the base layers that this example will support.
    // These base layers aren't really special.  It's possible to have multiple of them
    // enabled at once, just like the other layers, but it doesn't make much sense because
    // all of these layers cover the entire globe and are opaque.
    addBaseLayerOption(
            'Foto Aerea de Bing Maps',
            undefined); // the current base layer
    addBaseLayerOption(
            'Bing Maps Road',
            new Cesium.BingMapsImageryProvider({
                url: '//dev.virtualearth.net',
                mapStyle: Cesium.BingMapsStyle.ROAD
            }));
    addBaseLayerOption(
            'ArcGIS World Street Maps',
            new Cesium.ArcGisMapServerImageryProvider({
                url : '//server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
            }));
    addBaseLayerOption(
            'Ortofoto Tungurahua',
            new Cesium.WebMapServiceImageryProvider({
                url : 'http://mapas.tungurahua.gob.ec/base',
                layers : 'ortofoto',
                enablePickFeature:false,
                getFeatureInfoAsXml:false, //deshabilitar petición info_formt xml
                getFeatureInfoAsGeoJson:false //deshabilitar petición info_formt geojson
            }));

    // Create the additional layers
    addAdditionalLayerOption(
            'Division Provincial',
               new Cesium.WebMapServiceImageryProvider({
                  url : 'http://mapas.tungurahua.gob.ec/base',
                  layers : 'DivisionProvincial',
                  parameters : {
                      transparent:true,
                      format : 'image/png',
                  },
                  getFeatureInfoParameters:{
                    info_format:"application/geojson"
                  },
                  getFeatureInfoAsXml:false,
                  getFeatureInfoAsGeoJson:true,
              }),0.5,false);

    addAdditionalLayerOption(
            'Cantones',
               new Cesium.WebMapServiceImageryProvider({
                  url : 'http://mapas.tungurahua.gob.ec/base',
                  layers : 'tungurahuacantones',
                  parameters : {
                      transparent:true,
                      format : 'image/png',
                  },
                  getFeatureInfoParameters:{
                    info_format:"application/geojson"
                  },
                  getFeatureInfoAsXml:false,
                  getFeatureInfoAsGeoJson:true,
              }),0.5,false);

    addAdditionalLayerOption(
            'Parroquias',
               new Cesium.WebMapServiceImageryProvider({
                  url : 'http://mapas.tungurahua.gob.ec/base',
                  layers : 'parroquias',
                  parameters : {
                      transparent:true,
                      format : 'image/png',
                  },
                  getFeatureInfoParameters:{
                    info_format:"application/geojson"
                  },
                  getFeatureInfoAsXml:false,
                  getFeatureInfoAsGeoJson:true,
              }),0.5,false);

    addAdditionalLayerOption(
            'Poblados',
               new Cesium.WebMapServiceImageryProvider({
                  url : 'http://mapas.tungurahua.gob.ec/base',
                  layers : 'Poblados',
                  parameters : {
                      transparent:true,
                      format : 'image/png',
                  },
                  getFeatureInfoParameters:{
                    info_format:"application/geojson"
                  },
                  getFeatureInfoAsXml:false,
                  getFeatureInfoAsGeoJson:true,
              }),0.5,false);

    addAdditionalLayerOption(
            'Rios Principales',
               new Cesium.WebMapServiceImageryProvider({
                  url : 'http://mapas.tungurahua.gob.ec/base',
                  layers : 'RiosPrincipales',
                  parameters : {
                      transparent:true,
                      format : 'image/png',
                  },
                  getFeatureInfoParameters:{
                    info_format:"application/geojson"
                  },
                  getFeatureInfoAsXml:false,
                  getFeatureInfoAsGeoJson:true,
              }),0.5,false);
    
    addAdditionalLayerOption(
            'Rios Limites',
               new Cesium.WebMapServiceImageryProvider({
                  url : 'http://mapas.tungurahua.gob.ec/base',
                  layers : 'RiosLimites',
                  parameters : {
                      transparent:true,
                      format : 'image/png',
                  },
                  getFeatureInfoParameters:{
                    info_format:"application/geojson"
                  },
                  getFeatureInfoAsXml:false,
                  getFeatureInfoAsGeoJson:true,
              }),0.5,false);

    addAdditionalLayerOption(
            'Rios',
               new Cesium.WebMapServiceImageryProvider({
                  url : 'http://mapas.tungurahua.gob.ec/base',
                  layers : 'Rios',
                  parameters : {
                      transparent:true,
                      format : 'image/png',
                  },
                  getFeatureInfoParameters:{
                    info_format:"application/geojson"
                  },
                  getFeatureInfoAsXml:false,
                  getFeatureInfoAsGeoJson:true,
              }),0.5,false);

    addAdditionalLayerOption(
        'Cuerpos de Agua',
           new Cesium.WebMapServiceImageryProvider({
              url : 'http://mapas.tungurahua.gob.ec/base',
              layers : 'CuerposdeAgua',
              parameters : {
                  transparent:true,
                  format : 'image/png',
              },
              getFeatureInfoParameters:{
                info_format:"application/geojson"
              },
              getFeatureInfoAsXml:false,
              getFeatureInfoAsGeoJson:true,
          }),0.5,false);
        
    addAdditionalLayerOption(
            'Embalses',
               new Cesium.WebMapServiceImageryProvider({
                  url : 'http://mapas.tungurahua.gob.ec/base',
                  layers : 'Embalses',
                  parameters : {
                      transparent:true,
                      format : 'image/png',
                  },
                  getFeatureInfoParameters:{
                    info_format:"application/geojson"
                  },
                  getFeatureInfoAsXml:false,
                  getFeatureInfoAsGeoJson:true,
              }),0.5,false);

    addAdditionalLayerOption(
            'Vias',
               new Cesium.WebMapServiceImageryProvider({
                  url : 'http://mapas.tungurahua.gob.ec/base',
                  layers : 'Vias',
                  parameters : {
                      transparent:true,
                      format : 'image/png',
                  },
                  getFeatureInfoParameters:{
                    info_format:"application/geojson"
                  },
                  getFeatureInfoAsXml:false,
                  getFeatureInfoAsGeoJson:true,
              }),0.5,false);

   
    /*addAdditionalLayerOption(
            'Grid',
            new Cesium.GridImageryProvider(), 1.0, false);
    addAdditionalLayerOption(
            'Tile Coordinates',
            new Cesium.TileCoordinatesImageryProvider(), 1.0, false);*/
}

function addBaseLayerOption(name, imageryProvider) {
    var layer;
    if (typeof imageryProvider === 'undefined') {
        layer = imageryLayers.get(0);
        viewModel.selectedLayer = layer;
    } else {
        layer = new Cesium.ImageryLayer(imageryProvider);
    }

    layer.name = name;
    baseLayers.push(layer);
}

function addAdditionalLayerOption(name, imageryProvider, alpha, show) {
    var layer = imageryLayers.addImageryProvider(imageryProvider);
    layer.alpha = Cesium.defaultValue(alpha, 0.5);
    layer.show = Cesium.defaultValue(show, true);
    layer.name = name;
    Cesium.knockout.track(layer, ['alpha', 'show', 'name']);
}

function updateLayerList() {
    var numLayers = imageryLayers.length;
    viewModel.layers.splice(0, viewModel.layers.length);
    for (var i = numLayers - 1; i >= 0; --i) {
        viewModel.layers.push(imageryLayers.get(i));
    }
}

setupLayers();
updateLayerList();

//Bind the viewModel to the DOM elements of the UI that call for it.
var toolbar = document.getElementById('toolbar');
Cesium.knockout.applyBindings(viewModel, toolbar);

Cesium.knockout.getObservable(viewModel, 'selectedLayer').subscribe(function(baseLayer) {
    // Handle changes to the drop-down base layer selector.
    var activeLayerIndex = 0;
    var numLayers = viewModel.layers.length;
    for (var i = 0; i < numLayers; ++i) {
        if (viewModel.isSelectableLayer(viewModel.layers[i])) {
            activeLayerIndex = i;
            break;
        }
    }
    var activeLayer = viewModel.layers[activeLayerIndex];
    var show = activeLayer.show;
    var alpha = activeLayer.alpha;
    imageryLayers.remove(activeLayer, false);
    imageryLayers.add(baseLayer, numLayers - activeLayerIndex - 1);
    baseLayer.show = show;
    baseLayer.alpha = alpha;
    updateLayerList();
});

// CAUTION: Only disable iframe sandbox if the descriptions come from a trusted source.
viewer.infoBox.frame.setAttribute('sandbox', 'allow-same-origin allow-popups allow-forms allow-scripts allow-top-navigation');

var url_info ="";
viewer.infoBox.frame.addEventListener('load', function() {
    //
    // Now that the description is loaded, register a click listener inside
    // the document of the iframe.
    //
    viewer.infoBox.frame.contentDocument.body.addEventListener('click', function(e) {
        //
        // The document body will be rewritten when the selectedEntity changes,
        // but this body listener will survive.  Now it must determine if it was
        // one of the clickable buttons.
        //
        console.log('click');
        console.log(e.target);        

        if (e.target && e.target.className === 'btn consultar_datos_estacion') {
            var estacion_id = e.target.getAttribute("estacion");
            url_info = "http://127.0.0.1/rrnn/red/estaciones/asistente/"+estacion_id+"/consulta";
            $('#myModal').modal('show');

        }
    }, false);
}, false);

$('#myModal').on('show.bs.modal', function (event) {
    var modal = $(this);
    $.get(url_info,function(data){
        if(data!=''){
            modal.find('.modal-content').html(data);
        }else{
            $('#detalles_estacion').html('<div class="alert alert-danger">Establece el código de la estación</div>');
        }
    },'html');

});

var frame = viewer.infoBox.frame;

frame.addEventListener('load', function () {
    var cssLink = frame.contentDocument.createElement('link');
    cssLink.href = Cesium.buildModuleUrl('http://127.0.0.1/mapas/3d/infobox.css');
    cssLink.rel = 'stylesheet';
    cssLink.type = 'text/css';
    frame.contentDocument.head.appendChild(cssLink);
}, false);

//Enable depth testing so things behind the terrain disappear.
viewer.scene.globe.depthTestAgainstTerrain = true;

//Set the random number seed for consistent results.
Cesium.Math.setRandomNumberSeed(3);

var west = -79.55337524414064;
var south = -1.6724309149453698;
var east = -77.67745971679689;
var north = -0.8486628140085705;

var rectangle = Cesium.Rectangle.fromDegrees(west, south, east, north);

// Mouse over the globe to see the cartographic position
handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
handler.setInputAction(function(movement) {
    var cartesian = viewer.camera.pickEllipsoid(movement.endPosition, scene.globe.ellipsoid);
    if (cartesian) {
        var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(7);
        var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(7);
        $('#coords').html(longitudeString+" , "+latitudeString);
    }
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

var handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas, false);
handler.setInputAction(
  function(movement) {
    
      var ray = viewer.camera.getPickRay(movement.endPosition);
      var position = viewer.scene.globe.pick(ray, viewer.scene);
      if (Cesium.defined(position)) {
          var positionCartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position);
          $('#alturas').html( ' :: '+positionCartographic.height.toFixed(2)+' msnm');
      }
  },
  Cesium.ScreenSpaceEventType.MOUSE_MOVE
);

var origin_location = {
  lat :   -78.57,
  lng : -1.9,
  altura : 45000,
  heading : 0,
  pitch : -35,
  roll : 0,
  duration: 4
};

var lat = $('#lat').val(origin_location.lat);
var lng = $('#lng').val(origin_location.lng);
var altura = $('#altura').val(origin_location.altura);
var heading = $('#heading').val(origin_location.heading);
var pitch = $('#pitch').val(origin_location.pitch);
var roll = $('#roll').val(origin_location.roll);
var duration = $('#duration').val(origin_location.duration);

viewer.camera.flyTo({
  destination : Cesium.Cartesian3.fromDegrees(origin_location.lat, origin_location.lng, origin_location.altura),
  orientation : {
      heading : Cesium.Math.toRadians(origin_location.heading),
      pitch : Cesium.Math.toRadians(origin_location.pitch),
      roll : origin_location.roll
  },
  duration: origin_location.duration,
  complete:function(){
      load_stations();
  }
});

$(document).on('click','#flyto',function(){
  var lat = $('#lat').val();
  var lng = $('#lng').val();
  var altura = $('#altura').val();
  var heading = $('#heading').val();
  var pitch = $('#pitch').val();
  var roll = $('#roll').val();
  var duration = $('#duration').val();

  viewer.camera.flyTo({
    destination : Cesium.Cartesian3.fromDegrees(lat, lng, altura),
    orientation : {
        heading : Cesium.Math.toRadians(heading),
        pitch : Cesium.Math.toRadians(pitch),
        roll : roll
    }
    ,
   // maximumHeight:10000,
    complete:function(){
        load_stations();
    }
  });
});

var mixtas = viewer.entities.add(new Cesium.Entity());

var url_stations = 'http://rrnn.tungurahua.gob.ec/red/Ws_red/stations';
var url_stations = 'http://127.0.0.1/rrnn/red/Ws_red/stations';

var pinBuilder = new Cesium.PinBuilder();


function ficha_estacion(dato){
    var result = '<div class="panel panel-default"><div class="panel-heading text-center">';
    result += '<img class="estacion-img" src="http://127.0.0.1/mapas/imgs/estacion.jpeg" height="250" /></div>';
    result += '<div class="panel-body">';
    result += '<table class="table table-hover table-responsive"><tbody>';
    result += '<tr><th>Ubicación:</th><td>'+dato.canton+' <small>'+dato.parroquia+'</small></td></tr>';
    result += '<tr><td class="text-center" colspan="2">'+dato.direccion+'</td></tr>';
    result += '<tr><th>Microcuenca:</th><td>'+dato.microcuenca+'</td></tr>';
    result += '<tr><th>Altitud:</th><td>'+dato.altitud+' msnm.</td></tr>';
    result += '<tr><td class="text-justify" colspan="2">'+dato.descripcion+'</td></tr></tbody><tfoot>';
    result += '<tr><td colspan="2"><a href="http://rrnn.tungurahua.gob.ec/red/estaciones/estacion/'+dato._id +'" class="btn btn-block" estacion="'+dato._id+'" target="_blank">Ver información completa</a></td></tr>';
    result += '</tfoot></table>';
    result += '</div><div class="panel-footer">';
    result += 'Estación '+dato.tipo;
    result += '</div></div>'
    return result;
}


function load_stations(){

    $.get(url_stations,function(data){
        console.log(data.length);
        for (var i = 0; i < data.length; i++) {
            var dato = data[i];
            if( typeof dato.lat !=="undefined" && typeof dato.lng !=="undefined" && typeof dato.altitud  !=="undefined"){
            console.log('--------------------------------------------------------');
            console.log(dato);
            console.log(dato.lat + ' , ' + dato.lng+ ' : ' + dato.altitud);
                var altura;

                if(typeof dato.altitud === "undefined")
                    altura = 4500;
                else
                    altura = dato.altitud;

                var punto = new Cesium.Cartesian3.fromDegrees(dato.lng, dato.lat, altura);
                var punto_alto = new Cesium.Cartesian3.fromDegrees(dato.lng, dato.lat , 5500);
                //var time = Cesium.JulianDate.addSeconds(start, i, new Cesium.JulianDate());
                //ruta_mixtas.addSample(time, punto_alto);
                /*viewer.entities.add({
                    name: dato.nombre,
                    //description: infoEstacionMixta(feature.properties),
                    parent: mixtas,
                    position: punto,
                    //position: punto_alto,
                    ellipsoid: {
                        radii: new Cesium.Cartesian3(250, 250, 250),
                        material: Cesium.Color.RED.withAlpha(0.50)
                    }
                });*/

                var color;
                var icono;
                if(dato.tipo === "meteorologica"){
                    color = pinBuilder.fromColor(Cesium.Color.RED, 24).toDataURL();
                    icono =  'http://127.0.0.1/mapas/imgs/meteorologica.png';
                   $('#meteorologicas').append('<li><i class="fa fa-eye"></i>'+dato.nombre+'<span class="pull-right badge">'+dato.codigo+'</span></li>');
                   
                }else{
                   $('#hidrometricas').append('<li><i class="fa fa-eye"></i>'+dato.nombre+'<span class="pull-right badge">'+dato.codigo+'</span></li>');
                    icono =  'http://127.0.0.1/mapas/imgs/hidrometrica.png';
                    color = pinBuilder.fromColor(Cesium.Color.ROYALBLUE, 24).toDataURL();
                }

                var bluePin = viewer.entities.add({
                    name : dato.nombre,
                    position : punto,
                    description:ficha_estacion(dato),
                    billboard : {
                        image : icono,
                        width : 64,
                        height : 64,
                        verticalOrigin : Cesium.VerticalOrigin.BOTTOM
                    },
                    label : {
                        text : dato.codigo,
                        font : '12pt monospace',
                        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                        outlineWidth : 2,
                        verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
                        pixelOffset : new Cesium.Cartesian2(0, -9)
                    }
                });



            }

        }
    },'json');

    
}

/*
var meteorologicas = viewer.entities.add(new Cesium.Entity());
var ruta_meteorologicas = new Cesium.SampledPositionProperty();
var n_meteorologicas = 0;
$.getJSON("../mapas/Tmeteorologia.geojson", function(data) {
    var features = data.features;
    for (var i = 0; i < features.length; i++, n_meteorologicas++) {
        var feature = features[i];
        var coordenadas = feature.geometry.coordinates;
        var altura = feature.properties.Cota;
        console.log('==========================================');
        console.log(coordenadas[0] + ' , '+ coordenadas[1] + ' : ' + altura);
        var punto = new Cesium.Cartesian3.fromDegrees(coordenadas[0], coordenadas[1], altura);
        //if(altura <= 0)
        var punto_alto = new Cesium.Cartesian3.fromDegrees(coordenadas[0], coordenadas[1], 4200);
        //var time = Cesium.JulianDate.addSeconds(start, i * 100, new Cesium.JulianDate());
        //ruta_meteorologicas.addSample(time, punto_alto);
        viewer.entities.add({
            name: feature.properties.NOMBRE,
            description: infoEstacionMeteorologica(feature.properties),
            parent: meteorologicas,
            position: punto,
            ellipsoid: {
                radii: new Cesium.Cartesian3(250, 250, 250),
                material: Cesium.Color.RED.withAlpha(0.75)
            }
        });
    };
});


var ruta_mixtas = new Cesium.SampledPositionProperty();
var n_mixtas = 0;
$.getJSON("../mapas/TestacionesMixtas.geojson", function(data) {
    var features = data.features;
    for (var i = 0; i < features.length; i++, n_mixtas++) {
        var feature = features[i];
        var coordenadas = feature.geometry.coordinates;
        var altura = feature.properties.Cota;
        var punto = new Cesium.Cartesian3.fromDegrees(coordenadas[0], coordenadas[1], altura);
        var punto_alto = new Cesium.Cartesian3.fromDegrees(coordenadas[0], coordenadas[1], 4200);
        //var time = Cesium.JulianDate.addSeconds(start, i, new Cesium.JulianDate());
        //ruta_mixtas.addSample(time, punto_alto);
        viewer.entities.add({
            name: feature.properties.Nombre,
            description: infoEstacionMixta(feature.properties),
            parent: mixtas,
            position: punto,
            ellipsoid: {
                radii: new Cesium.Cartesian3(250, 250, 250),
                material: Cesium.Color.BLACK.withAlpha(0.25)
            }
        });
    };
});
var reglasLimnimetricas = viewer.entities.add(new Cesium.Entity());
var ruta_limnimetrica = new Cesium.SampledPositionProperty();
var n_limnimetricas = 0;
$.getJSON("../mapas/TreglasLimnimetricas.geojson", function(data) {
    var features = data.features;
    for (var i = 0; i < features.length; i++, n_limnimetricas++) {
        var feature = features[i];
        var coordenadas = feature.geometry.coordinates;
        var altura = feature.properties.Cota;
        var punto = new Cesium.Cartesian3.fromDegrees(coordenadas[0], coordenadas[1], altura);
        var punto_alto = new Cesium.Cartesian3.fromDegrees(coordenadas[0], coordenadas[1], 4200);
        //var time = Cesium.JulianDate.addSeconds(start, i * 100, new Cesium.JulianDate());
        //ruta_limnimetrica.addSample(time, punto_alto);
        viewer.entities.add({
            name: feature.properties.Nombre,
            description: infoEstacionMixta(feature.properties),
            parent: reglasLimnimetricas,
            position: punto,
            ellipsoid: {
                radii: new Cesium.Cartesian3(250, 250, 250),
                material: Cesium.Color.AQUA.withAlpha(0.25)
            }
        });
    };
});

*/