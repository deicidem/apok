<template>
  <div class="alert-item">
    <div class="alert-item__unread unread" v-show="!seen"></div>
    <div class="alert-item__content">
      <div class="alert-item__img">
        <img inline-svg src="@/assets/img/envelope.svg" />
      </div>
      <div class="alert-item__info">
        <h2>{{ text }}</h2>
        <p>Посмотреть результат</p>
      </div>
    </div>

    <button @click="$emit('delete')" class="button button-svg">
      <img inline-svg src="@/assets/img/trash.svg" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    icon: String,
    seen: Boolean,
    result: String,
  },
};
</script>

<style lang="scss" scoped>
.alert {
  &-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    display: flex;
    box-shadow: $shadow-big;
    border-radius: 10px;
    align-items: center;
    padding: 10px 15px;
    position: relative;
    background: #fff;
    &__content {
      display: flex;
    }
    &__unread {
      position: absolute;
      top: -4px;
      left: -4px;
    }
    &__img {
      width: 40px;
      height: 40px;
      background: $gradient;
      border-radius: 10px;
      box-shadow: $shadow-small;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        max-width: 30px;
      }
    }
    &__info {
      margin-left: 16px;
      h2 {
        color: $color-main-dark;
        font-weight: 400;
        font-size: 14px;
      }
      p {
        color: $color-main;
        font-weight: 400;
        font-size: 12px;
      }
    }
    &__trash {
      width: 35px;
      height: 35px;
      margin-left: auto;
      font-size: 20px;
      padding: 0;
      border-radius: 10px;
    }
  }
}
.unread {
  background: $gradient;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
</style>