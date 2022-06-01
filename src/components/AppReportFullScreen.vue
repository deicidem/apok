<template>
  <div class="fullScreen">
    <div class="fullScreen-wrapper">
      <router-link to="/main/tasks">
        <div class="back">
          <div class="back-arrow">
            <img src="@/assets/img/arrow.svg" />
          </div>
          <p class="back-subtitle">Назад</p>
        </div>
      </router-link>

      <h2 class="fullScreen-title">Отчет</h2>

      <button class="button button-g fullScreen-button">Скачать</button>
    </div>

    <div class="fullScreen-report">
      <img src="@/assets/img/report.png" />
    </div>
  </div>
</template>

<script>
</script>

<style scoped lang="scss">
.fullScreen {
  height: 900px;
  padding: 40px;

  box-shadow: $shadow-big;
  border-radius: 25px;
  overflow: hidden;
  background: $gradient-w;
  &-wrapper {
    display: flex;
    justify-content: space-between;
    max-width: 1600px;
    margin: 30px auto;
  }
  &-title {
    color: #000;
    font-weight: 400;
  }
  &-button {
    height: auto;
    justify-self: end;

    width: 270px;
    font-size: 1.125rem;
  }
  &-report {
    margin: 50px auto;
    img {
      margin: 20px auto;
      max-width: 100%;
      min-width: 50%;
      height: auto;
      width: auto;
    }
  }
}
.back {
  display: flex;
  align-items: center;
  position: absolute;
  cursor: pointer;
  &-arrow {
    width: 40px;
  }
  p {
    margin-left: 10px;
    color: $text-grey;
  }
}
</style>
