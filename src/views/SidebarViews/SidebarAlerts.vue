<template>
  <div class="alert">
    <h2 class="title">Мои уведомления</h2>

    <div class="alert-wrapper">

      <div class="alert-item">
        <div class="alert-item__img">
          <i class="fa fa-envelope-open-o" aria-hidden="true"></i>
        </div>
        <div class="alert-item__info">
          <h2>Задача №1 “оценка качества ” выполнена</h2>
          <p>Посмотреть результат</p>
        </div>
        <div class="alert-item__trash">
          <i class="fa fa-trash-o" aria-hidden="true"></i>
        </div>
      </div>

      <div class="alert-item">
        <div class="alert-item__unread unread"></div>
        <div class="alert-item__img">
          <i class="fa fa-envelope-open-o" aria-hidden="true"></i>
        </div>
        <div class="alert-item__info">
          <h2>Задача №1 “оценка качества ” выполнена</h2>
          <p>Посмотреть результат</p>
        </div>
        <div class="alert-item__trash">
          <i class="fa fa-trash-o" aria-hidden="true"></i>
        </div>
      </div>

      <div class="alert-item">
        <div class="alert-item__img">
          <i class="fa fa-envelope-open-o" aria-hidden="true"></i>
        </div>
        <div class="alert-item__info">
          <h2>Задача №1 “оценка качества ” выполнена</h2>
          <p>Посмотреть результат</p>
        </div>
        <div class="alert-item__trash">
          <i class="fa fa-trash-o" aria-hidden="true"></i>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>

.title {
  background: $gradient;
  color: #fff;
  text-align: center;
  padding: 5px;
  font-size: 18px;
  font-weight: 400;
}

.unread{
  background: $gradient;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.alert{
  &-wrapper{
    margin: 30px;
  }
  &-item{
    margin-bottom: 20px;
    display: flex;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    align-items: center;
    padding: 10px 15px;
    position: relative;
    &__unread{
      position: absolute;
      top: -4px;
      left: -4px;
    }
    &__img{
      background: $gradient;
      border-radius: 10px;
      box-shadow: $shadow-small;
      padding: 8px;
      i{
        font-size: 24px;
        color: #fff;
      }
    }
    &__info{
      margin-left: 16px;
      h2{
        color: $color-main-dark;
        font-weight: 400;
        font-size: 14px;
      }
      p{
        color: $color-main;
        font-weight: 400;
        font-size: 12px;
      }
    }
    &__trash{
      background: $gradient-w;
      border-radius: 10px;
      box-shadow: $shadow-small;
      padding: 5px 10px;
      margin-left: auto;
      i{
        font-size: 20px;
        color: $color-red; 
      }
    }
  }
}

</style>