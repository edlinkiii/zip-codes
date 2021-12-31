# zip-codes
Pull (polygonal) boundary coordinates from census data (KML) and offer a download (JSON) 

Personally, I will be using this data to draw zip code areas on a Google Map.

This data will be stored in a database eventually as it is still pretty massive after conversion.

Output file will contain an array of objects:
`
[
  {
    ZipCode: "00001",
    Coordinates: ["-XX.XXXXX,XX.XXXXX","-YY.YYYYY,YY.YYYYY]
  },
  {
    ZipCode: "00002",
    Coordinates: [
      ["-XX.XXXXX,XX.XXXXX","-YY.YYYYY,YY.YYYYY", ... ],
      ["-ZZ.ZZZZZ,WW.WWWWW", ... ]
    ]
  },
]
`

Commercial products are available that offer this same data, but this is free!
