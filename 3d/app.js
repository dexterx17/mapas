 var viewer = new Cesium.Viewer('cesiumContainer');
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
        entity.label.text =
            'Lon: ' + ('   ' + longitudeString) + '\u00B0' +
            '\nLat: ' + ('   ' + latitudeString) + '\u00B0';
    } else {
        entity.label.show = false;
    }
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);


$(document).on('click','#flyto',function(){
  var lat = $('#lat').val();
  var lng = $('#lng').val();
  var altura = $('#altura').val();
  var heading = $('#heading').val();
  var pitch = $('#pitch').val();
  var roll = $('#roll').val();

  viewer.camera.flyTo({
    destination : Cesium.Cartesian3.fromDegrees(lat, lng, altura),
    orientation : {
        heading : Cesium.Math.toRadians(20.0),
        pitch : Cesium.Math.toRadians(-35.0),
        roll : 0.0
    }
  });
});

var mixtas = viewer.entities.add(new Cesium.Entity());
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
var meteorologicas = viewer.entities.add(new Cesium.Entity());
var ruta_meteorologicas = new Cesium.SampledPositionProperty();
var n_meteorologicas = 0;
$.getJSON("../mapas/Tmeteorologia.geojson", function(data) {
    var features = data.features;
    for (var i = 0; i < features.length; i++, n_meteorologicas++) {
        var feature = features[i];
        var coordenadas = feature.geometry.coordinates;
        var altura = feature.properties.Cota;
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