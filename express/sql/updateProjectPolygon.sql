/* ------------------------------- 看一下注释是否影响执行 ------------------------------ */

UPDATE project_habitat  SET geog = ST_GeomFromGeoJSON($2) WHERE gid = $1;


UPDATE project_habitat  SET geog = ST_Multi(ST_Difference(
    project_habitat.geog::geometry, (
    select geog::geometry from project_habitat where gid = $1
  )
))
where gid in (
  select gid from project_habitat where st_intersects(
    (
      select geog from project_habitat where gid = $1
  )
    , geog::geometry
  )
and gid != $1);

select *, st_asgeojson(geog) from project_habitat where gid=$1