<template>
  <div class="password-popup">
    <div class="password-popup__card">
      <div class="password-popup__line">
        <p>Поменять пароль</p>
        <div class="password-popup__cross" @click="$emit('close')">
          <img svg-inline src="@/assets/img/crosses/cross.svg" />
        </div>
      </div>
      <div class="password-popup__wrapper">
        <div class="input-wrapper">
          <input
            required
            placeholder=" "
            v-model="currentPassword"
            class="input input-withIcon"
          />
          <label class="input-label">Текущий пароль</label>

          <img svg-inline class="input-img" src="@/assets/img/form-icons/lock-icon.svg" />
        </div>
        <div class="input-wrapper">
          <input
            required
            placeholder=" "
            v-model="password"
            class="input input-withIcon"
          />
          <label class="input-label">Новый пароль</label>

          <img svg-inline class="input-img" src="@/assets/img/form-icons/lock-icon.svg" />
        </div>
        <div class="input-wrapper">
          <input
            required
            placeholder=" "
            v-model="passwordConfirmation"
            class="input input-withIcon"
          />
          <label class="input-label">Подтвердить пароль</label>

          <img svg-inline class="input-img" src="@/assets/img/form-icons/lock-icon.svg" />
        </div>
        <div class="password-popup__button">
          <button
            class="button button-g password-popup__btn"
            @click="
              $emit('submit', {
                currentPassword,
                password,
                passwordConfirmation,
              })
            "
          >
            Подтвердить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPassword: "",
      password: "",
      passwordConfirmation: "",
    };
  },
};
</script>

<style scoped lang="scss">
.password-popup {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  width: 100vw;
  height: 100vh;

  background: rgba($black, 0.5);
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
      color: $white;
      font-size: 20px;
    }
  }
  &__cross {
    position: absolute;
    right: 10px;

    width: 18px;
    cursor: pointer;
    svg path{
      fill: $white;
    }
  }
  &__wrapper {
    width: 400px;
    padding: 30px;
  }
  &__input {
    margin-top: 10px;
  }
  &__button {
    margin: 10px auto;
    width: 300px;
  }
  &__btn {
    width: 100%;
    font-size: 16px;
    height: 40px;
  }
}
</style>