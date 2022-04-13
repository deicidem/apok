<template>
  <div class="results">
    <h2 class="sidebar-title">
      Результаты поиска: {{ results.length }} найдено
    </h2>
    <div class="results-content">
      <router-link to="/main/search">
      <div class="back">
        <div class="back-arrow">
          <img src="@/assets/img/arrow.svg" />
        </div>
        <p class="back-subtitle">Назад</p>
      </div>
    </router-link>
    <div class="card">
      <div class="card-title">Информация по объекту</div>
      <div class="card-img"><img src="@/assets/img/img.jpg" alt=""></div>
      <div class="card-table__wrapper">
        <table class="card-table">
        <thead>
          <tr>
            <th>Характеристика</th>
            <th>Значение</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Уровень доступа</td>
            <td>Доступны для заказа</td>
          </tr>
          <tr>
            <td>Уровень доступа</td>
            <td>Доступны для заказа</td>
          </tr>
          <tr>
            <td>Уровень доступа</td>
            <td>Доступны для заказа</td>
          </tr>
          <tr>
            <td>Уровень доступа</td>
            <td>Доступны для заказа</td>
          </tr>
        </tbody>
      </table>
      </div>
      <div class="card-buttons">
        <app-button>Скрыть контур</app-button>
        <app-button>Показать обзорное изображение</app-button>
      </div>
    </div>
    <div class="results-wrapper">
      <app-table class="results-table">
        <thead>
          <tr>
            <th></th>
            <th>Идентификатор</th>
            <th>Виток</th>
            <th>Маршрут</th>
            <th>Аппарат</th>
            <th>Дата съемки</th>
            <th>Облачность</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in results" :key="i">
            <td class="results-table__buttons">
              <button
                class="button-small"
                type="white-r"
                @click="
                  addGeoJsonPolygon({
                    json: item.GeoJSON,
                    bounds: item.bounds,
                    img: item.img,
                  })
                "
              >
                <img
                  svg-inline
                  class="icon icon-vector-o"
                  src="@/assets/img/vector-o.svg"
                  alt=""
                />
              </button>
              <button class="button-small active" type="white-r">
                <img
                  svg-inline
                  class="icon icon-img"
                  src="@/assets/img/img.svg"
                  alt=""
                />
              </button>
            </td>
            <td>{{ item.idBig }}</td>
            <td>{{ item.round }}</td>
            <td>{{ item.route }}</td>
            <td>{{ item.scName }}</td>
            <td>{{ item.date }}</td>
            <td>{{ item.cloudiness }}</td>
            <td class="results-table__buttons">
              <button class="button-small" type="white-r">
                <img
                  svg-inline
                  class="icon icon-open"
                  src="@/assets/img/open.svg"
                  alt=""
                />
              </button>
            </td>
          </tr>
        </tbody>
      </app-table>
    </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AppTable from "@/components/table/AppTable";
import AppButton from "@/components/controls/AppButton"
export default {
  components: {
    AppTable,
    AppButton
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("search", {
      results: "getResults",
    }),
  },
  methods: {
    ...mapActions("map", ["addGeoJsonPolygon"]),
  },
};
</script>

<style lang="scss">
.results {
  .card {
    position: fixed;
    width: 300px;
    height: 600px;
    background: #000;
    top: 200px;
    right: 100px;
    background: $gradient-w;
    box-shadow: $shadow-big;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    &-title {
      font-size: 16px;
      color: #000;
      margin-bottom: 15px;
    }
    &-img {
      width: 200px;
      margin-bottom: 20px;
    }
    &-table {
      &__wrapper {
        flex: 1;
      }
      color: #000;
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
      th {
        color: $color-main-dark;
        text-align: left;
        font-size: 12px;
      }
      td {
        padding: 10px 10px 10px 0;
        font-size: 10px;
      }
        tr {
          border-bottom: 1px solid rgba($color-main, 0.2);
        }
    }
  }
  &-content {
    padding: 10px 30px;
  }
  .back {
    margin-bottom: 0px;
    display: flex;
    align-items: center;
    &-arrow {
      width: 30px;
    }
    p {
      margin-left: 10px;
      color: $color-main-dark;
    }
  }
  &-wrapper {
    background: #ffffff;
    box-shadow: $shadow-big;
    border-radius: 10px;
    overflow: hidden;
  }
  &-table {
    td,
    th {
      word-break: break-all;
    }
    * {
      font-size: 10px !important;
    }
    &__buttons {
      padding: 10px !important;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .button-small {
    background: $gradient-w;
    border: none;
    box-shadow: $shadow_small;
    cursor: pointer;
    margin: 0 5px;
    width: 25px;
    height: 25px;
    padding: 0;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    &.active {
      background: $gradient;
      svg * {
        stroke: #fff;
      }
    }
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
  .icon {
    width: 15px;
    height: 15px;
    &-vector-o {
      width: 20px;
      height: 20px;
    }
  }
}
</style>