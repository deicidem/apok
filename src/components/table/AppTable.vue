<template>
  <table>
    <slot></slot>
    <!-- <thead>
      <tr>
        <th class="col-checkbox center"><input type="checkbox" /></th>
        <th v-for="(h, i) in headers" :key="i">{{h}}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="item in data" :key="item.id">
        <td class="col-checkbox center">
          <input type="checkbox" :checked="item.delete" />
        </td>
        <td class="col-id center">{{ item.id }}</td>
        <td>{{ item.title }}</td>
        <td>{{ item.date }}</td>
        <td class="green">{{ item.status }}</td>
        <td class="green">{{ item.result }}</td>
      </tr>
    </tbody> -->
  </table>
</template>

<script>
export default {
  props: {
    data: Array,
    headers: Array,
  },
};
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  table-layout: auto;
  border-collapse: collapse;

  thead {
    background: $gradient-w;
    box-shadow: $shadow-small;
    tr {
      th {
        text-align: left;
        border: none;
        font-size: 12px;
        color: $color-main-dark;
        padding: 10px;
        box-sizing: border-box;
      }
      
    }
  }
  tbody {
    text-align: left;
    font-size: 12px;
    color: #384342;
    vertical-align: top;
    line-height: 150%;
    tr {
        border-bottom: 1px solid rgba(71, 109, 112, 0.3);
      &:last-child {
        border-bottom: none;
      }
      td {
        padding: 10px;
        max-width: 150px;
        &:last-child {
          padding-right: 20px;
        }
      }
      .green {
        color: $color-main;
      }
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