<template>
  <div class="plan">
    <h2 class="plan-title">Запланировать задачу</h2>
    <div class="plan__wrapper">
      <div class="plan__item">
        <div class="plan__img">
          <img src="/assets/img/img.jpg">
        </div>
        <div class="plan__info">
          <h2 class="plan__info-title">Название</h2>
          <p class="plan__info-text">Построение карты температур по тепловым каналам КА Landsat-8 производится с целью</p>
          <div class="plan__info-buttons">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from "@/components/controls/AppButton.vue"
import AppInput from "@/components/controls/AppInput.vue"
export default {
  components: {
    AppButton,
    AppInput
  },
  data() {
    return {
      val: "инпут"
    }
  },
}
</script>

<style lang="scss" scoped>
.plan{
  &-title {
    background: $gradient;
    color: #fff;
    text-align: center;
    padding: 5px;
    font-size: 18px;
    font-weight: 400;
  }
  &__wrapper{
    margin: 30px;
  }
  &__item{
    display: flex;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
  }
  &__img{
    width: 200px;
  }
  &__info{
    margin-left: 20px;
    margin-top: 10px;
  }
}
</style>