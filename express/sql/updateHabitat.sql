
/* -------------------------------- 将求交结果保存起来 ------------------------------- */

DELETE FROM project_habitat	WHERE shape_area>0;
INSERT INTO project_habitat (gid, id,shape_area, shape_leng, userid,gridcode,geog) 
  /* ---------------------------------- 进行求交 ---------------------------------- */
  select a.gid,a.id,a.shape_area,a.shape_leng,a.userid,a.gridcode, ST_Multi(st_intersection(a.geog::geometry,b.geom)) as geog from sr_trained_4326 a,projectextent b where st_intersects(a.geog,b.geom::geography); 

/* --------------------------------- 返回保存的结果 -------------------------------- */
SELECT *, st_asgeojson(geog) as geojson FROM public.project_habitat ORDER BY gid ASC;
