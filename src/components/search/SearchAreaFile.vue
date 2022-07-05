<template>
  <search-area-base class="c">
    <label class="c-load">
      <input
        @change="onFileUpload"
        class="c-input"
        ref="file"
        type="file"
        name="file"
        accept=".json,.geojson,.zip"
      />
      <app-button type="button-white-gr" class="c-button"
        >Загрузить файл</app-button
      >
      <span class="c-name">{{ file == null ? "не выбран" : file.name }}</span>
    </label>
    <div class="c-buttons">
      <app-button
        type="button-g"
        class="c-button"
        :disabled="file == null"
        @click="$emit('submit', file)"
      >
        Показать на карте
      </app-button>

      <app-button type="button-r " @click="$emit('remove')" class="c-button">
        Удалить
      </app-button>
    </div>
  </search-area-base>
</template>

<script>
import SearchAreaBase from "@/components/search/SearchAreaBase.vue";
import AppButton from "@/components/controls/AppButton";
export default {
  components: {
    SearchAreaBase,
    AppButton,
  },
  data: () => ({
    file: null,
  }),
  methods: {
    onFileUpload() {
      this.file = this.$refs.file.files[0];
    },
  },
};
</script>

<style lang="scss" scoped>
.c {
  display: flex;
  align-items: flex-start;

  &-load {
    display: flex;
    align-items: center;
    width: 100%;
  }

  &-buttons {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  &-button {
    width: 190px;

    &:first-child {
      margin-bottom: 20px;
    }
  }

  &-name {
    margin-left: 20px;
    font-size: 14px;
    color: $black;
  }

  &-input {
    display: none;
  }
}
</style>