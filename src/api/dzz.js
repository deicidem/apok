import server from "@/api/http";

export async function all({startDate, endDate, startCloudiness, endCloudiness, months, satelites, polygon}) {
  let params = {
    startDate: startDate.toJSON(),
    endDate: endDate.toJSON(),
    startCloudiness,
    endCloudiness,
    polygon: '{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[163.300781,85.051129],[-4.921875,85.051129],[-4.921875,-13.410994],[163.300781,-13.410994],[163.300781,85.051129]]]}}'
  }
  console.log(polygon);
  for (let i = 0; i < months.length; i++) {
    // params[`months[${i}]`] = months[i].cnt;    
    params[`months[${i}]`] = months[i];    
  }
  for (let i = 0; i < satelites.length; i++) {
    params[`satelites[${i}]`] = satelites[i];    
  }
  let result = await server.get('dzzs', {params});
  
  return result.data.dzzs;
}