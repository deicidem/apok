import server from "@/api/http";

export async function all({page, startDate, endDate, startCloudiness, endCloudiness, months, satelites, polygon}) {
  let params = {
    page: page,
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
  return await server.get('dzzs', {params});
}