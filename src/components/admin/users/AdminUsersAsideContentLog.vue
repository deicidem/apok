<template>
  <admin-aside-block title="События">
      <app-button class="c-button" type="button-g" @click="onShow" v-if="!showLogs">Показать</app-button>
      <app-button class="c-button" type="button-g" @click="showLogs = false" v-else>Скрыть</app-button>
      <table class="c-table" v-if="showLogs && logs != null">
        <thead>
          <tr>
            <th>Время</th>
            <th>Событие</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="log in logs" :key="log.id">
        <td>{{new Date(log.date).toLocaleString()}}</td>
        <td>{{log.message}}</td>
          </tr>
        </tbody>
      </table>
  </admin-aside-block>
</template>

<script>
import AdminAsideBlock from "@/components/admin/AdminAsideBlock";
// import AppTable from "@/components/table/AppTable";
import AppButton from "@/components/controls/AppButton";
import {mapGetters} from "vuex"
export default {
  props: ["logs"],
  components: {
    AdminAsideBlock,
    // AppTable,
    AppButton,
  },
  data: () => ({
    showLogs: false
  }),
  methods: {
    onShow() {
      this.$emit('show-logs');
      this.showLogs = true;
    }
  },
  computed: {
    ...mapGetters(['scrollOps'])
  }
};
</script>

<style lang="scss" scoped>
.c-button {
  position: absolute;
  top: 15px;
  right: 20px;
}
  .c-table {
      width: 100%;
      border-collapse: collapse;
      thead {
        border-bottom: 1px solid rgba(71, 109, 112, 0.3);
      }

      tr {
        // border-bottom: 1px solid rgba(71, 109, 112, 0.3);

        &:last-child {
          border-bottom: none;
        }

        th {
          padding: 0 6px 6px;
          text-align: left;
          font-size: 14px;
          border: none;
          color: $black;
          box-sizing: border-box;
        }

        td {
          padding: 6px;
          text-align: left;
          font-size: 14px;
          border: none;
          color: #333;
          box-sizing: border-box;
        }
      }
  }
</style>