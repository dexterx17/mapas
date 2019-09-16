function EstacionMixta(){
	this.id=0;
	this.nombre="";
	this.sector=0;
	this.fuente="";
	this.fuente2="";
	this.cota=0;
	this.cota_gps=0;
	this.caracteristicas="";
}

function infoEstacionMixta(properties){
	var tabla = '<table class="cesium-infoBox-defaultTable">';
	tabla += '<tr>';
	tabla += '<td>Sector</td>';
	tabla += '<td>'+properties.Sector+'</td>';
	tabla += '</tr>';
	tabla += '<tr>';
	tabla += '<td>Fuente</td>';
	tabla += '<td>'+properties.Fuente+'</td>';
	tabla += '</tr>';
	tabla += '<tr>';
	tabla += '<td>Cota</td>';
	tabla += '<td>'+properties.Cota+'</td>';
	tabla += '</tr>';
	tabla += '<tr>';
	tabla += '<td>Cota GPS</td>';
	tabla += '<td>'+properties.Cota_GPS+'</td>';
	tabla += '</tr>';
	tabla += '<tr>';
	tabla += '<td>Características</td>';
	tabla += '<td>'+(typeof (properties.caracteristicas)==="undefined") ? "":properties.caracteristicas+'</td>';
	tabla += '</tr>';
	tabla += '<tr>';
	tabla += '<td>Fuente 2</td>';
	tabla += '<td>'+properties.Fuente_2+'</td>';
	tabla += '</tr>';
	tabla += '</table>';
	return tabla;
}

EstacionMixta.prototype.init = function (properties){
	this.id=properties.Codigo;
	this.nombre = properties.Nombre;
	this.sector = properties.Sector;
	this.fuente=properties.Fuente;
	this.fuente2=properties.Fuente_2;
	this.cota=properties.Cota;
	this.cota_gps=properties.Cota_GPS;
	this.caracteristicas="";
}

EstacionMixta.prototype.infoTabla = function (){
	var tabla = '<table class="cesium-infoBox-defaultTable">';
	tabla += '<tr>';
	tabla += '<td>Sector</td>';
	tabla += '<td>'+this.sector+'</td>';
	tabla += '</tr>';
	tabla += '<tr>';
	tabla += '<td>Fuente</td>';
	tabla += '<td>'+this.fuente+'</td>';
	tabla += '</tr>';
	tabla += '<tr>';
	tabla += '<td>Cota</td>';
	tabla += '<td>'+this.cota+'</td>';
	tabla += '</tr>';
	tabla += '<tr>';
	tabla += '<td>Cota GPS</td>';
	tabla += '<td>'+this.cota_gps+'</td>';
	tabla += '</tr>';
	tabla += '<tr>';
	tabla += '<td>Características</td>';
	tabla += '<td>'+this.caracteristicas+'</td>';
	tabla += '</tr>';
	tabla += '<tr>';
	tabla += '<td>Fuente 2</td>';
	tabla += '<td>'+this.fuente2+'</td>';
	tabla += '</tr>';
	tabla += '</table>';
	return tabla;
}

EstacionMixta.prototype.infoRow = function(){
	var row = '<tr>';
	row += '<td>';
	row += '<button class="resaltar" estacion="'+this.id+'"><i class="fa fa-lg fa-eye"></i></button>';
	row += '<button class="sobrevuelo" estacion="'+this.id+'"><i class="fa fa-lg fa-plane"></i></button>';
	row += '</td>';
	row += '<td>'+this.nombre+'</td>';
	row += '<td>'+this.cota+'</td>';
	row += '<td>'+this.fuente+'</td>';
	row += '</tr>';
	return row;
}


function EstacionMeteorologica(){
	this.id=0;
	this.nombre="";
	this.sector=0;
	this.fuente="";
	this.fuente2="";
	this.cota=0;
	this.cota_gps=0;
	this.caracteristicas="";
}

