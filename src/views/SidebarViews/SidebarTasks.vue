<template>
  <div class="tasks">
    <h2 class="sidebar-title">Мои задачи</h2>
    <div class="tasks__wrapper">
      <div class="tasks__wrapper-table">
        <app-table>
          <thead>
            <tr>
              <th class="col-checkbox center">
                <label class="checkbox__label">
                  <input class="checkbox__input" type="checkbox" />
                  <span class="checkbox-fake"></span>
                </label>
              </th>
              <th v-for="(h, i) in headers" :key="i">{{ h }}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in tasks" :key="item.id">
              <td class="col-checkbox center">
                <label class="checkbox__label">
                  <input class="checkbox__input" :checked="item.delete" type="checkbox" />
                  <span class="checkbox-fake" id="mini"></span>
                </label>
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AppTable from "@/components/table/AppTable";
export default {
  name: "SidebarTasks",
  components: {
    AppTable,
  },
  computed: {
    ...mapGetters("tasks", {
      tasks: "getTasks",
      headers: "getHeaders",
    }),
  },
};
</script>

<style lang="scss" scoped>

.checkbox__input{
  display: none;
}
.checkbox-fake{
  display: inline-block;
  width: 20px;
  height:20px;
  border: none;
  border-radius: 5px;
  background: $gradient-w;
  box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.25);
  position: relative;
}

.checkbox-fake::before{
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  border-radius: 5px;
  width: 20px;
  height: 20px;
  opacity: 0;
  transition: .2s;
  &:checked + .checkbox-fake::before{
      opacity: 1;
  }
}

#mini{
  width: 16px;
  height: 16px;
  &::before{
    width: 16px;
    height: 16px;
  }
}


.tasks {
  &__wrapper {
    background: #ffffff;
    box-shadow: $shadow-big;
    border-radius: 10px;
    overflow: hidden;
    margin: 30px;
    &-table {
      height: inherit;
      overflow-x: auto;
      margin-top: 0px;
    }
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
  }
  
}
</style>