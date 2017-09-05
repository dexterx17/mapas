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
            'Bing Maps Aerial',
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
              }));

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
              }));

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
              }));

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
              }));

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
              }));
    
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
              }));

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
              }));

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
          }));
        
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
              }));

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
              }));

   
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


//Enable depth testing so things behind the terrain disappear.
viewer.scene.globe.depthTestAgainstTerrain = true;

//Set the random number seed for consistent results.
Cesium.Math.setRandomNumberSeed(3);

var entity = viewer.entities.add({
    label : {
        show : false,
        showBackground : true,
        font : '14px monospace',
        horizontalOrigin : Cesium.HorizontalOrigin.LEFT,
        verticalOrigin : Cesium.VerticalOrigin.TOP,
        pixelOffset : new Cesium.Cartesian2(15, 0)
    }
});

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
        entity.position = cartesian;
        entity.label.show = true;
        $('#x').html(cartesian.x);
        $('#y').html(cartesian.y);
        $('#z').html(cartesian.z);
        $('#coords').html(longitudeString+" , "+latitudeString);
        entity.label.text =
            'Lon: ' + ('   ' + longitudeString) + '\u00B0' +
            '\nLat: ' + ('   ' + latitudeString) + '\u00B0';
    } else {
        entity.label.show = false;
    }
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);



//$(document).on('click','#flyto',function(){
  var lat = $('#lat').val();
  var lng = $('#lng').val();
  var altura = $('#altura').val();
  var heading = $('#heading').val();
  var pitch = $('#pitch').val();
  var roll = $('#roll').val();

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
//});

var mixtas = viewer.entities.add(new Cesium.Entity());

//var url_stations = 'http://rrnn.tungurahua.gob.ec/red/Ws_red/stations';
var url_stations = 'http://172.16.3.69/job/red/Ws_red/stations';

var pinBuilder = new Cesium.PinBuilder();


function ficha_estacion(dato){
    var result = '<div class="panel panel-default"><div class="panel-heading">';
    result += '</div><div class="panel-body">';
    result += '<table class="table table-hover table-responsive">';
    result += '<tr><th>Ubicación:</th><td>'+dato.canton+' <small>'+dato.parroquia+'</small></td></tr>';
    result += '<tr><td class="text-center" colspan="2">'+dato.direccion+'</td></tr>';
    result += '<tr><th>Microcuenca:</th><td>'+dato.microcuenca+'</td></tr>';
    result += '<tr><th>Altitud:</th><td>'+dato.altitud+'</td></tr>';
    result += '<tr><td class="text-justify" colspan="2">'+dato.descripcion+'</td></tr>';
    result += '</table>';
    result += '</div><div class="panel-footer">';
    result += '<button type="button" id="consultar_datos_estacion">Grafica</button>';
    result += '</div></div>'
    return result;
}

viewer.infoBox.frame.removeAttribute('sandbox');

var frame = viewer.infoBox.frame;
frame.addEventListener('load', function () {
    var jsLink = frame.contentDocument.createElement('script');
    jsLink.src = Cesium.buildModuleUrl('http://172.16.3.69/mapas/bower_components/jquery/dist/jquery.js');
    jsLink.type = 'text/javascript';
    frame.contentDocument.head.appendChild(jsLink);

    var jsLink = frame.contentDocument.createElement('script');
    jsLink.src = Cesium.buildModuleUrl('http://172.16.3.69/mapas/3d/test.js');
    jsLink.type = 'text/javascript';
    frame.contentDocument.head.appendChild(jsLink);

}, false);

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
                   // icono = 
                   $('#meteorologicas').append('<li><i class="fa fa-eye"></i>'+dato.nombre+'<span class="pull-right badge">'+dato.codigo+'</span></li>');
                   
                }else{
                   $('#hidrometricas').append('<li><i class="fa fa-eye"></i>'+dato.nombre+'<span class="pull-right badge">'+dato.codigo+'</span></li>');
                    color = pinBuilder.fromColor(Cesium.Color.ROYALBLUE, 24).toDataURL();
                }

                var bluePin = viewer.entities.add({
                    name : dato.nombre,
                    position : punto,
                    description:ficha_estacion(dato),
                    billboard : {
                        image : color,
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