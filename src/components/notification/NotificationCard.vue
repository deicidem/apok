<template>
  <div class="notification-item" :class="{disabled}">
    <div
      class="notification-item__unread unread"
      :class="[type]"
      v-show="!read"
    ></div>

    <div class="notification-item__content">
      <div class="icon" @click="getTheme(type)">
        <div class="icon__child" :class="'icon__' + [type]">
          <i
            v-if="[type] == 'task'"
            class="icon icon-ic_fluent_clipboard_bullet_list_ltr_20_regular"
          ></i>

          <i
            v-if="[type] == 'group'"
            class="icon icon-ic_fluent_people_team_20_regular"
          ></i>

          <i
            v-if="[type] == 'request'"
            class="icon icon-ic_fluent_image_20_regular"
          ></i>
        </div>
      </div>
      <div class="notification-item__info">
        {{ message }}
        <!-- <p :class="'notification-item__' + [type]">Посмотреть результат</p> -->
      </div>
    </div>

    <div class="notification-buttons">
      <app-button
        @click="$emit('read')"
        type="button-svg  button-svg-w"
        tooltip="Отметить как прочитанное"
        class="notification-button"
        v-if="!read"
      >
        <i class="icon icon-ic_fluent_checkmark_20_regular"></i>
      </app-button>
      <app-button
        @click="$emit('delete')"
        type="button-svg  button-svg-r"
        tooltip="Удалить"
        class="notification-button"
      >
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
    message: String,
    read: Boolean,
    type: String,
    disabled: Boolean
  },

  methods: {
    getTheme(type) {
      console.log(type);
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

  &__group {
    background: $text-plum;
  }

  &__request {
    background: $text-blue;
  }
}

.notification {
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
    &.disabled {
      &::after {
        content: '';
        border-radius: 10px;
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(#eee, 0.65);
        top: 0;
        left: 0;
      }
    }

    &__task {
      color: $text-green;
    }

    &__group {
      color: $text-plum;
    }

    &__request {
      color: $text-blue;
    }

    &__content {
      display: flex;
    }

    &__unread {
      position: absolute;
      top: -4px;
      left: -4px;
      z-index: 10;
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
      display: flex;
      align-items: center;
      font-size: 14px;
      color: $text-grey;
      font-weight: 400;
      margin: 0 15px;
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

  &-buttons{
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  &-button {
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
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
  background: $text-green;
}

.group {
  background: $text-plum;
}

.request {
  background: $text-blue;
}

@media screen and (max-width: 1440px) {
  .notification {
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