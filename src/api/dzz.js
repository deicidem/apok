import server from "@/api/http";

export async function all({startDate, endDate, startCloudiness, endCloudiness, months, satelites, polygon}) {
  let params = {
    startDate: startDate.toJSON(),
    endDate: endDate.toJSON(),
    startCloudiness,
    endCloudiness,
    polygon: '{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[22.543945,49.181422],[26.367188,38.753909],[35.771484,36.773942],[41.923828,59.355532],[22.543945,49.181422]]]}}'
  }
  console.log(polygon);
  for (let i = 0; i < months.length; i++) {
    // params[`months[${i}]`] = months[i].cnt;    
    params[`months[${i}]`] = months[i];    
  }
  for (let i = 0; i < satelites.length; i++) {
    params[`satelites[${i}]`] = satelites[i];    
  }
  console.log(params);
  let result = await server.get('dzzs', {params});
  console.log(result);
  result.data.dzzs.forEach(el => {
    if (el.geography != null && el.previewPath != null) {
      el.previewPath = server.defaults.baseURL + "images?path=" + el.previewPath
    }
  });
  console.log(result.data);
  
  return result.data.dzzs;
}