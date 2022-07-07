import users from "./admin/users";
import tasks from "./admin/tasks";
import files from "./admin/files";
import groups from "./admin/groups";

export default {
  namespaced: true,
  modules: {
    users,
    tasks,
    files,
    groups
  }
}