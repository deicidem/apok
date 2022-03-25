<template>
  <div class="tasks">
    <h2 class="table-title">Мои задачи</h2>
    <div class="scroll-table">
      <table>
        <thead>
          <tr>
            <th>Номер</th>
            <th>Задача</th>
            <th>Добавлена</th>
            <th>Статус</th>
            <th>Результат</th>
            <th></th>
          </tr>
        </thead>
      </table>

      <div class="scroll-table-body">
        <table>
          <tbody>
            <tr v-for="task in tasks" :key="task.id">
              <td>{{ task.id }}</td>
              <td>{{ task.title }}</td>
              <td>{{ task.date }}</td>
              <td>{{ task.status }}</td>
              <td>{{ task.result }}</td>
              <td><input type="checkbox" :checked="task.delete" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: "SidebarTasks",
  computed: {
    ...mapGetters("tasks", {
      tasks: "getTasks",
    }),
  },
}
</script>

<style lang="scss">
.table-title {
  background: #618580;
  color: #fff;
  text-align: center;
  padding: 5px;
  font-size: 18px;

}
.tasks {
  height: 100%;
  border-bottom: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #fff;
}

table {
  border-collapse: collapse;
  table-layout: fixed;
}

.scroll-table {
  &-body {
    height: inherit;
    overflow-x: auto;
    margin-top: 0px;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
  }
  table {
    width: 100%;
    border: none;
  }
  thead {
    th {
      text-align: center;
      border: none;
      padding: 0 5px;
      background: #384342;
      font-size: 14px;
      color: #fff;
    }
  }
  tbody {
    text-align: center;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    padding: 8px;
    font-size: 14px;
    color: #384342;
    vertical-align: top;
    line-height: 150%;
    tr:nth-child(even) {
      background: #f3f3f3;
    }
    td:hover {
      background-color: #e5e5e5;
      color: #384342;
      transition: background-color 0.5s, color 0.5s;
    }
  }
}

// ::-webkit-scrollbar {
//     width: 20px;
// }
// ::-webkit-scrollbar-track {
//     box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
// }
// ::-webkit-scrollbar-thumb {
//     box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
// }
</style>