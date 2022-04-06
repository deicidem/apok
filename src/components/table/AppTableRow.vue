<template>
  <tr>
    <td class="col-checkbox center">
      <input type="checkbox" :checked="item.delete" />
    </td>
    <td class="col-id center">{{ item.id }}</td>
    <td>{{ item.title }}</td>
    <td>{{ item.date }}</td>
    <td class="green">{{ item.status }}</td>
    <td class="green">{{ item.result }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    item: Object
  }
}
</script>

<style lang="scss">
tr {
  td {
    padding: 10px;
    border-bottom: 1px solid rgba(71, 109, 112, 0.3);
  }
  .green {
    color: $color-main;
  }
}
</style>