<template>
  <div class="search">
    <h2 class="sidebar-title">Поиск снимков</h2>

      <div class="search-wrapper">
        <div class="search-zone">
          <h2 class="search__title">Зона интереса</h2>

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

            <div class="search-zone__buttons">
              <app-button class="search-zone__button">Использовать карту</app-button>
              <app-button class="search-zone__button" type="white-g">Прописать координаты</app-button>
              <app-button class="search-zone__button" type="red">Очистить координаты</app-button>
            </div>
          </div>
        </div>

        <div class="search-date">
          <h2 class="search__title">Интервал дат съемки</h2>
          <div class="search-date__unputs">

            <div class="search-date__unput">
              <i class="fa fa-calendar" aria-hidden="true"></i>
              <input class="input-date" type="date">
            </div>

            <div class="search-date__arrow">
              <img src="@/assets/img/arrow.png">
            </div>

            <div class="search-date__unput">
              <i class="fa fa-calendar" aria-hidden="true"></i>
              <input class="input-date" type="date">
            </div>

            <select class="search-date__select input-date">
              <option class="search-date__option" value="value3" selected>Все</option>
              <option class="search-date__option" value="value1">Январь</option>
              <option class="search-date__option" value="value2">Февраль</option>
              <option class="search-date__option" value="value2">Март</option>
              <option class="search-date__option" value="value2">Апрель</option>
              <option class="search-date__option" value="value2">Май</option>
              <option class="search-date__option" value="value2">Июнь</option>
              <option class="search-date__option" value="value2">Июль</option>
              <option class="search-date__option" value="value2">Август</option>
            </select>
          </div>
        </div>

        <div class="search-cloud">
          <h2 class="search__title">Облачность</h2>

          <div class="scrollbar">

          </div>

        </div>

        <div class="search-spacecraft">
          <h2 class="search__title">Космический аппарат</h2>
            <div class="search-spacecraft"></div>
        </div>

        <div class="search-buttons">
          <app-button class="search-zone__button" type="white-g">Очистить</app-button>
          <app-button class="search-zone__button">Запросить данные</app-button>    
        </div>
      </div>

  </div>
</template>

<script>
import AppButton from "@/components/controls/AppButton.vue"
// import AppInput from "@/components/controls/AppInput.vue"
export default {
  components: {
    AppButton
    // AppInput
  },
  data() {
    return {
    }
  },
}
</script>

<style lang="scss" scoped>

.input-date{
  margin-top: 2px;
  width: 160px;
  padding: 5px 10px;
  border-radius: 15px;
  border: none;
  box-shadow: $shadow-small;
  line-height: 30px;
  font-size: 14px;
  color: $color-main-dark;
  background: #fff;
}

.scrollbar{
  margin: 20px auto;
  overflow-x: scroll;
  width: 350px;
  height: 12px;
}

.scrollbar::-webkit-scrollbar {
  scrollbar-color: $color-main-dark #FFF; 
}

.scrollbar::-webkit-scrollbar-thumb {
  background-color: $color-main-dark;
  width: 50px;
  height: 12px;
  border-radius: 3px;
}

.search{
  &-wrapper{
    margin: 30px;
  }
  &__title{
    font-weight: 400;
    font-size: 20px;
    color: #000;
  }
  &-zone{
    padding: 20px;
    box-shadow: $shadow-small;;
    border-radius: 10px;
    overflow: hidden;
    background: $gradient-w;
    &__unput{
      margin-top: 10px;
      input{
        width: 14px;
        height: 14px;
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
      align-items: center;
      padding: 10px;
      box-shadow: $shadow-big;
      border-radius: 10px;
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
            padding: 6px;
            box-sizing: border-box;
            input{
              width: 20px;
              height: 20px;
              background: #EFF2F2;
              border-radius: 50%;
              border:none;
            }
          }
          td{
            text-align: left;
            border: none;
            font-size: 12px;
            color: $color-main-dark;
            padding: 6px;
            box-sizing: border-box;
            input{
              width: 16px;
              height: 16px;
              background: #EFF2F2;
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
    &__buttons{
      display: flex;
      flex-direction: column;
      margin: 0 20px;
    }
    &__button{
      margin: 10px;
      height: 40px;
    }
  }
  &-date{
    margin-top: 20px;
    padding: 20px;
    box-shadow: $shadow-small;
    border-radius: 10px;
    overflow: hidden;
    background: $gradient-w;
    &__unputs{
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      padding: 20px;
    }
    &__unput{
      position: relative;
      overflow: hidden;
      border-radius: 10px;
      box-shadow: $shadow-small;
      align-items: center;
      &:hover{
        outline: 1px solid $color-main;
      }
      input{
        height: 30px;
      }
      i{
        position: absolute;
        right: 0;
        padding: 8px;
        background: $gradient;
        color: #fff;
      }
    }
    &__arrow{
      max-height: 20px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    &__select{
      margin-left: 30px;
      overflow: hidden;
      border-radius: 10px;
      box-shadow: $shadow-small;
      align-items: center;
      color: $color-main-dark;
      height: 100%;
      width: 113px;
      height: 30px;
    }
    &__option{
      color: $text-grey;  
      padding:10px;
    }
  }
  &-cloud{
    margin-top: 20px;
    padding: 20px;
    box-shadow: $shadow-small;;
    border-radius: 10px;
    overflow: hidden;
    background: $gradient-w;
  }
  &-spacecraft{
    margin-top: 20px;
    padding: 20px;
    box-shadow: $shadow-small;;
    border-radius: 10px;
    overflow: hidden;
    background: $gradient-w;
  }
  &-buttons{
    margin: 10px;
    text-align: center;
  }
}

</style>