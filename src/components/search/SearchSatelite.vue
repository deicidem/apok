<template>
  <div class="search-satelite">
    <h2 class="search-title">Космический аппарат</h2>
    <div class="accordion">
      <div
        class="accordion-item"
        v-for="(series, i) in getsatelites"
        :key="series.id"
      >
        <div class="accordion-item__header" @click="updateShow(i)">
          <div
            v-bind:class="{
              'accordion-item__close': !satelitesShow[i].show,
              'accordion-item__open': satelitesShow[i].show,
            }"
          ></div>
          <app-checkbox
            :mini="true"
            :model-value="series.checked"
            @change="selectSeries({ seriesInd: i, val: $event })"
          />
          <p>{{ series.name }}</p>
        </div>
        <div class="accordion-item__body" v-show="satelitesShow[i].show">
          <div
            class="accordion-item__content"
            v-for="(sc, j) in series.models"
            :key="sc.id"
          >
            <div class="accordion-item__header" @click="updateShow(i, j)">
              <div
                v-bind:class="{
                  'accordion-item__close': !satelitesShow[i].children[j].show,
                  'accordion-item__open': satelitesShow[i].children[j].show,
                }"
              ></div>
              <app-checkbox
                :mini="true"
                :modelValue="sc.checked"
                @change="
                  selectsatelite({
                    seriesInd: i,
                    scInd: j,
                    checked: $event,
                    pss: $event,
                    mss: $event,
                  })
                "
              />
              <p>{{ sc.name }}</p>
            </div>

            <div
              class="accordion-item__body"
              v-show="satelitesShow[i].children[j].show"
            >
              <div class="accordion-item__content">
                <label class="accordion-item__header">
                  <app-checkbox
                    :mini="true"
                    :modelValue="sc.mss"
                    @change="
                      selectsatelite({
                        seriesInd: i,
                        scInd: j,
                        checked: $event || sc.pss,
                        pss: sc.pss,
                        mss: $event,
                      })
                    "
                  />
                  <div class="accordion-item__img">
                    <img src="@/assets/img/spektr.svg" />
                  </div>
                  <p>Многоспектральная съемка</p>
                </label>

                <label class="accordion-item__header">
                  <app-checkbox
                    :mini="true"
                    :modelValue="sc.pss"
                    @change="
                      selectsatelite({
                        seriesInd: i,
                        scInd: j,
                        checked: $event || sc.mss,
                        pss: $event,
                        mss: sc.mss,
                      })
                    "
                  />
                  <div class="accordion-item__img">
                    <img src="@/assets/img/panhrom.svg" />
                  </div>
                  <p>Панхроматическая съемка</p>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppCheckbox from "@/components/controls/AppCheckbox";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    AppCheckbox,
  },
  data() {
    return {
      satelitesShow: [],
      checkbox: "",
    };
  },
  computed: {
    ...mapGetters("search", ["getsatelites"], "isSelected"),
  },
  beforeMount() {
    this.getsatelites.forEach((el) => {
      this.satelitesShow.push({
        children: el.models.map(() => {
          return { show: false };
        }),
        show: false,
      });
    });
  },
  methods: {
    ...mapActions("search", ["selectsatelite", "selectSeries"]),

    updateShow(seriesInd, scInd = null) {
      console.log(seriesInd);
      if (scInd == null) {
        this.satelitesShow[seriesInd].show =
          !this.satelitesShow[seriesInd].show;
      } else {
        this.satelitesShow[seriesInd].children[scInd].show =
          !this.satelitesShow[seriesInd].children[scInd].show;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.search {
  &-satelite {
    margin-top: 20px;
    padding: 20px;

    box-shadow: $shadow-small;
    border-radius: 10px;
    background: $gradient-w;
  }
}
.accordion {
  padding: 10px;

  box-shadow: $shadow-small;
  border-radius: 10px;
  overflow: hidden;
  background: $white;
  &-item {
    position: relative;
    p {
      margin: 0 auto 0 4px;

      color: $black;
      font-size: 0.875rem;
    }
    &__img {
      margin-left: 10px;
    }
    &__input {
      position: absolute;
      top: 0;
      left: 0;

      opacity: 0;
      &:checked ~ .accordion-item__content {
        display: inline-block;
      }
    }
    &__header {
      display: flex;
      align-items: center;
      padding: 6px 0 0 6px;
    }
    &__checkbox {
      margin-right: 6px;
    }
    &__close {
      height: 24px;
      width: 24px;
      background: url("@/assets/img/arrow-close.svg");
      cursor: pointer;
    }
    &__open {
      height: 24px;
      width: 24px;
      background: url("@/assets/img/arrow-close.svg");
      cursor: pointer;
      transform: rotate(90deg);
    }
    &__content {
      padding: 6px 0 0 24px;
      border-top: none;
    }
  }
}
@media screen and (max-width: 1440px) {
  .search {
    &-satelite {
      padding: 14px;
    }
  }
}
</style>
