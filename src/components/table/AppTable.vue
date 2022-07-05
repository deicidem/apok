<template>
  <table>
    <slot></slot>
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
  background: $white;
  border-radius: 10px;
  box-shadow: $shadow-big;
  padding-bottom: 10px;
  thead {
    position: relative;
    z-index: 1;
    &::after {
      background: $gradient-w;
      z-index: -1;
      content: "";
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
        &:not(:empty) {
          cursor: pointer;
        }
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