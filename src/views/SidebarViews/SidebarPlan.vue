<template>
  <div class="plan">
    <h2 class="title">Запланировать задачу</h2>
    
    <div class="plan-wrapper">
      <div class="plan-item">

        <div class="plan-item__img">
          <img src="/assets/img/img.jpg">
        </div>

        <div class="plan-item__info">
          <h2>Название</h2>
          <p>Построение карты температур по тепловым каналам КА Landsat-8 производится с целью Построение карты температур по тепловым каналам КА Landsat-8 производится с целью</p>

          <div class="plan-item__buttons">
            <app-button type="white-g">Подробнее</app-button>
            <app-button>Запланировать</app-button>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<script>
import AppButton from "@/components/controls/AppButton.vue"
// import AppInput from "@/components/controls/AppInput.vue"
export default {
  components: {
    AppButton,
    // AppInput
  },
  data() {
    // return {
    //   val: "инпут"
    // }
  },
}
</script>

<style lang="scss" scoped>
.title {
  background: $gradient;
  color: #fff;
  text-align: center;
  padding: 5px;
  font-size: 18px;
  font-weight: 400;
}

.plan{
  &-wrapper{
    margin: 30px;
  }
  &-item{
    display: flex;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    overflow: hidden;
    align-items: center;
    &__img{
      width: 100%;
    }
    &__info{
      margin: 10px 20px;
      h2{
        font-size: 18px;
        font-weight: 400;
        color: #000;
      }
      p{
        margin-top: 10px;
        font-weight: 400;
        font-size: 14px;
        color: #616161;
        line-height: 130%;
      }
    }
    &__buttons{
      margin-top: 18px;
      display: flex;
      justify-content: space-evenly;
    }
  }
}
</style>