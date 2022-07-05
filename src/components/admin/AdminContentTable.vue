<template>
  <div class="user-table">
    <app-table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Имя</th>
          <th>Фамилия</th>
          <th>Почтовый адрес</th>
          <th>Дата регистрации</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>1</td>
          <td class="col-id center">Андрей</td>
          <td>Почитаев</td>
          <td>test@example.com</td>
          <td>04.07.2022</td>
        </tr>

        <tr>
          <td>1</td>
          <td class="col-id center">Андрей</td>
          <td>Почитаев</td>
          <td>test@example.com</td>
          <td>04.07.2022</td>
        </tr>

        <tr>
          <td>1</td>
          <td class="col-id center">Андрей</td>
          <td>Почитаев</td>
          <td>test@example.com</td>
          <td>04.07.2022</td>
        </tr>
      </tbody>
    </app-table>
  </div>
</template>

<script>
import AppTable from "@/components/table/AppTable";
export default {
  components: {
    AppTable,
  },
};
</script>

<style lang="scss" scoped>
.user-table {
  width: 700px;
}
// table {
//   width: 700px;
//   table-layout: auto;
//   border-collapse: collapse;
//   background: $white;
//   border-radius: 10px;
//   box-shadow: $shadow-big;
//   padding-bottom: 10px;
//   thead {
//     position: relative;
//     z-index: 1;
//     &::after {
//       background: $gradient-w;
//       z-index: -1;
//       content: "";
//       position: absolute;
//       width: 100%;
//       height: 100%;
//       top: 0;
//       left: 0;
//       display: block;
//       box-shadow: $shadow-small;
//       background: $gradient-w;
//       border-top-left-radius: 10px;
//       border-top-right-radius: 10px;
//     }
//     tr {
//       th {
//         text-align: left;
//         border: none;
//         font-size: 12px;
//         color: $color-main;
//         padding: 12px;
//         box-sizing: border-box;
//         &:not(:empty) {
//           cursor: pointer;
//         }
//         &:first-child {
//           border-top-left-radius: 10px;
//         }
//         &:last-child {
//           border-top-right-radius: 10px;
//         }
//       }
//     }
//   }
//   tbody {
//     text-align: left;
//     font-size: 12px;
//     color: #384342;
//     vertical-align: top;
//     line-height: 150%;
//     &:last-child {
//       border-bottom: none;
//     }
//     tr {
//       border-top: 1px solid rgba($color-main, 0.3);
//       line-height: 20px;
//       td {
//         padding: 12px;
//         max-width: 210px;
//       }
//     }
//   }
// }
</style>