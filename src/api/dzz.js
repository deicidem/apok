import server from "@/api/http";

export async function all({startDate, endDate, startCloudiness, endCloudiness, months, satelites}) {
  let params = {
    startDate: startDate.toJSON(),
    endDate: endDate.toJSON(),
    startCloudiness,
    endCloudiness,
  }
  for (let i = 0; i < months.length; i++) {
    params[`months[${i}]`] = months[i].cnt;    
  }
  for (let i = 0; i < satelites.length; i++) {
    params[`satelites[${i}]`] = satelites[i];    
  }
  let result = await server.get('dzzs', {params});
  console.log(result);
  result.data.forEach(el => {
    if (el.geographyPath != null && el.previewPath != null) {
      el.geographyPath = JSON.parse(el.geographyPath)
      el.previewPath = server.defaults.baseURL + "images?path=" + el.previewPath
    }
  });
  console.log(result.data);
  
  return result.data;
}