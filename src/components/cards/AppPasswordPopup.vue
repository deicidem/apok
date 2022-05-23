<template>
  <div class="password-popup">
    <div class="password-popup__card">
      <div class="password-popup__line">
        <p>Поменять пароль</p>
        <div class="password-popup__cross" @click="$emit('close')">
          <img src="@/assets/img/cross-w.svg" />
        </div>
      </div>
      <div class="password-popup__wrapper">
        <div class="input-wrapper password-popup__input">
          <input class="input input-withIcon" />
          <label class="input-label">Текущий пароль</label>

          <img svg-inline class="input-img" src="@/assets/img/lock-icon.svg" />
        </div>
        <div class="input-wrapper password-popup__input">
          <input class="input input-withIcon" />
          <label class="input-label">Новый пароль</label>

          <img svg-inline class="input-img" src="@/assets/img/lock-icon.svg" />
        </div>
        <div class="input-wrapper password-popup__input">
          <input class="input input-withIcon" />
          <label class="input-label">Подтвердить пароль</label>

          <img svg-inline class="input-img" src="@/assets/img/lock-icon.svg" />
        </div>
        <button class="button button-g password-popup__button">
          Подтвердить
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.password-popup {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  width: 100vw;
  height: 100vh;

  background: rgba(#000, 0.5);
  &__card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    box-shadow: $shadow-small;
    border-radius: 10px;
    overflow: hidden;
    background: $gradient-w;
  }
  &__line {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $gradient;
    height: 50px;
    width: 100%;
    p {
      color: #fff;
      font-size: 20px;
    }
  }
  &__cross {
    position: absolute;
    right: 10px;

    width: 18px;
  }
  &__wrapper {
    padding: 30px 50px 30px 50px;
  }
  &__input {
    margin-top: 10px;
  }
  &__button {
    margin-top: 10px;
    width: 100%;
    height: 40px;
  }
}
</style>