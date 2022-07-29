import server from "@/api/http";

export async function all(params) {
  return await server.get('user/notifications', {
    params,

  }, {
    errorTitle: "Ошибка при получения списка уведомлений"
  });
}

export async function unreadCount() {
  return await server.get('user/notifications/unread-count', {
    errorTitle: "Ошибка при получении количества непрочитанных уведомлений"
  })
}

// export async function deleteBanch(ids) {
//   let params = {};
//   for (let i = 0; i < ids.length; i++) {
//     params[`ids[${i}]`] = ids[i];
//   }
//   return await server.delete('user/notifications',
//     params, {
//       errorTitle: "Ошибка при удалении уведомлений"
//     });
// }

export async function deleteNotification(id) {
  return await server.delete('user/notifications/' + id, {
    errorTitle: "Ошибка при удалении уведомления"
  });
}

export async function markAsRead(id) {
  return await server.put('user/notifications/'+id, {
    errorTitle: "Ошибка при прочтении уведомления"
  })
}