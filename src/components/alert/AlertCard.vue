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
          <i
            v-if="[theme] == 'task'"
            class="icon icon-ic_fluent_clipboard_task_20_regular"
          ></i>
          <i
            v-if="[theme] == 'access'"
            class="icon icon-ic_fluent_lock_open_20_regular"
          ></i>
          <i
            v-if="[theme] == 'data'"
            class="icon icon-ic_fluent_arrow_download_20_regular"
          ></i>
        </div>
      </div>
      <div class="alert-item__info">
        <h2>{{ text }}</h2>
        <p :class="'alert-item__' + [theme]">Посмотреть результат</p>
      </div>
    </div>

    <div class="alert-delete">
      <app-button @click="$emit('delete')" type="button-svg  button-svg-r" tooltip="Удалить">
        <i class="icon icon-ic_fluent_delete_20_regular"></i>
      </app-button>
    </div>
  </div>
</template>

<script>
import AppButton from "@/components/controls/AppButton";
export default {
  components: {
    AppButton,
  },
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
    padding: 4px;
    border-radius: 10px;
    display: flex;
    font-size: 30px;
    color: $white;
  }

  &__task {
    background: $text-green;
  }

  &__access {
    background: $text-plum;
  }

  &__data {
    background: $text-blue;
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