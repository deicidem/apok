<template>
  <div class="search-satelite" v-if="getsatelites != null">
    <h2 class="search-title">Космический аппарат</h2>
    <div class="accordion">
      <div
        class="accordion-item"
        v-for="(series, i) in getsatelites"
        :key="series.id"
      >
        <div class="accordion-item__header">
          <div class="accordion-item__header-img" @click="updateShow(i)">
            <img
              svg-inline
              v-if="!satelitesShow[i].show"
              src="@/assets/img/arrows/arrow-close.svg"
              alt=""
            />
            <img
              svg-inline
              v-if="satelitesShow[i].show"
              src="@/assets/img/arrows/arrow-open.svg"
              alt=""
            />
          </div>
          <app-checkbox
            :mini="true"
            :model-value="series.checked"
            @change="selectSeries({ seriesInd: i, val: $event })"
          />
          <span class="accordion-item__header-text" @click="updateShow(i)">{{
            series.name
          }}</span>
        </div>

        <div class="accordion-item__body" v-show="satelitesShow[i].show">
          <div
            class="accordion-item__content"
            v-for="(sc, j) in series.satelites"
            :key="sc.id"
          >
            <div class="accordion-item__header">
              <div class="accordion-item__header-img" @click="updateShow(i, j)">
                <img
                  svg-inline
                  v-if="!satelitesShow[i].children[j].show"
                  src="@/assets/img/arrows/arrow-close.svg"
                  alt=""
                />
                <img
                  svg-inline
                  v-if="satelitesShow[i].children[j].show"
                  src="@/assets/img/arrows/arrow-open.svg"
                  alt=""
                />
              </div>
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
              <span
                class="accordion-item__header-text"
                @click="updateShow(i, j)"
                >{{ sc.name }}</span
              >
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
                    <img src="@/assets/img/satelite-icons/spektr.svg" />
                  </div>
                  <span class="accordion-item__header-text"
                    >Многоспектральная съемка</span
                  >
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
                    <img src="@/assets/img/satelite-icons/panhrom.svg" />
                  </div>
                  <span class="accordion-item__header-text"
                    >Панхроматическая съемка</span
                  >
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
    // for (const key in this.getsatelites) {
    //   if (Object.hasOwnProperty.call(this.getsatelites, key)) {
    //     const el = this.getsatelites[key];
    //     this.satelitesShow.push({
    //       children: el.map(() => {
    //         return {show: false};
    //       }),
    //       show: false
    //     })
    //   }
    // }
    this.getsatelites.forEach((el) => {
      this.satelitesShow.push({
        children: el.satelites.map(() => {
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
      position: relative;
      display: flex;
      align-items: center;
      padding-left: 30px;
      margin-top: 6px;
      &-img {
        cursor: pointer;
        width: 15px;
        height: 15px;
        display: flex;
        align-items: center;
        position: absolute;
        left: 8px;
        top: 50%;
        transform: translateY(-50%);
      }
      svg path {
        fill: $color-main;
        vertical-align: middle;
      }
      &-text {
        cursor: pointer;
        margin: 0 auto 0 4px;
        color: $black;
        font-size: 0.875rem;
      }
    }
    &__content {
      padding: 6px 0 0 26px;
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
