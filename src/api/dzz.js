import server from "@/api/http";

export async function all({page, startDate, endDate, startCloudiness, endCloudiness, months, satelites, polygon}, params) {
  let globalSearch = {
    page: page,
    startDate: startDate.toJSON(),
    endDate: endDate.toJSON(),
    startCloudiness,
    endCloudiness,
    polygon
  }
  for (let i = 0; i < months.length; i++) {
    globalSearch[`months[${i}]`] = months[i].cnt;    
    // params[`months[${i}]`] = months[i];    
  }
  for (let i = 0; i < satelites.length; i++) {
    globalSearch[`satelites[${i}]`] = satelites[i];    
  }
  return await server.get('dzzs', {params: {...params, ...globalSearch}});
}