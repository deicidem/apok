<template>
  <div class="plan">
    <div class="plan-wrapper__header">
      <div class="back">
        <div class="back-arrow">
          <img src="@/assets/img/arrow.png" />
        </div>
        <p class="back-subtitle">Назад</p>
      </div>

      <h2 class="plan-title">
        Подготовка к запуску задачи 452: Формирование температурных карт
      </h2>

      <app-button class="plan-wrapper__button">Запланировать задачу</app-button>
    </div>

    <div class="plan-wrapper">

      <div class="plan-wrapper__cards">
        <div class="plan-wrapper__card">
          <div class="plan-wrapper__title">Описание</div>
          <p class="plan-wrapper__text">Построение карты температур по тепловым каналам КА Landsat-8 производится с целью вычисления значений температур поверхности в градусах Цельсия, выявления тепловых аномалий. Для определения температуры поверхности производятся вычисления спектральной интенсивности излучения, поверхностной яркостной температуры, спектрального коэффициента излучения, значений температур поверхности в градусах Цельсия. Результатом обработки является векторная карта температур и отчетная форма с информацией об используемом изображении. Для более наглядного представления результата используется универсальная температурная шкала [-100; +100]. Красным отображаются области высоких температур (очаги пожаров), синим – области низких температур. </p>
          </div>
        <div class="plan-wrapper__card">
          <div class="plan-wrapper__title">Требования к данным</div>
        </div>
      </div>

      <div class="plan-wrapper__img">
        <img src="@/assets/img/img.jpg">
      </div>

    </div>

  </div>
</template>

<script>
import AppButton from "@/components/controls/AppButton.vue";
export default {
  computed: {
    id() {
      return +this.$route.params.id;
    },
  },
  components: {
    AppButton,
  },
};
</script>

<style lang="scss" scoped>
.plan {
  padding: 30px;
  box-shadow: $shadow-small;
  border-radius: 10px;
  overflow: hidden;
  background: $gradient-w;
  &-title {
    color: #000;
    font-weight: 400;
  }
  &-wrapper {
    margin: 30px 0;
    display: flex;
    &__header {
      display: flex;
      justify-content: space-between;
    }
    &__button {
      font-size: 1.125rem;
      padding: 10px 15px 10px 15px;
      height: auto;
      justify-self: end;
    }
    &__cards {
      max-width: 55%;
      display: flex;
      flex-direction: column;
    }
    &__card {
      margin-bottom: 20px;
      padding: 20px;
      box-shadow: $shadow-small;
      border-radius: 10px;
      overflow: hidden;
      background: #FFF;
    }
    &__title{
      font-size: 1.25rem;
      color: #000;
    }
    &__text{
      margin-top: 20px;
      color: #000;
    }
    &__img{
      border-radius: 15px;
      overflow: hidden;
      box-shadow: $shadow-big;
      margin-left: 30px;
    }
  }
}

.back {
  display: flex;
  align-items: center;
  &-arrow {
    width: 40px;
    transform: scale(-1, 1);
  }
  p {
    margin-left: 10px;
    color: $text-grey;
  }
}
</style>