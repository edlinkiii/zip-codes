# zip-codes
Pull (polygonal) boundary coordinates from census data (KML) and offer a download (JSON) 

Personally, I will be using this data to draw zip code areas on a Google Map.

This data will be stored in a database eventually as it is still pretty massive after conversion.

Output file will contain an array of objects:

`
[
  {
    ZipCode: "00001",
    Coordinates: ["-XX.XXXXX,XX.XXXXX","-YY.YYYYY,YY.YYYYY", ... ]
  },
  {
    ZipCode: "00002",
    Coordinates: [
      ["-XX.XXXXX,XX.XXXXX","-YY.YYYYY,YY.YYYYY", ... ],
      ["-ZZ.ZZZZZ,WW.WWWWW", ... ]
    ]
  },
  ...
]
`

Console output: `Processed 33144 zip codes in 13 seconds`

Commercial products are available that offer this same data, but this is free!

Props to [Stefan Goessner](http://goessner.net/) for the [xml2json](https://goessner.net/download/prj/jsonxml/) function
