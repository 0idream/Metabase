/* ------------------------------- 看一下注释是否影响执行 ------------------------------ */

UPDATE sr_trained_4326  SET geog = ST_GeomFromGeoJSON($2) WHERE gid = $1;


UPDATE sr_trained_4326  SET geog = ST_Multi(ST_Difference(
    sr_trained_4326.geog::geometry, (
    select geog::geometry from sr_trained_4326 where gid = $1
  )
))
where gid in (
  select gid from sr_trained_4326 where st_intersects(
    (
      select geog from sr_trained_4326 where gid = $1
  )
    , geog::geometry
  )
and gid != $1);

select *, st_asgeojson(geog) from sr_trained_4326 where gid=$1