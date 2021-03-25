/* ----------------------------------- 用于测试，面向的是 sr_trained_4326_old 表  ----------------------------------- */

UPDATE sr_trained_4326_old  SET geog = ST_Multi(
  ST_GeomFromGeoJSON('{
  "type": "Polygon",
    "coordinates": [
    [
      [
        114.14534747600555,
        22.52787394518449
      ],
      [
        114.14645254611969,
        22.527621236040204
      ],
      [
        114.14655983448029,
        22.526991938711056
      ],
      [
        114.14795458316802,
        22.52633290772631
      ],
      [
        114.1484459492292,
        22.52733604115302
      ],
      [
        114.1488699892611,
        22.52763782437868
      ],
      [
        114.1488699743871,
        22.52768512425206
      ],
      [
        114.1489471481553,
        22.52768513336451
      ],
      [
        114.1490755206217,
        22.52784293793132
      ],
      [
        114.1491013621639,
        22.52811085042027
      ],
      [
        114.1491013473273,
        22.52815815029232
      ],
      [
        114.14821743965148,
        22.527507269019942
      ],
      [
        114.1478824980461,
        22.52865332349612
      ],
      [
        114.1477120967467,
        22.52853638433634
      ],
      [
        114.14565324783325,
        22.529806411590577
      ],
      [
        114.14504706859589,
        22.52837440702743
      ],
      [
        114.14534747600555,
        22.52787394518449
      ]
    ]
  ]
}') 
  )
WHERE gid = 782;


UPDATE sr_trained_4326_old  SET geog = ST_Multi(
  ST_Difference(
    sr_trained_4326_old.geog::geometry, (
    select geog::geometry from sr_trained_4326_old where gid = 782
  )
)
) where gid in (
  select gid from sr_trained_4326_old where st_intersects(
    (
      select geog from sr_trained_4326_old where gid = 782
  )
    , geog::geometry
  )
and gid != 782);

select * from sr_trained_4326_old where st_intersects(geog::geometry,

  (select geog from sr_trained_4326_old where gid=782)::geometry
)