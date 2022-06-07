<template>
  <div class="alert-item">
    <div
      class="alert-item__unread unread"
      :class="[theme]"
      v-show="!seen"
    ></div>
    <div class="alert-item__content">
      <div class="alert-item__img" :class="[theme]" @click="getTheme(theme)">
        <div class="icon" :class="'icon__' + [theme]"></div>
      </div>
      <div class="alert-item__info">
        <h2>{{ text }}</h2>
        <p :class="'alert-item__' + [theme]">Посмотреть результат</p>
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
    theme: String,
  },
  methods: {
    getTheme(theme) {
      console.log(theme);
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
  width: 24px;
  height: 24px;
  &__task {
    background: url("@/assets/img/alert-task.svg");
  }

  &__access {
    background: url("@/assets/img/alert-access.svg");
  }
  &__data {
    background: url("@/assets/img/alert-data.svg");
  }
}
.alert {
  &-item {
    position: relative;

    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px 15px;

    border-radius: 10px;
    background: #fff;
    box-shadow: $shadow-big;
    &__task {
      color: $color-main;
    }
    &__access {
      color: $text-plum;
    }
    &__data {
      color: $text-blue;
    }
    &__content {
      display: flex;
    }
    &__unread {
      position: absolute;
      top: -4px;
      left: -4px;
    }
    &__img {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;

      border-radius: 10px;
      background: $gradient;
      box-shadow: $shadow-small;
      img {
        max-width: 24px;
      }
    }
    &__info {
      margin-left: 16px;
      h2 {
        margin: 0;
        color: $text-grey;
        font-weight: 400;
        font-size: 14px;
      }
      p {
        margin: 0;
        font-weight: 400;
        font-size: 12px;
      }
    }
    &__trash {
      width: 35px;
      height: 35px;
      margin-left: auto;
      padding: 0;

      font-size: 20px;
      border-radius: 10px;
    }
  }
}
.unread {
  width: 12px;
  height: 12px;

  background: $gradient;
  border-radius: 50%;
}
.task {
  background: $gradient;
}
.access {
  background: $gradient-p;
}
.data {
  background: $gradient-b;
}

@media screen and (max-width: 1440px) {
  .alert {
    &-item {
      margin-bottom: 16px;
      padding: 8px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>