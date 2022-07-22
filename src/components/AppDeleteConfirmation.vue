<template>
  <div class="overlay" v-show="showPopup">
    <div class="confirm">
      <h5 class="confirm-title">{{ title }}</h5>
      <div class="confirm-text">{{ message }}</div>
      <div class="confirm-buttons">
        <app-button class="confirm-button" type="button-white-gr" @click="_cancel">Отмена</app-button>
        <app-button class="confirm-button" type="button-r" @click="_confirm">{{actionMessage}}</app-button>
      </div>
      <div class="confirm-cross">
        <i @click="_cancel" class="icon icon-ic_fluent_dismiss_20_regular"></i>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from "@/components/controls/AppButton";
export default {
  components: {
    AppButton,
  },
  data: () => ({
    title: null,
    message: null,
    actionMessage: null,
    showPopup: false,

    resolvePromise: null,
    rejectPromise: null,
  }),

  methods: {
    show(opts = {}) {
      this.title = opts.title;
      this.message = opts.message;
      this.actionMessage = opts.actionMessage;
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
  &-button {
    flex: 1 1 auto;
    margin-right: 20px;
    &:last-child {
      margin-right: 0;
    }
  }
  &-buttons {
    margin-top: 20px;
    display: flex;
    width: 100%;
    justify-content: space-evenly;
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
    color: $color-red;

    &:hover {
      color: lighten($color: $color-red, $amount: 10);
    }
  }
}
</style>
