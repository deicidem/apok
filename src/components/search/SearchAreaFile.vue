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
      <span class="button button-white-gr c-button">Загрузить файл</span>
      <span class="c-name">{{ file == null ? "не выбран" : file.name }}</span>
    </label>
    <div class="c-buttons">
      <button class="button button-g c-button" :disabled="file == null" @click="$emit('submit', file)">
        Показать на карте
      </button>
      <button @click="$emit('remove')" class="button button-r c-button">
        Удалить
      </button>
    </div>
  </search-area-base>
</template>

<script>
import SearchAreaBase from "@/components/search/SearchAreaBase.vue";
export default {
  components: {
    SearchAreaBase,
  },
  data: () => ({
    file: null,
  }),
  methods: {
    onFileUpload() {
      this.file = this.$refs.file.files[0];
    },
  }
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