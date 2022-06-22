<template>
  <div class="overlay" v-show="showPopup">
    <div class="confirm">
      <h5 class="confirm-title">{{ title }}</h5>
      <div class="confirm-text">{{ message }}</div>
      <div class="confirm-buttons">
        <button class="button button-white" @click="_cancel">Отмена</button>
        <button class="button button-r" @click="_confirm">Удалить</button>
      </div>
      <div class="confirm-cross">
        <img
          svg-inline
          @click="_cancel"
          src="@/assets/img/cross.svg"
          alt="Закрыть"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    title: undefined,
    message: undefined,
    showPopup: false,

    resolvePromise: undefined,
    rejectPromise: undefined,
  }),

  methods: {
    show(opts = {}) {
      this.title = opts.title;
      this.message = opts.message;
      this.showPopup = true;

      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve;
        this.rejectPromise = reject;
      });
    },

    _confirm() {
      this.showPopup = false;
      this.resolvePromise(true);
    },

    _cancel() {
      this.showPopup = false;
      this.resolvePromise(false);
    },
  },
};
</script>

<style scoped lang="scss">
.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba($black, 0.2);
  z-index: 100;
}
.confirm {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  max-width: 410px;
  width: 100%;
  padding: 15px 50px;
  background: $white;
  border-radius: 10px;
  box-shadow: $shadow-big;
  text-align: center;
  &-buttons {
    display: flex;
    width: 100%;
    align-items: center;
    .button {
      margin-right: 20px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  &-title {
    margin: 0;
    line-height: 1.5;
    color: $black;
    font-weight: 500;
    font-size: 18px;
  }
  &-text {
    color: $text-grey;
    font-weight: 400;
    font-size: 14px;
    margin: 10px auto 10px 0;
  }
  &-cross {
    position: absolute;
    right: 10px;
    top: 10px;
    display: flex;
    cursor: pointer;
    svg path {
      fill: $color-red;
    }
    &:hover {
      svg path {
        fill: lighten($color: $color-red, $amount: 10);
      }
    }
  }
}
</style>
