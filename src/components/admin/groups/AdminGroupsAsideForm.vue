<template>
  <admin-aside-content title="Создать группу">
    <form class="c-form" @submit.prevent="submitForm()">
      <app-input
        class="c-form__input"
        :value="title"
        @input="$v.title.$model = $event"
        :invalid="!$v.title.required && formInvalid"
        icon="icon icon-ic_fluent_person_20_regular"
        label="Название"
        :error="!$v.title.required ? 'Введите значение' : null"
      >
      </app-input>

      <div class="c-select">
        <div class="c-text c-selected" @click="showSelect = !showSelect">
          <div class="c-select__icon">
            <i class="icon icon-ic_fluent_triangle_down_20_filled"></i>
          </div>
          Тип группы: {{ selectedOption != null ? selectedOption.title : "" }}
        </div>

        <div
          class="c-select__options"
          v-show="showSelect"
          v-if="getTypes != null"
        >
          <div
            class="c-select__option"
            @click="onSelect(i)"
            v-for="(option, i) in getTypes"
            :key="option.id"
          >
            {{ option.title }}
          </div>
        </div>
      </div>

      <app-button
        type="button-g"
        class="c-form__item"
        :disabled="submitStatus === 'PENDING'"
      >
        Создать
      </app-button>
    </form>
  </admin-aside-content>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";
import AdminAsideContent from "@/components/admin/AdminAsideContent.vue";
import AppButton from "@/components/controls/AppButton.vue";
import AppInput from "@/components/controls/AppInput.vue";

export default {
  components: {
    AdminAsideContent,
    AppInput,
    AppButton,
  },

  data() {
    return {
      title: null,
      type: null,
      submitStatus: null,
      showSelect: false,
      selectedOptionIndex: null,
    };
  },

  validations() {
    return {
      title: {
        required,
      },
    };
  },

  computed: {
    ...mapGetters("admin/groups", ["getTypes"]),
    ...mapGetters("users", ["getUser"]),
    formInvalid() {
      return this.submitStatus === "FORM_INVALID";
    },
    selectedOption() {
      if (this.selectedOptionIndex != null) {
        return this.getTypes[this.selectedOptionIndex];
      }
      return null;
    },
  },

  methods: {
    ...mapActions("admin/groups", ["createGroup"]),
    onSelect(index) {
      this.showSelect = false;
      this.selectedOptionIndex = index;
    },
    async submitForm() {
      this.showMessage = false;

      if (!this.$v.$invalid) {
        this.submitStatus = "PENDING";
        try {
          await this.createGroup({
            title: this.title,
            type: this.selectedOption.id,
            ownerId: this.getUser.id,
          });

          this.submitStatus = "SUBMIT";
          this.message = "Группа успешно создан";
        } catch (error) {
          this.message = "При создании произошла ошибка";

          this.submitStatus = "ERROR";
        }

        this.showMessage = true;
      } else {
        this.submitStatus = "FORM_INVALID";
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.c {
  position: relative;
  background: $gradient-w;
  width: 300px;
  padding: 30px 40px 30px 40px;
  border-radius: 10px;
  border: none;

  &-title {
    text-align: center;
    font-size: 20px;
    color: $black;
    margin-bottom: 20px;
  }

  &-form {
    margin: 30px auto 0 auto;
    width: 400px;
    background: $white;
    border-radius: 10px;
    box-shadow: $shadow-small;
    padding: 30px;

    &__input {
      margin-top: 30px;

      &:first-child {
        margin: 0;
      }
    }

    &__item {
      margin-top: 20px;
      width: 100%;
      height: 44px;
      font-size: 16px;
      background: $white;
    }
  }

  &-remember {
    display: flex;
    margin-top: 20px;
    width: 100%;

    &__text {
      margin-left: 10px;
      color: $text-grey;
      font-size: 14px;
    }
  }
  &-select {
    position: relative;
    margin-top: 30px;
    width: 100%;

    &__options {
      width: 100%;
      margin-top: 4px;
      z-index: 10;
      position: absolute;
      top: calc(100% + 3px);
      left: 0;
      background: $white;
      box-shadow: $shadow-big;
      border-radius: 7px;
    }

    &__option {
      position: relative;
      padding: 8px 10px;
      font-size: 12px;
      color: $black;
      transition: all 0.2s ease-out;
      border-bottom: 1px solid #dfdfdf;
      cursor: pointer;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        color: $color-main;
      }
    }

    &__icon {
      display: flex;
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translate(-50%, -50%);
      color: $color-main;
    }
  }

  &-selected {
    position: relative;
    background: $white;
    min-height: 50px;
    box-shadow: $shadow-small;
    border: 1px solid transparent;
    font-size: 14px;
    color: #333;
    background: #fff;
    width: 100%;
    padding: 5px 30px 5px 24px;
    display: flex;
    align-items: center;
    border-radius: 7px;
    cursor: pointer;

    &:hover {
      border: 1px solid rgba($color-main, 0.5);
    }
  }
}
</style>