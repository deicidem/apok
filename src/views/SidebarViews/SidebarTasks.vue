<template>
  <div class="tasks">
    <h2 class="title">Мои задачи</h2>
    <div class="tasks__wrapper">
      <div class="tasks__wrapper-table">
        <table>
          <thead>
            <tr>
              <th class="col-checkbox center"><input type="checkbox" /></th>
              <th class="col-id center">Номер</th>
              <th>Задача</th>
              <th>Добавлена</th>
              <th>Статус</th>
              <th>Результат</th>
            </tr>
          </thead>
        </table>

        <div>
          <table>
            <tbody>
              <tr v-for="task in tasks" :key="task.id">
                <td class="col-checkbox  center"><input type="checkbox" :checked="task.delete" /></td>
                <td class="col-id center">{{ task.id }}</td>
                <td>{{ task.title }}</td>
                <td>{{ task.date }}</td>
                <td class="green">{{ task.status }}</td>
                <td class="green">{{ task.result }}</td>
              </tr>
            </tbody>
          </table>
        </div>
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

<style lang="scss" scoped>
.title {
  background: $gradient;
  color: #fff;
  text-align: center;
  padding: 5px;
  font-size: 18px;
  font-weight: 400;
}

.tasks{
  &__wrapper{
    background: #FFFFFF;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
    border-radius: 10px; 
    overflow: hidden;
    margin: 30px;
      &-table{
        height: inherit;
        overflow-x: auto;
        margin-top: 0px;
        margin-bottom: 20px;
        border-bottom: 1px solid #eee;
        table{
          width: 100%;
          table-layout: fixed;
          border-collapse: collapse;
          .col-checkbox{
            width: 40px;
          }
          .col-id{
            width: 70px;
          }
          .center{
            text-align: center;
          }
          thead{
            background: $gradient-w;
            box-shadow: $shadow-big;
            tr{
              th{
                text-align: left;
                border: none;
                font-size: 12px;
                color: $color-main-dark;
                padding: 10px;
                box-sizing: border-box;
              }
              input{
                width: 20px;
                height: 20px;
                background: #EFF2F2;
                box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.25);
                border-radius: 50%;
                border:none;
              }
            }
          }
          tbody {
            text-align: left;
            font-size: 12px;
            color: #384342;
            vertical-align: top;
            line-height: 150%;
            tr{
              td{
                padding: 10px;   
                border-bottom: 1px solid rgba(71, 109, 112, 0.3);    
              }
              .green{
                color: $color-main;
              }
            }
            input{
              width: 16px;
              height: 16px;
              background: #EFF2F2;
              box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.25);
              border-radius: 50%;
              border:none;
            }
          }
        }
      }
  }
}



</style>