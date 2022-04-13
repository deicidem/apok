<template>
  <div class="tasks">
    <h2 class="sidebar-title">Мои задачи</h2>
    <div class="tasks__wrapper">
      <app-table>
        <thead>
          <tr>
            <th class="col-checkbox center ">
              <app-checkbox class="checkbox-big" @input="onCheck($event)"/>
            </th>
            <th v-for="(h, i) in headers" :key="i">{{ h }}</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in tasks" :key="item.id">
            <td class="col-checkbox center">
              <app-checkbox :mini="true" @input="onCheck($event)"/>
            </td>
            <td class="col-id center">{{ item.id }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.date }}</td>
            <td class="green">{{ item.status }}</td>
            <td class="green">{{ item.result }}</td>
          </tr>
        </tbody>
      </app-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AppTable from "@/components/table/AppTable";
import AppCheckbox from "@/components/controls/AppCheckbox";
export default {
  name: "SidebarTasks",
  components: {
    AppTable,
    AppCheckbox
  },
  computed: {
    ...mapGetters("tasks", {
      tasks: "getTasks",
      headers: "getHeaders",
    }),
  },
  methods: {
    onCheck(val) {
      console.log(val);
    }
  }
};
</script>

<style lang="scss" scoped>


.tasks {
  &__wrapper {
    background: #ffffff;
    box-shadow: $shadow-big;
    border-radius: 10px;
    margin: 30px;
  }
  .green {
    color: $color-main;
  }
  .col-checkbox {
    width: 40px;
  }
  .col-id {
    width: 70px;
  }
  .center {
    text-align: center;
  }
  thead {
    input {
        width: 20px;
        height: 20px;
        background: #eff2f2;
        border-radius: 50%;
        border: none;
      }
  }
  tbody {
    input {
      width: 16px;
      height: 16px;
      background: #eff2f2;
      border-radius: 50%;
      border: none;
    }
    input {
      width: 16px;
      height: 16px;
      background: #eff2f2;
      box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.25);
      border-radius: 50%;
      border: none;
    }
  }
  
}
</style>