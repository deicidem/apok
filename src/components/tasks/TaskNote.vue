<template>
  <div class="note-wrapper">
    <div class="note-cross" @click="$emit('close')">
      <i class="icon icon-ic_fluent_dismiss_20_regular"></i>
    </div>

    <div class="note-title">Заметки</div>

    <div
      :contenteditable="editable"
      @blur="onEdit($event)"
      :class="{ editme: editable }"
      class="note-text"
    >
      {{ note }}
    </div>

    <app-button
      class="note-button"
      type="button-g"
      v-show="!editable"
      @click="editable = !editable"
      >Редактировать</app-button
    >

    <app-button
      class="note-button"
      type="button-g"
      v-show="editable"
      @click="onEditDone"
      >Готово</app-button
    >
  </div>
</template>

<script>
import AppButton from "@/components/controls/AppButton";

export default {
  data() {
    return {
      editable: false,
    };
  },

  props: ["note"],

  components: {
    AppButton,
  },

  methods: {
    onEditDone() {
      this.editable = false;
    },

    onEdit(evt) {
      this.value = evt.target.innerText;
    },
  },
};
</script>

<style scoped lang="scss">
.note {
  &-title {
    margin-bottom: 10px;
    font-size: 16px;
    color: #000;
    width: 100%;
  }

  &-cross {
    position: absolute;
    right: 14px;
    top: 14px;
    font-size: 20px;
    cursor: pointer;
    color: $color-main;
  }

  &-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  }

  &-button {
    margin-top: 10px;
    width: 210px;
  }

  &-text{
    padding: 14px;
    border: 1px solid transparent;
  }
}

.editme {
  padding: 14px;
  border-radius: 10px;
  box-shadow: $shadow-small;
  border: 1px solid $color-main;

  &:focus-visible {
    outline: none;
  }
}
</style>