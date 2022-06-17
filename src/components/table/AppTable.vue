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
  background: #fff;
  border-radius: 10px;
  box-shadow: $shadow-big;
  padding-bottom: 10px;
  thead {
    position: relative;
    z-index: 1;
    &::after {
      z-index: -1;
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      display: block;
      box-shadow: $shadow-small;
      background: $gradient-w;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    tr {
      th {
        text-align: left;
        border: none;
        font-size: 12px;
        color: $color-main;
        padding: 8px;
        box-sizing: border-box;
        &:first-child {
          border-top-left-radius: 10px;
        }
        &:last-child {
          border-top-right-radius: 10px;
        }
      }
    }
  }
  tbody {
    text-align: left;
    font-size: 12px;
    color: #384342;
    vertical-align: top;
    line-height: 150%;
    &:last-child {
      border-bottom: none;
    }
    tr {
      border-top: 1px solid rgba($color-main, 0.3);
      line-height: 17px;
      td {
        padding: 10px;
        max-width: 210px;
      }
      .green {
        color: $color-main;
      }
    }
  }
}
</style>