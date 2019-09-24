<?php

define('APP_PATH', '/var/www/html/mapas/'); // path scripts
define('MAP_IMGS_URL', 'http://192.168.1.9:8000/img/maps/'); // path scripts
define('MAP_IMGS_PATH', '/var/www/html/wekain-angular/public/img/maps/'); // path scripts
//define('POSTGRES_IP', '127.0.0.1'); // ip postgres local
define('POSTGRES_IP', '127.0.0.1'); // ip postgres local
//define('POSTGRES_USER', 'dexter'); // user postgres local
define('POSTGRES_USER', 'test'); // user postgres local
//define('POSTGRES_PASS', '0112358'); // pass postgres local
define('POSTGRES_PASS', '12345'); // pass postgres local
define('POSTGRES_DB', 'gturismo'); // bdd postgres local
//define('POSTGRES_DB', 'gadm'); // bdd postgres local

define('POSTGRES_CONN', "host=".POSTGRES_IP." port=5432 dbname=".POSTGRES_DB." user=".POSTGRES_USER." password=".POSTGRES_PASS); // IP postgres local

function qryPoint($lat=0, $lng=0){
    $map = new mapObj(APP_PATH."mapserver/gt.map");

    $l = $map->getLayerByName('provincias');
    $l->set('connection',POSTGRES_CONN);

    $punto = new pointObj();
    $punto->setXY($lng,$lat);
    //$punto->x=$lng;
    //$punto->y=$lat;
    try{
        $l->queryByPoint($punto,MS_SINGLE,-1);
    }catch(Exception $er){
        $l->close();
        $map->freequery(-1);
        return [];
    }
    //$punto->setXY($lat,$lng);

    $n_resultados =$l->getNumResults();
    $resultado = [];
    for ($i=0; $i<$l->getNumResults();$i++){
        $s = $l->getShape($l->getResult($i));
        $resultado = $s->values;
        break;
    }
    $l->close();
    return $resultado;
}

/*
$of = $map->outputformat;
echo $map->extent->minx." - ".$map->extent->miny." - ".
                 $map->extent->maxx." - ".$map->extent->maxy."\n";
echo "Outputformat name: $of->name\n";
unset($of);
unset($map);
*/