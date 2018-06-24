vec3 getNormal(vec3 vPos){
      return normalize(cross(dFdx(vPos), dFdy(vPos)));
}