function infoEstacionMeteorologica(properties){
	this.id=properties.CODIGO;
	this.nombre = properties.NOMBRE;
	this.canton = properties.Cantn;
	this.lugar=properties.LUGAR;
	this.cuenca=properties.Cuenca;
	this.cota=properties.Cota;
	this.propietario=properties.Propietari;
	this.observacion=properties.Observacio;
	this.tipo=properties.TIPO;
	this.parametros=properties.Parmetros;
	this.parametros2=properties.PARAMETROS;
	var tabla = '<table class="cesium-infoBox-defaultTable">';
	tabla += '<tr>';
	tabla += '<td>Cantón</td>';
	tabla += '<td>'+this.canton+'</td>';
	tabla += '</tr>';
	tabla += '<tr>';
	tabla += '<td>Lugar</td>';
	tabla += '<td>'+this.lugar+'</td>';
	tabla += '</tr>';
	tabla += '<tr>';
	tabla += '<td>Cuenca</td>';
	tabla += '<td>'+this.cuenca+'</td>';
	tabla += '</tr>';
	tabla += '<tr>';
	tabla += '<td>Cota</td>';
	tabla += '<td>'+this.cota+'</td>';
	tabla += '</tr>';
	tabla += '<tr>';
	tabla += '<td>Propietario</td>';
	tabla += '<td>'+this.propietario+'</td>';
	tabla += '</tr>';
	tabla += '<tr>';
	tabla += '<td>Observación</td>';
	tabla += '<td>'+this.observacion+'</td>';
	tabla += '</tr>';
	tabla += '<tr>';
	tabla += '<td>Tipo</td>';
	tabla += '<td>'+this.tipo+'</td>';
	tabla += '</tr>';
	tabla += '<tr>';
	tabla += '<td>Parametros</td>';
	tabla += '<td>'+this.parametros+ '('+this.parametros2+')</td>';
	tabla += '</tr>';
	tabla += '<tr>';
	tabla += '<td>Opciones</td>';
	tabla += '<td><span class="sobrevolar" entity="lol">Sobrevolar</span></td>';
	tabla += '</tr>';
	tabla += '</table>';
	return tabla;
}
EstacionMeteorologica.prototype.init = function (properties){
	this.id=properties.CODIGO;
	this.nombre = properties.NOMBRE;
	this.canton = properties.Cantn;
	this.lugar=properties.LUGAR;
	this.cuenca=properties.Cuenca;
	this.cota=properties.Cota;
	this.propietario=properties.Propietari;
	this.observacion=properties.Observacio;
	this.tipo=properties.TIPO;
	this.parametros=properties.Parmetros;
	this.parametros2=properties.PARAMETROS;
}

EstacionMeteorologica.prototype.infoTabla = function(){
	var tabla = '<table class="cesium-infoBox-defaultTable">';
	tabla += '<tr>';
	tabla += '<td>Cantón</td>';
	tabla += '<td>'+this.canton+'</td>';
	tabla += '</tr>';
	tabla += '<tr>';
	tabla += '<td>Lugar</td>';
	tabla += '<td>'+this.lugar+'</td>';
	tabla += '</tr>';
	tabla += '<tr>';
	tabla += '<td>Cuenca</td>';
	tabla += '<td>'+this.cuenca+'</td>';
	tabla += '</tr>';
	tabla += '<tr>';
	tabla += '<td>Cota</td>';
	tabla += '<td>'+this.cota+'</td>';
	tabla += '</tr>';
	tabla += '<tr>';
	tabla += '<td>Propietario</td>';
	tabla += '<td>'+this.propietario+'</td>';
	tabla += '</tr>';
	tabla += '<tr>';
	tabla += '<td>Observación</td>';
	tabla += '<td>'+this.observacion+'</td>';
	tabla += '</tr>';
	tabla += '<tr>';
	tabla += '<td>Tipo</td>';
	tabla += '<td>'+this.tipo+'</td>';
	tabla += '</tr>';
	tabla += '<tr>';
	tabla += '<td>Parametros</td>';
	tabla += '<td>'+this.parametros+ '('+this.parametros2+')</td>';
	tabla += '</tr>';
	tabla += '<tr>';
	tabla += '<td>Opciones</td>';
	tabla += '<td><span class="sobrevolar" entity="lol">Sobrevolar</span></td>';
	tabla += '</tr>';
	tabla += '</table>';
	return tabla;
}

EstacionMeteorologica.prototype.infoRow = function(){
	var row = '<tr>';
	row += '<td>';
	row += '<button class="resaltar" estacion="'+this.id+'"><i class="fa fa-lg fa-eye"></i></button>';
	row += '<button class="sobrevuelo" estacion="'+this.id+'"><i class="fa fa-lg fa-plane"></i></button>';
	row += '</td>';
	row += '<td>'+this.nombre+'</td>';
	row += '<td>'+this.canton+'</td>';
	row += '<td>'+this.cota+'</td>';
	row += '</tr>';
	return row;
}

