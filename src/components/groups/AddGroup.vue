<template>
  <form class="c-form" @submit.prevent="submitForm()">
    <div class="c-title">Создать группу</div>

    <div class="c-cross" @click="$emit('close')">
      <i class="fa-solid fa-xmark"></i>
    </div>

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

    <app-select
      class="c-select"
      label="Тип группы:"
      :options="options"
      @change="selectedOption = $event"
    ></app-select>

    <app-button
      type="button-g"
      class="c-form__item"
      :disabled="submitStatus === 'PENDING'"
    >
      Создать
    </app-button>
  </form>
</template>

<script>
import AppInput from "@/components/controls/AppInput.vue";
import AppButton from "@/components/controls/AppButton.vue";
import AppSelect from "@/components/controls/AppSelect.vue";
import { required } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    AppInput,
    AppButton,
    AppSelect,
  },

  data() {
    return {
      title: null,
      type: null,
      submitStatus: null,
      selectedOption: null,
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
    options() {
      return this.getTypes.map((el) => {
        return { text: el.title, value: el.id };
      });
    },
  },

  methods: {
    ...mapActions("admin/groups", ["createGroup"]),
    async submitForm() {
      this.showMessage = false;

      if (!this.$v.$invalid) {
        this.submitStatus = "PENDING";
        try {
          await this.createGroup({
            title: this.title,
            type: this.selectedOption,
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
  &-title {
    text-align: center;
    font-size: 20px;
    color: $black;
    margin-bottom: 20px;
  }

  &-cross {
    position: absolute;
    top: 10px;
    right: 14px;
    font-size: 20px;
    cursor: pointer;
    color: $color-main;
  }

  &-select {
    margin-top: 20px;
  }

  &-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    box-shadow: $shadow-small;
    border-radius: 10px;
    background: $gradient-w;
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
}
</style>