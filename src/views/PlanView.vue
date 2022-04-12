<template>
  <div class="plan">
    <div class="back">
      <div class="back-arrow">
        <img src="@/assets/img/arrow.png">
      </div>
      <p class="back-subtitle">Назад</p>
    </div>
    <div class="plan-wrapper__header" >
      <h2 class="plan-title">Подготовка к запуску задачи 452: Формирование температурных карт</h2>
      <app-button class="plan-wrapper__button">Запланировать задачу</app-button>
    </div>
  </div>
</template>

<script>
import AppButton from "@/components/controls/AppButton.vue";
export default {
  computed: {
    id() {
			return +this.$route.params.id
		},
  },
  components: {
    AppButton
  }
}
</script>

<style lang="scss" scoped>
.plan{
  padding: 30px;
  box-shadow: $shadow-small;
  border-radius: 10px;
  overflow: hidden;
  background: $gradient-w;
  &-title{
    color: #000;
    font-weight: 400;
    justify-self: center;
  }
  &-wrapper{
    &__header{
      display: flex;
    }
    &__button{
      font-size: 18px;
      padding: 10px 15px 10px 15px;
      height: auto;
      justify-self: end;
    }
  }
}

.back{
  display: flex;
  align-items: center;
  &-arrow{
    width: 40px;
    transform: scale(-1,1);
  }
  p{
    margin-left: 10px;
    color: $text-grey;
  }
}
</style>