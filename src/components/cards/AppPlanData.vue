<template>
  <div class="data">
    <div class="data-content">
      <div class="data-title">Запланировать задачу</div>
      <div class="data-wrapper">
        <div class="data-item">
          <div class="data-info">
            <p class="data__subtitle">Задача:</p>
            <p class="data__text">{{getPlans[0].title}}</p>
          </div>
        </div>
        <div class="data-item" v-for="(data, i) in getPlans[0].data" :key="i">
          <div class="data-info">
            <p class="data__subtitle">{{data.title}}</p>
            <p class="data__text" v-if="data.ref != null">
              {{data.ref.name}}
            </p>
          </div>
          <div class="data-btns">
            <button class="button button-svg data-btn" @click="selectDzz(i)">
              <img src="@/assets/img/choose.svg" />
            </button>
            <button class="button button-svg data-btn">
              <img src="@/assets/img/upload.svg" />
            </button>
          </div>
        </div>
      </div>
      <button class="data-start button button-g">Начать</button>
    </div>
    <div class="data-line">
      <div class="data-close">
        <img src="@/assets/img/arrow-plan.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
export default {
  computed: {
    ...mapGetters('plans', ['getPlans']),
    ...mapGetters('results', ['getSelectable']),
  },
  methods: {
    ...mapActions('results', ['setSelectable']),
    selectDzz(i) {
      this.setSelectable({type: i, value: !this.getSelectable.value, planIndex: 0, dataIndex: i});
    }
  }
}
</script>

<style lang="scss" scoped>
.data {
  position: absolute;
  left: 100%;
  top: 0;

  display: flex;
  justify-content: space-between;
  min-width: 500px;
  margin: 20px;

  background: $gradient-w;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: $shadow-big;

  &-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 16px;
  }
  &-line {
    width: 40px;
    background-color: $color-main;
    display: flex;
    align-items: center;
  }
  &-title {
    color: #000;
    font-size: 18px;
    font-weight: 300;
    text-align: center;
    margin-bottom: 16px;
  }
  &-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    width: 100%;
    background: $gradient-w;
    padding: 6px;
    box-shadow: $shadow-big;
    border-radius: 5px;
  }
  &__subtitle {
    font-weight: bold;
    font-size: 10px;
    color: $text-grey;
  }
  &__text {
    font-size: 12px;
    font-weight: 300;
    width: 100%;
    text-align: left;
    color: $text-grey;
  }
  &-btns {
    display: flex;
    justify-content: space-between;
    max-width: 250px;
  }
  &-btn {
    margin: 0 6px;
  }
  &-start {
    width: 200px;
    margin: 10px 16px 0 auto;
  }
}
</style>
