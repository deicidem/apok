<template>
  <div class="alert-item">
    <div class="alert-item__unread unread" v-show="!seen"></div>
    <div class="alert-item__img">
      <i class="fa fa-envelope-open-o" aria-hidden="true"></i>
    </div>
    <div class="alert-item__info">
      <h2>{{ text }}</h2>
      <p>Посмотреть результат</p>
    </div>
    <app-button
      @click="$emit('delete')"
      class="alert-item__trash"
      type="white-r"
    >
      <i class="fa fa-trash-o" aria-hidden="true"></i>
    </app-button>

  </div>

</template>

<script>
import AppButton from "@/components/controls/AppButton.vue";
export default {
  components: {
    AppButton,
  },
  props: {
    text: String,
    icon: String,
    seen: Boolean,
    result: String,
  },
};
</script>

<style lang="scss" scoped>
.unread {
  background: $gradient;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.alert {
  &-item {
    margin-bottom: 20px;
    display: flex;
    box-shadow: $shadow-big;
    border-radius: 10px;
    align-items: center;
    padding: 10px 15px;
    position: relative;
    background: #fff;
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
      i {
        font-size: 24px;
        color: #fff;
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
</style>