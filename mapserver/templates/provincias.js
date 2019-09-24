// mapserver template cantones
[resultset layer="provincias"]
{
  "type": "FeatureCollection",
  "features": [
  [feature trimlast=","]
    {
      "type": "Feature",
      "id": "[id]",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          {
            "type": "Point",
		    "coordinates": [ [x], [y] ]
          }
        ]
      },
      "properties": {
        "id": "[id]",
        "gid_1": "[gid_1]",
        "Provincia": "[name_1]"
      }
    },
    [/feature]
  ]
}
[/resultset]
[resultset layer="cantones"]
{
  "type": "FeatureCollection",
  "features": [
  [feature trimlast=","]
    {
      "type": "Feature",
      "id": "[id]",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          {
            "type": "Point",
        "coordinates": [ [x], [y] ]
          }
        ]
      },
      "properties": {
        "id": "[id]",
        "gid_1": "[gid_1]",
        "gid_2": "[gid_2]",
        "Provincia": "[name_1]",
        "Canton": "[name_2]",
      }
    },
    [/feature]
  ]
}
[/resultset]