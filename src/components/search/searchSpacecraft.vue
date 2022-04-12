<template>
  <div class="search-spacecraft">
    <h2 class="search__title">Космический аппарат</h2>
    <div class="accordion">
      <div
        class="accordion-item"
        v-for="(series, i) in getSpacecrafts"
        :key="series.id"
      >
        <div class="accordion-item__header" @click="updateShow(i)">
          <div class="accordion-item__img"></div>
          <app-checkbox
            :mini="true"
            :model-value="series.checked"
            @change="selectSeries({ seriesInd: i, val: $event })"
          />
          <p>{{ series.name }}</p>
        </div>
        <transition name="fade">
          <div class="accordion-item__body" v-show="spacecraftsShow[i].show">
            <div
              class="accordion-item__content"
              v-for="(sc, j) in series.models"
              :key="sc.id"
            >
              <div class="accordion-item__header" @click="updateShow(i, j)">
                <div class="accordion-item__img"></div>
                <app-checkbox
                  :mini="true"
                  :modelValue="sc.checked"
                  @change="
                    selectSpacecraft({
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
                v-show="spacecraftsShow[i].children[j].show"
              >
                <div class="accordion-item__content">
                  <label class="accordion-item__header">
                    <app-checkbox
                      :mini="true"
                      :modelValue="sc.mss"
                      @change="
                        selectSpacecraft({
                          seriesInd: i,
                          scInd: j,
                          checked: $event || sc.pss,
                          pss: sc.pss,
                          mss: $event,
                        })
                      "
                    />
                    <div>
                      <img src="@/assets/img/spektr.png" />
                    </div>
                    <p>Многоспектральная съемка</p>
                  </label>

                  <label class="accordion-item__header">
                    <app-checkbox
                      :mini="true"
                      :modelValue="sc.pss"
                      @change="
                        selectSpacecraft({
                          seriesInd: i,
                          scInd: j,
                          checked: $event || sc.mss,
                          pss: $event,
                          mss: sc.mss,
                        })
                      "
                    />
                    <div>
                      <img src="@/assets/img/panhrom.png" />
                    </div>
                    <p>Панхроматическая съемка</p>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </transition>
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
      spacecraftsShow: [],
      checkbox: "",
    };
  },
  computed: {
    ...mapGetters("search", ["getSpacecrafts"], "isSelected"),
  },
  methods: {
    ...mapActions("search", ["selectSpacecraft", "selectSeries"]),
    updateShow(seriesInd, scInd = null) {
      if (scInd == null) {
        this.spacecraftsShow[seriesInd].show =
          !this.spacecraftsShow[seriesInd].show;
      } else {
        this.spacecraftsShow[seriesInd].children[scInd].show =
          !this.spacecraftsShow[seriesInd].children[scInd].show;
      }
    },
  },
  beforeMount() {
    this.getSpacecrafts.forEach((el) => {
      this.spacecraftsShow.push({
        children: el.models.map(() => {
          return { show: false };
        }),
        show: false,
      });
    });
  },
};
</script>

<style lang="scss" scoped>

.fade-enter-active, .fade-leave-active {
  transition: all .5s ease-in-out;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.search {
  &-spacecraft {
    margin-top: 20px;
    padding: 20px;
    box-shadow: $shadow-small;
    border-radius: 10px;
    background: $gradient-w;
    .accordion {
      padding: 10px;
      box-shadow: $shadow-small;
      border-radius: 10px;
      overflow: hidden;
      background: $gradient-w;
      &-item {
        position: relative;
        p {
          margin-left: 4px;
          color: #000;
          font-size: 0.875rem;
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
        &__img {
          background: url("@/assets/img/arrow-close.png");
          height: 24px;
          width: 24px;
        }
        &__content {
          padding: 6px 0 0 24px;
          border-top: none;
        }
      }
    }
  }
}
</style>