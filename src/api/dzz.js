import server from "@/api/http";

export async function all({startDate, endDate, startCloudiness, endCloudiness, months, satelites, polygon}) {
  let params = {
    startDate: startDate.toJSON(),
    endDate: endDate.toJSON(),
    startCloudiness,
    endCloudiness,
    polygon: '{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[30.234375,58.859224],[29.003906,49.61071],[52.382813,45.828799],[47.900391,61.100789],[30.234375,58.859224]]]}}'
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
  let result = await server.get('api/dzzs', {params});
  console.log(result);
  result.data.dzzs.forEach(el => {
    if (el.geography != null && el.previewPath != null) {
      el.previewPath = server.defaults.baseURL + "api/images?path=" + el.previewPath
    }
  });
  console.log(result.data);
  
  return result.data.dzzs;
}