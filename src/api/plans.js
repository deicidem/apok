import server from "@/api/http";

export async function all() {
  // let plans = await server.get('/sanctum/csrf-cookie').then(async (response) => {
  //   console.log(response);

  //   let data = await server.post('api/login', {
  //     email: "test@example.com",
  //     password: "password"
  //   });
  //   console.log(data);
    let res = await server.get('plans');
    console.log(res);
    res.data.plans.forEach(el => {
      el.previewPath = server.defaults.baseURL + "images?path=" + el.previewPath
    });
    return res.data.plans;
  // })
  
  // return plans;
}