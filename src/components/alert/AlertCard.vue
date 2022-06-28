<template>
  <div class="alert-item">
    <div
      class="alert-item__unread unread"
      :class="[theme]"
      v-show="!seen"
    ></div>
    <div class="alert-item__content">
      <div class="icon" @click="getTheme(theme)">
        <div class="icon__child" :class="'icon__' + [theme]">
          <img
            svg-inline
            v-if="[theme] == 'task'"
            src="@/assets/img/alert-icons/alert-task.svg"
            alt=""
          />
          <img
            svg-inline
            v-if="[theme] == 'access'"
            src="@/assets/img/alert-icons/alert-access.svg"
            alt=""
          />
          <img
            svg-inline
            v-if="[theme] == 'data'"
            src="@/assets/img/alert-icons/alert-data.svg"
            alt=""
          />
        </div>
      </div>
      <div class="alert-item__info">
        <h2>{{ text }}</h2>
        <p :class="'alert-item__' + [theme]">Посмотреть результат</p>
      </div>
    </div>
    <div class="alert-delete">
      <button @click="$emit('delete')" class="button button-svg-r">
        <img svg-inline src="@/assets/img/button-svg-icons/trash.svg" />
      </button>
      <div class="tooltiptext tooltiptext-r">Удалить</div>
    </div>
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
  border-radius: 10px;
  &__child {
    padding: 10px;
    border-radius: 10px;
    display: flex;
  }
  &__task {
    background: $text-green;

    img {
      max-width: 24px;
    }
  }

  &__access {
    background: $text-plum;
    img {
      max-width: 24px;
    }
  }
  &__data {
    background: $text-blue;
    img {
      max-width: 24px;
    }
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
    background: $white;
    box-shadow: $shadow-big;
    &__task {
      color: $text-green;
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
  &-delete {
    position: relative;
    display: flex;
    justify-content: center;
  }
}
.unread {
  width: 12px;
  height: 12px;

  background: $gradient;
  border-radius: 50%;
}
.task {
  background: $text-green;
}
.access {
  background: $text-plum;
}
.data {
  background: $text-blue;
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