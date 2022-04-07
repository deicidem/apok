<template>
  <div class="search">
    <h2 class="sidebar-title">Поиск снимков</h2>

      <div class="search-wrapper">
        <div class="search-zone">
          <h2 class="search__title">Зона интереса</h2>

          <div class="search-zone__input">
            <input type="radio">
            <label>Видимая область экрана</label>
          </div>
          <div class="search-zone__input">
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
          <div class="search-date__inputs">

            <div class="search-date__input">
              <i class="fa fa-calendar" aria-hidden="true"></i>
              <input class="input-date" type="date">
            </div>

            <div class="search-date__arrow">
              <img src="@/assets/img/arrow.png">
            </div>

            <div class="search-date__input">
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
        </div>

        <div class="search-spacecraft">
          <h2 class="search__title">Космический аппарат</h2>

              <div class="accordion">

                <div class="accordion-item">
                  <input class="accordion-item__input" type="checkbox" id="accordion-1">
                  <label class="accordion-item__trigger" for="accordion-1">
                    <div class="accordion-item__img"></div>
                    <input type="checkbox" class="accordion-item__checkbox">
                    <p>Канопус</p>
                  </label>

                  <div class="accordion-item__content">
                    <input class="accordion-item__input" type="checkbox" id="accordion-2">

                    <label class="accordion-item__trigger" for="accordion-2">
                      <div class="accordion-item__img"></div>
                      <input type="checkbox" class="accordion-item__checkbox">
                      <p>Канопус-В</p>
                    </label>

                    <div class="accordion-item__content">
                        <input class="accordion-item__input" type="checkbox">
                        <label class="accordion-item__trigger">
                          <input type="checkbox" class="accordion-item__checkbox">
                          <div>
                            <img src="@/assets/img/spektr.png">
                          </div>
                          <p>Многоспектральная съемка</p>
                        </label>
                        <input class="accordion-item__input" type="checkbox">
                        <label class="accordion-item__trigger">
                          <input type="checkbox" class="accordion-item__checkbox">
                          <div>
                            <img src="@/assets/img/panhrom.png">
                          </div>
                          <p>Панхроматическая съемка</p>
                        </label>
                    </div>
                  </div>
                </div>

                <div class="accordion-item">
                  <input class="accordion-item__input" type="checkbox" id="accordion-3">
                  <label class="accordion-item__trigger" for="accordion-3">
                    <div class="accordion-item__img"></div>
                    <input type="checkbox" class="accordion-item__checkbox">
                    <p>Ресурс</p>
                  </label>

                  <div class="accordion-item__content">
                    <input class="accordion-item__input" type="checkbox" id="accordion-4">

                    <label class="accordion-item__trigger" for="accordion-4">
                      <div class="accordion-item__img"></div>
                      <input type="checkbox" class="accordion-item__checkbox">
                      <p>Ресурс-П1</p>
                    </label>

                    <div class="accordion-item__content">
                        <input class="accordion-item__input" type="checkbox">
                        <label class="accordion-item__trigger">
                          <input type="checkbox" class="accordion-item__checkbox">
                          <div>
                            <img src="@/assets/img/spektr.png">
                          </div>
                          <p>Многоспектральная съемка</p>
                        </label>
                        <input class="accordion-item__input" type="checkbox">
                        <label class="accordion-item__trigger">
                          <input type="checkbox" class="accordion-item__checkbox">
                          <div>
                            <img src="@/assets/img/panhrom.png">
                          </div>
                          <p>Панхроматическая съемка</p>
                        </label>
                    </div>
                  </div>
                </div>

              </div>
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

.accordion{
  padding: 10px;
  box-shadow: $shadow-small;;
  border-radius: 10px;
  overflow: hidden;
  background: $gradient-w;
  overflow-y: scroll;
  max-height: 200px;
  &-item{
    position: relative;
    p{
      margin-left: 4px;
      color: #000;
      font-size: 0.875rem;
    }

    &__input{
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      &:checked ~ .accordion-item__trigger{
      }
      &:checked ~ .accordion-item__content{
        display:inline-block;
      }
    }
    &__trigger{
      display: flex;
      align-items: center;
      padding: 6px 0 0 6px;
    }
    &__checkbox{
      margin-right: 6px;
    }
    &__img{
      background: url("@/assets/img/arrow-close.png");
      height: 24px;
      width: 24px;
    }
    &__content{
      padding: 6px 0 0 24px;
      border-top: none;
      display: none;
    }
  }
}


.input-date{
  width: 160px;
  padding: 5px 10px;
  border: none;
  box-shadow: $shadow-small;
  line-height: 30px;
  font-size: 0.875rem;
  color: $color-main-dark;
  background: #fff;
}

.search{
  &-wrapper{
    margin: 30px;
  }
  &__title{
    font-weight: 400;
    font-size: 1.25rem;
    color: #000;
  }
  &-zone{
    padding: 20px;
    box-shadow: $shadow-small;;
    border-radius: 10px;
    overflow: hidden;
    background: $gradient-w;
    &__input{
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
      background: #FFF;
    }
    &__table{
      table{
        width: 100%;
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
            max-width: 110px;
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
    &__inputs{
      display: flex;
      align-items: center;
      margin: 20px 0;
    }
    &__input{
      position: relative;
      overflow: hidden;
      border-radius: 10px;
      box-shadow: $shadow-small;
      align-items: center;
      margin-right: 20px;  
      input{
        height: 30px;
        border: 1px solid transparent;
        border-radius: 10px;
        &:hover{
          border: 1px solid $color-main;
        }
      }
      i{
        position: absolute;
        right: 0;
        padding: 8px;
        background: $gradient;
        color: #fff;
        font-size: 15px;
      }
    }
    &__arrow{
      max-height: 20px;
      margin-right: 20px;
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
    overflow-y: scroll;
  }
  &-buttons{
    margin: 10px;
    text-align: center;
  }
}

</style>