<template>
  <div class="search">
    <h2 class="title">Поиск снимков</h2>

    <div class="search-wrapper">
      <div class="search-zone">
        <h2 class="search-zone__title">Зона интереса</h2>

        <div class="search-zone__unput">
          <input type="radio">
          <label>Видимая область экрана</label>
        </div>
        <div class="search-zone__unput">
          <input type="radio">
          <label>Задать вручную</label>
        </div>

        <nav class="search-zone__nav">
          <ul>
            <li>
              <a href="#">Задать полигон</a>
            </li>
            <li class="line"></li>
            <li>
              <a href="#">Вывести координаты</a>
            </li>
            <li class="line"></li>
            <li>
              <a href="#">Загрузить файл</a>
            </li>
          </ul>
        </nav>

        <div class="search-zone__main">
          <div class="search-zone__table">
            <table>
              <tbody>
                <tr>
                  <th class="col"><input type="checkbox" /></th>
                  <th>Широта</th>
                  <th>Долгота</th>
                  <th class="col"></th>
                  <th class="col"></th>
                </tr>
                <tr>
                  <td class="col"><input type="checkbox"/></td>
                  <td>50° 21' 34" N</td>
                  <td>092° 31' 36" W</td>
                  <td class="col edit"><i class="fa fa-pencil" aria-hidden="true"></i></td>
                  <td class="col delete"><i class="fa fa-trash-o" aria-hidden="true"></i></td>
                </tr>
                <tr>
                  <td class="col"><input type="checkbox" /></td>
                  <td>50° 21' 34" N</td>
                  <td>092° 31' 36" W</td>
                  <td class="col edit"><i class="fa fa-pencil" aria-hidden="true"></i></td>
                  <td class="col delete"><i class="fa fa-trash-o" aria-hidden="true"></i></td>
                </tr>
                <tr>
                  <td class="col"><input type="checkbox"/></td>
                  <td>50° 21' 34" N</td>
                  <td>092° 31' 36" W</td>
                  <td class="col edit"><i class="fa fa-pencil" aria-hidden="true"></i></td>
                  <td class="col delete"><i class="fa fa-trash-o" aria-hidden="true"></i></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="search-zone__button">
            <app-button>Использовать карту</app-button>
            <app-button type="white-g">Прописать координаты</app-button>
            <app-button type="red">Очистить координаты</app-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from "@/components/controls/AppButton.vue"
// import AppInput from "@/components/controls/AppInput.vue"
export default {
  components: {
    AppButton,
    // AppInput
  },
  data() {
    return {
    }
  },
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

.search{
  &-wrapper{
    margin: 30px;
  }
  &-zone{
    padding: 20px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    &__title{
      font-weight: 400;
      font-size: 20px;
      color: #000;
    }
    &__unput{
      margin-top: 10px;
      input{
        width: 14px;
        height: 14px;
        box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.25);
        -webkit-box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.25);
      }
      label{
        font-weight: 400;
        color: #000;
        font-size: 14px;
        margin-left: 6px;
      }
    }
    &__nav{
      display:flex;
      ul {
        display: flex;
        align-items: center;
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .line{
        border-left: 1px solid $color-main;
        height: 12px;
      }
      li{
        margin: 4px;
        list-style-type: none;
        a{
          color: #000;
          &:hover{
            color: $color-main;
          }
          &:active{
            color: $color-main;
          }
        }
      }
    }
    &__main{
      display:flex;
      justify-content: space-between;
    }
    &__table{
      table{
        width: 100%;
        table-layout: fixed;
        border-collapse: collapse; 
        tr{
        border-bottom: 1px solid rgba(71, 109, 112, 0.3); 
          th{
            text-align: left;
            border: none;
            font-size: 12px;
            color: #000000;
            padding: 10px;
            box-sizing: border-box;
            input{
              width: 20px;
              height: 20px;
              background: #EFF2F2;
              box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.25);
              border-radius: 50%;
              border:none;
            }
          }
          td{
            text-align: left;
            border: none;
            font-size: 12px;
            color: $color-main-dark;
            padding: 10px;
            box-sizing: border-box;
            input{
              width: 16px;
              height: 16px;
              background: #EFF2F2;
              box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.25);
              border-radius: 50%;
              border:none;
            }
          }
          .col{
            width: 40px;
            text-align: center;
            i{
              background: $gradient-w;
              border-radius: 8px;
              box-shadow: $shadow-small;
              padding: 8px;
              font-size: 14px;
            }
          }
          .edit{
            color: $color-main;
          }
          .delete{
            color: $color-red;
          }
        }
      }
    }
    &__button{
      display: flex;
      flex-direction: column;
    }
  }
}


</style>