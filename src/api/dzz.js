import server from "@/api/http";

export async function all({startDate, endDate, startCloudiness, endCloudiness, months, satelites}) {
  let params = {
    startDate: startDate.toJSON(),
    endDate: endDate.toJSON(),
    startCloudiness,
    endCloudiness,
    // polygon: {"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[32.915039,54.939766],[34.07959,55.764213],[37.946777,55.652798],[37.880859,52.961875],[33.024902,52.816043],[32.915039,54.939766]]]}}
  }
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
      el.geography = JSON.parse(el.geography)
      el.previewPath = server.defaults.baseURL + "images?path=" + el.previewPath
    }
  });
  console.log(result.data);
  
  return result.data.dzzs;
}