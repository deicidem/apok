import server from "@/api/http";

export async function all({startDate, endDate, startCloudiness, endCloudiness, months, satelites, polygon}) {
  let params = {
    startDate: startDate.toJSON(),
    endDate: endDate.toJSON(),
    startCloudiness,
    endCloudiness,
    polygon
  }
  for (let i = 0; i < months.length; i++) {
    params[`months[${i}]`] = months[i].cnt;    
    // params[`months[${i}]`] = months[i];    
  }
  for (let i = 0; i < satelites.length; i++) {
    params[`satelites[${i}]`] = satelites[i];    
  }
  let result = await server.get('dzzs', {params});
  
  return result.data.dzzs;
}